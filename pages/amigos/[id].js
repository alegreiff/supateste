import { Button } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export default function PollerosAMigosAdmin() {
  const router = useRouter();
  const { id } = router.query;

  const [polleros, setPolleros] = useState([]);

  useEffect(() => {
    async function cargaMisPolleros() {
      console.log("MIS", { id });
      let { data, error } = await supabaseClient.rpc("mispolleros", {
        pollero: id,
      });

      if (error) console.error("ERRATA", error);
      else setPolleros(data);
    }
    cargaMisPolleros();
  }, []);

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
                <Td>{pollero.apodo}</Td>
                <Td>{pollero.notas}</Td>
                <Td>{pollero.pago}</Td>
                <Td>
                  <Button>Editar</Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
}
