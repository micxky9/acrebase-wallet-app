"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { subgraph } from "@/lib/subgraph";
import { GET_TRANSFERS } from "@/graphql/transfers";

export interface OwnedNFTTransfer {
  id: string;
  tokenId: string;
  nftAddress: string;
  from: string;
  to: string;
  blockTimestamp: string;
  transactionHash: string;
}

interface GetTransfersResult {
  combinedTransfers: OwnedNFTTransfer[];
}

export function useOwnedNFTs() {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["owned-nfts", address],
    enabled: !!address,
    queryFn: async (): Promise<OwnedNFTTransfer[]> => {
      const result = await subgraph.request<GetTransfersResult>(
        GET_TRANSFERS,
        {
          wallet: address!.toLowerCase(),
        }
      );

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
