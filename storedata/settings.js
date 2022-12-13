/**
 * Datos de STORE que NO se guardan en localstorage
 */
import { format } from "date-fns";
import create from "zustand";
import { devtools } from "zustand/middleware";
import useFase from "../hooks/useFase";

const usePollaSettings = create(
  devtools(
    (set, get) => ({
      registro: true,

      /* EN LA CONFIGURACIÓN VAN LAS FECHAS CON HORA COLOMBIA + CINCO */
      fechas: {
        //HOY: new Date("2022-11-21 19:00"),

        HOY: "2022-12-13 08:00:00+00",
        //HOY: format(new Date(), "yyyy-MM-dd H':'mm':'ss'+00'"),
        //HOY: format(new Date(), "yyyy-MM-dd"),
        INICIO_GRUPOS: "2022-11-20 16:00:00+00",
        FIN_GRUPOS: "2022-12-02 22:00:00+00",
        INICIO_OCTAVOS: "2022-12-03 15:00:00+00",
        FIN_OCTAVOS: "2022-12-06 22:00:00+00",
        INICIO_CUARTOS: "2022-12-09 19:00:00+00",
        FIN_CUARTOS: "2022-12-10 18:00:00+00",
        INICIO_SEMIS: "2022-12-13 19:00:00+00",
        FIN_SEMIS: "2022-12-14 22:00:00+00",
        INICIO_FINALES: "2022-12-17 15:00:00+00",
        FIN_FINALES: "2022-12-18 18:00:00+00",

        LIMITE_GRUPOS: "2022-11-20 14:00:00+00",
        LIMITE_OCTAVOS: "2022-12-03 13:00:00+00",
        LIMITE_CUARTOS: "2022-12-09 17:00:00+00",
        LIMITE_SEMIS: "2022-12-13 17:00:00+00",
        LIMITE_FINALES: "2022-12-17 13:00:00+00",
      },
      fase: 0,
      setFase: (params) => {
        set((state) => ({
          fase: params,
        }));
      },
      allPronos: [],
      setAllPronos: (params) => {
        set((state) => ({
          allPronos: params,
        }));
      },
      clearPronos: () => set({ allPronos: [] }),

      posiciones: [],
      setPosiciones: (params) => {
        set((state) => ({
          posiciones: params,
        }));
      },
      clearPosiciones: () => set({ posiciones: [] }),
    }),
    { name: "settingspolla" }
  )
);
export default usePollaSettings;
