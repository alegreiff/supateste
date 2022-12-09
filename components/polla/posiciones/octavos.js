import {
  Badge,
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Tag,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { OctavosGrupo } from "./octavosgrupo";

export const Octavos = ({ posequipos }) => {
  console.log({ posequipos });

  return (
    <>
      <OctavosGrupo equipos={posequipos} grupo={"Mundial"} />
      {/* <OctavosGrupo equipos={grupoA} grupo={"A"} />
      <OctavosGrupo equipos={grupoB} grupo={"B"} />
      <OctavosGrupo equipos={grupoC} grupo={"C"} />
      <OctavosGrupo equipos={grupoD} grupo={"D"} />
      <OctavosGrupo equipos={grupoE} grupo={"E"} />
      <OctavosGrupo equipos={grupoF} grupo={"F"} />
      <OctavosGrupo equipos={grupoG} grupo={"G"} />
      <OctavosGrupo equipos={grupoH} grupo={"H"} /> */}
    </>
  );
};

/* 
{
    {
    "grupo": "B",
    "nombre": "Inglaterra",
    "code": "EN",
    "pj": 2,
    "PG": 1,
    "PE": 1,
    "PP": 0,
    "GF": 6,
    "GC": 2,
    "dif": 4,
    "pts": 4
}
}
*/
