import * as z from "zod";
import { UserRole } from "../enums/userRole.enum";

const userRole = Object.values(UserRole) as [string, ...string[]];

export const userCleanSchema = z.object({
  id: z.uuid(),

  name: z.string(),

  email: z.email("El mail entregado no es valido"),

  profile_image: z.string(),

  role: z.enum(userRole),
});

export type UserCleanSchema = z.infer<typeof userCleanSchema>;
