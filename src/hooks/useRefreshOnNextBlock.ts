"use client";

import { usePublicClient } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

export function useRefreshOnNextBlock() {
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();

  async function refresh() {
    await publicClient.waitForBlock();

    await queryClient.invalidateQueries({
      queryKey: ["token-balances"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["owned-nfts"],
    });
  }

  return { refresh };
}