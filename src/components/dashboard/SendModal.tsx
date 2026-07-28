// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import { useOwnedNFTs } from "@/hooks/useOwnedNFTs";
// import { useTransferNFT } from "@/hooks/useTransferNFT";

// import { CONTRACTS } from "@/constants/contracts";

// import { acreAbi } from "@/abi/acre";
// import { plotAbi } from "@/abi/plot";
// import { yardAbi } from "@/abi/yard";

// import {
//   sendSchema,
//   SendFormValues,
// } from "@/schemas/send.schema";

// import { toast } from "sonner";

// type Props = {
//   open: boolean;
//   setOpen: (value: boolean) => void;
// };

// export default function SendModal({
//   open,
//   setOpen,
// }: Props) {
//   const {
//     register,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<SendFormValues>({
//     resolver: zodResolver(sendSchema),
//     defaultValues: {
//       asset: "",
//       recipient: "",
//       tokenIds: [],
//     },
//   });

//   const selectedAsset = watch("asset");

//   const {
//     data: ownedTokenIds = [],
//     isLoading,
//   } = useOwnedNFTs(
//     selectedAsset as "ACRE" | "PLOT" | "YARD"
//   );

//   const {
//     transferNFT,
//     isPending,
//   } = useTransferNFT();

//   async function onSubmit(
//     data: SendFormValues
//   ) {
//   }

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={setOpen}
//     >
//       <DialogContent className="rounded-3xl border-white/10 bg-[#151125] text-white">

//         <DialogHeader>
//           <DialogTitle>
//             Send NFT
//           </DialogTitle>
//         </DialogHeader>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-5"
//         >

//           {/* NFT Collection */}

//           <Select
//             value={selectedAsset}
//             onValueChange={(value) =>
//               setValue("asset", value)
//             }
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select NFT Collection" />
//             </SelectTrigger>

//             <SelectContent>

//               <SelectItem value="ACRE">
//                 ACRE
//               </SelectItem>

//               <SelectItem value="PLOT">
//                 PLOT
//               </SelectItem>

//               <SelectItem value="YARD">
//                 YARD
//               </SelectItem>

//             </SelectContent>
//           </Select>

//           {errors.asset && (
//             <p className="text-sm text-red-400">
//               {errors.asset.message}
//             </p>
//           )}

//           {/* Token IDs */}

//           <Popover>

//             <PopoverTrigger asChild>

//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full justify-start"
//               >
//                 Select Token IDs
//               </Button>

//             </PopoverTrigger>

//             <PopoverContent className="max-h-64 overflow-y-auto">

//               {isLoading ? (
//                 <p>Loading...</p>
//               ) : ownedTokenIds.length === 0 ? (
//                 <p>No NFTs owned.</p>
//               ) : (
//                 ownedTokenIds.map((id) => (
//                   <div
//                     key={id}
//                     className="flex items-center gap-2 py-2"
//                   >
//                     {/* checkbox goes here */}
//                     Token #{id}
//                   </div>
//                 ))
//               )}

//             </PopoverContent>

//           </Popover>

//           {/* Recipient */}

//           <Input
//             placeholder="Recipient Wallet Address"
//             {...register("recipient")}
//           />

//           {errors.recipient && (
//             <p className="text-sm text-red-400">
//               {errors.recipient.message}
//             </p>
//           )}

//           <Button
//             type="submit"
//             disabled={isPending}
//             className="w-full"
//           >
//             {isPending
//               ? "Sending..."
//               : "Send NFT"}
//           </Button>

//         </form>

//       </DialogContent>
//     </Dialog>
//   );
// }