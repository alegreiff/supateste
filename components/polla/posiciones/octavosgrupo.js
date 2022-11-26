import {
  Table,
  TableCaption,
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
        <TableContainer maxWidth="550px" mb={5}>
          <Table size="sm">
            <TableCaption placement="top">
              Grupo <strong>{grupo}</strong>
            </TableCaption>
            <Thead>
              <Tr>
                <Th w={10}>#</Th>
                <Th w={30}>Equipo</Th>
                <Th>PTS</Th>
                <Th>DG</Th>
                <Th>PG</Th>
                <Th>PP</Th>
                <Th>PE</Th>
                <Th>GF</Th>
                <Th>GC</Th>
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
                    <Td>
                      <strong>{eq.pts}</strong>
                    </Td>
                    <Td>{eq.dif}</Td>
                    <Td>{eq.PG}</Td>
                    <Td>{eq.PP}</Td>
                    <Td>{eq.PE}</Td>
                    <Td>{eq.GF}</Td>
                    <Td>{eq.GC}</Td>
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
