"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

import { baseSepolia } from "wagmi/chains";

export function useWallet() {
  const account = useAccount();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const switchChain = useSwitchChain();

  const isWrongNetwork =
    account.chainId !== undefined &&
    account.chainId !== baseSepolia.id;

  return {
    account,
    connect,
    disconnect,
    switchChain,
    isWrongNetwork,
  };
}