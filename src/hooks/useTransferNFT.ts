"use client";

import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";

import { config } from "@/lib/wagmi";

export function useTransferNFT() {
  const {
    writeContractAsync,
    isPending,
    error,
  } = useWriteContract();

  async function transferNFT({
    contractAddress,
    abi,
    from,
    to,
    tokenIds,
  }: {
    contractAddress: `0x${string}`;
    abi: readonly unknown[];
    from: `0x${string}`;
    to: `0x${string}`;
    tokenIds: bigint[];
  }) {
    const hash = await writeContractAsync({
      address: contractAddress,
      abi,
      functionName: "transferBulkFrom",
      args: [
        from,
        to,
        tokenIds,
      ],
    });

    await waitForTransactionReceipt(config, {
      hash,
    });

    return hash;
  }

  return {
    transferNFT,
    isPending,
    error,
  };
}