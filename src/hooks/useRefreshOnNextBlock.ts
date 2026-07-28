"use client";

import { usePublicClient } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

export function useRefreshOnNextBlock() {
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();

  async function refresh() {
    // Wait for ONE new block after the transaction
    await publicClient.waitForBlock();

    // Refresh everything related to balances
    await queryClient.invalidateQueries({
      queryKey: ["token-balances"],
    });

    // Refresh owned NFTs
    await queryClient.invalidateQueries({
      queryKey: ["owned-nfts"],
    });
  }

  return { refresh };
}