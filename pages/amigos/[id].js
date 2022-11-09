import {
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
      <h3>Polleros amigos {id}</h3>
      <h4>EN PROCESO</h4>
      <p>Proximamente administración de sus polleros</p>
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
                placeholder="Here is a sample placeholder"
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
