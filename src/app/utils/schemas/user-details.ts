import { z } from "zod";

export const userInfoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  contactNumber: z.string().min(10),
});
