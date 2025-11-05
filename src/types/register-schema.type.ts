import * as z from "zod";


export const createAdminResponse=z.object({
message:z.string()
})


export const createAdminSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "El nombre solo puede contener letras y espacios.",
    }),

  email: z
    .string()
    .min(3, { message: "El email debe tener al menos 3 caracteres." })
    .max(50, { message: "El email no puede tener más de 50 caracteres." })
    .pipe(z.email({ message: "Formato de correo inválido." })),
});


export type CreateAdminSchema = z.infer<typeof createAdminSchema>;
