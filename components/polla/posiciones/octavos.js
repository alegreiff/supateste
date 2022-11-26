import { Badge, Box } from "@chakra-ui/react";
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
        <Box>
          <Badge>
            {a1?.nombre} vs {b2?.nombre}
          </Badge>
          <Badge>
            {c1?.nombre} vs {d2?.nombre}
          </Badge>
        </Box>
        <Box>
          <Badge>
            {e1?.nombre} vs {f2?.nombre}
          </Badge>

          <Badge>
            {g1?.nombre} vs {h2?.nombre}
          </Badge>
        </Box>

        <Box>
          <Badge>
            {b1?.nombre} vs {a2?.nombre}
          </Badge>
          <Badge>
            {d1?.nombre} vs {c2?.nombre}
          </Badge>
        </Box>
        <Box>
          <Badge>
            {f1?.nombre} vs {e2?.nombre}
          </Badge>
          <Badge>
            {h1?.nombre} vs {g2?.nombre}
          </Badge>
        </Box>
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
