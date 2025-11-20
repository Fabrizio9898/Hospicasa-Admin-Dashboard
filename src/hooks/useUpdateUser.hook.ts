import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { UpdateEmailDTO } from "../types/updateEmail.type";
import { updateEmailInApi } from "../api/utils/updateEmail.util";
import { swalNotifyError } from "../swal/swal-notifyError";
import { ErrorHelper } from "../helpers/error/error.helper";
import { UserCleanSchema } from "../types/userSchema.type";

// Nota: Tu ruta del back es POST update/email/:id

export const useUpdateEmail = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user); // Obtener ID del store
  const authLogin = useAuthStore((state) => state.login); // Obtener acción login (para actualizar el store)

  return useMutation<UserCleanSchema, ErrorHelper, UpdateEmailDTO>({
    mutationFn: (data: UpdateEmailDTO) => {
      if (!user) throw new Error("Usuario no autenticado");
      return updateEmailInApi(user.id, data);
    },

    // Lo que pasa si la mutación es EXITOSA
    onSuccess: (updatedUser, variables) => {
      if (token && user) {
        authLogin({
          user: { ...user, email: variables.email },
          token: token,
        });
      }

      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      }
      return updatedUser;
    },

    // Lo que pasa si falla
    onError: (error) => {
      console.error("Fallo la actualización del email:", error);
      swalNotifyError(error);
      // Podrías usar Swal para mostrar el error aquí
      throw new Error("No se pudo actualizar el email. Intente más tarde.");
    },
  });
};
