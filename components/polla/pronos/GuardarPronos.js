import Swal from "sweetalert2";
import {
  Badge,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";
import usePollaSettings from "../../../storedata/settings";
import { MisPrePronos } from "../presave/MisPrePronos";

export const GuardarPronos = ({ grupo, pronosdb }) => {
  //const { allPronos } = usePollaSettings((state) => state);
  const { pronospollero, usuario, partidos } = useDatosPollero(
    (state) => state
  );
  const [pronosUser, setPronosUser] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  //const [pronosDB, setPronosDB] = useState([]);

  //useEffect(() => {}, []);

  useEffect(() => {
    const pronosGrupo = pronospollero.filter(
      (pronos) => pronos.grupo === grupo
    );
    const pronos_to_save = [];
    pronosGrupo.forEach((prono) => {
      //console.log(comparaPronos(prono), prono.id);
      let existencia = comparaPronos(prono);
      console.log("SEIN", existencia);
      if (existencia) {
        pronos_to_save.push({
          partido: prono.id,
          user_id: usuario.id,
          pron_loc: parseInt(prono.loc),
          pron_vis: parseInt(prono.vis),
          comodin: prono.com,
          cambios: existencia[1] + 1,
          grupo,
        });
      }
    });

    setPronosUser(pronos_to_save);
  }, [pronospollero, grupo]);

  const comparaPronos = (prono) => {
    console.log("PREEXISTE", pronosdb);
    const pronoGuardado = pronosdb.find((pr) => pr.partido === prono.id);
    console.log("O L D", pronoGuardado);
    console.log(" N E W ", prono);
    if (!pronoGuardado) return [true, 0];
    if (pronoGuardado) {
      if (
        pronoGuardado.pron_loc === prono.loc &&
        pronoGuardado.pron_vis === prono.vis &&
        pronoGuardado.comodin === prono.com
      ) {
        console.log("NO CAMBIA", prono.id, pronoGuardado.partido);
        return false;
      } else {
        console.log("SI CAMBIA", prono.id, pronoGuardado.partido);
        return [true, pronoGuardado.cambios];
      }
    }
  };

  const muestrapartido = (id, ml, mv) => {
    const partido = partidos.filter((p) => p.id === id);

    const old = pronosdb.find((pr) => pr.partido === id);
    return (
      <>
        <Badge colorScheme="red"> {JSON.stringify(old)} </Badge>
        <Badge colorScheme="green">{JSON.stringify(partido)}</Badge>
      </>
    );
  };

  async function guardaPronos() {
    //console.log(pronosUser);
    const { data, error } = await supabaseClient
      .from("pronos")
      .upsert(pronosUser);
    if (data) {
      onClose();
      Swal.fire({
        title: "Resultado",
        text: "Cambios guardados. Éxitos",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "Cerrar",
      }).then(() => {
        router.push("/");
        console.log("cerradeiro");
      });

      //
    }
  }

  return (
    <Box padding={4}>
      <Button colorScheme="pink" size="lg" onClick={onOpen}>
        Guarda grupo
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vamos a guardar los marcadores</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <p>
              <strong>{`Grupo ${grupo}`}</strong>: pronósticos nuevos o
              cambiados: {pronosUser.length}
            </p>

            {/* {pronosUser &&
              pronosUser.map((pron) => (
                <div key={pron.partido}>
                  {muestrapartido(pron.partido, 1, 2, "new")}
                </div>
              ))} */}
            <MisPrePronos
              pronos={pronosUser}
              partidos={partidos}
              pronosdb={pronosdb}
            />
            {/* {JSON.stringify(pronosUser)} */}
            <Spacer />
            {/* {JSON.stringify(pronosDB)} */}
            {/* {JSON.stringify(partidos)} */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={guardaPronos}>
              Estoy seguro. Guardemos. 😃
            </Button>
            <Button onClick={onClose}>Cancelar. Me arrepentí. 🙀</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

/* 
<div key={pron.partido}>
                  {pron.partido} - {pron.pron_loc} - {pron.pron_vis} -
                  {pron.comodin ? "SI" : "NO"}
                </div> 
*/
