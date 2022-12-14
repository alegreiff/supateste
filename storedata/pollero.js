import create from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
const rnd = new Date().valueOf();

const useDatosPollero = create(
  devtools(
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
          console.log("user params", params);
          set((state) => ({
            usuario: {
              ...state.usuario,
              alias: params.alias,
              hincha: params.hincha,
              favorito: params.favorito,
              isAmigo: params.isAmigo,
              ispollero: params.isPollero,
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
        equipos: [],
        setEquipos: (params) => {
          set((state) => ({
            equipos: params,
          }));
        },

        clearEquipos: () => set({ equipos: [] }),
        updatePolleros: (params) => {
          set((state) => ({
            polleros: [
              ...state.polleros.filter((poll) => poll.id != params.id),
              params,
            ],
          }));
        },

        clearPolleros: () => set({ polleros: [] }),
        pronospollero: [],
        addProno: (params) => {
          set((state) => ({
            pronospollero: [
              ...state.pronospollero.filter(
                (partido) => partido.id !== params.id
              ),
              params,
            ],
          }));
        },
        clearPronos: () => set({ pronospollero: [] }),
        pollerosamigos: [],
        setPollerosamigos: (params) => {
          set((state) => ({
            pollerosamigos: params,
          }));
        },
        fechaspartidos: [],
        setFechasPartidos: (params) => {
          set((state) => ({
            fechaspartidos: params,
          }));
        },
        statspronos: [],
        setStatsPronos: (params) => {
          set((state) => ({
            statspronos: params,
          }));
        },
      }),
      { name: "datospolla" }
    )
  )
);
export default useDatosPollero;
