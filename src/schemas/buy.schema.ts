import { z } from "zod";

export const buySchema = z.object({
  asset: z.string().min(1, "Please select an NFT"),

  quantity: z.coerce
    .number()
    .min(1, "Minimum quantity is 1"),
});

export type BuyFormValues = z.infer<typeof buySchema>;