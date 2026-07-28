"use client";

import { useAccount, useReadContracts } from "wagmi";

import { useOwnedNFTs } from "./useOwnedNFTs";

import { acreAbi } from "@/abi/acre";
import { plotAbi } from "@/abi/plot";
import { yardAbi } from "@/abi/yard";

import { CONTRACTS } from "@/constants/contracts";

export function useVerifiedNFTs() {
  const { address } = useAccount();

  const { nfts, isLoading: transfersLoading } = useOwnedNFTs();

  const contracts = nfts.map((nft) => ({
    address: nft.nftAddress as `0x${string}`,
    abi:
      nft.nftAddress.toLowerCase() === CONTRACTS.ACRE.toLowerCase()
        ? acreAbi
        : nft.nftAddress.toLowerCase() === CONTRACTS.PLOT.toLowerCase()
        ? plotAbi
        : yardAbi,
    functionName: "ownerOf",
    args: [BigInt(nft.tokenId)],
  }));

  const {
    data: owners,
    isLoading: ownersLoading,
  } = useReadContracts({
    contracts,
    query: {
      enabled: contracts.length > 0,
    },
  });

  const verifiedNFTs =
    owners?.flatMap((owner, index) => {
      if (
        owner.status === "success" &&
        typeof owner.result === "string" &&
        owner.result.toLowerCase() === address?.toLowerCase()
      ) {
        return nfts[index];
      }

      return [];
    }) ?? [];

  return {
    verifiedNFTs,
    isLoading: transfersLoading || ownersLoading,
  };
}