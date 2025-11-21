import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import { useAuthStore } from "../store/auth.store";

import { ErrorHelper } from "../helpers/error/error.helper";
import { UpdatePasswordDTO } from "../types/updatePassword.type";
import { swalNotifyError } from "../swal/swal-notifyError";
import { UserCleanSchema } from "../types/userSchema.type";
import { updatePasswordApi } from "../api/utils/updatePassword.util";




export const useUpdatePassword = () => {
  const userId = useAuthStore((state) => state.user?.id);

  return useMutation<UserCleanSchema, ErrorHelper, UpdatePasswordDTO>({
    mutationFn: (data) => {
      if (!userId) throw new Error("Usuario no autenticado");
      return updatePasswordApi(userId, data);
    },
    onError: (error) => {
      // Usamos tu helper centralizado para manejar errores (401, 400, etc.)
      swalNotifyError(error);
    },
  });
};
