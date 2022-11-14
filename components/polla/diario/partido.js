import { Box, SimpleGrid } from "@chakra-ui/react";

export const PartidoDiario = (partido) => {
  return (
    <>
      <SimpleGrid columns={[1, null, 2]} spacing="40px">
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
      </SimpleGrid>

      {JSON.stringify(partido)}
    </>
  );
};

/* 
{"id":1,"grupo":"A","ronda":1,"fecha":"2022-11-20T16:00:00+00:00","eqloc":"Qatar","locid":"QA","eqvis":"Ecuador","visid":"EC","power":2894,"idvis":11,"idloc":24}}
*/
