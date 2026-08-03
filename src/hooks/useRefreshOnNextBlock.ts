"use client";

import { usePublicClient } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

export function useRefreshOnNextBlock() {
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();

  async function refresh() {
    if (!publicClient) return;

    const startingBlock = await publicClient.getBlockNumber();

    await new Promise<void>((resolve) => {
      const unwatch = publicClient.watchBlockNumber({
        onBlockNumber: (blockNumber) => {
          if (blockNumber > startingBlock) {
            unwatch();
            resolve();
          }
        },
      });
    });

    await queryClient.invalidateQueries({
      queryKey: ["token-balances"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["owned-nfts"],
    });
  }

  return { refresh };
}