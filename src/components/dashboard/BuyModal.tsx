"use client";

import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BuyFormValues>({
    resolver: zodResolver(buySchema) as unknown as Resolver<BuyFormValues>,
    defaultValues: {
      asset: "",
      quantity: 1,
    },
  });

 

  const onSubmit = async (data: BuyFormValues): Promise<void> => {
    console.log(data);

    /*
      Next:

      Approve USDT

      Mint NFT

      Refresh balances
    */

    setOpen(false);
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
              value={watch("asset") ?? ""}
              onValueChange={(value) =>
                setValue("asset", value ?? "")
              }
            >
              <SelectTrigger>
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
              {...register("quantity")}
            />

            {errors.quantity && (
              <p className="mt-2 text-sm text-red-400">
                {errors.quantity.message}
              </p>
            )}

          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-violet-600"
          >
            Continue
          </Button>

        </form>

      </DialogContent>
    </Dialog>
  );
}