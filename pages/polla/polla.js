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
  const { fechas } = usePollaSettings((state) => state);
  const { fechaspartidos, partidos, pronospollero } = useDatosPollero(
    (state) => state
  );
  const [partidosHoy, setPartidosHoy] = useState(null);

  //console.log({ partidos });

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
    if (!pronospollero) return null;
    const prono = pronospollero.find((prono) => prono.id === p);
    return prono;
  };

  return (
    <>
      <h2>La polla diaria {JSON.stringify(value)} </h2>

      <Box marginBottom={5}>
        {fechaspartidos &&
          fechaspartidos.map((dia, i) => (
            <Tag
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
