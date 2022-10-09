import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PartidoPron } from "./PartidoPron";

export const GrupoProno = ({ partidos: { p: partidos, grupo } }) => {
  const [nombre, setNombre] = useState("");
  useEffect(() => {
    if (grupo === 2) setNombre("Octavos de final");
    if (grupo === 3) setNombre("Cuartos de final");
    if (grupo === 4) setNombre("Semifinales");
    if (grupo === 5) setNombre("Tercer puesto y final");
    if (isNaN(grupo)) setNombre(`Grupo "${grupo}"`);
  }, []);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {nombre}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {partidos.map((p) => (
          <PartidoPron key={p.id} partido={p} />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};
