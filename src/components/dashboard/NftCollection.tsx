"use client";

import NftCard from "./NftCard";

import { useTokenBalances } from "@/hooks/useTokenBalances";

export default function NftCollection() {
  const { balances, isLoading } = useTokenBalances();

  return (
    <section className="space-y-5">

      <div>
        <h2 className="text-2xl font-bold text-white">
          NFT Collection
        </h2>

        <p className="text-gray-400">
          Assets available in your wallet.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <NftCard
          name="USDT"
          description="Payment Token"
          balance={
            isLoading
              ? "Loading..."
               : balances.usdt.toString()
          }
          image="/tokens/usdt.png"
        />

        <NftCard
          name="ACRE"
          description="Digital Land Asset"
          balance={
            isLoading
              ? "Loading..."
              : balances.acre.toString()
          }
          image="/tokens/acre.png"
        />

        <NftCard
          name="PLOT"
          description="Virtual Plot NFT"
          balance={
            isLoading
              ? "Loading..."
              : balances.plot.toString()
          }
          image="/tokens/plot.png"
        />

        <NftCard
          name="YARD"
          description="Premium Yard NFT"
          balance={
            isLoading
              ? "Loading..."
              : balances.yard.toString()
          }
          image="/tokens/yard.png"
        />

      </div>

    </section>
  );
}