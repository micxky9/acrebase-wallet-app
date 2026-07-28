"use client";

import { useAccount, useReadContracts } from "wagmi";
import { contracts } from "@/lib/contract";

export function useTokenBalances() {
  
  const { address, } = useAccount();



  const { data, isLoading, error, refetch } = useReadContracts({
    contracts: [
      {
        ...contracts.usdt,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
      },
      {
        ...contracts.acre,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
      },
      {
        ...contracts.plot,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
      },
      {
        ...contracts.yard,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
      },
    ],
    query: {
      enabled: Boolean(address),
    },
  });

  return {
    balances: {
      usdt: data?.[0]?.result ?? 0n,
      acre: data?.[1]?.result ?? 0n,
      plot: data?.[2]?.result ?? 0n,
      yard: data?.[3]?.result ?? 0n,
    },
    isLoading,
    error,
    refetch,
  };
}