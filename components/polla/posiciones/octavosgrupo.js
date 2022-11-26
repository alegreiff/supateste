import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

export const OctavosGrupo = ({ equipos, grupo }) => {
  return (
    <>
      {equipos ? (
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
                  <Tr
                    key={eq.id}
                    background={i < 2 ? "polla.clasificado" : "polla.eliminado"}
                    fontWeight={i < 2 ? "bold" : "normal"}
                  >
                    <Td>{i + 1}</Td>
                    <Td>{eq.nombre}</Td>
                    <Td>{eq.PG}</Td>
                    <Td>{eq.PP}</Td>
                    <Td>{eq.PE}</Td>
                    <Td>{eq.GF}</Td>
                    <Td>{eq.GC}</Td>
                    <Td>{eq.dif}</Td>
                    <Td>{eq.pts}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </>
  );
};
