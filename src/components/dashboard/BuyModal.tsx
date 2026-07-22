"use client";

import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useApproveUSDT } from "@/hooks/useApproveUSDT";
import { useMintNFT } from "@/hooks/useMintNFT";

import { CONTRACTS } from "@/constants/contracts";
import { NFTPrices } from "@/constants/nftPrices";

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


  const {
    approveUSDT,
    hash,
    isPending,
    isConfirming,
    isSuccess: approvalSuccess,
    error: approvalError,
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
    formState: { errors },
  } = useForm<BuyFormValues>({
    resolver: zodResolver(buySchema) as unknown as Resolver<BuyFormValues>,
    defaultValues: {
      asset: "",
      quantity: 1,
    },
  });




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




    const price =
      NFTPrices[
        data.asset as keyof typeof NFTPrices
      ];



    const totalUSDT =
      BigInt(price * data.quantity) *
      BigInt(10 ** 18);





    console.log({
      nft: data.asset,
      quantity: data.quantity,
      totalUSDT,
      spender,
    });





    const txHash = await approveUSDT({
      spender,
      amount: totalUSDT,
    });



    console.log(
      "Approve transaction hash:",
      txHash
    );


  };




  console.log(
    "Approval hash:",
    hash
  );


  console.log(
    "Approval success:",
    approvalSuccess
  );


  console.log(
    "Approval error:",
    approvalError
  );





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




              <SelectContent>


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
                ? "Confirm in Wallet..."
                : isConfirming
                ? "Confirming..."
                : "Buy NFT"
            }


          </Button>




        </form>


      </DialogContent>


    </Dialog>

  );

}