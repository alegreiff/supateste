import { useEffect, useState } from "react";
import useDatosPollero from "../../storedata/pollero";
import usePollaSettings from "../../storedata/settings";
import _ from "lodash";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Box } from "@chakra-ui/react";

export default function MiPolla() {
  const { partidos: matches, usuario } = useDatosPollero((state) => state);
  const { allPronos } = usePollaSettings((state) => state);

  const [misPronos, setMisPronos] = useState(null);
  const [partidosGrupos, setPartidosGrupos] = useState(null);

  useEffect(() => {
    if (allPronos && usuario) {
      const misp = allPronos.filter((prono) => prono.user_id === usuario.id);
      console.log({ misp });
      setMisPronos(misp);
    }

    if (matches) {
      let matchesGrupos = matches.filter((match) => match.grupo != null);
      matchesGrupos = _.sortBy(matchesGrupos, ["fecha"], ["asc"]);
      setPartidosGrupos(matchesGrupos);
    }
  }, []);

  const pron = (p) => {
    return misPronos.find((prono) => prono.partido === p);
  };

  return (
    <>
      <h2>Mi POLLA</h2>
      {partidosGrupos ? (
        <Box width={800}>
          <Table className="mipollatable">
            <Thead>
              <Tr>
                <Th>Partido</Th>
                <Th>Local</Th>
                <Th>Pron. Loc</Th>
                <Th>Visitante</Th>
                <Th>Pron. Vis</Th>
                <Th>Marcador</Th>
                <Th>Premio</Th>
                <Th>Puntos</Th>
              </Tr>
            </Thead>
            <Tbody>
              {partidosGrupos.map((p) => (
                <Tr
                  key={p.id}
                  style={{
                    backgroundColor: pron(p.id).comodin ? "#eafaf1" : "white",
                  }}
                >
                  <Td>{p.id}</Td>
                  <Td>{p.eqloc}</Td>
                  <Td> {pron(p.id).pron_loc} </Td>
                  <Td>{p.eqvis}</Td>
                  <Td> {pron(p.id).pron_vis} </Td>
                  {pron(p.id).procesado ? (
                    <>
                      <Td>
                        {" "}
                        {p.mlocal} - {p.mvisit}{" "}
                      </Td>
                      <Td> {pron(p.id).resultado} </Td>
                      <Td> {pron(p.id).puntos} </Td>
                    </>
                  ) : (
                    ""
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        "NO"
      )}
    </>
  );
}
/*

{
  "id": 145,
  "created_at": "2022-11-09T22:14:35.186806+00:00",
  "user_id": "53f46d4f-a142-4428-96fe-cc62a549d89d",
  "partido": 1,
  "pron_loc": 2,
  "pron_vis": 0,
  "comodin": false,
  "grupo": "A",
  "cambios": 4,
  "procesado": false,
  "resultado": null,
  "puntos": null
}

{"id":48,"grupo":"G","ronda":3,"fecha":"2022-12-02T19:00:00+00:00","eqloc":"Camerún","locid":"CM","eqvis":"Brasil","visid":"BR","power":3304,"idvis":4,"idloc":6,"mlocal":null,"mvisit":null,"procesado":false}]
*/
