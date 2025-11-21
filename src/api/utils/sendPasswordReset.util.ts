import axios from "axios";
import api from "../api";
import { ErrorHelper,verifyError,} from "../../helpers/error/error.helper";

interface ResetResponse {
  message: string;
}
 export const resetpassword = async (token: string, password: string) => {
   try {
     const response = await api.post<ResetResponse>(
       "/user/auth/reset-password",
       {
         token: token,
         newPassword: password,
       }
     );
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