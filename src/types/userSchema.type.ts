import * as z from "zod";
import { UserRole } from "../enums/userRole.enum";

export const userCleanSchema = z.object({  
  id: z.uuid(),

  name: z.string(),

  email: z.email("El mail entregado no es valido"),

  profile_image: z.string(),

  role:z.enum(UserRole),
});

export type UserCleanSchema = z.infer<typeof userCleanSchema>;
