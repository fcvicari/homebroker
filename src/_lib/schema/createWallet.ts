import { z } from "zod";

export const walletSchema = z.object({
  name: z.string().min(1, "Wallet name is required."),
});

export type walletFormDate = z.infer<typeof walletSchema>;
