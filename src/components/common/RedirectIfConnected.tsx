"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function RedirectIfConnected() {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.replace("/dashboard");
    }
  }, [isConnected, router]);

  return null;
}
