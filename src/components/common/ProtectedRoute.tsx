"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  return <>{children}</>;
}