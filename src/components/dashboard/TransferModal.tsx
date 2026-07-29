"use client";

import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";

import { useVerifiedNFTs } from "@/hooks/useVerifiedNFTs";
import { useTransferNFT } from "@/hooks/useTransferNFT";
import { useTokenBalances } from "@/hooks/useTokenBalances";

import { CONTRACTS } from "@/constants/contracts";

import { acreAbi } from "@/abi/acre";
import { plotAbi } from "@/abi/plot";
import { yardAbi } from "@/abi/yard";

import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  recipient: z
    .string()
    .startsWith("0x", "Invalid wallet address"),

  collection: z.enum([
    "ACRE",
    "PLOT",
    "YARD",
  ]),

  quantity: z
    .number()
    .min(1, "Minimum is 1"),
});
type FormValues = z.infer<typeof schema>;

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function TransferModal({
  open,
  setOpen,
}: Props) {
  const { address } = useAccount();

const { verifiedNFTs } = useVerifiedNFTs();
const { refetch } = useTokenBalances();

const {
  transferNFT,
  isPending,
} = useTransferNFT();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
   defaultValues: {
    recipient: "",
    collection: "ACRE",
    quantity: 1,
},
  });

  const selectedCollection = watch("collection");

const onSubmit = async (
  values: FormValues
) => {

  if (!address) {
    toast.error("Wallet not connected.");
    return;
  }

  let contractAddress: `0x${string}`;
  let abi: readonly unknown[];

  switch (values.collection) {

    case "ACRE":
      contractAddress = CONTRACTS.ACRE;
      abi = acreAbi;
      break;

    case "PLOT":
      contractAddress = CONTRACTS.PLOT;
      abi = plotAbi;
      break;

    case "YARD":
      contractAddress = CONTRACTS.YARD;
      abi = yardAbi;
      break;

  }

const ownedNFTs = verifiedNFTs.filter(
  nft =>
    nft.nftAddress.toLowerCase() ===
    contractAddress.toLowerCase()
);
;
if (
  values.quantity >
  ownedNFTs.length
) {
  toast.error(
    `You only own ${ownedNFTs.length} ${values.collection} NFT(s).`
  );
  return;
}
const tokenIds = ownedNFTs
  .slice(0, values.quantity)
  .map(
    nft => BigInt(nft.tokenId)
  );

  if (tokenIds.length === 0) {
    toast.error(
      `You don't own any ${values.collection} NFTs.`
    );
    return;
  }

  try {

    toast.loading(
      "Sending NFT...",
      {
        id: "transfer",
      }
    );

    await transferNFT({
  contractAddress,
  abi,
  from: address,
  to: values.recipient as `0x${string}`,
  tokenIds,
});
await refetch();

toast.success(
  "NFT transferred successfully!",
  {
    id: "transfer",
  }
);

setOpen(false);
  } catch {

    toast.error(
      "Transfer failed.",
      {
        id: "transfer",
      }
    );

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
            Transfer NFT
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <Input
            placeholder="Recipient Address"
            {...register("recipient")}
          />

          {errors.recipient && (
            <p className="text-sm text-red-500">
              {errors.recipient.message}
            </p>
          )}

          <div className="space-y-3">

            <p className="text-sm font-medium text-gray-300">
              Select NFT Collection
            </p>

            <div className="grid grid-cols-3 gap-3">

              <Button
  type="button"
  variant="outline"
  onClick={() => {
    setValue("collection", "ACRE");
  }}
  className={`h-12 rounded-xl border transition-all duration-200 ${
    watch("collection") === "ACRE"
      ? "border-violet-500 bg-violet-500/15 text-violet-300"
      : "border-white/20 bg-transparent text-white hover:border-violet-400"
  }`}
>
  ACRE
</Button>

           <Button
  type="button"
  variant="outline"
  onClick={() => {
    setValue("collection", "PLOT");
  }}
  className={`h-12 rounded-xl border transition-all duration-200 ${
    watch("collection") === "PLOT"
      ? "border-violet-500 bg-violet-500/15 text-violet-300"
      : "border-white/20 bg-transparent text-white hover:border-violet-400"
  }`}
>
  PLOT
</Button>

            <Button
  type="button"
  variant="outline"
  onClick={() => {
    setValue("collection", "YARD");
  }}
  className={`h-12 rounded-xl border transition-all duration-200 ${
    watch("collection") === "YARD"
      ? "border-violet-500 bg-violet-500/15 text-violet-300"
      : "border-white/20 bg-transparent text-white hover:border-violet-400"
  }`}
>
  YARD
</Button>

            </div>

          </div>
          <div className="space-y-2">

  <p className="text-sm font-medium text-gray-300">
    Quantity
  </p>

  <Input
    type="number"
    min={1}
    {...register("quantity", {
      valueAsNumber: true,
    })}
  />

  {errors.quantity && (
    <p className="text-sm text-red-500">
      {errors.quantity.message}
    </p>
  )}

</div>
          <Button
  type="submit"
  disabled={isPending}
  className="w-full rounded-xl bg-violet-600 hover:bg-violet-900 hover:translate-y-[-px]"
>
  {isPending
    ? "Sending..."
    : "Send NFT"}
</Button>

        </form>

      </DialogContent>
    </Dialog>
  );
}