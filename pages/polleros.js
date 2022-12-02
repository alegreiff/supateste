import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Icon,
  SimpleGrid,
  Spacer,
  Tag,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { AdminPollero } from "../components/polla/AdminPollero";
import { PolleroBadge } from "../components/polla/PolleroBadge";
import useDatosPollero from "../storedata/pollero";
import useIsAdmin from "../utils/useIsAdmin";
import _ from "lodash";

import { GrMoney } from "react-icons/gr";
import usePollaSettings from "../storedata/settings";
export default function PollaPage() {
  const { usuario, polleros, setPolleros, updatePolleros, pollerosamigos } =
    useDatosPollero((state) => state);
  const { posiciones } = usePollaSettings((state) => state);
  const [adminpolleros, setAdminpolleros] = useState(null);

  const [pollerosOk, setPollerosOk] = useState([]);
  const [pollerosPollos, setpollerosPollos] = useState([]);
  const [sortPoll, setSortPoll] = useState(false);

  useEffect(() => {
    const tempo = _.groupBy(polleros, "amigo");

    //console.log({ tempo });
    setpollerosPollos(tempo);

    if (posiciones) {
      console.log({ posiciones });
      let pollerosBien = polleros.filter((poll) => poll.alias != null);
      pollerosBien = pollerosBien.map((item) => {
        item.alias = item.alias.toUpperCase();
        item.pos = posiciones.find((u) => u.userid === item.id)?.pos;

        //posiciones.find((u) => u.userid === item.id).pos,
        return item;
      });
      //pollerosBien = _.sortBy(pollerosBien, "pronos");
      pollerosBien = _.sortBy(
        pollerosBien,
        ["pos"],
        ["asc"]
        //["isPagado", "pronos", "alias"],["asc", "asc", "desc"]
      );
      setPollerosOk(pollerosBien);
    }
    //console.log({ pollerosBien });
  }, [polleros, posiciones]);

  const cambiaOrden = () => {
    setSortPoll(!sortPoll);
    const pollerosBien = pollerosOk;
    if (sortPoll) {
      pollerosBien = _.sortBy(pollerosBien, ["alias"], ["desc"]);
    } else {
      pollerosBien = _.sortBy(pollerosBien, ["pos"], ["asc"]);
    }
    setPollerosOk(pollerosBien);
  };

  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    const usuariospolla = supabaseClient
      .from("usuarios")
      .on("*", (payload) => {
        //console.log("Change received!", payload.new);
        updatePolleros(payload.new);
      })
      .subscribe();
  }, []);

  useEffect(() => {
    async function saludo() {
      const { data: saludodb } = await supabaseClient.rpc("hello");
      //console.log("SALUDO", saludodb);
    }

    async function adminLeeUsuarios() {
      let { data: usuarios, error } = await supabaseClient
        .from("usuarios")
        .select("*");
      setAdminpolleros(usuarios);
    }

    /*async function add_prono() {
      let { data, error } = await supabaseClient.rpc("add_prono", {
        comodin_input: false,
        partido_input: 3,
        pron_loc_input: 7,
        pron_vis_input: 3,
        user_id_input: usuario.id,
      });

      if (error) console.error(error);
      //else console.log(data);
    }*/
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

  const misPolleros = (id) => {
    if (posiciones) {
      let poll = pollerosOk.filter((poll) => poll.amigo === id);
      poll = poll.map((p) => {
        //p.alias = p.alias.toUpperCase();

        return p;
      });
      //console.log({ poll });
      //poll = _.orderBy(poll, ["alias"], "asc");

      return poll;
    } else {
      return "";
    }
  };

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

    return nombre.split(" ").map(first_letter).join("");
  };

  return (
    <>
      {/* <SimpleGrid minChildWidth="200px" spacing={3}>
        {pollerosOk &&
          pollerosOk.map((pollero) => (
            <Badge
              colorScheme={
                pollero.pronos > 7
                  ? "green"
                  : pollero.pronos > 0
                  ? "blue"
                  : "red"
              }
              p={2}
              key={pollero.id}
            >
              <Center>
                {pollero.alias} <Spacer />{" "}
                {pollero.isPagado ? (
                  <Icon ml={2} mr={2} as={GrMoney} w={6} h={6} />
                ) : (
                  ""
                )}
                <Tag color="blackAlpha.800" size="lg">
                  {pollero.pronos}
                </Tag>
              </Center>
            </Badge>
          ))}
      </SimpleGrid> */}
      <Button onClick={cambiaOrden}>
        {" "}
        {sortPoll ? "Órden por posición" : "Órden alfabético"}
      </Button>
      <Box>
        {pollerosamigos &&
          pollerosamigos.map((amigo) => (
            <div key={amigo.id}>
              <Heading as="h1" size="xl" noOfLines={1}>
                {nombrePollero(amigo.username)}
              </Heading>

              <SimpleGrid minChildWidth="220px" spacing={1}>
                {misPolleros(amigo.username).map((pollero) => (
                  <Box key={pollero.id}>
                    <Badge
                      width={220}
                      colorScheme={
                        pollero.pronos > 7
                          ? "green"
                          : pollero.pronos > 0
                          ? "blue"
                          : "gray"
                      }
                      p={2}
                      key={pollero.id}
                    >
                      <Tag
                        ml={4}
                        color="blackAlpha.900"
                        fontWeight="extrabold"
                        size="lg"
                      >
                        {pollero.pos}
                      </Tag>
                      <Center>
                        <Box>
                          <PolleroBadge pollero={pollero} />
                        </Box>
                        <h3>{pollero.alias}</h3>
                        <Tag
                          ml={4}
                          color="blackAlpha.900"
                          fontWeight="extrabold"
                          size="lg"
                        >
                          {pollero.pronos}
                        </Tag>
                      </Center>
                    </Badge>
                  </Box>
                ))}
              </SimpleGrid>
              <br />
              <br />
              <br />
            </div>
          ))}
      </Box>
      {/* <Accordion>
        {pollerosamigos &&
          pollerosamigos.map((amigo) => (
            <AccordionItem key={amigo.id}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {nombrePollero(amigo.username)} -
                    {misPolleros(amigo.username).length}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <SimpleGrid minChildWidth="120px" spacing={10}>
                  {misPolleros(amigo.username).map((pollero) => (
                    <Box key={pollero.id}>
                      <PolleroBadge pollero={pollero} />
                      {isAdmin && (
                        <AdminPollero pollero={polleroAdmin(pollero.id)} />
                      )}
                    </Box>
                  ))}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion> */}
    </>
  );
}

/*
32 han pagado
*/
