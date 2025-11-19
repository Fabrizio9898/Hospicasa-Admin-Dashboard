import * as z from "zod"

export const doctorSpecialitySchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre es muy largo" }),

  description: z
    .string()
    .max(200, { message: "La descripción no puede superar los 200 caracteres" })
    .optional()
    .or(z.literal("")),
});


export type DoctorSpeciality = z.infer<typeof doctorSpecialitySchema>;

export interface SpecialityUI extends DoctorSpeciality {
  id: string;
  doctorCount: number; // Dato calculado valioso
  createdAt: Date;
}