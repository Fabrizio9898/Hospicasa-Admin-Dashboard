
import * as z from "zod";
import { userCleanSchema } from "./userSchema.type";


export const loginResponseSchema = z.object({
  message: z.string(), 
  token: z.string(),
  user: userCleanSchema, 
});



export type LoginResponse = z.infer<typeof loginResponseSchema>;