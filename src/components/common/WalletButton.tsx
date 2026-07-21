"use client";

import { useWallet } from "@/hooks/usewallet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function WalletButton() {
  const router = useRouter();
  const { account, connect, disconnect } = useWallet();

 const handleConnect = async () => {
console.log("Connectors:", connect.connectors);
  const injectedConnector = connect.connectors.find(
    (connector) => connector.id === "injected"
  );

  if (!injectedConnector) {
    console.error("Injected connector not found.");
    return;
  }

  try {
    await connect.connectAsync({
      connector: injectedConnector,
    });

    console.log("Connected successfully.");
  } catch (error) {
    console.error(error);
  }
};  useEffect(() => {
  if (account.isConnected) {
    router.push("/dashboard");
  }
}, [account.isConnected, router]);

  if (account.isConnected) {
    return (
<Button
  onClick={() => disconnect.disconnect()}
  variant="destructive"
  className="h-14 w-full rounded-2xl text-base  "
>
  Disconnect Wallet
</Button>
    );
  }

  return (
   <Button
  onClick={handleConnect}
  className="h-14 w-full border-0 rounded-2xl bg-linear-to-r from-violet-600 via-violet-500 to-purple-500 text-base font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-purple-400"
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

  Connect Wallet
</div>
</Button>
  );
}