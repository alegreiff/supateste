import create from "zustand";
import { persist } from "zustand/middleware";

const rnd = new Date().valueOf();

const useDatosPollero = create(
  persist(
    (set, get) => ({
      usuario: null,
      setUsuario: (params) => {
        set((state) => ({
          usuario: {
            ...params,
            foto: `polleres/${params.id}/perfil.png?pic=` + rnd,
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
      polleros: [],
      setPolleros: (params) => {
        set((state) => ({
          polleros: params,
        }));
      },
      clearPolleros: () => set({ polleros: [] }),
    }),
    { name: "datospolla" }
  )
);
export default useDatosPollero;
