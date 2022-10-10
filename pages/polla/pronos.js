import _ from "lodash";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import useDatosPollero from "../../storedata/pollero";
import usePollaSettings from "../../storedata/settings";
import useFase from "../../hooks/useFase";
import { useEffect, useState } from "react";
import { GrupoProno } from "../../components/polla/pronos/GrupoProno";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

export default function PronosPage({ user, data }) {
  const { partidos: basepartidos, clearPronos } = useDatosPollero(
    (state) => state
  );
  const { fechas } = usePollaSettings((state) => state);
  const { estado, fase, cargaPronos, rondas, comodines } = useFase(fechas);
  //console.log(estado, fase, cargaPronos);

  //console.log(estado, fase, cargaPronos, rondas, comodines);
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    clearPronos();
  }, []);

  useEffect(() => {
    if (cargaPronos) {
      if (fase === 1) {
        const part = basepartidos.filter((match) => match.grupo);
        setPartidos(part);
      } else if (fase === 5) {
        const part = basepartidos.filter((match) => match.id > 62);
        setPartidos(part);
      } else {
        const part = basepartidos.filter((match) => match.ronda === rondas[0]);
        setPartidos(part);
      }
    }
  }, []);

  const partidosGrupo = (grupo) => {
    const p = partidos.filter((p) => p.grupo === grupo);
    return { p, grupo, comodines };
  };

  const partidosFase = (fase) => {
    const p = partidos;
    let grupo = fase;
    return { p, grupo, comodines };
  };

  return (
    <>
      <h2>Página de pronósticos</h2>
      {cargaPronos && fase === 1 && (
        <>
          <Accordion allowToggle>
            <GrupoProno partidos={partidosGrupo("A")} />
            <GrupoProno partidos={partidosGrupo("B")} />
            <GrupoProno partidos={partidosGrupo("C")} />
            <GrupoProno partidos={partidosGrupo("D")} />
            <GrupoProno partidos={partidosGrupo("E")} />
            <GrupoProno partidos={partidosGrupo("F")} />
            <GrupoProno partidos={partidosGrupo("G")} />
            <GrupoProno partidos={partidosGrupo("H")} />
          </Accordion>
        </>
      )}
      {cargaPronos && fase !== 1 && (
        <>
          <Accordion defaultIndex={0}>
            <GrupoProno partidos={partidosFase(fase)} />
          </Accordion>
        </>
      )}
      {!cargaPronos && <Box>Reflexión</Box>}
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/polla",
});
