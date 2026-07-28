"use client";

import { useWallet } from "@/hooks/usewallet";
import { Button } from "@/components/ui/button";
import { baseSepolia } from "wagmi/chains";

export default function ProtectedRoute(
  {
  children,
}: {
  children: React.ReactNode;
}) {
  const { account, isWrongNetwork, switchChain } = useWallet();

  if (!account.isConnected) {
    return null; // or redirect to "/"
  }

  if (isWrongNetwork) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-2xl bg-[#151125] p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Wrong Network
          </h2>

          <p className="mb-6 text-gray-400">
            Please switch to Base Sepolia.
          </p>

          <Button
          className="p-5 bg-blue-900 hover:bg-blue-950 hover:translate-y-[-6px]"
            onClick={() =>
              switchChain.switchChain({
                chainId: baseSepolia.id,
              })
            }
          >
            Switch to Base Sepolia
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}