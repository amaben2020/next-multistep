import { z } from "zod";

export const paymentInfoSchema = z.object({
  cardNumber: z.string().min(16),
  expirationDate: z.string().regex(/^\d{2}\/\d{2}$/),
  cvv: z.string().min(3),
});
