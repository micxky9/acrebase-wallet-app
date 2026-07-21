import NftCard from "./NftCard";

export default function NftCollection() {
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <NftCard
          name="ACRE"
          description="Digital Land Asset"
          balance={0}
          image="/tokens/acre.png"
        />

        <NftCard
          name="PLOT"
          description="Virtual Plot NFT"
          balance={0}
          image="/tokens/plot.png"
        />

        <NftCard
          name="YARD"
          description="Premium Yard NFT"
          balance={0}
          image="/tokens/yard.png"
        />

      </div>

    </section>
  );
}