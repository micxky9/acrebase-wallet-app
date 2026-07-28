"use client";

import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";

import { subgraph } from "@/lib/subgraph";
import { GET_TRANSFERRED_TOKENS } from "@/graphql/getOwnedTokens";

export function useOwnedTokens() {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["owned-tokens", address],
    enabled: !!address,

    queryFn: async () => {
      const result = await subgraph.request(
        GET_TRANSFERRED_TOKENS,
        {
          wallet: address?.toLowerCase(),
        }
      );

      return result.combinedTransfers;
    },
  });
}