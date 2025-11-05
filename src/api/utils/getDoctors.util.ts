import { Doctor_Status } from "../../enums/doctorStatus.enum";
import axios from "axios";
import { ErrorHelper, verifyError } from "../../helpers/error/error.helper";
import api from "../api";
import { DoctorListResponse } from "../../types/doctor.type";

export interface GetDoctorsQuery {
  status?: Doctor_Status;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Obtiene la lista paginada de doctores desde el backend.
 * @param query - Objeto con { status, search, page, limit }
 */
export async function getDoctors(
  query: GetDoctorsQuery
): Promise<DoctorListResponse> {
  try {
    const response = await api.get("/admin/doctors", {
      params: query,
    });
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
}
