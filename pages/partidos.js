import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Center, Flex, Text, Box } from "@chakra-ui/react";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import estilos from "../styles/TablaBase.module.css";
import { FechaSingle } from "../components/Fixture/FechaSingle";
import { BanderaPais } from "../components/Fixture/BanderaPais";
import { EstrellasPartido } from "../components/Fixture/EstrellasPartido";

import useDatosPollero from "../storedata/pollero";

export default function Partidos() {
  const [mounted, setMounted] = useState(false);
  const { partidos: matches } = useDatosPollero((state) => state);
  const [datos, setDatos] = useState(matches);
  useEffect(() => {
    console.log("M O U N T E D");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (matches) {
      const grupos = matches.filter((match) => match.id < 49);
      setDatos(grupos);
    }
  }, []);

  console.log(datos[0]);

  const losdatos = useMemo(() => datos, [datos]);

  const lascolumnas = useMemo(
    () => [
      {
        Header: "Fechas",
        columns: [
          {
            Header: "Fecha",
            accessor: "fecha",

            Cell: ({ value }) => {
              return <FechaSingle date={value} />;
            },
          },
        ],
      },
      {
        Header: "Partidos",
        columns: [
          {
            Header: "Equipo",
            accessor: "eqloc",
            width: 100,

            Cell: ({ row: { original } }) => {
              if (original.locid) {
                //return original.code_loc;
                return (
                  <BanderaPais
                    bandera={original.locid}
                    nombre={original.eqloc}
                    tipo="local"
                  />
                );
              } else {
                return original.eqloc;
              }
            },
          },
          {
            Header: "Equipo",
            accessor: "visitante",
            width: 100,

            Cell: ({ row: { original } }) => {
              if (original.visid) {
                //return original.code_vis;
                return (
                  <BanderaPais
                    bandera={original.visid}
                    nombre={original.eqvis}
                    tipo="visitante"
                  />
                );
              } else {
                return original.eqvis;
              }
            },
          },
          {
            Header: "GRUPO",
            accessor: "grupo",
            maxWidth: 60,
            Cell: ({ value }) => {
              return (
                <Center>
                  <Text fontSize="4xl" color="grey">
                    {" "}
                    {value}{" "}
                  </Text>
                </Center>
              );
            },
          },

          {
            Header: "Interés",
            accessor: "power",
            //width: 10,
            maxWidth: 60,
            disableSortBy: false,
            Cell: ({ row: { original } }) => {
              if (original.power > 3350) {
                return <EstrellasPartido value={original.power} times={5} />;
              } else if (original.power > 3260) {
                return <EstrellasPartido value={original.power} times={4} />;
              } else if (original.power > 3150) {
                return <EstrellasPartido value={original.power} times={3} />;
              } else if (original.power > 3080) {
                return <EstrellasPartido value={original.power} times={2} />;
              } else {
                return <EstrellasPartido value={original.power} times={1} />;
              }
            },
          },
        ],
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns: lascolumnas, data: losdatos },
    useSortBy
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    mounted && (
      <Box as="table" {...getTableProps()} size="sm">
        <Box as="thead">
          {headerGroups.map((headerGroup, ii) => (
            <Box as="tr" {...headerGroup.getHeaderGroupProps()} key={ii}>
              {headerGroup.headers.map((column, i2) => (
                <Box
                  as="th"
                  className={estilos.centered}
                  userSelect="none"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={i2}
                  style={{
                    width: column.width,
                    maxWidth: column.maxWidth,
                  }}
                >
                  <Flex alignItems="center" className={estilos.icon}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon ml={1} w={4} h={4} />
                      ) : (
                        <ChevronUpIcon ml={1} w={4} h={4} />
                      )
                    ) : (
                      ""
                    )}
                  </Flex>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
        <Box as="tbody" {...getTableBodyProps()}>
          {rows.map((row, i3) => {
            prepareRow(row);
            return (
              <Box as="tr" {...row.getRowProps()} key={i3}>
                {row.cells.map((cell, i4) => {
                  const power = cell.row.values.power;
                  return (
                    <Box as="td" {...cell.getCellProps()} key={i4}>
                      {cell.render("Cell")}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Box>
    )
  );
}
