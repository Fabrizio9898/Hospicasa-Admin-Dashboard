import axios from "axios"; // <-- 1. Importa axios
import { LoginSchema } from "../../types/login-schema.type";
import { ErrorHelper, verifyError } from "../error/error.helper";
import api from "../../api/api";
import { LoginResponse } from "../../types/loginResponse.type"; // (Asumo que necesitas este tipo)

export async function login(userData: LoginSchema): Promise<LoginResponse> {
  try {
    const res = await api.post(`/admin/login`, userData);
    return res.data; 
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
}
