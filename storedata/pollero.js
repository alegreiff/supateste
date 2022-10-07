import create from "zustand";
import { persist } from "zustand/middleware";

const useDatosPollero = create(
  persist(
    (set, get) => ({
      usuario: null,
      setUsuario: (params) => {
        const rnd = Math.random;
        set((state) => ({
          usuario: {
            ...params,
            foto: `polleres/${params.id}/perfil.png?base=${rnd}`,
          },
        }));
      },
      setImagenPerfil: (params) => {
        set((state) => ({
          usuario: { ...state.usuario, foto: params },
        }));
      },
      setPerfilUsuario: (params) => {
        set((state) => ({
          usuario: {
            ...state.usuario,
            alias: params.alias,
            hincha: params.hincha,
            favorito: params.favorito,
          },
        }));
      },
      clearUsuario: () => set({ usuario: null }),
      partidos: [],
      setPartidos: (params) => {
        set((state) => ({
          partidos: params,
        }));
      },
    }),
    { name: "datospolla" }
  )
);
export default useDatosPollero;
