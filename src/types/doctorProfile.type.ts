import { doctorPublicSchema } from "./doctor.type";
import { doctorDocumentSchema } from "./doctorDocuments.type";
import { doctorSpecialitySchema } from "./doctorSpeciality.type";
import * as z from "zod";

export const doctorProfileSchema = doctorPublicSchema.extend({
  specialities: z.array(doctorSpecialitySchema),
  documents: z.array(doctorDocumentSchema),
  phoneNumber: z.string(),
});


export type DoctorProfile = z.infer<typeof doctorProfileSchema>; 