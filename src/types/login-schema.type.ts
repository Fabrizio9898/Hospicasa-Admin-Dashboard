import * as z from "zod";


export const loginSchema = z.object({
  email: z
    .string()
    .min(3, "El email es obligatorio.")
    .max(50, "El mail debe estar entre 3 - 50 caracteres")
    .pipe(z.email("Formato de correo inválido.")),

  password: z.string().min(8, "La contraseña es obligatoria."),
});


export type LoginSchema = z.infer<typeof loginSchema>;