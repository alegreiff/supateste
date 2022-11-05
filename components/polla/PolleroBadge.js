import { Avatar, Badge, Box, Divider, Spacer } from "@chakra-ui/react";
import React from "react";

export const PolleroBadge = ({ pollero }) => {
  //console.log({ pollero });
  if (pollero?.alias) {
    return (
      <Box padding={3} size="lg" key={pollero.id} bg="white">
        <Badge padding="1" colorScheme="facebook">
          {pollero.alias}
        </Badge>
        {/* {pollero.alias} - {pollero.hincha} */}
        <Divider />
        {pollero.isPagado && <Badge> $$ </Badge>}
        {pollero.isPollero && <Badge> OK </Badge>}
        {/* <Divider /> */}
        <Avatar
          margin="1"
          size="lg"
          src={`https://dsbiqexajjcyswddmxve.supabase.co/storage/v1/object/public/polleres/${pollero.id}/perfil.png`}
        />
        <Badge> {pollero.pronos} </Badge>
      </Box>
    );
  }
};

/*
 */
