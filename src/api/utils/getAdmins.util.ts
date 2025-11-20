import axios from "axios";
import api from "../api";
import { ErrorHelper, verifyError } from "../../helpers/error/error.helper";

export async function getAdmins(){
try {
  const response = await api.get("/admin/all");
  return response.data;
} catch (error) {
  console.log(error);
  
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