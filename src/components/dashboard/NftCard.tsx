"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type NftCardProps = {
  name: string;
  description: string;
  balance: number;
  image: string;
};

export default function NftCard({
  name,
  description,
  balance,
  image,
}: NftCardProps) {
  return (
    <Card className="group rounded-3xl border border-white/10 bg-[#151125]/65 p-6 backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30">

      <div className="flex items-center gap-4">

        <Avatar className="h-14 w-14 rounded-2xl">
          <AvatarImage src={image} />
          <AvatarFallback className="bg-violet-600 text-white font-bold">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">
            {name}
          </h3>

          <p className="text-sm text-gray-400">
            {description}
          </p>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <span className="text-sm text-gray-500">
          Owned
        </span>

        <span className="text-2xl font-bold text-white">
          {balance}
        </span>

      </div>

    </Card>
  );
}