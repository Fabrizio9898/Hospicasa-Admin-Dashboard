import * as z from "zod";


export const userPaymentSchema = z.object({
  id: z.string().uuid(),
  status: z.string(), // O tu enum de MercadoPago
  paymentMethod: z.string().optional(),
});


export type UserPaymentType = z.infer<typeof userPaymentSchema>;