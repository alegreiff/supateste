import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Reset() {
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState(null);

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const router = useRouter();
  const handleReset = async () => {
    console.log(password);
    const { user, error } = await supabaseClient.auth.update({ password });
    router.push("/");
  };

  return (
    <>
      <Flex justify={"center"} bg="gray.50" width={500}>
        <VStack>
          {hash && hash}
          <FormControl id="password">
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo seis caracteres"
              autoComplete="current-password"
              value={password}
            />
          </FormControl>
          <Button onClick={handleReset}> Guardar nueva contraseña </Button>
        </VStack>
      </Flex>
    </>
  );
}

/*
https://dsbiqexajjcyswddmxve.supabase.co/auth/v1/verify?token=02afb3be4bea732fbbd583d4fa2a1aa836c36ce695fe531744716a36&type=recovery&redirect_to=http://localhost:3000/reset-password
*/
