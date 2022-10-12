import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";

export const PartidoPron = ({ partido, pronodb }) => {
  const { addProno } = useDatosPollero((state) => state);
  const [loc, setLoc] = useState(null);
  const [vis, setVis] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (pronodb) {
      const loc = parseInt(pronodb.pron_loc);
      const vis = parseInt(pronodb.pron_vis);
      setLoc(loc);
      setVis(vis);
    }
  }, [pronodb]);

  useEffect(() => {
    if (loc != null && vis != null && loc >= 0 && vis >= 0) {
      //console.log("LOKKE", partido.id);
      addProno({
        id: partido.id,
        grupo: partido.grupo,
        loc: parseInt(loc),
        vis: parseInt(vis),
        com: false,
        //idloc: partido.idloc,
        //idvis: partido.idvis,
      });

      console.log("EN ESTE PUNTO", loc, vis);
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
  }, [loc, vis]);

  return (
    <>
      <FormControl>
        <HStack>
          <Box w={150}>
            {partido.eqloc}
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

          <Box w={150}>
            {partido.eqvis}
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
            <Checkbox iconColor="green" iconSize="2rem">
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
