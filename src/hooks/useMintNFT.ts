"use client";

import { useWriteContract } from "wagmi";


export function useMintNFT() {

  const {
    writeContract,
    isPending,
    error,
  } = useWriteContract();



  function mintNFT({
    contractAddress,
    abi,
    quantity,
  }: {
    contractAddress: `0x${string}`;
    abi: readonly unknown[];
    quantity: number;
  }) {


    writeContract({
      address: contractAddress,
      abi,
      functionName: "mint",
      args: [
        BigInt(quantity),
        BigInt(0),
        0,
      ],
    });

  }



  return {
    mintNFT,
    isPending,
    error,
  };

}