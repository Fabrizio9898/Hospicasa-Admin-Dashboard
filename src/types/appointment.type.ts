import * as z from "zod";
import { AppointmentStatus } from "../enums/appointmentStatus.enum";
import { PayoutStatus } from "../enums/payoutStatus.enum";
import { doctorPublicSchema } from "./doctor.type";
import { userPaymentSchema } from "./userPayment.type";

export const AppointmentSchema = z.object({
  id: z.uuid(),
  dateHour: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val).toISOString()),
  status: z.enum(AppointmentStatus),
  cost: z.coerce.number(),
  platformFee: z.coerce.number(),
  doctorNetIncome: z.coerce.number(),
  payoutStatus: z.enum(PayoutStatus),
  doctor: doctorPublicSchema.nullable().optional(),
  pago: userPaymentSchema.nullable().optional(),
  createdAt: z.string().optional(),
});


export type AppointmentType = z.infer<typeof AppointmentSchema>;