import api from "../api/api";
import axios from "axios";
import { ErrorHelper, verifyError } from "../helpers/error/error.helper";

export async function getKpis(){
try {
    const response = await api.get("/admin/dashboard/kpis");
    console.log(response.data);
    
    return response.data
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