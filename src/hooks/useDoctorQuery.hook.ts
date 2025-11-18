import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getDoctors, type GetDoctorsQuery } from "../api/utils/getDoctors.util"; // Tu api call
import { doctorListResponseSchema } from "../types/doctor.type"; // Tu esquema zod
import z from "zod";

// Esta función hace el fetch y valida
const fetchDoctorsFn = async (query: GetDoctorsQuery) => {
  const responseData = await getDoctors(query);

  // Validación Zod (Lo que tenías en el store)
  const validation = doctorListResponseSchema.safeParse(responseData);
  if (!validation.success) {
    console.error("Error de Zod:", z.treeifyError(validation.error));
    throw new Error("La respuesta del servidor no tiene la forma esperada.");
  }

  return responseData;
};

export const useDoctorsQuery = (queryParams: GetDoctorsQuery) => {
  return useQuery({
    // 1. Query Key: La "magia". Si algo de esto cambia (page, status), React Query refetchea solo.
    queryKey: [
      "doctors",
      queryParams.status,
      queryParams.page,
      queryParams.limit,
    ],

    // 2. Query Fn: Tu función asíncrona
    queryFn: () => fetchDoctorsFn(queryParams),

    // 3. Truco Pro para tablas: Mantiene los datos viejos mientras cargan los nuevos
    // para que la tabla no parpadee a blanco al cambiar de página.
    placeholderData: keepPreviousData,

    // Opcional: Evita refetch si cambias de ventana y vuelves rápido
    staleTime: 1000 * 60 * 1, // 1 minuto
  });
};
