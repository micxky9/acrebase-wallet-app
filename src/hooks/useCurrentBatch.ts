"use client";

import { useReadContract } from "wagmi";

type BatchData = {
  quantity: bigint;
  price: bigint;
  active: boolean;
  batch: bigint;
  startIndex: bigint;
};

export function useCurrentBatch(
  address: `0x${string}`,
  abi: readonly unknown[]
) {
  const { data, isLoading, error, refetch } = useReadContract({
    address,
    abi,
    functionName: "_currentBatch",
  });

  return {
    batch: data as BatchData | undefined,
    isLoading,
    error,
    refetch,
  };
}