"use client";

import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export default function DashboardHeader() {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();

  const [mounted] = useState<boolean>(() => typeof window !== "undefined");

  const shortenAddress = (address?: string) => {
    if (!address) return "Not Connected";

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

const router = useRouter();

useEffect(() => {
  if(!address){
    router.replace("");
  }
}, [address, router]);


  return (
    <header className="rounded-3xl border border-white/10 bg-[#151125]/65 p-8 backdrop-blur-3xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your digital assets and transactions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          <Badge
            variant="secondary"
            className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-violet-300"
          >
            {mounted
              ? shortenAddress(address)
              : "Loading..."}
          </Badge>

          <Badge
            variant="secondary"
            className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-emerald-300"
          >
            {mounted
              ? chain?.name ?? "Unknown Network"
              : "Loading..."}
          </Badge>

          <Button
            variant="destructive"
            onClick={() => disconnect()}
            className="
              rounded-full
              border
              border-red-500/30
              bg-red-500/10
              px-5
              py-2
              text-sm
              font-medium
              text-red-400
              transition-all
              duration-300
              hover:border-red-500/60
              hover:bg-red-500/20
              hover:text-red-300
              hover:shadow-lg
              hover:shadow-red-500/20
            "
          >
            Disconnect
          </Button>

        </div>
      </div>
    </header>
  );
}