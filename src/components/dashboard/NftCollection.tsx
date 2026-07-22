"use client";

import NftCard from "./NftCard";

import { useTokenBalances } from "@/hooks/useTokenBalances";
import { formatToken } from "@/lib/format";

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
      : formatToken(balances.usdt, 18, "USDT")
  }
  image="/tokens/usdt.png"
/>

        <NftCard
          name="ACRE"
          description="Digital Land Asset"
         balance={
  isLoading
    ? "Loading..."
    : formatToken(typeof balances.acre === "bigint" ? balances.acre : 0n, 18, "ACRE")
}
          image="/tokens/acre.png"
        />

          <NftCard
            name="PLOT"
            description="Virtual Plot NFT"
           balance={
    isLoading
      ? "Loading..."
      : formatToken(typeof balances.plot === "bigint" ? balances.plot : 0n, 18, "PLOT")
  }
            image="/tokens/plot.png"
          />

        <NftCard
          name="YARD"
          description="Premium Yard NFT"
         balance={
  isLoading
    ? "Loading..."
    : formatToken(typeof balances.yard === "bigint" ? balances.yard : 0n, 18, "YARD")
}
          image="/tokens/yard.png"
        />

      </div>

    </section>
  );
}