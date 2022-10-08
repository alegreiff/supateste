import { Avatar, Badge, Box, Divider } from "@chakra-ui/react";
import React from "react";

export const PolleroBadge = ({ pollero }) => {
  return (
    <Box padding={3} size="lg" key={pollero.id} bg="lavender">
      {pollero.alias} - {pollero.hincha}
      <Divider />
      {pollero.isPagado && <Badge> $$$ </Badge>}
      {pollero.isPollero && <Badge> OK </Badge>}
      <Divider />
      {/* <Avatar
        size={"md"}
        src={`https://dsbiqexajjcyswddmxve.supabase.co/storage/v1/object/public/polleres/${pollero.id}/perfil.png`}
      /> */}
      <Badge> {pollero.pronos} </Badge>
    </Box>
  );
};

/*
 */
