import { Avatar, Badge, Box, Center, Tag, VStack } from "@chakra-ui/react";
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
          {prono?.com ? (
            <MdStars size={72} w={8} h={8} color="#6C1D45" />
          ) : null}
          <VStack>
            <Badge fontSize="2xl" color="polla.local">
              {partido.eqloc}
            </Badge>
            <Badge fontSize="4xl" color="polla.local">
              {prono?.loc}
            </Badge>
          </VStack>

          <Badge variant="outline" color="polla.empate" m="2">
            vs
          </Badge>

          <VStack>
            <Badge fontSize="2xl" color="polla.visitante">
              {partido.eqvis}
            </Badge>
            <Badge fontSize="4xl" color="polla.visitante">
              {prono?.vis}
            </Badge>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

/* 
<SimpleGrid columns={[1, null, 2]} spacing="40px">
        <Box>
          <Rivales partido={partido} prono={prono} />
          <HStack>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pie}
                  dataKey="value"
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                />
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="left"
                />
              </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                width={200}
                height={300}
                data={comData}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="SI" stackId="sn" fill="#2E7A61" />
                <Bar dataKey="NO" stackId="sn" fill="#CA1448" />

                <Bar dataKey="LOC" stackId="si" fill="#A10D50" />
                <Bar dataKey="VIS" stackId="si" fill="#3E7594" />
                <Bar dataKey="EMP" stackId="si" fill="#CEA02B" />
              </BarChart>
            </ResponsiveContainer>
          </HStack>
        </Box>
        <Box bg="tomato" height="20">
          {JSON.stringify(stats)}
        </Box>

        
      </SimpleGrid>

*/
