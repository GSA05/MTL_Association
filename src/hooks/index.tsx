"use client";
import {
  Server,
  AccountResponse,
  Asset,
  ServerApi,
  TransactionBuilder,
  Operation,
  Keypair,
  Memo,
  Networks,
  Horizon,
} from "stellar-sdk";
import useSWR from "swr";
import { config } from "../config";
import { IMember } from "@/interfaces";
import {
  differenceBy,
  differenceWith,
  intersectionWith,
  uniq,
  uniqBy,
} from "lodash";
import { arrayToTree } from "performant-array-to-tree";
import { sumCount } from "@/utils";
import { data as testData } from "@/fixture/dev";
import { Link } from "@/components/Link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { singletonHook } from "react-singleton-hook";

const server = new Server("https://horizon.stellar.org");
const mtlapAsset = new Asset(config.mtlapToken, config.mainAccount);

export const useGetCurrentCImpl = () => {
  const cache = JSON.parse(localStorage.getItem("currentC") || "null");
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const response = useSWR<AccountResponse>(
    "currentC",
    () => {
      const cache = JSON.parse(localStorage.getItem("currentC") || "null");
      const today = new Date();
      today.setDate(today.getDate() - 1);
      return !cache || new Date(cache.date).getTime() < today.getTime()
        ? server.loadAccount(config.mainAccount)
        : cache.data;
    },
    { revalidateOnFocus: false, revalidateIfStale: false }
  );
  const { data: account, error, mutate, isLoading, isValidating } = response;
  if (
    !cache ||
    !cache.data ||
    new Date(cache.date).getTime() < today.getTime()
  ) {
    localStorage.setItem(
      "currentC",
      JSON.stringify({ data: account, date: new Date() })
    );
  }
  const currentC = useMemo(() => {
    return account?.signers
      .filter((signer) => signer.key !== config.mainAccount)
      .map((signer) => ({
        id: signer.key,
        count: signer.weight,
      }))
      .sort((a, b) => b.count - a.count);
  }, [account]);

  return {
    currentC: false ? testData.currentC : currentC,
    error,
    mutate,
    isLoading,
    isValidating,
  };
};

export const useGetCurrentC = singletonHook(
  {
    currentC: [],
    error: null,
    isLoading: false,
    isValidating: false,
    mutate: () => Promise.resolve(undefined),
  },
  useGetCurrentCImpl
);

const asyncWhile: <T extends Horizon.BaseResponse>(
  recs: T[],
  func: () => Promise<ServerApi.CollectionPage<T>>
) => Promise<T[]> = async function <T extends Horizon.BaseResponse>(
  recs: T[],
  func: () => Promise<ServerApi.CollectionPage<T>>
) {
  const res = await func();
  recs = recs.concat(res?.records);
  if (res?.records?.length > 0) return await asyncWhile(recs, res.next);
  return recs;
};

