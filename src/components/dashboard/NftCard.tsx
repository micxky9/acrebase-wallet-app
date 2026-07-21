"use client";

import TokenCard from "./UsdtBalanceCard";

import { useTokenBalances } from "@/hooks/useTokenBalances";
import { formatToken } from "@/lib/format";

export default function TokenGrid() {
  const { balances, isLoading } = useTokenBalances();

  if (isLoading) {
    return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <TokenCard
          symbol="U"
          name="USDT Balance"
          balance="Loading..."
          color="#16A34A"
        />

        <TokenCard
          symbol="A"
          name="ACRE Balance"
          balance="Loading..."
          color="#7C3AED"
        />

        <TokenCard
          symbol="P"
          name="PLOT Balance"
          balance="Loading..."
          color="#2563EB"
        />

        <TokenCard
          symbol="Y"
          name="YARD Balance"
          balance="Loading..."
          color="#EA580C"
        />
      </section>
    );
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <TokenCard
        symbol="U"
        name="USDT Balance"
        balance={formatToken(BigInt((balances.usdt as unknown as string | number | bigint).toString()), 18)}
        color="#16A34A"
      />

      <TokenCard
        symbol="A"
        name="ACRE Balance"
        balance={balances.acre.toString()}
        color="#7C3AED"
      />

      <TokenCard
        symbol="P"
        name="PLOT Balance"
        balance={balances.plot.toString()}
        color="#2563EB"
      />

      <TokenCard
        symbol="Y"
        name="YARD Balance"
        balance={balances.yard.toString()}
        color="#EA580C"
      />

    </section>
  );
}