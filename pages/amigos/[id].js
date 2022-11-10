import {
  Badge,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export default function PollerosAMigosAdmin() {
  const router = useRouter();
  const { id } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [polleros, setPolleros] = useState([]);
  const [pollactivo, setPollactivo] = useState(null);
  const [datosPollero, setDatosPollero] = useState({ pago: false, notas: "" });

  useEffect(() => {
    cargaMisPolleros();
  }, []);

  async function cargaMisPolleros() {
    console.log("MIS", { id });
    let { data, error } = await supabaseClient.rpc("mispolleros", {
      pollero: id,
    });

    if (error) console.error("ERRATA", error);
    else setPolleros(data);
  }

  const actualizaPollero = async (userid) => {
    const { data, error } = await supabaseClient
      .from("usuarios")
      .update({ isPagado: datosPollero.pago, notas: datosPollero.notas })
      .eq("id", userid);
    setPollactivo(null);
    setDatosPollero({ pago: false, notas: "" });
    cargaMisPolleros();
    onClose();
  };

  const abreModal = (activo) => {
    console.log(activo);
    setPollactivo(activo);
    setDatosPollero({ pago: activo.pago, notas: activo.notas });
    onOpen();
  };

  return (
    <>
      <h3>Polleros amigos </h3>
      {polleros && (
        <Badge colorScheme="green">
          Tengo <strong>{polleros.length}</strong> polleros
        </Badge>
      )}

      <Box>
        Mi deuda con Nuestra Polla será de{" "}
        {200000 * (polleros.length > 9 ? polleros.length - 1 : polleros.length)}
      </Box>

      <Table className="reglamento">
        <Thead>
          <Tr>
            <Th>Fecha</Th>
            <Th>Alias</Th>
            <Th>Correo</Th>
            <Th>Notas</Th>
            <Th>$$</Th>
            <Th>Acción</Th>
          </Tr>
        </Thead>
        <Tbody>
          {polleros &&
            polleros.map((pollero) => (
              <Tr key={pollero.userid}>
                <Td>{pollero.fecha}</Td>
                <Td>{pollero.apodo} </Td>
                <Td>{pollero.mail}</Td>
                <Td>{pollero.notas} </Td>
                <Td>{pollero.pago === true ? "PAGADO" : "EN DEUDA"}</Td>
                <Td>
                  <Button
                    colorScheme="pink"
                    onClick={() => {
                      abreModal(pollero);
                    }}
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{pollactivo?.apodo}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p></p>
            <FormControl>
              <FormLabel>
                {datosPollero.pago
                  ? "Este pollero Ya pagó"
                  : "Este pollero NO ha pagado"}
              </FormLabel>
              <Switch
                size="lg"
                isChecked={datosPollero.pago}
                onChange={(e) => {
                  setDatosPollero({
                    pago: e.target.checked,
                    notas: datosPollero.notas,
                  });
                }}
              />

              <FormLabel>Notas</FormLabel>
              <Textarea
                value={datosPollero.notas}
                onChange={(e) => {
                  setDatosPollero({
                    pago: datosPollero.pago,
                    notas: e.target.value,
                  });
                }}
                placeholder="nombre / cuándo pagó / por dónde pagó"
                size="sm"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                actualizaPollero(pollactivo.userid);
              }}
            >
              Guardar registro de pollero
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
/* 
jajaja

Nuestra Polla es una tradición. Yo la vengo haciendo -no miento- desde el 86

Tomó fuerza en la Universidad en los 90 y ha seguido... 


La hacemos siempre entre amigos o amigos de amigos

Ya estás inscrita y soy tu pollero amigo, a mi me pagarás pero hay tiempo hasta el comienzo del mundial. Ahora lo importante es que antes del viernes 18 pongas los marcadores de la fase de grupos.

En cada grupo hay 6 partidos y puedes poner COMODÍN en dos de ellos. En esos tus puntos valen doble.

A medida que avanza el mundial los puntos valen más. 

En este momento somos ya 45 y el premio mayor va en 3.600.000 (hay otros premios)

Puntos.
Si dices que Catar 1 - Ecuador 0 y queda 1 - 0 es un Chepazo y da 5 puntos. (Sí le pones comodín da 10 puntos)

Si queda 2 - 0 (acertaste el resultado, no el marcador) es un simple y da 3 puntos ( Con cmodín daría 6)

La página se va actualizando cada día con las tablas de puntuación de los polleros


*/
