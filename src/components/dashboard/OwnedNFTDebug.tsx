"use client";

import { useOwnedNFTs } from "@/hooks/useOwnedNFTs";

export default function OwnedNFTDebug() {
  const { nfts } = useOwnedNFTs();
console.log(nfts)
  return (
   <h1>hi there</h1>
  );
}