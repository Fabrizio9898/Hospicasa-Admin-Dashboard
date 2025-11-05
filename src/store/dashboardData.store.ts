import { create } from "zustand";
import { ErrorHelper } from "../helpers/error/error.helper";
import { getKpis } from "../api/utils/getKpis.util";

interface KpiData {
  pendingDoctorsCount: number;
  revenueMonth: number;
  appointmentsMonth: number;
  newPatientsMonth: number;
  newDoctorsMonth: number;
}

// Define la "forma" del store
interface DashboardState {
  kpis: KpiData | null;
  isLoading: boolean;
  error: string | null;
  fetchKpis: () => Promise<void>; // La acción para ir a buscar los datos
}

export const useDashboardStore = create<DashboardState>((set) => ({
  kpis: null,
  isLoading: true,
  error: null,

  fetchKpis: async () => {
    set({ isLoading: true, error: null });

    try {
      const kpiData = await getKpis();

      console.log(kpiData);

      set({ kpis: kpiData, isLoading: false });
    } catch (error) {
      console.error("Error al cargar KPIs:", error);
      if (error instanceof ErrorHelper || error instanceof Error) {
        set({ isLoading: false, error: error.message });
      } else {
        set({ isLoading: false, error: "Un error desconocido ocurrió." });
      }
    }
  },
}));
