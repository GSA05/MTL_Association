"use client";
import {
  Server,
  AccountResponse,
  Asset,
  ServerApi,
  TransactionBuilder,
  Operation,
  Signer,
  Keypair,
  Memo,
  BASE_FEE,
  Networks,
  SignerKey,
  StrKey,
} from "stellar-sdk";
import useSWR from "swr";
import { config } from "../config";
import { IMember } from "@/interfaces";
import {
  differenceBy,
  differenceWith,
  intersectionWith,
  lastIndexOf,
  uniq,
  uniqBy,
} from "lodash";
import { arrayToTree } from "performant-array-to-tree";
import { sumCount } from "@/utils";
import { data as testData } from "@/fixture/dev";
import { Link } from "@/components/Link";
import { useEffect, useState } from "react";

const server = new Server("https://horizon.stellar.org");
const mtlapAsset = new Asset(config.mtlapToken, config.mainAccount);

export const useGetCurrentC = () => {
  const response = useSWR<AccountResponse>(
    "currentC",
    () => server.loadAccount(config.mainAccount),
    { revalidateOnFocus: false }
  );
  const { data: account, error, mutate, isLoading, isValidating } = response;
  return {
    currentC: false
      ? testData.currentC
      : account?.signers
          .filter((signer) => signer.key !== config.mainAccount)
          .map((signer) => ({
            id: signer.key,
            count: signer.weight,
          }))
          .sort((a, b) => b.count - a.count),
    error,
    mutate,
    isLoading,
    isValidating,
  };
};

const asyncWhile: (
  recs: ServerApi.AccountRecord[],
  func: () => Promise<ServerApi.CollectionPage<ServerApi.AccountRecord>>
) => Promise<ServerApi.AccountRecord[]> = async (
  recs: ServerApi.AccountRecord[],
  func: () => Promise<ServerApi.CollectionPage<ServerApi.AccountRecord>>
) => {
  const res = await func();
  recs = recs.concat(res?.records);
  if (res?.records?.length > 0) return await asyncWhile(recs, res.next);
  return recs;
};

export const useGetMembers = () => {
  const response = useSWR<ServerApi.AccountRecord[]>(
    "members",
    async () => {
      let records: ServerApi.AccountRecord[] = [];
      const res = await server.accounts().forAsset(mtlapAsset).call();
      records = records.concat(
        res.records,
        await asyncWhile(records, res.next)
      );
      return records;
    },
    { revalidateOnFocus: false }
  );

  const [members, setMembers] = useState<IMember[]>([]);
  const [delegations, setDelegations] = useState<string[]>([]);
  useEffect(() => {
    const mmbrs: IMember[] = [];
    const dlgtns: string[] = [];
    response?.data?.forEach((record) => {
      const delegateA = atob(
        record.data_attr["mtla_a_delegate"] ||
          record.data_attr["mtla_delegate"] ||
          ""
      );
      const delegateC = atob(
        record.data_attr["mtla_c_delegate"] ||
          record.data_attr["mtla_delegate"] ||
          ""
      );
      if (delegateA !== "") {
        dlgtns.push(delegateA);
      }
      if (delegateC !== "") {
        dlgtns.push(delegateC);
      }
      mmbrs.push({
        id: record.account_id,
        count: Number(
          record.balances.find(
            (balance) =>
              balance.asset_type === "credit_alphanum12" &&
              balance.asset_code === mtlapAsset.getCode() &&
              balance.asset_issuer === mtlapAsset.getIssuer()
          )?.balance || 0
        ),
        delegateA,
        delegateC,
      });
    });
    setMembers(mmbrs);
    setDelegations(dlgtns);
  }, [response.data]);

  useEffect(() => {
    (async () => {
      const orphans = differenceWith(
        uniq(delegations),
        members,
        (a, b) => a === b.id
      );
      if (orphans?.length > 0)
        setMembers(await enrichMembers(uniqBy(members, "id"), orphans, 10));
    })();
  }, [members]);

  return {
    data: response.data,
    isLoading: response.isLoading,
    isValidating: response.isValidating,
    mutate: response.mutate,
    members: false ? testData.members : members,
  };
};

export const useGetTree = () => {
  const { members, isLoading, isValidating, mutate } = useGetMembers();
  const tree = arrayToTree(members, {
    parentId: "delegateC",
    dataField: null,
  });
  let error;
  try {
    arrayToTree(members, {
      parentId: "delegateC",
      dataField: null,
      throwIfOrphans: true,
    });
  } catch (e) {
    const badId = /\[(.+?)\]/.exec(e as string)?.[1];
    error = () => (
      <>
        В делигациях есть циклические ссылки или ссылки на недействительных
        участников
        {badId ? <> ({Link(badId)})</> : ""}!
      </>
    );
  }
  return { tree, isLoading, isValidating, mutate, error };
};

