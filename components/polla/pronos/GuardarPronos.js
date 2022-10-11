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
  useDisclosure,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";

export const GuardarPronos = ({ grupo }) => {
  const { pronospollero, usuario } = useDatosPollero((state) => state);
  const [pronosUser, setPronosUser] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const pronosGrupo = pronospollero.filter(
      (pronos) => pronos.grupo === grupo
    );
    const pronos_to_save = [];
    pronosGrupo.forEach((prono) => {
      pronos_to_save.push({
        partido: prono.id,
        user_id: usuario.id,
        pron_loc: parseInt(prono.loc),
        pron_vis: parseInt(prono.vis),
        comodin: prono.com,
        grupo,
      });
    });

    setPronosUser(pronos_to_save);
  }, [pronospollero, grupo]);

  async function guardaPronos() {
    //console.log(pronosUser);
    const { data, error } = await supabaseClient
      .from("pronos")
      .upsert(pronosUser);
  }

  return (
    <Box bg="lavenderblush">
      <Button onClick={onOpen}>Guarda grupo</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <p> {`este es el grupo ${grupo}`} </p>
            <h3> {usuario.id} </h3>
            {JSON.stringify(pronosUser)}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={guardaPronos}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
