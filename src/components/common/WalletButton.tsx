"use client";

import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/usewallet";

export default function WalletButton() {
  const { account, connect } = useWallet();

  const handleConnect = () => {
    const connector =
      connect.connectors.find((c) => c.type === "injected") ??
      connect.connectors[0];

    if (!connector) {
      console.error("No wallet connector found.");
      return;
    }

    connect.connect({
      connector,
    });
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={account.isConnected || connect.isPending}
      className="
        h-14 w-full 
        rounded-2xl 
        border-0
        bg-gradient-to-r 
        from-violet-600 
        via-violet-500 
        to-purple-500
        text-base 
        font-semibold 
        text-white
        shadow-[0_0_40px_rgba(139,92,246,0.35)]
        transition-all 
        duration-300
        hover:from-violet-500
        hover:to-purple-400
        hover:scale-[1.03]
        active:scale-[0.98]
      "
    >
      <div className="flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5M16 12h5m0 0-2-2m2 2-2 2"
          />
        </svg>

        {connect.isPending
          ? "Connecting..."
          : account.isConnected
          ? "Wallet Connected"
          : "Connect Wallet"}
      </div>
    </Button>
  );
}