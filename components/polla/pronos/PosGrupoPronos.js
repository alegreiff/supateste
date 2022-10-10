import _ from "lodash";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";

export const PosGrupoPronos = ({ equipos: eq, grupo }) => {
  const { pronospollero } = useDatosPollero((state) => state);
  const [equipos, setEquipos] = useState([]);
  useEffect(() => {
    let eqx = _.cloneDeep(eq);
    const pronosGrupo = pronospollero.filter(
      (pronos) => pronos.grupo === grupo
    );

    pronosGrupo.forEach((prono) => {
      let LOC = eqx.find((eq) => eq.id === prono.idloc);
      let VIS = eqx.find((eq) => eq.id === prono.idvis);
      if (prono.loc > prono.vis) {
        LOC.PG++;
        LOC.GF += parseInt(prono.loc);
        LOC.GC += parseInt(prono.vis);
        VIS.PP++;
        VIS.GF += parseInt(prono.vis);
        VIS.GC += parseInt(prono.loc);
      }
      if (prono.loc < prono.vis) {
        LOC.PP++;
        LOC.GF += parseInt(prono.loc);
        LOC.GC += parseInt(prono.vis);
        VIS.PG++;
        VIS.GF += parseInt(prono.vis);
        VIS.GC += parseInt(prono.loc);
      }
      if (prono.loc === prono.vis) {
        LOC.PE++;
        LOC.GF += parseInt(prono.loc);
        LOC.GC += parseInt(prono.vis);
        VIS.PE++;
        VIS.GF += parseInt(prono.vis);
        VIS.GC += parseInt(prono.loc);
      }
    });

    let eq_order = eqx.map((eq) => ({
      ...eq,
      PTS: eq.PG * 3 + eq.PE,
      GD: eq.GF - eq.GC,
    }));
    const equipos_ordenados = _.orderBy(
      eq_order,
      ["PTS", "GD", "GF"],
      ["desc", "desc", "asc"]
    );
    //eq_order = _.sortBy(eq_order, ["PTS", "GD", "GF"], ["asc", "asc", "desc"]);

    setEquipos(equipos_ordenados);
  }, [pronospollero]);

  return (
    <TableContainer maxWidth="600px">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Equipo</Th>
            <Th>PG</Th>
            <Th>PP</Th>
            <Th>PE</Th>
            <Th>GF</Th>
            <Th>GC</Th>
            <Th>DG</Th>
            <Th>PTS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {equipos &&
            equipos.map((eq, i) => (
              <Tr key={eq.id}>
                <Td>{i + 1}</Td>
                <Td>
                  [ {eq.id} ] {eq.nombre}
                </Td>
                <Td>{eq.PG}</Td>
                <Td>{eq.PP}</Td>
                <Td>{eq.PE}</Td>
                <Td>{eq.GF}</Td>
                <Td>{eq.GC}</Td>
                <Td>{eq.GD}</Td>
                <Td>{eq.PTS}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
