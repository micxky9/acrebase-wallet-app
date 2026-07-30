"use client";

import Image from "next/image";
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

  tokenIds: z
    .array(z.string())
    .min(1, "Select at least one NFT"),
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
  collection: undefined,
  tokenIds: [],
},
  });

  const selectedCollection = watch("collection");
  const selectedTokenIds = watch("tokenIds");

  let contractAddress: `0x${string}`;
  let abi: readonly unknown[];

  switch (selectedCollection) {
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

function getCollectionIcon(collection: string) {
  switch (collection) {
    case "ACRE":
      return "/tokens/acre.png";

    case "PLOT":
      return "/tokens/plot.png";

    case "YARD":
      return "/tokens/yard.png";

    default:
      return "/tokens/acre.png";
  }
}

const collectionNFTs =
  selectedCollection
    ? verifiedNFTs.filter(
        nft =>
          nft.nftAddress.toLowerCase() ===
          (
            selectedCollection === "ACRE"
              ? CONTRACTS.ACRE
              : selectedCollection === "PLOT"
              ? CONTRACTS.PLOT
              : CONTRACTS.YARD
          ).toLowerCase()
      )
    : [];
  const onSubmit = async (
    values: FormValues
  ) => {

    if (!address) {
      toast.error("Wallet not connected.");
      return;
    }

    try {

      toast.loading("Sending NFT...", {
        id: "transfer",
      });

      await transferNFT({
        contractAddress,
        abi,
        from: address,
        to: values.recipient as `0x${string}`,
        tokenIds: values.tokenIds.map(
          (id) => BigInt(id)
        ),
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

      <DialogContent
  className="
    max-w-xl
    rounded-3xl
    border
    border-white/10
    bg-[#151125]
    text-white
  "
>

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

          <div className="space-y-4">

  <p className="text-sm font-medium text-gray-300">
    Select NFT Collection
  </p>

  <div className="grid grid-cols-3 gap-3">

    <Button
      type="button"
      variant="outline"
      onClick={() => {
        setValue("collection", "ACRE");
        setValue("tokenIds", []);
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
        setValue("tokenIds", []);
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
        setValue("tokenIds", []);
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

  {selectedCollection && (

    <div
      className="
        max-h-72
        overflow-y-auto
        space-y-3
        rounded-xl
        border
        border-white/10
        p-3
        pr-2
      "
    >

      {collectionNFTs.length === 0 ? (

        <p className="text-sm text-gray-400">
          You don't own any {selectedCollection} NFTs.
        </p>

      ) : (

        collectionNFTs.map((nft) => (

          <label
            key={nft.tokenId}
            className={`
              flex
              items-center
              justify-between
              rounded-2xl
              border
              p-4
              cursor-pointer
              transition-all
              duration-200
              ${
                selectedTokenIds.includes(nft.tokenId)
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-white/10 bg-[#1a1530] hover:border-violet-500"
              }
            `}
          >

            <div className="flex items-center gap-4">

              <Image
                src={getCollectionIcon(selectedCollection)}
                alt={selectedCollection}
                width={52}
                height={52}
                className="rounded-full"
              />

              <div>

                <p className="font-semibold text-white">
                  {selectedCollection} NFT
                </p>

                <p className="text-sm text-gray-400">
                  Token #{nft.tokenId}
                </p>

              </div>

            </div>

            <input
              type="checkbox"
              checked={selectedTokenIds.includes(nft.tokenId)}
              onChange={(e) => {

                if (e.target.checked) {

                  setValue("tokenIds", [
                    ...selectedTokenIds,
                    nft.tokenId,
                  ]);

                } else {

                  setValue(
                    "tokenIds",
                    selectedTokenIds.filter(
                      (id) => id !== nft.tokenId
                    )
                  );

                }

              }}
            />

          </label>

        ))

      )}

    </div>

  )}

  {errors.tokenIds && (
    <p className="text-sm text-red-500">
      {errors.tokenIds.message}
    </p>
  )}

</div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-violet-600 hover:bg-violet-900"
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