export const useGetNewC = () => {
  const { tree, isLoading, isValidating, mutate } = useGetTree();
  const newC = tree
    .filter((member) => false || member.count > 0)
    .map((member) => ({
      ...(member as IMember),
      count: sumCount(member as IMember & { children?: IMember[] }),
      delegations:
        sumCount(member as IMember & { children?: IMember[] }) - member.count,
      weight: Math.floor(
        Math.log10(
          Math.max(sumCount(member as IMember & { children?: IMember[] }), 2) -
            1
        ) + 1
      ),
    }))
    .splice(0, 20)
    .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id));
  return { newC, isLoading, isValidating, mutate };
};

export const useGetChanges = () => {
  const {
    currentC = [],
    mutate: mutateCurrentC,
    isLoading: isLoadingCurrentC,
    isValidating: isValidatingCurrentC,
  } = useGetCurrentC();
  const { newC, isLoading, isValidating, mutate } = useGetNewC();
  const changes: Record<string, number> = {};
  const removedMembers = differenceBy(currentC, newC, "id");
  removedMembers.forEach((member) => (changes[member.id] = 0));
  const newMembers = differenceBy(newC, currentC, "id");
  newMembers.forEach((member) => (changes[member.id] = member.weight));
  const changedMembers = intersectionWith(
    newC,
    currentC,
    (a, b) => a.id === b.id && a.weight !== b.count
  );
  changedMembers.forEach((member) => (changes[member.id] = member.weight));
  const currentCDic = currentC.reduce<Record<string, number>>(
    (prev, cur) => ({ ...prev, [cur.id]: cur.count }),
    {}
  );
  return {
    changes: Object.keys(changes).map((id) => {
      const old = currentCDic[id] ?? 0;
      const weight = changes[id];
      return {
        id,
        weight,
        diff:
          old === 0
            ? "новый"
            : weight < old
            ? `- ${old - weight}`
            : `+ ${weight - old}`,
      };
    }),
    isLoading: isLoading || isLoadingCurrentC,
    isValidating: isValidating || isValidatingCurrentC,
    mutate: () => {
      Promise.all([mutate(), mutateCurrentC()]);
    },
  };
};

export const enrichMembers = async (
  members: IMember[],
  orphans: string[],
  limit: number
) => {
  let newMembers = [...members];
  const delegations: string[] = [];
  if (limit > 0 && orphans?.length > 0) {
    (
      await Promise.all(
        orphans.map(async (id) => {
          const account = await server.loadAccount(id);
          const delegateA = atob(
            account.data_attr["mtla_a_delegate"] ||
              account.data_attr["mtla_delegate"] ||
              ""
          );
          const delegateC = atob(
            account.data_attr["mtla_c_delegate"] ||
              account.data_attr["mtla_delegate"] ||
              ""
          );
          if (delegateA !== "") {
            delegations.push(delegateA);
          }
          if (delegateC !== "") {
            delegations.push(delegateC);
          }
          return { id, count: 0, delegateA, delegateC, removed: true };
        })
      )
    ).forEach((member) => newMembers.push(member));
    const newOrphans = differenceWith(
      uniq(delegations),
      newMembers,
      (a, b) => a === b.id
    );
    if (newOrphans?.length > 0) {
      newMembers = await enrichMembers(newMembers, newOrphans, limit - 1);
    }
  }
  return newMembers;
};

export const useGetTransaction = () => {
  const { newC } = useGetNewC();
  const { changes } = useGetChanges();
  const response = useSWR<AccountResponse>(
    "currentC",
    () => server.loadAccount(config.mainAccount),
    { revalidateOnFocus: false }
  );
  const voicesSum = newC.reduce((prev, cur) => prev + cur.weight, 0);
  const forTransaction = Math.floor(voicesSum / 2 + 1);
  if (response.data) {
    const transaction = new TransactionBuilder(response.data, {
      fee: "100000",
      networkPassphrase: Networks.PUBLIC,
    });
    transaction.addMemo(Memo.text("Update sign weights"));
    let opCount = 0;
    const lastItem = changes[changes.length - 1];
    changes.forEach((change) => {
      const operation = Operation.setOptions({
        signer: {
          ed25519PublicKey: Keypair.fromPublicKey(change.id).publicKey(),
          weight: change.weight,
        },
        ...(lastItem.id === change.id && {
          masterWeight: 0,
          lowThreshold: forTransaction,
          medThreshold: forTransaction,
          highThreshold: forTransaction,
        }),
      });
      transaction.addOperation(operation);
      opCount++;
    });

    if (opCount) {
      return transaction.setTimeout(30).build().toEnvelope();
    }
  }
  return null;
};
