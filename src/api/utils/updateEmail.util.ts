import axios from "axios";
import { UpdateEmailDTO } from "../../types/updateEmail.type";
import api from "../api";
import { ErrorHelper, verifyError } from "../../helpers/error/error.helper";

export const updateEmailInApi = async (id: string, data: UpdateEmailDTO) => {
   try {
       const response = await api.post(`/users/update/email/${id}`, data);
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
