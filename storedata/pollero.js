import create from "zustand";
import { persist } from "zustand/middleware";

const useDatosPollero = create(
  persist(
    (set, get) => ({
      usuario: null,
      setUsuario: (params) => {
        set((state) => ({
          usuario: params,
        }));
      },
      clearUsuario: () => set({ usuario: null }),
      partidos: [],
      setPartidos: (params) => {
        set((state) => ({
          partidos: params,
        }));
      },
      fotoperfil: false,
      setFotoPerfil: () => {
        set((state) => ({
          fotoperfil: true,
        }));
      },
    }),
    { name: "datospolla" }
  )
);
export default useDatosPollero;
