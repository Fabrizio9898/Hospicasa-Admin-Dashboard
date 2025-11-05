import { Doctor_Status } from "../enums/doctorStatus.enum";
import axios from "axios";
import { ErrorHelper, verifyError } from "../helpers/error/error.helper";
import api from "../api/api";

interface GetDoctorsQuery {
  status?: Doctor_Status;
  search?: string;
  page?: number;
  limit?: number;
}

// 3. El DTO del Doctor (DoctorPublicDto)
// (Inferido de tu backend. Agrega/quita campos según lo necesites)
export interface DoctorPublic {
  id: string;
  fullname: string;
  dni: string;
  email: string;
  status: Doctor_Status;
  createdAt: string; // O Date, dependiendo de cómo lo devuelva NestJS
  specialtyCount: number; // Esto viene de tu query
  // (Aquí irían 'specialities' si tu DTO las expone)
}

// 4. La Respuesta Completa (DoctorListResponseDto)
export interface DoctorListResponse {
  data: DoctorPublic[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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
