import { Badge, Box, SimpleGrid, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";

import React from "react";

export const data = {
  labels: ["Red"],
  datasets: [
    {
      label: "# of Votes",
      data: [12],
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
};

export const PartidoDiario = ({ partido }) => {
  const { statspronos } = useDatosPollero((state) => state);
  const [stats, setStats] = useState(null);
  const [pie, setPie] = useState(null);

  useEffect(() => {
    const localStats = statspronos.find((stats) => stats.p === partido.id);
    setStats(localStats);

    const datosPie = {
      labels: [partido.eqloc, "Empate", partido.eqvis],
      datasets: [
        {
          label: "Polleros",
          data: [localStats.p_loc, localStats.p_emp, localStats.p_vis],
          backgroundColor: [
            "rgba(17,77,249, 0.2)",
            "rgba(30,199,0, 0.2)",
            "rgba(231,76,60, 0.2)",
          ],
          borderColor: [
            "rgba(17,77,249, 1)",
            "rgba(30,199,0, 1)",
            "rgba(231,76,60, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setPie(datosPie);
  }, []);

  return (
    <>
      <SimpleGrid columns={[1, null, 2]} spacing="40px">
        <Box>
          <Badge fontSize="2xl" color="polla.local">
            {" "}
            {partido.eqloc}{" "}
          </Badge>
          <Badge variant="outline" color="polla.empate" m="2">
            vs
          </Badge>
          <Badge fontSize="2xl" color="polla.visitante">
            {" "}
            {partido.eqvis}{" "}
          </Badge>
        </Box>
        <Box bg="tomato" height="80px">
          {JSON.stringify(stats)}
        </Box>

        <Box height={400}></Box>
      </SimpleGrid>
    </>
  );
};

/* 
{"partido":{"id":1,"grupo":"A","ronda":1,"fecha":"2022-11-20T16:00:00+00:00","eqloc":"Qatar","locid":"QA","eqvis":"Ecuador","visid":"EC","power":2894,"idvis":11,"idloc":24,"mlocal":null,"mvisit":null,"procesado":false}}
*/
