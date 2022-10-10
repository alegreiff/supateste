import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";

export const PartidoPron = ({ partido }) => {
  const { addProno } = useDatosPollero((state) => state);
  const [loc, setLoc] = useState(null);
  const [vis, setVis] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log(loc, vis);
    if (loc && vis) {
      addProno({
        id: partido.id,
        grupo: partido.grupo,
        loc,
        vis,
        com: false,
        idloc: partido.idloc,
        idvis: partido.idvis,
      });
      if (loc === vis)
        setMsg(
          `EMP -- PT: ${partido.id} - ${partido.idloc} ${loc} -  ${partido.idvis} ${vis} `
        );
      if (loc > vis)
        setMsg(
          `LOC -- PT: ${partido.id} - ${partido.idloc} ${loc} -  ${partido.idvis} ${vis} `
        );
      if (loc < vis)
        setMsg(
          `VIS -- PT: ${partido.id} - ${partido.idloc} ${loc} -  ${partido.idvis} ${vis} `
        );
    } else {
      setMsg("");
    }
  }, [loc, vis]);

  return (
    <>
      <FormControl>
        {partido.eqloc}
        <Input
          type="number"
          width="70px"
          onBlur={(e) => {
            setLoc(e.target.value);
          }}
        />
        {partido.eqvis}
        <Input
          type="number"
          width="70px"
          onBlur={(e) => {
            setVis(e.target.value);
          }}
        />
        <span>{msg}</span>
      </FormControl>
    </>
  );
};
