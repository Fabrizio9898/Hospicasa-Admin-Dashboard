import axios from "axios";
import { UpdatePasswordDTO } from "../../types/updatePassword.type";
import api from "../api";
import { ErrorHelper, verifyError } from "../../helpers/error/error.helper";

export const updatePasswordApi = async (id: string, data: UpdatePasswordDTO) => {
      try {
        const response = await api.post(`/users/update/password/${id}`, data);
    return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "Error desconocido";
          throw new ErrorHelper(
            verifyError(errorMessage),
            error.response.status.toString()
          );
        }
        throw error;
      }
};
