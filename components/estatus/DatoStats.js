import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const DatoStats = ({ dato, leyenda, color }) => {
  return (
    <Box bg={color} p={2}>
      <Text align="center" color="polla.clasificado" fontSize="4xl">
        {dato}
      </Text>
      <Text align="center" color="polla.clasificado" fontSize="xl">
        {leyenda}
      </Text>
    </Box>
  );
};
