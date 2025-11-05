import * as z from "zod"
import { Doctor_Status } from "../enums/doctorStatus.enum";
import { UserRole } from "../enums/userRole.enum";

export const doctorPublicSchema = z.object({
  id: z.uuid(),
  fullname: z.string(),
  dni: z.string(),
  email: z.email(),
  status: z.enum(Doctor_Status),
  createdAt: z.iso.datetime().or(z.date()),
  specialtyCount: z.number().int(), 
  role:z.enum(UserRole)
});

export const doctorListResponseSchema = z.object({
  data: z.array(doctorPublicSchema), // Un array de doctores
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});


export type DoctorPublic = z.infer<typeof doctorPublicSchema>;
export type DoctorListResponse = z.infer<typeof doctorListResponseSchema>;

