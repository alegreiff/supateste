import {
  Avatar,
  Badge,
  Box,
  Center,
  HStack,
  Spacer,
  Tag,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdStars } from "react-icons/md";
import {
  ImHappy,
  ImAngry2,
  ImCool,
  ImAngry,
  ImTable,
  ImCrying,
  ImNeutral,
} from "react-icons/im";
import { FechaSingle } from "../../Fixture/FechaSingle";
import {
  Bar,
  BarChart,
  Cell,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,

    color: "#015677",
  },
  {
    name: "Page B",
    uv: 3000,

    color: "#015677",
  },
  {
    name: "Page C",
    uv: 2000,

    color: "#015677",
  },
  {
    name: "Page D",
    uv: 2780,

    color: "#015677",
  },
  {
    name: "Page E",
    uv: 1890,
    color: "#015677",
  },
  {
    name: "Page F",
    uv: 2390,

    color: "#015677",
  },
];

export default class CustomizedLabel extends React.Component {
  render() {
    const { x, y, fill, value } = this.props;
    return (
      <text
        x={x + 50}
        y={y}
        dy={-4}
        fontSize="25"
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
  useEffect(() => {
    if (stats) {
      const dataPlayed = [
        { name: "GranChepazos", uv: stats.gch, color: "#3F3B6C" },
        { name: "Dobles", uv: stats.dbl, color: "#624F82" },
        { name: "Chepazos", uv: stats.ch, color: "#9F73AB" },
        { name: "Simples", uv: stats.sim, color: "#A3C7D6" },
      ];
      setDatosJugado(dataPlayed);
    }
  }, []);
  /* "gch":13,
"dbl":23,
"ch":7,
"sim":46,
"bkc":16,
"bks":40,

*/

  return (
    <>
      <Box>
        <Box width={150} padding={1}>
          <FechaSingle date={partido.fecha} />
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
                    <Badge>Puntos otorgados</Badge>
                    <ImNeutral size={50} w={8} h={8} color="purple" />
                    <Tag
                      size="lg"
                      fontSize={32}
                      variant="outline"
                      colorScheme="purple"
                    >
                      {stats.puntos}
                    </Tag>
                  </VStack>
                  <VStack>
                    <Badge>Polleros con puntos</Badge>
                    <ImHappy size={50} w={8} h={8} color="purple" />
                    <Tag
                      size="lg"
                      fontSize={32}
                      variant="outline"
                      colorScheme="purple"
                    >
                      {stats.conpuntos}
                    </Tag>
                  </VStack>
                  <VStack>
                    <Badge>Polleros en blanco</Badge>
                    <ImAngry size={50} w={8} h={8} color="purple" />
                    <Tag
                      fontSize={32}
                      size="lg"
                      variant="outline"
                      colorScheme="purple"
                    >
                      {stats.blancos}
                    </Tag>
                  </VStack>
                  <VStack>
                    <Badge>Comodines perdidos</Badge>
                    <ImCrying size={50} w={8} h={8} color="purple" />
                    <Tag
                      fontSize={32}
                      size="lg"
                      variant="outline"
                      colorScheme="purple"
                    >
                      {stats.bkc}
                    </Tag>
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
          ""
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
