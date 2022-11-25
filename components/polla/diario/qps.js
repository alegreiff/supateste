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

export const QuePasariaSi = ({
  isOpen,
  onOpen,
  onClose,
  posOld,
  partido,
  prono,
}) => {
  const { allPronos, posiciones } = usePollaSettings((state) => state);
  const { partidos, usuario } = useDatosPollero((state) => state);
  console.log({ posiciones });
  const [pos, setPos] = useState(null);
  const [pronosPollero, setPronosPollero] = useState([]);
  const [qps, setQps] = useState([]);

  useEffect(() => {
    if (usuario) {
      const userPronos = allPronos.filter(
        (ap) => ap.user_id === usuario.id && !ap.procesado
      );
      const primerqps = [
        { ppp: prono.partido, mmll: prono.pron_loc, mmvv: prono.pron_vis },
      ];
      /*userPronos.forEach((prono) => {
        primerqps.push({
          ppp: prono.partido,
          mmll: prono.pron_loc,
          mmvv: prono.pron_vis,
        });
      });*/
      setQps(primerqps);
      setPronosPollero(userPronos);
    }
  }, []);
  useEffect(() => {
    if (posOld) {
      setPos(posOld);
    }
  }, [posOld]);

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
    const ppp = registro;
    const mmll = qps[0].mmll;
    const mmvv = qps[0].mmvv;
    if (elemento === "mmll") {
      setQps([{ ppp, mmll: valor, mmvv }]);
    } else if (elemento === "mmvv") {
      setQps([{ ppp, mmll, mmvv: valor }]);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            QPS para {partido.eqloc} vs {partido.eqvis}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height="80vh" className="multipronos" p={0} m={0}>
              {qps[0] ? (
                <Box>
                  <HStack>
                    <Badge w={100}>{partido.eqloc}</Badge>
                    <NumberInput
                      min={0}
                      max={20}
                      width="120px"
                      value={qps[0].mmll}
                      onChange={(e) => {
                        cambiaForma(qps[0].ppp, "mmll", e);
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
                      width="120px"
                      value={qps[0].mmvv}
                      onChange={(e) => {
                        cambiaForma(qps[0].ppp, "mmvv", e);
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Badge w={100}>{partido.eqvis}</Badge>
                  </HStack>
                  <Button size="lg" onClick={qps1} colorScheme="pink">
                    ¿Qué pasaría con este marcador?
                  </Button>
                </Box>
              ) : (
                ""
              )}

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
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
