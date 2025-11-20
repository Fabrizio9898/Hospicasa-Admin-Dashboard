import * as z from "zod";

export const UpdateEmailSchema = z.object({
  // Validación estricta para el email
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Debe ser un email válido"),
});

// Este es el tipo de datos que enviamos al backend
export type UpdateEmailDTO = z.infer<typeof UpdateEmailSchema>;
