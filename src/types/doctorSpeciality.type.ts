import * as z from "zod"

export const doctorSpecialitySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description:z.string()
});


export type DoctorSpeciality = z.infer<typeof doctorSpecialitySchema>;