export const useGetMembersImpl = () => {
  const cache = JSON.parse(localStorage.getItem("members") || "null");
  const date = cache?.date || null;
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const response = useSWR<ServerApi.AccountRecord[]>(
    "members",
    async () => {
      const cache = JSON.parse(localStorage.getItem("members") || "null");
      const today = new Date();
      today.setDate(today.getDate() - 1);
      if (!cache || new Date(cache.date).getTime() < today.getTime()) {
        let records: ServerApi.AccountRecord[] = [];
        const res = await server.accounts().forAsset(mtlapAsset).call();
        records = records.concat(
          res.records,
          await asyncWhile<ServerApi.AccountRecord>(records, res.next)
        );
        return records;
      } else {
        return cache.data;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  if (
    !cache ||
    !cache.data ||
    new Date(cache.date).getTime() < today.getTime()
  ) {
    localStorage.setItem(
      "members",
      JSON.stringify({ data: response.data, date: new Date() })
    );
  }

  const [members, delegations]: [IMember[], string[]] = useMemo(() => {
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
    return [mmbrs, dlgtns];
  }, [response.data]);

  const [fullMembers, setFullMembers] = useState<IMember[]>([]);

  useEffect(() => {
    (async () => {
      const orphans = differenceWith(
        uniq(delegations),
        members,
        (a, b) => a === b.id
      );
      if (orphans?.length > 0)
        setFullMembers(await enrichMembers(uniqBy(members, "id"), orphans, 10));
    })();
  }, [members, delegations, date]);

  return {
    data: response.data,
    isLoading: response.isLoading,
    isValidating: response.isValidating,
    mutate: response.mutate,
    members: false ? testData.members : fullMembers,
    date,
  };
};

export const useGetMembers = singletonHook(
  {
    data: [],
    isLoading: false,
    isValidating: false,
    members: [],
    mutate: () => Promise.resolve(undefined),
    date: null,
  },
  useGetMembersImpl
);

export const useGetTreeImpl = () => {
  const { members, isLoading, isValidating, mutate, date } = useGetMembers();
  const [tree, error] = useMemo(() => {
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
    return [tree, error];
  }, [members]);
  return { tree, isLoading, isValidating, mutate, error, date };
};

export const useGetTree = singletonHook(
  {
    tree: [],
    isLoading: false,
    isValidating: false,
    error: undefined,
    mutate: () => Promise.resolve(undefined),
    date: null,
  },
  useGetTreeImpl
);

export const useGetNewCImpl = () => {
  const { tree, isLoading, isValidating, mutate, date } = useGetTree();
  const newC = useMemo(() => {
    return tree
      .filter((member) => false || member.count > 0)
      .map((member) => ({
        ...(member as IMember),
        count: sumCount(member as IMember & { children?: IMember[] }),
        delegations:
          sumCount(member as IMember & { children?: IMember[] }) - member.count,
        weight: Math.floor(
          Math.log10(
            Math.max(
              sumCount(member as IMember & { children?: IMember[] }),
              2
            ) - 1
          ) + 1
        ),
      }))
      .splice(0, 20)
      .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id));
  }, [tree]);
  return { newC, isLoading, isValidating, mutate, date };
};

export const useGetNewC = singletonHook(
  {
    newC: [],
    isLoading: false,
    isValidating: false,
    mutate: () => Promise.resolve(undefined),
    date: null,
  },
  useGetNewCImpl
);

export const useGetChangesImpl = () => {
  const {
    currentC = [],
    mutate: mutateCurrentC,
    isLoading: isLoadingCurrentC,
    isValidating: isValidatingCurrentC,
  } = useGetCurrentC();
  const {
    newC,
    isLoading: isLoadingNewC,
    isValidating: isValidatingNewC,
    mutate: mutateNewC,
    date,
  } = useGetNewC();
  const changes = useMemo(() => {
    if (!newC?.length || !currentC?.length) return [];
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
    return Object.keys(changes).map((id) => {
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
    });
  }, [currentC, newC]);

  const mutate = useCallback(() => {
    return [mutateNewC(), mutateCurrentC()];
  }, [mutateNewC, mutateCurrentC]);

  const isLoading = useMemo(() => {
    return isLoadingNewC || isLoadingCurrentC;
  }, [isLoadingNewC, isLoadingCurrentC]);

  const isValidating = useMemo(() => {
    return isValidatingNewC || isValidatingCurrentC;
  }, [isValidatingNewC, isValidatingCurrentC]);

  return {
    changes,
    isLoading,
    isValidating,
    mutate,
    date,
  };
};

export const useGetChanges = singletonHook(
  {
    changes: [],
    isLoading: false,
    isValidating: false,
    mutate: () => [Promise.resolve(undefined), Promise.resolve(undefined)],
    date: null,
  },
  useGetChangesImpl
);

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
          let cache = JSON.parse(localStorage.getItem("accounts") || "null");
          const today = new Date();
          today.setDate(today.getDate() - 1);
          const cachedValue = cache?.data?.[id];
          if (
            !cachedValue ||
            new Date(cache.date).getTime() < today.getTime()
          ) {
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
            const member = {
              id,
              count: 0,
              delegateA,
              delegateC,
              removed: true,
            };
            cache = {
              data: { ...cache?.data, [id]: member },
              date: new Date(),
            };
            localStorage.setItem("accounts", JSON.stringify(cache));
            return member;
          } else {
            return cachedValue;
          }
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

export const useGetTransactionImpl = () => {
  const { newC, isLoading: isLoadingNewC } = useGetNewC();
  const { changes, isLoading: isLoadingChanges } = useGetChanges();
  const response = useSWR<AccountResponse>(
    newC?.length > 0 &&
      changes?.length > 0 &&
      !isLoadingNewC &&
      !isLoadingChanges &&
      "account",
    () => server.loadAccount(config.mainAccount),
    { revalidateOnFocus: false, revalidateIfStale: false }
  );
  const xdr = useMemo(() => {
    if (
      !(
        newC?.length > 0 &&
        changes?.length > 0 &&
        !isLoadingNewC &&
        !isLoadingChanges
      )
    )
      return null;
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
  }, [newC, changes, isLoadingNewC, isLoadingChanges, response.data]);
  return xdr;
};

export const useGetTransaction = singletonHook(null, useGetTransactionImpl);
