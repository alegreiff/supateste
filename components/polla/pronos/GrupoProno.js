import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";
import { GuardarPronos } from "./GuardarPronos";
import { PartidoPron } from "./PartidoPron";
import { PosGrupoPronos } from "./PosGrupoPronos";

export const GrupoProno = ({
  partidos: { p: partidos, grupo, comodines },
  pronosdb,
}) => {
  console.log("PronosDBB", pronosdb);
  const { pronospollero } = useDatosPollero((state) => state);

  const { equipos } = useDatosPollero((state) => state);

  const [nombre, setNombre] = useState("");
  const [partidosPron, setPartidosPron] = useState(0);

  useEffect(() => {
    const pronosGrupo = pronospollero.filter(
      (pronos) => pronos.grupo === grupo
    ).length;
    setPartidosPron(pronosGrupo);
  }, [pronospollero, grupo]);

  useEffect(() => {
    if (grupo === 2) setNombre("Octavos de final");
    if (grupo === 3) setNombre("Cuartos de final");
    if (grupo === 4) setNombre("Semifinales");
    if (grupo === 5) setNombre("Tercer puesto y final");
    if (isNaN(grupo)) setNombre(`Grupo "${grupo}"`);
  }, [grupo]);

  const equiposGrupo = (grupo) => {
    return equipos.filter((eq) => eq.grupo === grupo);
  };
  const pronoGuardado = (partido) => {
    console.log("PPPARTTIDO", partido);
    const guardado = pronosdb.find((prono) => prono.partido === partido);
    return guardado;
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {nombre} * comodines {comodines} / Partidos por pronosticar =
            {partidos.length} / {partidosPron}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {partidos.map((p) => (
          <>
            <SimpleGrid minChildWidth="120px" spacing="10px">
              <PartidoPron
                key={p.id}
                partido={p}
                pronodb={pronoGuardado(p.id)}
              />
            </SimpleGrid>
          </>
        ))}
        {partidos.length === partidosPron && <GuardarPronos grupo={grupo} />}
        {isNaN(grupo) && (
          <PosGrupoPronos equipos={equiposGrupo(grupo)} grupo={grupo} />
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};
