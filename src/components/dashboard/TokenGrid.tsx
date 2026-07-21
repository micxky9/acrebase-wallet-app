import TokenCard from "./TokenCard";

export default function TokenGrid() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <TokenCard
        symbol="U"
        name="USDT Balance"
        balance="0.00"
        color="#16A34A"
      />

      <TokenCard
        symbol="A"
        name="ACRE Balance"
        balance="0"
        color="#7C3AED"
      />

      <TokenCard
        symbol="P"
        name="PLOT Balance"
        balance="0"
        color="#2563EB"
      />

      <TokenCard
        symbol="Y"
        name="YARD Balance"
        balance="0"
        color="#EA580C"
      />

    </section>
  );
}