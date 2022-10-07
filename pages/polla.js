import { Badge, Button, HStack } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import useDatosPollero from "../storedata/pollero";

export default function PollaPage() {
  const { polleros } = useDatosPollero((state) => state);

  return (
    <>
      <HStack spacing="24px">
        {polleros &&
          polleros.map((pollero) => (
            <Badge size="lg" key={pollero.id} colorScheme="green">
              {pollero.alias}
            </Badge>
          ))}
      </HStack>
    </>
  );
}

/* 

*/
