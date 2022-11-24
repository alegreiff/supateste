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
  HStack,
  Table,
  TableCaption,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdStars } from "react-icons/md";
import {
  ImHappy,
  ImAngry,
  ImCrying,
  ImNeutral,
  ImManWoman,
  ImStarFull,
} from "react-icons/im";
import { FechaSingle } from "../../Fixture/FechaSingle";
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from "recharts";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export default class CustomizedLabel extends React.Component {
  render() {
    const { x, y, fill, value } = this.props;
    return (
      <text
        x={x + 5}
        y={y - 5}
        dy={-4}
        fontSize="25"
        fontWeight="bolder"
        fill={fill}
        textAnchor="bottom"
      >
        {value}
      </text>
    );
  }
}

export const Rivales = ({ partido, prono, statsmatch: stats }) => {
  const [datosJugado, setDatosJugado] = useState(null);
  const [marcadores, setMarcadores] = useState(null);
  const [lideres, setLideres] = useState(null);
  useEffect(() => {
    async function resultadosPensados(pt) {
      const { data, error } = await supabaseClient.rpc(
        "pollamarcadorespartido",
        {
          pt,
        }
      );

      if (error) console.error(error);
      else setMarcadores(data);
    }

    async function lideresMarcadoresPensados(pt) {
      const { data, error } = await supabaseClient.rpc("pollapartidopronos", {
        pt,
      });

      if (error) console.error(error);
      else setLideres(data);
    }
    resultadosPensados(partido.id);
    lideresMarcadoresPensados(partido.id);
  }, [partido]);

  useEffect(() => {
    if (stats) {
      const dataPlayed = [
        { name: "GranChp", uv: stats.gch, color: "#3F3B6C" },
        { name: "Doble", uv: stats.dbl, color: "#624F82" },
        { name: "Chepazo", uv: stats.ch, color: "#9F73AB" },
        { name: "Simple", uv: stats.sim, color: "#A3C7D6" },
      ];
      setDatosJugado(dataPlayed);
    }
  }, []);

  async function qps1() {
    let { data, error } = await supabaseClient.rpc("usuarioqps");
    if (error) {
      console.error(error);
    } else {
      if (data.m === "OK55") {
        const { data, error } = await supabaseClient.from("tempouser").insert([
          { p: 13, ml: 2, mv: 2 },
          { p: 14, ml: 3, mv: 1 },
        ]);
        if (error) {
          console.log({ error });
        }
      }
    }
  }

  return (
    <>
      <Box>
        <Box width={150} padding={1}>
          <FechaSingle date={partido.fecha} /> <Tag> {partido.id} </Tag>
        </Box>
        <Center>
          {/* <Badge>{prono?.partido}</Badge> */}
          {prono?.comodin ? (
            <MdStars size={72} w={8} h={8} color="#6C1D45" />
          ) : null}
          <VStack>
            <Badge fontSize="2xl" color="polla.local">
              {partido.eqloc}
            </Badge>
            <Badge fontSize="4xl" color="polla.local">
              {prono?.pron_loc}
            </Badge>
            {partido?.procesado ? (
              <Badge fontSize="5xl">{partido.mlocal}</Badge>
            ) : (
              ""
            )}
          </VStack>

          <Badge variant="outline" color="polla.empate" m="2">
            vs
          </Badge>

          <VStack>
            <Badge fontSize="2xl" color="polla.visitante">
              {partido.eqvis}
            </Badge>
            <Badge fontSize="4xl" color="polla.visitante">
              {prono?.pron_vis}
            </Badge>
            {partido?.procesado ? (
              <Badge fontSize="5xl">{partido.mvisit}</Badge>
            ) : (
              ""
            )}
          </VStack>
        </Center>
        {partido?.procesado ? (
          <>
            <Center p={2}>
              <Badge m={2} fontSize="1.4em">
                {prono?.resultado}
              </Badge>
              <Badge m={2} fontSize="2em">
                {" "}
                {prono?.puntos}{" "}
              </Badge>
            </Center>
            <Box
              p={5}
              style={{
                backgroundImage: 'url("/logoback.png")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "15%",
                backgroundPosition: "0px 150px ",
              }}
            >
              <Center>
                <HStack>
                  <VStack>
                    <ImNeutral size={50} w={8} h={8} color="purple" />

                    <Tag
                      size="lg"
                      fontSize={32}
                      variant="outline"
                      colorScheme="purple"
                    >
                      {stats.puntos}
                    </Tag>
                    <Tag>Puntos</Tag>
                  </VStack>
                  <VStack>
                    <ImHappy size={50} w={8} h={8} color="purple" />

                    <Tag
                      size="lg"
                      fontSize={32}
                      variant="outline"
                      colorScheme="purple"
                    >
                      {stats.conpuntos}
                    </Tag>
                    <Tag>Suman</Tag>
                  </VStack>
                  <VStack>
                    <ImAngry size={50} w={8} h={8} color="purple" />

                    <Tag
                      fontSize={32}
                      size="lg"
                      variant="outline"
                      colorScheme="purple"
                    >
                      {stats.blancos}
                    </Tag>
                    <Tag>No suman</Tag>
                  </VStack>
                  <VStack>
                    <ImCrying size={50} w={8} h={8} color="purple" />

                    <Tag
                      fontSize={32}
                      size="lg"
                      variant="outline"
                      colorScheme="purple"
                    >
                      {stats.bkc}
                    </Tag>
                    <Tag>Comodines perdidos</Tag>
                  </VStack>
                </HStack>
              </Center>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  width={150}
                  height={40}
                  data={datosJugado}
                  margin={{ top: 25, right: 0, left: 0, bottom: 25 }}
                >
                  <Bar
                    dataKey="uv"
                    barSize={170}
                    fontFamily="sans-serif"
                    label={<CustomizedLabel />}
                  >
                    {datosJugado?.map((entry, index) => (
                      <Cell key={index} fill={datosJugado[index].color} />
                    ))}
                  </Bar>
                  <XAxis dataKey="name" fontWeight="bolder" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </>
        ) : (
          <>
            <Button onClick={qps1}>QPS1</Button>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Marcadores
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {marcadores ? (
                    <Table variant="simple" size="sm" width={400}>
                      <Thead>
                        <Tr>
                          <Th>
                            <ImManWoman size={18} />
                          </Th>
                          <Th isNumeric>Com +</Th>
                          <Th isNumeric>Com -</Th>
                          <Th>Marcador</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {marcadores.map((score, i) => (
                          <Tr
                            key={i}
                            bg={
                              score.score ===
                              prono?.pron_loc + " - " + prono?.pron_vis
                                ? "polla.clasificado"
                                : ""
                            }
                          >
                            <Td isNumeric>{score.personas}</Td>
                            <Td isNumeric>{score.conc}</Td>
                            <Td isNumeric>{score.sinc}</Td>
                            <Td>{score.score}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  ) : (
                    ""
                  )}
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Polleros
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box className="multipronos" p={0} m={0}>
                    {lideres ? (
                      <Table variant="simple" size="sm" width={250}>
                        <Thead>
                          <Tr>
                            <Th>Pollero</Th>
                            <Th>Pts</Th>
                            <Th>Marcador</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {lideres.map((score, i) => (
                            <Tr key={i}>
                              <Td>
                                <strong>{score.p}</strong> {score.nom}
                              </Td>
                              <Td isNumeric>{score.pun}</Td>
                              <Td>
                                {score.score} {score.c ? " ★ " : ""}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    ) : (
                      ""
                    )}
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </Box>
    </>
  );
};

/* 
{"partido":1,"puntos":441,

"gch":13,
"dbl":23,
"ch":7,
"sim":46,
"bkc":16,
"bks":40,
"usedcom":52,
"conpuntos":89,"blancos":56}


{"id":145,"created_at":"2022-11-09T22:14:35.186806+00:00","user_id":"53f46d4f-a142-4428-96fe-cc62a549d89d","partido":1,"pron_loc":2,"pron_vis":0,"comodin":false,"grupo":"A","cambios":1,"procesado":true,"resultado":"simple","puntos":3}
*/
