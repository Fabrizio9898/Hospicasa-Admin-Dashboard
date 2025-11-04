import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserCleanSchema } from "../types/userSchema.type";
// (Asegúrate que la ruta a tus tipos sea correcta)

// 1. Define la "forma" de tu estado y las acciones
interface AuthState {
  user: UserCleanSchema | null;
  token: string | null;
  isAuthenticated: boolean; // Un "getter" para saber si estás logueado

  // Acciones (funciones para cambiar el estado)
  login: (data: { user: UserCleanSchema; token: string }) => void;
  logout: () => void;
  // (Opcional) setear estado de hidratación
  _setIsAuthenticated: (status: boolean) => void;
}

// 2. Crea el Store (El "Intercomunicador")
export const useAuthStore = create<AuthState>()(
  // 3. ¡LA MAGIA! 'persist' conecta el store a localStorage
  persist(
    (set) => ({
      // --- 4. ESTADO INICIAL ---
      user: null,
      token: null,
      isAuthenticated: false,

      // --- 5. ACCIONES ---
      login: (data) => {
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      _setIsAuthenticated: (status) => {
        set({ isAuthenticated: status });
      },
    }),
    {
      name: "user-session",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        if (state) {
          state._setIsAuthenticated(!!state.token);
        }
      },
    }
  )
);
