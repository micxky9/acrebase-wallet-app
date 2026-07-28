"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

export function useMintNFT() {
  const {
    writeContractAsync,
    data: hash,
    isPending,
    error,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });

  async function mintNFT({
    contractAddress,
    abi,
    quantity,
  }: {
    contractAddress: `0x${string}`;
    abi: readonly unknown[];
    quantity: bigint;
  }) {
    const txHash = await writeContractAsync({
      address: contractAddress,
      abi,
      functionName: "mint",
      args: [
        quantity,
        BigInt(0),
        0,
      ],
    });

    return txHash;
  }

  return {
    mintNFT,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}