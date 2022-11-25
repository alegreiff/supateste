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
  Tag,
  Button,
  Avatar,
  AvatarBadge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
  Image,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useDatosPollero from "../../storedata/pollero";
import usePollaSettings from "../../storedata/settings";
import { FaChessKing, FaRegGrinTongueWink } from "react-icons/fa";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Polleropuntos } from "../../components/polla/posiciones/polleropuntos";

export default function PaginaPosiciones() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { posiciones } = usePollaSettings((state) => state);
  const { usuario, partidos, polleros, equipos } = useDatosPollero(
    (state) => state
  );
  console.log({ equipos });
  const [parts, setParts] = useState(0);
  const [curPoll, setCurPoll] = useState(null);
  useEffect(() => {
    const matchesplayed = partidos.filter((p) => p.procesado).length;
    setParts(matchesplayed);
  }, []);
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

  const datosDetallePollero = (pos) => {
    const datos = polleros.find((pll) => pll.id === pos.userid);
    const fav = equipos.find((eq) => eq.id === datos?.favorito);
    const pollero = {
      ...pos,
      ...datos,
      ...fav,
    };
    //const res = pos.concat(datos);
    setCurPoll(pollero);
  };

  const openDetalles = (pos) => {
    console.info("ABRE DETALLES");
    datosDetallePollero(pos);

    onOpen();
  };
  const closeDetalles = () => {
    console.info("CIERRE DETALLES");
    setCurPoll(null);
    onClose();
  };

  return (
    <>
      {posiciones ? (
        <>
          <TableContainer>
            <Table variant="striped" colorScheme="purple" size="lg">
              <TableCaption placement="top">
                <span style={{ fontSize: "25px" }}>★</span> Comodines
                disponibles. Partidos procesados:{" "}
                <Badge fontSize={30} colorScheme="purple">
                  {parts}
                </Badge>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Pos</Th>
                  <Th width={20}>★</Th>
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
                  <Tr
                    key={pos.userid}
                    //bg={pos.userid === usuario.id ? "yellow" : ""}
                    //bg={pos.userid === usuario.id ? "yellow" : ""}
                    style={{
                      backgroundColor:
                        pos.userid === usuario.id ? "red !important" : "",
                    }}
                  >
                    <Td>
                      <Text as="b">{pos.pos}</Text>
                    </Td>
                    <Td>{16 - (pos.bkc + pos.gch + pos.dbl)}</Td>
                    <Td>
                      <Button
                        onClick={() => {
                          openDetalles(pos);
                        }}
                        size="xs"
                        mr={2}
                        bg="transparent"
                      >
                        <Avatar
                          size="xs"
                          bg={
                            pos.pos < 11
                              ? "gold"
                              : pos.pos < 50
                              ? "red.300"
                              : pos.pos > 135
                              ? "green.300"
                              : "gray.300"
                          }
                        ></Avatar>
                      </Button>
                      {pos.userid === usuario.id ? (
                        <Badge p={2} fontSize={25}>
                          {pos.alias}
                        </Badge>
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
              <Tfoot>
                <Tr>
                  <Th>Pos</Th>
                  <Th width={20}>★</Th>
                  <Th>Pollero</Th>
                  <Th>Puntos</Th>
                  <Th>GCH</Th>
                  <Th>DBL</Th>
                  <Th>CH</Th>
                  <Th>SIM</Th>
                  <Th>♾️</Th>
                  <Th fontSize={30}>👪</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Modal isOpen={isOpen} onClose={closeDetalles}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{curPoll ? curPoll.alias : ""} </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {curPoll ? (
                  <Card maxW="sm">
                    <CardBody>
                      <Box>
                        <HStack>
                          <Avatar
                            margin="1"
                            size="2xl"
                            src={`https://dsbiqexajjcyswddmxve.supabase.co/storage/v1/object/public/polleres/${curPoll?.userid}/perfil.png`}
                          />
                          <Image
                            border={`3px solid`}
                            src={`/banderas/${curPoll.code.toLowerCase()}.png`}
                            alt={curPoll.nombre}
                            height={120}
                            width={120}
                            borderRadius="50%"
                          />
                        </HStack>

                        {/* <Badge m={5} p={5} fontSize={21}>
                          {curPoll.nombre}
                        </Badge> */}
                      </Box>

                      <Stack mt="6" spacing="3">
                        <Polleropuntos pollero={curPoll.userid} />
                        <Tag>Hincha de: {curPoll.hincha}</Tag>
                        <Tag>Su pollero: {curPoll.amigo}</Tag>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter></CardFooter>
                  </Card>
                ) : (
                  ""
                )}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={closeDetalles}>
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
}

/* 
{"pos":80,"alias":"Juan Santiago Perez","pts":44,"gch":0,"dbl":4,"ch":1,"sim":5,"bkc":2,"bks":7,"usedcom":6,"blanco":9,"nulo":0,"userid":"424dec32-2162-4ee5-926e-03feb0d65fea","amigo":"Luis Fernando Velasco","id":"424dec32-2162-4ee5-926e-03feb0d65fea","favorito":4,"hincha":"Atlético Nacional","isPagado":true,"isPollero":false,"pronos":48}
*/
