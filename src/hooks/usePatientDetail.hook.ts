import { useQuery } from "@tanstack/react-query";
import { getPatientById } from "../api/utils/getPatient.util";



export const useUserDetail = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getPatientById(id),
    enabled: !!id, // Solo se ejecuta si hay ID
    retry: 1,
  });
};
