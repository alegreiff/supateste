import {
  Badge,
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";
import usePollaSettings from "../../../storedata/settings";

export const QuePasariaSiPartido = ({
  isOpen,
  onOpen,
  onClose,
  posiciones,
  partidosHoy,
}) => {
  const { allPronos } = usePollaSettings((state) => state);
  const { partidos, usuario } = useDatosPollero((state) => state);
  const [pos, setPos] = useState(null);
  const [pronosPollero, setPronosPollero] = useState([]);
  const [partdia, setPartdia] = useState([]);
  const [qps, setQps] = useState([]);
  const [qpsDiario, setQpsDiario] = useState([]);
  console.log({ partdia });

  useEffect(() => {
    if (usuario) {
      const userPronos = allPronos.filter(
        (ap) => ap.user_id === usuario.id && !ap.procesado
      );
      const primerqps = [];
      userPronos.forEach((prono) => {
        primerqps.push({
          ppp: prono.partido,
          mmll: prono.pron_loc,
          mmvv: prono.pron_vis,
        });
      });
      setQps(primerqps);
      setPronosPollero(userPronos);
    }
  }, []);
  useEffect(() => {
    if (partidosHoy) {
      const nojugados = partidosHoy.filter((p) => !p.procesado);
      console.log({ pronosPollero });

      const qpsDiario = [];
      nojugados.forEach((p) => {
        let partidoProno = pronosPollero.find(
          (match) => match.partido === p.id
        );
        qpsDiario.push({
          ppp: p.id,
          mmll: partidoProno.pron_loc,
          mmvv: partidoProno.pron_vis,
        });
      });
      setQpsDiario(qpsDiario);

      setPartdia(nojugados);
    }
    return () => {
      // cancel the subscription
      setPartdia([]);
    };
  }, [partidosHoy, pronosPollero]);

  useEffect(() => {
    if (posiciones) {
      const posqps = posiciones.map((po) => ({
        p: po.pos,
        nom: po.alias,
        pun: po.pts,
      }));

      setPos(posqps);
    }
  }, [posiciones]);

  const ressetPos = () => {
    if (posiciones) {
      const posqps = posiciones.map((po) => ({
        p: po.pos,
        nom: po.alias,
        pun: po.pts,
      }));

      setPos(posqps);
    }
  };

  async function qpsDiaPerfecto() {
    let arr = qpsDiario;

    let { data, error } = await supabaseClient.rpc("pruebafuncionx", {
      arr,
    });

    if (error) {
      console.error(error);
    } else {
      setPos(data);
      console.log(data);
    }
  }

  async function qps1() {
    let arr = qps;

    let { data, error } = await supabaseClient.rpc("pruebafuncionx", {
      arr,
    });

    if (error) {
      console.error(error);
    } else {
      setPos(data);
      console.log(data);
    }
  }
  const cambiaForma = (registro, elemento, valor) => {
    const newArr = qpsDiario.map((obj) => {
      if (obj.ppp === registro) {
        if (elemento === "mmll") {
          return { ...obj, mmll: valor };
        } else if (elemento === "mmvv") {
          return { ...obj, mmvv: valor };
        }
      }

      return obj;
    });

    console.log({ newArr });
    setQpsDiario(newArr);
  };
  const nombreEquipos = (partido) => {
    if (partdia) {
      const equipos = partdia.find((p) => p.id === partido);
      console.log(equipos);
      return [equipos.eqloc, equipos.eqvis];
    } else {
      return ["Cúcuta", "Envigado"];
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>¿Proyección QPS del día pollero?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={qps1}>Polla perfecta</Button>
            <Button onClick={ressetPos}>Tabla real</Button>

            <Box>
              {setQpsDiario.length > 0 ? (
                <form>
                  <>
                    {qpsDiario.map((q, i) => (
                      <div key={i}>
                        <HStack>
                          <Badge w={150}>{nombreEquipos(q.ppp)[0]}</Badge>
                          <NumberInput
                            min={0}
                            max={20}
                            width="70px"
                            value={q.mmll}
                            onChange={(e) => {
                              cambiaForma(q.ppp, "mmll", e);
                            }}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>

                          <NumberInput
                            min={0}
                            max={20}
                            width="70px"
                            value={q.mmvv}
                            onChange={(e) => {
                              cambiaForma(q.ppp, "mmvv", e);
                            }}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <Badge w={150}>{nombreEquipos(q.ppp)[1]}</Badge>
                        </HStack>
                      </div>
                    ))}
                    <Button
                      size="lg"
                      onClick={qpsDiaPerfecto}
                      colorScheme="pink"
                    >
                      ¿Qué pasaría con estos marcadores para hoy?
                    </Button>
                  </>
                </form>
              ) : (
                ""
              )}
            </Box>
            <Box height="80vh" className="multipronos" p={0} m={0}>
              {pos ? (
                <Table variant="simple" size="sm" width={250}>
                  <Thead>
                    <Tr>
                      <Th>Pos</Th>
                      <Th>Nombre</Th>
                      <Th>Pts</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pos.map((score, i) => (
                      <Tr
                        key={i}
                        bg={usuario.alias === score.nom ? "lime" : ""}
                      >
                        <Td isNumeric>{score.p}</Td>
                        <Td>{score.nom}</Td>
                        <Td isNumeric>{score.pun}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                "NO POS"
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
