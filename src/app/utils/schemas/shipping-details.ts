import { z } from "zod";

export const shippingDetailsSchema = z.object({
  address: z.string(),
  city: z.string(),
  postalCode: z.number().min(5).max(6),
  shippingMethod: z.enum(["standard", "express"]),
});
