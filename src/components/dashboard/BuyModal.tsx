"use client";

import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useApproveUSDT } from "@/hooks/useApproveUSDT";
import { useMintNFT } from "@/hooks/useMintNFT";

import { CONTRACTS } from "@/constants/contracts";
import { useCurrentBatch } from "@/hooks/useCurrentBatch";
import { useTokenBalances } from "@/hooks/useTokenBalances";


import { acreAbi } from "@/abi/acre";
import { plotAbi } from "@/abi/plot";
import { yardAbi } from "@/abi/yard";
import { toast } from "sonner";

import {
  buySchema,
  BuyFormValues,
} from "@/schemas/buy.schema";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};


export default function BuyModal({
  open,
  setOpen,
}: Props) {

const { refetch } = useTokenBalances();
  const {
    approveUSDT,
    isPending,
    isConfirming,
   
  } = useApproveUSDT();



  const {
    mintNFT,
    isPending: mintPending,
  } = useMintNFT();







  const {
    handleSubmit,
    setValue,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm<BuyFormValues>({
    resolver: zodResolver(buySchema) as unknown as Resolver<BuyFormValues>,
    defaultValues: {
      asset: "",
      quantity: 1,
    },
  });

const selectedAsset = watch("asset");

const selectedContract =
  selectedAsset === "ACRE"
    ? CONTRACTS.ACRE
    : selectedAsset === "PLOT"
    ? CONTRACTS.PLOT
    : selectedAsset === "YARD"
    ? CONTRACTS.YARD
    : undefined;

const selectedAbi =
  selectedAsset === "ACRE"
    ? acreAbi
    : selectedAsset === "PLOT"
    ? plotAbi
    : selectedAsset === "YARD"
    ? yardAbi
    : undefined;

const { batch } =
  useCurrentBatch(
    selectedContract as `0x${string}`,
    selectedAbi ?? []
  );
  const currentBatch = batch
  ? {
      quantity: batch[0],
      price: batch[1],
      active: batch[2],
      batchId: batch[3],
      startIndex: batch[4],
    }
  : null;
console.log(batch);



  const onSubmit = async (
    data: BuyFormValues
  ) => {


    let spender: `0x${string}`;



    if (data.asset === "ACRE") {

      spender = CONTRACTS.ACRE as `0x${string}`;

    } else if (data.asset === "PLOT") {

      spender = CONTRACTS.PLOT as `0x${string}`;

    } else if (data.asset === "YARD") {

      spender = CONTRACTS.YARD as `0x${string}`;

    } else {

      return;

    }




    if (!batch) {
  toast.error("Unable to fetch NFT price.");
  return;
}

const price = batch[1];

const totalUSDT =
  price * BigInt(data.quantity);




try {

toast.loading("Waiting for USDT approval...", {
  id: "buy",
});

    await approveUSDT({
  spender,
  amount: totalUSDT,
});

toast.loading("USDT approved. Waiting for wallet confirmation...", {
  id: "buy",
});
let nftAbi;


if (data.asset === "ACRE") {
  nftAbi = acreAbi;
}

else if (data.asset === "PLOT") {
  nftAbi = plotAbi;
}

else if (data.asset === "YARD") {
  nftAbi = yardAbi;
}

else {
  return;
}
toast.loading("Please confirm the mint transaction in your wallet...", {
  id: "buy",
});

const mintHash = await mintNFT({
  abi: nftAbi,
  contractAddress: spender,
  quantity: BigInt(data.quantity),
});


console.log("Mint Transaction:", mintHash);

toast.loading("Updating balances...", {
  id: "buy",
});

await refetch();

toast.success("NFT purchased successfully!", {
  id: "buy",
});

reset();
setOpen(false);



  } catch (error) {
    toast.error("Transaction failed!", {
      id: 'buy'
    })
  // toast.error(
  //   error instanceof Error
  //     ? error.message
  //     : "Transaction failed.",
  //   {
  //     id: "buy",
  //   }
  // );

}


  };







  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogContent className="rounded-3xl border-white/10 bg-[#151125] text-white">


        <DialogHeader>

          <DialogTitle>
            Buy NFT
          </DialogTitle>

        </DialogHeader>




        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >



          <div>

            <Select
              value={watch("asset")}
              onValueChange={(value) =>
                
                setValue("asset", value ?? "")
              }
            >


              <SelectTrigger className="w-full">

                <SelectValue placeholder="Select NFT" />

              </SelectTrigger>




              <SelectContent className="absolute top-30 left-[-185]">


                <SelectItem value="ACRE">
                  ACRE
                </SelectItem>


                <SelectItem value="PLOT">
                  PLOT
                </SelectItem>


                <SelectItem value="YARD">
                  YARD
                </SelectItem>


              </SelectContent>


            </Select>



            {errors.asset && (

              <p className="mt-2 text-sm text-red-400">
                {errors.asset.message}
              </p>

            )}

          </div>





          <div>
{batch && (
  <p className="text-sm text-gray-400">
Price per NFT: {Number(batch[1]) / 1e18} USDT
  </p>
)}
            <Input

              type="number"

              placeholder="Quantity"

              {...register(
                "quantity",
                {
                  valueAsNumber: true,
                }
              )}

            />



            {errors.quantity && (

              <p className="mt-2 text-sm text-red-400">
                {errors.quantity.message}
              </p>

            )}


          </div>





          <Button

            type="submit"

            disabled={
              isPending ||
              isConfirming ||
              mintPending
            }

            className="w-full rounded-xl bg-violet-600"

          >
{
  isPending
    ? "Approving..."
    : isConfirming
    ? "Waiting..."
    : mintPending
    ? "Minting..."
    : "Buy NFT"
}

          </Button>




        </form>


      </DialogContent>


    </Dialog>

  );

}