"use client";
import { Server, Networks, AccountResponse } from "stellar-sdk";
import useSWR from "swr";
import { config } from "../config";

export const useGetCurrentC = () => {
  const server = new Server("https://horizon.stellar.org");
  const response = useSWR<AccountResponse>("currentC", () =>
    server.loadAccount(config.mainAccount)
  );
  const { data: account, error } = response;
  return {
    currentC: account?.signers
      .filter((signer) => signer.key !== config.mainAccount)
      .map((signer) => ({
        id: signer.key,
        count: signer.weight,
      }))
      .sort((a, b) => b.count - a.count),
    error,
  };
};
