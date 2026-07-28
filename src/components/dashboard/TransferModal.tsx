"use client";
import { CONTRACTS } from "@/constants/contracts";
import { useState } from "react";
import { useForm } from "react-hook-form";import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useVerifiedNFTs } from "@/hooks/useVerifiedNFTs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  recipient: z
    .string()
    .startsWith("0x"),

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
  const { verifiedNFTs, isLoading } = useVerifiedNFTs();
  const groupedNFTs = {
  ACRE: verifiedNFTs.filter(
    (nft) =>
      nft.nftAddress.toLowerCase() ===
      CONTRACTS.ACRE.toLowerCase()
  ),

  PLOT: verifiedNFTs.filter(
    (nft) =>
      nft.nftAddress.toLowerCase() ===
      CONTRACTS.PLOT.toLowerCase()
  ),

  YARD: verifiedNFTs.filter(
    (nft) =>
      nft.nftAddress.toLowerCase() ===
      CONTRACTS.YARD.toLowerCase()
  ),
};
 
  function getCollectionName(address: string) {
  switch (address.toLowerCase()) {
    case CONTRACTS.ACRE.toLowerCase():
      return "ACRE";

    case CONTRACTS.PLOT.toLowerCase():
      return "PLOT";

    case CONTRACTS.YARD.toLowerCase():
      return "YARD";

    default:
      return "UNKNOWN";
  }
}

 const {
  register,
  handleSubmit,
  watch,
  setValue,
} = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: {
    recipient: "",
    tokenIds: [],
  },
});
 const selectedTokenIds = watch("tokenIds");

 const [selectedCollection, setSelectedCollection] =
  useState<"ACRE" | "PLOT" | "YARD" | null>(null);

const currentNFTs =
  selectedCollection
    ? groupedNFTs[selectedCollection]
    : [];
 const onSubmit = (values: FormValues) => {
  console.log("Recipient:", values.recipient);
  console.log("Selected NFTs:", values.tokenIds);
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Transfer NFT
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <Input
            placeholder="Recipient Address"
            {...register("recipient")}
          />

         <div className="space-y-4">

  <p className="text-sm font-medium text-gray-300">
    Select Collection
  </p>

  <div className="grid grid-cols-3 gap-3">

    <Button
      type="button"
      variant={selectedCollection === "ACRE" ? "default" : "outline"}
      onClick={() => {
        setSelectedCollection("ACRE");
        setValue("tokenIds", []);
      }}
    >
      ACRE
      <span className="ml-2 text-xs">
        ({groupedNFTs.ACRE.length})
      </span>
    </Button>

    <Button
      type="button"
      variant={selectedCollection === "PLOT" ? "default" : "outline"}
      onClick={() => {
        setSelectedCollection("PLOT");
        setValue("tokenIds", []);
      }}
    >
      PLOT
      <span className="ml-2 text-xs">
        ({groupedNFTs.PLOT.length})
      </span>
    </Button>

    <Button
      type="button"
      variant={selectedCollection === "YARD" ? "default" : "outline"}
      onClick={() => {
        setSelectedCollection("YARD");
        setValue("tokenIds", []);
      }}
    >
      YARD
      <span className="ml-2 text-xs">
        ({groupedNFTs.YARD.length})
      </span>
    </Button>

  </div>

  {selectedCollection && (
    <div className="space-y-2 rounded-xl border p-3 max-h-52 overflow-y-auto">

      <p className="text-sm font-semibold">
        {selectedCollection} NFTs
      </p>

      {currentNFTs.length === 0 ? (
        <p className="text-sm text-gray-400">
          You don't own any {selectedCollection} NFTs.
        </p>
      ) : (
        currentNFTs.map((nft) => (
          <label
            key={nft.tokenId}
            className="flex items-center justify-between rounded-lg border p-3 cursor-pointer"
          >
            <div>
              <p className="font-medium">
                Token #{nft.tokenId}
              </p>
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

</div>          <Button
            type="submit"
            className="w-full"
          >
            Send NFT
          </Button>

        </form>

      </DialogContent>
    </Dialog>
  );
}