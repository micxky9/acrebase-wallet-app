"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BuyModal from './BuyModal';  
export default function BuyCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-[#151125]/65 p-8 backdrop-blur-3xl">

        <h2 className="text-2xl font-bold text-white">
          Purchase Assets
        </h2>

        <p className="mt-2 text-gray-400">
          Buy ACRE, PLOT, or YARD using USDT.
        </p>

        <Button
          onClick={() => setOpen(true)}
          className="
          mt-6
          h-12
          rounded-xl
          bg-linear-to-r
          from-violet-600
          to-purple-500
          px-8
          font-semibold
          text-white
          "
        >
          Buy NFT
        </Button>

      </div>

      <BuyModal
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}