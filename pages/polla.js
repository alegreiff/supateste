import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { AdminPollero } from "../components/polla/AdminPollero";
import { PolleroBadge } from "../components/polla/PolleroBadge";
import useDatosPollero from "../storedata/pollero";
import useIsAdmin from "../utils/useIsAdmin";

export default function PollaPage() {
  const { usuario, polleros, setPolleros, updatePolleros } = useDatosPollero(
    (state) => state
  );
  const [adminpolleros, setAdminpolleros] = useState(null);

  const [pollerosOk, setPollerosOk] = useState([]);

  useEffect(() => {
    const pollerosBien = polleros.filter((poll) => poll.alias != null);
    setPollerosOk(pollerosBien);
  }, [polleros]);

  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    /* const usuariospolla = supabaseClient
      .from("usuariospolla")
      .on("*", (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe(); */

    const usuariospolla = supabaseClient
      .from("usuarios")
      .on("*", (payload) => {
        console.log("Change received!", payload.new);
        updatePolleros(payload.new);
      })
      .subscribe();

    /* const subscription = supabaseClient
      .from("usuariospolla")
      .on("*", (payload) => {
        console.log("ALGUIEN CAMBIÓ", payload.new);
      })
      .subscribe();
    return () => {
      supabaseClient.removeSubscription(subscription);
    }; */
  }, []);

  useEffect(() => {
    async function saludo() {
      const { data: saludodb } = await supabaseClient.rpc("hello");
      console.log("SALUDO", saludodb);
    }

    async function adminLeeUsuarios() {
      let { data: usuarios, error } = await supabaseClient
        .from("usuarios")
        .select("*");
      setAdminpolleros(usuarios);
    }

    async function add_prono() {
      let { data, error } = await supabaseClient.rpc("add_prono", {
        comodin_input: false,
        partido_input: 3,
        pron_loc_input: 7,
        pron_vis_input: 3,
        user_id_input: usuario.id,
      });

      if (error) console.error(error);
      else console.log(data);
    }
    //add_prono();

    if (isAdmin) {
      adminLeeUsuarios();
    }
  }, []);

  const polleroAdmin = (id) => {
    if (adminpolleros) {
      return adminpolleros.filter((pollero) => pollero.id === id);
    } else {
      return false;
    }
  };

  return (
    <>
      <SimpleGrid minChildWidth="120px" spacing={10}>
        {pollerosOk &&
          pollerosOk.map((pollero) => (
            <Box key={pollero.id}>
              <PolleroBadge pollero={pollero} />
              {isAdmin && <AdminPollero pollero={polleroAdmin(pollero.id)} />}
            </Box>
          ))}
      </SimpleGrid>
    </>
  );
}

/*

*/
