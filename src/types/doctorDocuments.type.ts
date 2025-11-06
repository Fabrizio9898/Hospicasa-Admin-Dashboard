import * as z from "zod";
import { DoctorDocumentType } from "../enums/doctorDocument.enum";

const documentTypes = Object.values(DoctorDocumentType) as [
  string,
  ...string[]
];
export const doctorDocumentSchema = z.object({
  id: z.uuid(),
  type: z.enum(documentTypes),
  url: z.url(),
  verified: z.boolean(),
  uploadedAt: z.iso.datetime().or(z.date()),
});


export type DoctorDocument=z.infer<typeof doctorDocumentSchema>