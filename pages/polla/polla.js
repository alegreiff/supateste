import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useDatosPollero from "../../storedata/pollero";
import usePollaSettings from "../../storedata/settings";
import _ from "lodash";
import { Box, Spacer, Tag } from "@chakra-ui/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PartidoDiario } from "../../components/polla/diario/partido";

export default function PaginaPolla() {
  const [value, setValueDate] = useState(new Date());
  const { fechas, allPronos } = usePollaSettings((state) => state);
  const { fechaspartidos, partidos, pronospollero, usuario } = useDatosPollero(
    (state) => state
  );
  const [partidosHoy, setPartidosHoy] = useState(null);
  const [pronosPollero, setPronosPollero] = useState([]);

  //console.log({ partidos });

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

  return (
    <>
      <h2>La polla diaria </h2>

      <Box marginBottom={5}>
        {fechaspartidos &&
          fechaspartidos.map((dia, i) => (
            <Tag
              m={2}
              p={2}
              key={i}
              onClick={() => {
                setValueDate(new Date(dia.mifecha));
              }}
            >
              {format(new Date(dia.mifecha), "eee dd MMM", { locale: es })}
            </Tag>
          ))}
      </Box>

      {partidosHoy &&
        partidosHoy.map((p) => (
          <PartidoDiario
            key={p.id}
            prono={miProno(p.id)}
            partido={p}
          ></PartidoDiario>
        ))}
    </>
  );
}

/* 
    Function: ({activeStartDate, date, view }) => date.getDay() === 0

*/
