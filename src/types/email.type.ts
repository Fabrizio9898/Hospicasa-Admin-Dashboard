import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Ingresa un correo electrónico válido").min(1, "El correo es obligatorio")
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
