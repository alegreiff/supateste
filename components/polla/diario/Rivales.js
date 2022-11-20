import {
  Avatar,
  Badge,
  Box,
  Center,
  Spacer,
  Tag,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { MdStars } from "react-icons/md";
import { FechaSingle } from "../../Fixture/FechaSingle";

export const Rivales = ({ partido, prono }) => {
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
          <Center p={2} bg="orange">
            <Badge m={2} fontSize="1.4em">
              {" "}
              {prono?.resultado}{" "}
            </Badge>
            <Badge m={2} fontSize="2em">
              {" "}
              {prono?.puntos}{" "}
            </Badge>
          </Center>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

/* 

{"id":145,"created_at":"2022-11-09T22:14:35.186806+00:00","user_id":"53f46d4f-a142-4428-96fe-cc62a549d89d","partido":1,"pron_loc":2,"pron_vis":0,"comodin":false,"grupo":"A","cambios":1,"procesado":true,"resultado":"simple","puntos":3}
*/
