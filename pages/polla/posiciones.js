import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
  Text,
} from "@chakra-ui/react";
import useDatosPollero from "../../storedata/pollero";
import usePollaSettings from "../../storedata/settings";

export default function PaginaPosiciones() {
  const { posiciones } = usePollaSettings((state) => state);
  const { usuario } = useDatosPollero((state) => state);
  const nombrePollero = (nombre) => {
    if (!nombre) {
      return "";
    }

    var first_letter = function (x) {
      if (x) {
        return x[0];
      } else {
        return "";
      }
    };

    return nombre
      .split(" ")
      .map(first_letter)
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <>
      {posiciones ? (
        <>
          <TableContainer>
            <Table variant="striped" colorScheme="cyan">
              <Thead>
                <Tr>
                  <Th>Pos</Th>
                  <Th>Pollero</Th>
                  <Th>Puntos</Th>
                  <Th>GCH</Th>
                  <Th>DBL</Th>
                  <Th>CH</Th>
                  <Th>SIM</Th>
                  <Th>♾️</Th>
                  <Th fontSize={30}>👪</Th>
                </Tr>
              </Thead>
              <Tbody>
                {posiciones.map((pos) => (
                  <Tr key={pos.userid}>
                    <Td>
                      <Text as="b">{pos.pos}</Text>
                    </Td>
                    <Td>
                      {pos.userid === usuario.id ? (
                        <Badge>{pos.alias}</Badge>
                      ) : (
                        pos.alias
                      )}
                    </Td>
                    <Td>
                      <Text as="b">{pos.pts}</Text>
                    </Td>
                    <Td>{pos.gch}</Td>
                    <Td>{pos.dbl}</Td>
                    <Td>{pos.ch}</Td>
                    <Td>{pos.sim}</Td>
                    <Td>{pos.blanco}</Td>
                    <Td>{nombrePollero(pos.amigo)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : (
        ""
      )}
    </>
  );
}

/* 
{pos.alias} - {nombrePollero(pos.amigo)}
{
  {
  "pos": 1,
  "alias": "Diego Forero",
  "pts": 10,
  "gch": 1,
  "dbl": 0,
  "ch": 0,
  "sim": 0,
  "bkc": 0,
  "bks": 0,
  "usedcom": 1,
  "blanco": 0,
  "nulo": 0,
  "userid": "16365542-92fd-4131-a5b6-6ed09254bd67",
  "amigo": "Luis Carlos Urrutia"
}
}
*/
