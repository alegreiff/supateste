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
import { Accordion, Box } from "@chakra-ui/react";

export default function PronosPage({ user, data }) {
  const { partidos: basepartidos, clearPronos } = useDatosPollero(
    (state) => state
  );
  const { fechas } = usePollaSettings((state) => state);
  const { estado, fase, cargaPronos, rondas, comodines } = useFase(fechas);
  //console.log(estado, fase, cargaPronos);

  //console.log(estado, fase, cargaPronos, rondas, comodines);
  const [partidos, setPartidos] = useState([]);
  const { allPronos } = usePollaSettings((state) => state);
  const [pronosDB, setPronosDB] = useState([]);
  console.log({ pronosDB });

  useEffect(() => {
    const userPronos = allPronos.filter((ap) => ap.user_id === user.id);
    setPronosDB(userPronos);
  }, []);

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

  const pronosGrupo = (grupo) => {
    const pronos = pronosDB.filter((prono) => parseInt(prono.grupo) === grupo);
    return pronos;
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
          viejos grupos
          {/* <Accordion allowToggle>
            <GrupoProno
              partidos={partidosGrupo("A")}
              pronosdb={pronosGrupo("A")}
              pronoslistos={pronosGrupo("A").length}
            />
            <GrupoProno
              partidos={partidosGrupo("B")}
              pronosdb={pronosGrupo("B")}
              pronoslistos={pronosGrupo("B").length}
            />
            <GrupoProno
              partidos={partidosGrupo("C")}
              pronosdb={pronosGrupo("C")}
              pronoslistos={pronosGrupo("C").length}
            />
            <GrupoProno
              partidos={partidosGrupo("D")}
              pronosdb={pronosGrupo("D")}
              pronoslistos={pronosGrupo("D").length}
            />
            <GrupoProno
              partidos={partidosGrupo("E")}
              pronosdb={pronosGrupo("E")}
              pronoslistos={pronosGrupo("E").length}
            />
            <GrupoProno
              partidos={partidosGrupo("F")}
              pronosdb={pronosGrupo("F")}
              pronoslistos={pronosGrupo("F").length}
            />
            <GrupoProno
              partidos={partidosGrupo("G")}
              pronosdb={pronosGrupo("G")}
              pronoslistos={pronosGrupo("G").length}
            />
            <GrupoProno
              partidos={partidosGrupo("H")}
              pronosdb={pronosGrupo("H")}
              pronoslistos={pronosGrupo("H").length}
            />
          </Accordion> */}
        </>
      )}
      {cargaPronos && fase !== 1 && (
        <>
          <Box bg="green.300" w={400} p={5}>
            Los marcadores pueden ser cambiados tantas veces como el pollero
            desee. Antes de las 08:59:59 am de mañana sábado 04 de diciembre.
            Hora Colombia
          </Box>
          <Accordion defaultIndex={0}>
            <GrupoProno
              partidos={partidosFase(fase)}
              pronosdb={pronosGrupo(fase)}
              pronoslistos={pronosGrupo(fase).length}
            />
          </Accordion>
        </>
      )}
      {!cargaPronos && <Box>Reflexión</Box>}
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/polleros",
});
