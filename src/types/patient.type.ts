import { TicketCategory } from "../enums/tickets/ticketCategory.enum";
import { AppointmentSchema } from "./appointment.type";
import { reviewSchema } from "./review.type";
import { userCleanSchema } from "./userSchema.type";
import * as z from "zod";

export const TicketPreviewSchema = z.object({
  id: z.string(),
  subject: z.string().nullable(),
  status: z.string(),
  createdAt: z.string(),
  category: z.enum(TicketCategory),
});

export const patientSchema = userCleanSchema.extend({
  appointments: z.array(AppointmentSchema).optional().default([]),
  reviews: z.array(reviewSchema).optional().default([]),
  supportTickets: z.array(TicketPreviewSchema).optional().default([]),
  createdAt: z.iso.datetime().or(z.date()),
});


export type TicketPatientPreviewType = z.infer<typeof TicketPreviewSchema>;
export type PatientType = z.infer<typeof patientSchema>;