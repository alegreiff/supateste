import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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

export const QuePasariaSi = ({ isOpen, onOpen, onClose, posOld }) => {
  const { allPronos } = usePollaSettings((state) => state);
  const { partidos, usuario } = useDatosPollero((state) => state);
  const [pos, setPos] = useState(null);
  const [pronosPollero, setPronosPollero] = useState([]);
  const [qps, setQps] = useState([]);

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
    if (posOld) {
      setPos(posOld);
    }
  }, [posOld]);

  async function qps1() {
    //select * from pruebafuncionx(array[row(14,1,0),row(15,2,0),row(16,3,1)]::qpsprono[]);
    //let arr = [{ ppp: 16, mmll: 2, mmvv: 0 }];
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={qps1}></Button>
            <Box className="multipronos" p={0} m={0}>
              {/* {JSON.stringify(pronosPollero)} */}
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
                      <Tr key={i}>
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
