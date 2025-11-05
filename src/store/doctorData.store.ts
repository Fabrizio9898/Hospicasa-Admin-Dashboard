import { create } from "zustand";
import { ErrorHelper } from "../helpers/error/error.helper";
import { getDoctors, type GetDoctorsQuery } from "../api/utils/getDoctors.util";
import {
  DoctorListResponse,
  doctorListResponseSchema,
} from "../types/doctor.type";

interface DoctorState {
  doctorsData: DoctorListResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchDoctors: (query: GetDoctorsQuery) => Promise<void>;
}

// 2. Crea el Store
export const useDoctorStore = create<DoctorState>((set) => ({
  // --- ESTADO INICIAL ---
  doctorsData: null,
  isLoading: true,
  error: null,

  // --- ACCIÓN ---
  fetchDoctors: async (query: GetDoctorsQuery) => {
    set({ isLoading: true, error: null });
    try {
      const responseData = await getDoctors(query);
      console.log(responseData);

      const validation = doctorListResponseSchema.safeParse(responseData);
      if (!validation.success) throw new Error("Respuesta de API inválida");
      set({ doctorsData: responseData, isLoading: false });
    } catch (error) {
      console.error("Error al cargar doctores:", error);
      if (error instanceof ErrorHelper || error instanceof Error) {
        set({ isLoading: false, error: error.message });
      } else {
        set({ isLoading: false, error: "Un error desconocido ocurrió." });
      }
    }
  },
}));
