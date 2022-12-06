import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useDatosPollero from "../../storedata/pollero";
import usePollaSettings from "../../storedata/settings";
import _ from "lodash";
import { Box, Button, Spacer, Tag, useDisclosure } from "@chakra-ui/react";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { PartidoDiario } from "../../components/polla/diario/partido";
import { supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { QuePasariaSiDiario } from "../../components/polla/diario/qpsdia";

export default function PaginaPolla({ puntosporpartido }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValueDate] = useState(new Date());
  const { fechas, allPronos, posiciones } = usePollaSettings((state) => state);
  const { fechaspartidos, partidos, pronospollero, usuario } = useDatosPollero(
    (state) => state
  );
  const [partidosHoy, setPartidosHoy] = useState(null);
  const [pronosPollero, setPronosPollero] = useState([]);

  console.log("PPS", puntosporpartido);

  useEffect(() => {
    if (usuario) {
      const userPronos = allPronos.filter((ap) => ap.user_id === usuario.id);
      setPronosPollero(userPronos);
    }
  }, []);

  useEffect(() => {
    setPartidosHoy(null);
    const dia = value.getDate();
    const mes = value.getMonth() + 1;
    let partidosDia = partidos.filter(
      (match) =>
        new Date(match.fecha).getDate() === dia &&
        new Date(match.fecha).getMonth() + 1 === mes &&
        match.idloc &&
        match.idvis
    );
    partidosDia = _.orderBy(partidosDia, ["fecha"], "asc");
    console.log(partidosDia);
    setPartidosHoy(partidosDia);
  }, [value, partidos]);

  useEffect(() => {
    if (fechas) {
      setValueDate(new Date(fechas.HOY));
    }
  }, []);

  const miProno = (p) => {
    console.log({ pronosPollero });
    if (!pronosPollero) return null;
    const prono = pronosPollero.find((prono) => prono.partido === p);
    console.log({ prono });
    return prono;
  };
  const partidostats = (p) => {
    if (!puntosporpartido) return null;
    const stats = puntosporpartido.find((match) => match.partido === p);

    if (stats) {
      console.log("SIIIIIII");
      return stats;
    } else {
      console.log("NOOOOOOOOO");
      return null;
    }
  };

  return (
    <>
      <h2>La polla diaria </h2>
      {/*  {JSON.stringify(value)} */}
      {/* <Box marginBottom={5}>
        {fechaspartidos &&
          fechaspartidos.map((dia, i) => (
            <Tag
              colorScheme={
                format(addDays(new Date(fechas.HOY), -1), "eeeddMMM") ===
                format(addDays(new Date(dia.dia), 0), "eeeddMMM")
                  ? "red"
                  : "facebook"
              }
              style={{ cursor: "pointer" }}
              m={2}
              p={2}
              key={i}
              onClick={() => {
                setValueDate(addDays(new Date(dia.dia), 1));
              }}
            >
              {format(addDays(new Date(dia.dia), 1), "eee dd MMM", {
                locale: es,
              })}
            </Tag>
          ))}
      </Box> */}
      <Button size="xs" colorScheme="pink" onClick={onOpen}>
        ¿QPS de todo el día?
      </Button>
      <QuePasariaSiDiario
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        posiciones={posiciones}
        partidosHoy={partidosHoy}
      />
      {partidosHoy &&
        partidosHoy.map((p, i) => (
          <>
            <PartidoDiario
              key={i}
              prono={miProno(p.id)}
              partido={p}
              statsmatch={partidostats(p.id)}
            ></PartidoDiario>

            <Box m={5} h={2} bg="polla.catar" />
          </>
        ))}
    </>
  );
}

/* 
    Function: ({activeStartDate, date, view }) => date.getDay() === 0

*/

export async function getServerSideProps(context) {
  const { data: puntosporpartido, error } = await supabaseServerClient(context)
    .from("puntosporpartido")
    .select("*");

  return {
    props: {
      puntosporpartido,
    },
  };
}
