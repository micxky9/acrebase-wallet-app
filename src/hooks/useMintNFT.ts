"use client";

import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "@/lib/wagmi";

export function useMintNFT() {
  const { writeContractAsync, isPending } = useWriteContract();

  async function mintNFT({
    abi,
    contractAddress,
    quantity,
    paymentMethod,
  }: {
    abi: readonly unknown[];
    contractAddress: `0x${string}`;
    quantity: bigint;
    paymentMethod: `0x${string}`;
  }) {
    const hash = await writeContractAsync({
      abi,
      address: contractAddress,
      functionName: "mint",
      args: [
        quantity,
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        paymentMethod,
      ],
    });

    await waitForTransactionReceipt(config, {
      hash,
    });

    return hash;
  }

  return {
    mintNFT,
    isPending,
  };
}