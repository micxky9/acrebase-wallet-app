"use client";

import { useWallet } from "@/hooks/usewallet";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/common/ProtectedRoute";


export default function DisconnectButton() {
  const { disconnect } = useWallet();

  return (
    <ProtectedRoute>
    <Button onClick={() => disconnect.disconnect()}>
      Disconnect Wallet
    </Button>
     </ ProtectedRoute >
  );
}