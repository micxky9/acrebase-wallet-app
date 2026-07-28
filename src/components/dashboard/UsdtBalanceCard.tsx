import { Card } from "@/components/ui/card";

type TokenCardProps = {
  symbol: string;
  name: string;
  balance: string;
  color: string;
};

export default function TokenCard({
  symbol,
  name,
  balance,
  color,
}: TokenCardProps) {

  return (
    <Card className="rounded-3xl border border-white/10 bg-[#151125]/65 p-6 backdrop-blur-3xl">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-400">
            {name}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {balance}
          </h3>
        </div>


        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {symbol}
        </div>

      </div>

    </Card>
  );
}