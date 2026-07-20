"use client";

import { useWallet } from "@/hooks/usewallet";

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
      <button
        onClick={() => disconnect.disconnect()}
        className="w-full rounded-2xl bg-red-500 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-red-600"
      >
        Disconnect Wallet
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 py-4 text-base font-semibold text-white shadow-[0_0_35px_rgba(139,92,246,.35)] transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-purple-400 active:scale-[0.98]"
    >
      Connect Wallet
    </button>
  );
}