"use client";
import {
  Server,
  Networks,
  AccountResponse,
  Asset,
  ServerApi,
} from "stellar-sdk";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { config } from "../config";
import { IMember } from "@/interfaces";
import { differenceBy, flatMap } from "lodash";
import { useEffect } from "react";
import { arrayToTree } from "performant-array-to-tree";
import { sumCount } from "@/utils";

const server = new Server("https://horizon.stellar.org");
const mtlapAsset = new Asset(config.mtlapToken, config.mainAccount);

export const useGetCurrentC = () => {
  const response = useSWR<AccountResponse>("currentC", () =>
    server.loadAccount(config.mainAccount)
  );
  const { data: account, error, mutate, isLoading, isValidating } = response;
  return {
    currentC: account?.signers
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

export const useGetMembers = () => {
  const response = useSWRInfinite<
    ServerApi.CollectionPage<ServerApi.AccountRecord>
  >(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.records?.length) return null;
      if (pageIndex === 0) return "members";
      return previousPageData;
    },
    (arg) => {
      if (arg === "members") {
        return server.accounts().forAsset(mtlapAsset).call();
      } else {
        return arg.next();
      }
    },
    { revalidateOnFocus: false, revalidateFirstPage: false, parallel: false }
  );

  const members: IMember[] = [];
  flatMap(response.data, (item) => item.records).forEach((record) => {
    members.push({
      id: record.account_id,
      count: Number(
        record.balances.find(
          (balance) =>
            balance.asset_type === "credit_alphanum12" &&
            balance.asset_code === mtlapAsset.getCode() &&
            balance.asset_issuer === mtlapAsset.getIssuer()
        )?.balance || 0
      ),
      delegateA: atob(
        record.data_attr["mtla_a_delegate"] ||
          record.data_attr["mtla_delegate"] ||
          ""
      ),
      delegateC: atob(
        record.data_attr["mtla_c_delegate"] ||
          record.data_attr["mtla_delegate"] ||
          ""
      ),
    });
  });

  return {
    size: response.size,
    setSize: response.setSize,
    data: response.data,
    isLoading: response.isLoading,
    isValidating: response.isValidating,
    mutate: response.mutate,
    members,
  };
};

export const useGetTree = () => {
  const { members, size, setSize, data, isLoading, isValidating, mutate } =
    useGetMembers();
  useEffect(() => {
    if (data && data?.[size - 1]?.records?.length > 0) {
      setSize(size + 1);
    }
  }, [data, size]);
  const tree = arrayToTree(
    members?.filter((member) => member.count > 0),
    {
      parentId: "delegateC",
      dataField: null,
    }
  );
  return { tree, isLoading, isValidating, mutate };
};

export const useGetNewC = () => {
  const { tree, isLoading, isValidating, mutate } = useGetTree();
  const newC = tree
    .map((member) => ({
      ...(member as IMember),
      count: sumCount(member as IMember & { children?: IMember[] }),
      weight: Math.floor(
        Math.log10(
          Math.max(sumCount(member as IMember & { children?: IMember[] }), 2) -
            1
        ) + 1
      ),
    }))
    .splice(0, 20)
    .sort((a, b) => b.count - a.count);
  return { newC, isLoading, isValidating, mutate };
};

export const useGetChanges = () => {
  const {
    currentC,
    mutate: mutateCurrentC,
    isLoading: isLoadingCurrentC,
    isValidating: isValidatingCurrentC,
  } = useGetCurrentC();
  const { newC, isLoading, isValidating, mutate } = useGetNewC();
  const changes: Record<string, number> = {};
  const removed = differenceBy(currentC, newC, "id");
  removed.forEach((member) => (changes[member.id] = 0));
};
