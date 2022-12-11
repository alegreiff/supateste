import { HStack, SimpleGrid } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { DatoStats } from "./DatoStats";

export const StatusPolleros = () => {
  const [estatus, setEstatus] = useState(null);

  useEffect(() => {
    async function cargaEstatus() {
      const { data: estatuspolleros, error } = await supabaseClient
        .from("estatuspolleros")
        .select("*");
      setEstatus(estatuspolleros[0]);
    }

    cargaEstatus();
  }, []);

  return (
    <>
      {estatus ? (
        <SimpleGrid minChildWidth="120px" spacing="40px">
          {/* <DatoStats
            dato={estatus?.registrados}
            leyenda={"Registrados"}
            color="polla.visitante"
          ></DatoStats> */}
          <DatoStats
            dato={estatus?.empollados}
            leyenda={"Polleros"}
            color="polla.local"
          ></DatoStats>
          {/* <DatoStats
            dato={estatus?.huerfanos}
            leyenda={"En busca de hogar"}
            color="polla.visitante"
          ></DatoStats> */}
          <DatoStats
            dato={estatus?.completos}
            leyenda={"Con marcadores completos"}
            color="polla.local"
          ></DatoStats>
          {/* <DatoStats
            dato={estatus?.parciales}
            leyenda={"Con marcadores parciales"}
            color="polla.visitante"
          ></DatoStats> */}
          <DatoStats
            dato={estatus?.enceros}
            leyenda={"Sin marcadores"}
            color="polla.local"
          ></DatoStats>
          {/* <DatoStats
            dato={estatus?.pagos}
            leyenda={"Polla pagada"}
            color="polla.visitante"
          ></DatoStats> */}
          {/* <DatoStats
            dato={estatus?.enproceso}
            leyenda={"En acuerdos de pago"}
            color="polla.local"
          ></DatoStats> */}
          <DatoStats
            dato={estatus?.pronostotales}
            leyenda={"Partidos pronosticados para semifinales"}
            color="polla.visitante"
          ></DatoStats>
        </SimpleGrid>
      ) : (
        "null"
      )}
    </>
  );
};
