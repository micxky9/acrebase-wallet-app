"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { CONTRACTS } from "@/constants/contracts";

import { subgraph } from "@/lib/subgraph";
import { GET_TRANSFERS } from "@/graphql/transfers";

export function useOwnedNFTs() {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["owned-nfts", address],
    enabled: !!address,
    queryFn: async () => {
      const result = await subgraph.request(GET_TRANSFERS, {
        wallet: address!.toLowerCase(),
      });

      return result.combinedTransfers;
    },
  });

  return {
    nfts: data ?? [],
    isLoading,
    error,
    refetch,
  };
}
