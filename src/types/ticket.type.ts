import * as z from "zod";
import { UserRole } from "../enums/userRole.enum";
import { TicketCategory } from "../enums/tickets/ticketCategory.enum";
import { TicketPriority } from "../enums/tickets/ticketPriority.enum";
import { TicketStatus } from "../enums/tickets/ticketStatus.enum";

export const TicketUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  role: z.enum(UserRole),
  image: z.string().nullable().optional(),
});

export const TicketSchema = z.object({
  id: z.string(),
  user: TicketUserSchema,
  category: z.enum(TicketCategory),
  priority: z.enum(TicketPriority),
  status: z.enum(TicketStatus),
  subject: z.string(),
  description: z.string(),
  date: z.string(),
  bookingId: z.string().optional().nullable(),
  adminResponse: z.string().optional().nullable(),
  resolvedAt: z.string().optional().nullable(),
});


export const TicketResponseSchema = z.object({
  data: z.array(TicketSchema),
  meta: z.object({
    total: z.coerce.number(),
    page: z.coerce.number(),
    lastPage: z.coerce.number(),
    limit: z.coerce.number(),
  }),
});




export type TicketResponse = z.infer<typeof TicketResponseSchema>;
export type Ticket = z.infer<typeof TicketSchema>;
export type TicketUser = z.infer<typeof TicketUserSchema>;