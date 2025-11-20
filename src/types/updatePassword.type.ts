import * as z from "zod";

export const UpdatePasswordSchema = z
  .object({
    actual_password: z
      .string()
      .min(1, "Debes ingresar tu contraseña actual para autorizar el cambio."),

    newPassword: z
      .string()
      .min(6, "La nueva contraseña debe tener al menos 6 caracteres.")
      .max(50, "La contraseña es muy larga."),

    confirm_password: z.string().min(1, "Debes confirmar la nueva contraseña."),
  })
  .refine((data) => data.newPassword === data.confirm_password, {
    message: "Las contraseñas no coinciden.",
    path: ["confirm_password"], // El error aparecerá en este campo
  });

// DTO para enviar al backend
export type UpdatePasswordDTO = z.infer<typeof UpdatePasswordSchema>;
