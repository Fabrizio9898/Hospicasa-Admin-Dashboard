import * as z from "zod";
import { Doctor_Status } from "../enums/doctorStatus.enum";
import { UserRole } from "../enums/userRole.enum";

const doctorStatusValues = Object.values(Doctor_Status) as [
  string,
  ...string[]
];



const userRole = Object.values(UserRole) as [
  string,
  ...string[]
];

export const doctorPublicSchema = z.object({
  id: z.uuid(),
  fullname: z.string(),
  dni: z.string(),
  email: z.email(),
  status: z.enum(doctorStatusValues),
  createdAt: z.iso.datetime().or(z.date()),
  specialtyCount: z.number().int().optional(),
  role: z.enum(userRole),
  profile_image: z.string(),
  rejectedReason: z.string().nullable(),
  tarifaPorConsulta: z.string(),
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
