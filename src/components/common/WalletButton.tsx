"use client";

import { useWallet } from "@/hooks/usewallet";
import { Button } from "@/components/ui/button";

export default function WalletButton() {
  const { account, connect, disconnect } = useWallet();

  const handleConnect = () => {
    const injectedConnector = connect.connectors.find(
      (connector) => connector.name === "Injected"
    );

    if (!injectedConnector) return;

    connect.connect({
      connector: injectedConnector,
    });
  };

  if (account.isConnected) {
    return (
<Button
  onClick={() => disconnect.disconnect()}
  variant="destructive"
  className="h-14 w-full rounded-2xl text-base"
>
  Disconnect Wallet
</Button>
    );
  }

  return (
   <Button
  onClick={handleConnect}
  className="h-14 w-full rounded-2xl bg-linear-to-r from-violet-600 via-violet-500 to-purple-500 text-base font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-purple-400"
>
  Connect Wallet
</Button>
  );
}