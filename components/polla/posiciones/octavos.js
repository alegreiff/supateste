import {
  Badge,
  Box,
  Center,
  Grid,
  GridItem,
  Tag,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { OctavosGrupo } from "./octavosgrupo";

export const Octavos = ({ posequipos }) => {
  const [grupoA, setGrupoA] = useState(null);
  const [grupoB, setGrupoB] = useState(null);
  const [grupoC, setGrupoC] = useState(null);
  const [grupoD, setGrupoD] = useState(null);
  const [grupoE, setGrupoE] = useState(null);
  const [grupoF, setGrupoF] = useState(null);
  const [grupoG, setGrupoG] = useState(null);
  const [grupoH, setGrupoH] = useState(null);

  const [a1, setA1] = useState(null);
  const [a2, setA2] = useState(null);
  const [b1, setB1] = useState(null);
  const [b2, setB2] = useState(null);
  const [c1, setC1] = useState(null);
  const [c2, setC2] = useState(null);
  const [d1, setD1] = useState(null);
  const [d2, setD2] = useState(null);
  const [e1, setE1] = useState(null);
  const [e2, setE2] = useState(null);
  const [f1, setF1] = useState(null);
  const [f2, setF2] = useState(null);
  const [g1, setG1] = useState(null);
  const [g2, setG2] = useState(null);
  const [h1, setH1] = useState(null);
  const [h2, setH2] = useState(null);

  useEffect(() => {
    const ga = posequipos.filter((eqs) => eqs.grupo === "A");
    const gb = posequipos.filter((eqs) => eqs.grupo === "B");
    const gc = posequipos.filter((eqs) => eqs.grupo === "C");
    const gd = posequipos.filter((eqs) => eqs.grupo === "D");
    const ge = posequipos.filter((eqs) => eqs.grupo === "E");
    const gf = posequipos.filter((eqs) => eqs.grupo === "F");
    const gg = posequipos.filter((eqs) => eqs.grupo === "G");
    const gh = posequipos.filter((eqs) => eqs.grupo === "H");
    setA1(ga[0]);
    setA2(ga[1]);
    setB1(gb[0]);
    setB2(gb[1]);
    setC1(gc[0]);
    setC2(gc[1]);
    setD1(gd[0]);
    setD2(gd[1]);
    setE1(ge[0]);
    setE2(ge[1]);
    setF1(gf[0]);
    setF2(gf[1]);
    setG1(gg[0]);
    setG2(gg[1]);
    setH1(gh[0]);
    setH2(gh[1]);

    setGrupoA(ga);
    setGrupoB(gb);
    setGrupoC(gc);
    setGrupoD(gd);
    setGrupoE(ge);
    setGrupoF(gf);
    setGrupoG(gg);
    setGrupoH(gh);
  }, [posequipos]);

  return (
    <>
      <>
        <Grid
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={1}
        >
          <GridItem colSpan={2}>
            <Center mb={2}>
              <Badge adge variant="outline" fontSize={25} colorScheme="green">
                A1 vs 2B
              </Badge>
            </Center>
            <VStack>
              <Tag size="lg" variant="solid" colorScheme="teal">
                {a1?.nombre}
              </Tag>
              <Tag size="lg" variant="solid" colorScheme="pink">
                {b2?.nombre}
              </Tag>
            </VStack>
          </GridItem>

          <GridItem colSpan={1} />
          <GridItem colSpan={2}>
            <Center mb={2}>
              <Badge variant="outline" fontSize={25} colorScheme="green">
                1B vs 2A
              </Badge>
            </Center>
            <VStack>
              <Tag size="lg" variant="solid" colorScheme="teal">
                {b1?.nombre}
              </Tag>
              <Tag size="lg" variant="solid" colorScheme="pink">
                {a2?.nombre}
              </Tag>
            </VStack>
          </GridItem>
          <GridItem colSpan={2}>
            <Center mb={2}>
              <Badge variant="outline" fontSize={25} colorScheme="green">
                1C vs 2D
              </Badge>
            </Center>
            <VStack>
              <Tag size="lg" variant="solid" colorScheme="teal">
                {c1?.nombre}
              </Tag>
              <Tag size="lg" variant="solid" colorScheme="pink">
                {d2?.nombre}
              </Tag>
            </VStack>
          </GridItem>

          <GridItem colSpan={1} />
          <GridItem colSpan={2}>
            <Center mb={2}>
              <Badge variant="outline" fontSize={25} colorScheme="green">
                1D vs 2C
              </Badge>
            </Center>
            <VStack>
              <Tag size="lg" variant="solid" colorScheme="teal">
                {d1?.nombre}
              </Tag>
              <Tag size="lg" variant="solid" colorScheme="pink">
                {c2?.nombre}
              </Tag>
            </VStack>
          </GridItem>
          <GridItem colSpan={2}>
            <Center mb={2}>
              <Badge variant="outline" fontSize={25} colorScheme="green">
                E1 vs 2F
              </Badge>
            </Center>
            <VStack>
              <Tag size="lg" variant="solid" colorScheme="teal">
                {e1?.nombre}
              </Tag>
              <Tag size="lg" variant="solid" colorScheme="pink">
                {f2?.nombre}
              </Tag>
            </VStack>
          </GridItem>

          <GridItem colSpan={1} />
          <GridItem colSpan={2}>
            <Center mb={2}>
              <Badge variant="outline" fontSize={25} colorScheme="green">
                F1 vs 2E
              </Badge>
            </Center>
            <VStack>
              <Tag size="lg" variant="solid" colorScheme="teal">
                {f1?.nombre}
              </Tag>
              <Tag size="lg" variant="solid" colorScheme="pink">
                {e2?.nombre}
              </Tag>
            </VStack>
          </GridItem>
          <GridItem colSpan={2}>
            <Center mb={2}>
              <Badge variant="outline" fontSize={25} colorScheme="green">
                G1 vs 2H
              </Badge>
            </Center>
            <VStack>
              <Tag size="lg" variant="solid" colorScheme="teal">
                {g1?.nombre}
              </Tag>
              <Tag size="lg" variant="solid" colorScheme="pink">
                {h2?.nombre}
              </Tag>
            </VStack>
          </GridItem>

          <GridItem colSpan={1} />
          <GridItem colSpan={2}>
            <Center mb={2}>
              <Badge variant="outline" fontSize={25} colorScheme="green">
                H1 vs 2G
              </Badge>
            </Center>
            <VStack>
              <Tag size="lg" variant="solid" colorScheme="teal">
                {h1?.nombre}
              </Tag>
              <Tag size="lg" variant="solid" colorScheme="pink">
                {g2?.nombre}
              </Tag>
            </VStack>
          </GridItem>
          <GridItem colSpan={4} bg="tomato" />
        </Grid>
      </>

      <OctavosGrupo equipos={grupoA} grupo={"A"} />
      <OctavosGrupo equipos={grupoB} grupo={"B"} />
      <OctavosGrupo equipos={grupoC} grupo={"C"} />
      <OctavosGrupo equipos={grupoD} grupo={"D"} />
      <OctavosGrupo equipos={grupoE} grupo={"E"} />
      <OctavosGrupo equipos={grupoF} grupo={"F"} />
      <OctavosGrupo equipos={grupoG} grupo={"G"} />
      <OctavosGrupo equipos={grupoH} grupo={"H"} />
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
