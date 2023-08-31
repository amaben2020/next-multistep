import { z } from "zod";

export const shippingDetailsSchema = z.object({
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  shippingMethod: z.enum(["standard", "express"]),
});
