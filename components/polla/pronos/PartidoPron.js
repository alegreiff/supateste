import {
  Badge,
  Box,
  Checkbox,
  FormControl,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";

export const PartidoPron = ({
  partido,
  pronodb,
  cuentaComodines,
  estadoComodines,
  maxComodines,
}) => {
  const { addProno } = useDatosPollero((state) => state);
  const [loc, setLoc] = useState(null);
  const [vis, setVis] = useState(null);
  const [msg, setMsg] = useState("");
  const [com, setCom] = useState(false);
  const [mod, setMod] = useState(true);

  useEffect(() => {
    if (pronodb) {
      const loc = parseInt(pronodb.pron_loc);
      const vis = parseInt(pronodb.pron_vis);
      setCom(pronodb.comodin);
      setLoc(loc);
      setVis(vis);
    }
  }, [pronodb]);

  useEffect(() => {
    if (estadoComodines === maxComodines) {
      console.log("CERRADO", partido.id);
      setMod(false);
    } else {
      console.log("ABIERTO", partido.id);
      setMod(true);
    }
  }, [estadoComodines, maxComodines, cambiaComodinFromPronos]);

  useEffect(() => {
    if (loc != null && vis != null && loc >= 0 && vis >= 0) {
      //console.log("LOKKE", partido.id);
      addProno({
        id: partido.id,
        grupo: partido.grupo,
        loc: parseInt(loc),
        vis: parseInt(vis),
        com: com,
        //idloc: partido.idloc,
        //idvis: partido.idvis,
      });

      console.log("EN ESTE PUNTO", loc, vis, com);
      /* if (loc === vis) console.log("ZEMPATTE", loc, vis);
      setMsg(
        `ZEMP -- PT: ${partido.id} - ${partido.idloc} ${loc} -  ${partido.idvis} ${vis} `
      );
      if (loc > vis)
        setMsg(
          `LOC -- PT: ${partido.id} - ${partido.idloc} ${loc} -  ${partido.idvis} ${vis} `
        );
      if (loc < vis)
        setMsg(
          `VIS -- PT: ${partido.id} - ${partido.idloc} ${loc} -  ${partido.idvis} ${vis} `
        ); */
    } else {
      setMsg("");
    }
  }, [loc, vis, com]);

  const cambiaComodinFromPronos = () => {
    const nuevoValor = true;
    console.log("FROMPRONNOS", nuevoValor);
    setCom(nuevoValor);
    cuentaComodines(nuevoValor);
  };

  const cambiaComodin = () => {
    const nuevoValor = !com;
    console.log("KNValue", nuevoValor);
    setCom(nuevoValor);
    cuentaComodines(nuevoValor);
  };

  return (
    <>
      <FormControl>
        <HStack>
          <Box w={120}>
            <Badge>{partido.eqloc}</Badge>
            <NumberInput
              min={0}
              max={20}
              width="70px"
              value={parseInt(loc) >= 0 ? loc : ""}
              onChange={(e) => {
                setLoc(e);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box w={120}>
            <Badge>{partido.eqvis}</Badge>
            <NumberInput
              min={0}
              max={20}
              width="70px"
              value={parseInt(vis) >= 0 ? vis : ""}
              onChange={(e) => {
                setVis(e);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box>
            <Checkbox
              tabIndex="-1"
              size="lg"
              onChange={cambiaComodin}
              isChecked={com}
              //value={com}
              disabled={!com && !mod ? true : false}
            >
              Comodín
            </Checkbox>
          </Box>
        </HStack>
        {/* <Input
          type="number"
          width="70px"
          onChange={(e) => {
            setLoc(e.target.value);
          }}
          placeholder={loc}
          value={loc}
        />
        {partido.eqvis}
        <Input
          type="number"
          width="70px"
          onChange={(e) => {
            setVis(e.target.value);
          }}
          value={vis}
        /> */}
        <span>{msg}</span>
      </FormControl>
    </>
  );
};
