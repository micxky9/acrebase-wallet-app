"use client";

import { useAccount, useReadContracts } from "wagmi";
import { contracts } from "@/lib/contract";

export function useTokenBalances() {
  const { address } = useAccount();

  const { data, isLoading, refetch } = useReadContracts({
    allowFailure: false,
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
      enabled: !!address,
    },
  });

  return {
    balances: {
      usdt: data?.[0] ?? BigInt(0),
      acre: data?.[1] ?? BigInt(0),
      plot: data?.[2] ?? BigInt(0),
      yard: data?.[3] ?? BigInt(0),
    },
    isLoading,
    refetch,
  };
}