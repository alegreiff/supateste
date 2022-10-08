import { Badge, Box, Divider } from "@chakra-ui/react";
import React from "react";

export const PolleroBadge = ({ pollero }) => {
  return (
    <Box padding={3} size="lg" key={pollero.id} bg="lavender">
      {pollero.alias}
      <Divider />
      {pollero.isPagado && <Badge> $$$ </Badge>}
      {pollero.isPollero && <Badge> OK </Badge>}
      <Divider />
      <Badge> {pollero.pronos} </Badge>
    </Box>
  );
};

/*
 */
