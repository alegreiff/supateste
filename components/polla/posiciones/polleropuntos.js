import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Grid,
  GridItem,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";
import usePollaSettings from "../../../storedata/settings";

export const Polleropuntos = ({ pollero = null }) => {
  const { posiciones } = usePollaSettings((state) => state);
  const { usuario } = useDatosPollero((state) => state);
  const [mipos, setMipos] = useState(null);

  const PuntoBadge = ({ caso, valor }) => {
    return (
      <Box p={1} m={1} borderWidth={2} borderColor="polla.prono" height="auto">
        <VStack>
          <Badge variant="outline" colorScheme="green">
            {caso}
          </Badge>
          <Badge
            ml="1"
            fontSize={caso === "Puntos" ? "4em" : "2em"}
            colorScheme={caso === "Blanco" ? "pink" : "green"}
          >
            {valor}
          </Badge>
        </VStack>
      </Box>
    );
  };

  useEffect(() => {
    if (posiciones) {
      if (!pollero) {
        const mispuntos = posiciones.find((pos) => pos.userid === usuario?.id);
        setMipos(mispuntos);
      } else {
        const mispuntos = posiciones.find((pos) => pos.userid === pollero);
        setMipos(mispuntos);
      }
    }
  }, [posiciones, usuario, pollero]);

  return (
    <>
      {/* {mipos ? JSON.stringify(mipos) : ""} */}
      {mipos ? (
        <>
          <Grid
            h="auto"
            templateRows="repeat(2, 1fr)"
            templateColumns={pollero ? "repeat(1, 1fr)" : "repeat(5, 1fr)"}
            gap={4}
          >
            <GridItem rowSpan={2} colSpan={pollero ? 4 : 1}>
              <PuntoBadge caso="Posición" valor={mipos.pos} />
              <PuntoBadge caso="Puntos" valor={mipos.pts} />
            </GridItem>
            <GridItem colSpan={4}>
              <SimpleGrid minChildWidth="120px" spacing="10px">
                <PuntoBadge caso="GranCH" valor={mipos.gch} />
                <PuntoBadge caso="Dobles" valor={mipos.dbl} />
                <PuntoBadge caso="Chepazos" valor={mipos.ch} />
                <PuntoBadge caso="Simples" valor={mipos.sim} />
                <PuntoBadge caso="Blanco" valor={mipos.bkc + mipos.bks} />
              </SimpleGrid>
            </GridItem>

            {/* <GridItem colSpan={4}></GridItem> */}
          </Grid>
        </>
      ) : (
        "Aquí irán mis puntajes"
      )}
    </>
  );
};
