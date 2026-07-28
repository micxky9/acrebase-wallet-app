"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { contracts } from "@/lib/contract";


export function useApproveUSDT() {

  const {
    writeContractAsync,
    data: hash,
    isPending,
    error,
  } = useWriteContract();


  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });



  async function approveUSDT({
    spender,
    amount,
  }: {
    spender: `0x${string}`;
    amount: bigint;
  }) {


    const transactionHash = await writeContractAsync({

      address: contracts.usdt.address,

      abi: contracts.usdt.abi,

      functionName: "approve",

      args: [
        spender,
        amount,
      ],

    });


    console.log("Approval transaction hash:", transactionHash);


    return transactionHash;

  }



  return {
    approveUSDT,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };

}