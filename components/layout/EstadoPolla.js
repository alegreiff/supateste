import {
  Box,
  HStack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import useFase from "../../hooks/useFase";
import usePollaSettings from "../../storedata/settings";

export const EstadoPolla = () => {
  const { fechas } = usePollaSettings((state) => state);
  const { fecha, estado, fase, cargaPronos, rondas, comodines } =
    useFase(fechas);
  return (
    <Box bg="lightgray" p={4} mb="4">
      <VStack>
        <Stat>
          <StatLabel>Estado polla</StatLabel>
          <StatNumber>
            Fase: {fase} {estado}
          </StatNumber>
          <StatNumber>{fecha}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Carga de Pronos</StatLabel>
          <StatNumber>{cargaPronos ? "ABIERTA" : "CERRADA"}</StatNumber>
          <StatNumber>
            Rondas {rondas} : ** {comodines}
          </StatNumber>
        </Stat>
      </VStack>
    </Box>
  );
};
