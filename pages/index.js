import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";

import { useUser } from "@supabase/auth-helpers-react";

import { useEffect, useState } from "react";
import useDatosPollero from "../storedata/pollero";
import Swal from "sweetalert2";
import { Prepolleros } from "../components/polla/Prepolleros";
import { useRouter } from "next/router";
//const user = false;

export default function Home({ usuariosDB }) {
  const router = useRouter();
  const {
    usuario,
    setUsuario,
    clearUsuario,
    partidos,
    setPartidos,
    setPerfilUsuario,
    setPolleros,
  } = useDatosPollero((state) => state);
  const { user, error, isLoading, accessToken } = useUser();
  if (user) {
    router.push("/polla");
  }
  useEffect(() => {
    if (usuariosDB) {
      setPolleros(usuariosDB);
    }
  }, []);
  useEffect(() => {
    async function cargaPartidos() {
      const { data: db_partidos } = await supabaseClient
        //console.log("Cargando matche's");
        .from("partidospower")
        .select("*");

      setPartidos(db_partidos);
      console.log("partita", db_partidos);
    }

    if (partidos.length === 0) {
      cargaPartidos();
    }
  }, [setPartidos]);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);
        if (session?.user) {
          setUsuario(session?.user);
          loadPerfil(session?.user.id);
          //router.push("/polla");
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, [setUsuario]);

  async function loadPerfil(userid) {
    const { data: perfil, error } = await supabaseClient
      .from("usuarios")
      .select("*")
      .eq("id", userid)
      .single();

    if (perfil) {
      setPerfilUsuario(perfil);
    }
  }

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInWithGoogle = async () => {
    const { user, session, error } = await supabaseClient.auth.signIn({
      // provider can be 'github', 'google', 'gitlab', and more
      provider: "google",
    });
  };

  const checkEmail = async (email) => {
    let { data: usuario, error } = await supabaseClient
      .from("correosusuarios")
      .select("id")
      .eq("correo", email);
    console.log(usuario, error);
    return usuario?.length;
  };
  const signInWithGitHub = () => {};
  const perdiMiClave = () => {};
  const handleSignUp = async () => {
    const check = await checkEmail(email);
    if (!check) {
      try {
        const { user, session, error } = await supabaseClient.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        console.log("USER", user, "Session", session, "ERROR", error);
        if (user) {
          console.info(user.identities);
        }
        Swal.fire({
          title: "Vamos bien",
          text: `Se ha enviado un correo de verificación a ${email}. Revisa incluso en SPAM`,
          confirmButtonText: "Sisas",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        title: "Resultado",
        text: `El correo ${email} ya está registrado`,
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Me equivoqué",
        cancelButtonText: "Ah. Entonces ingresaré",
      }).then((result) => {
        if (result.isDismissed) {
          changeForm();
        }
      });
    }
  };
  const handleSignIn = async () => {
    const { user: user_signed, error } = await supabaseClient.auth.signIn({
      email,
      password,
    });
    if (user_signed) {
      console.log("DESDE AUTH EL USER", user_signed);
      console.log(isLoading);
      console.log(user);
    } else {
      console.log(error);
    }
  };
  const changeForm = () => {
    setIsSignUp((value) => !value);
  };

  if (!user && !isLoading) {
    return (
      <Flex minH={"100vh"} justify={"center"} bg="gray.50">
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>
              {isSignUp ? "Crea tu cuenta" : "Ingresa"}
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
            <Stack spacing={4} as="form">
              <Button onClick={signInWithGoogle}>Log in with Google</Button>
              <hr />
              <Button onClick={signInWithGitHub}>Log in with GitHub</Button>
              <hr />
              <Button onClick={perdiMiClave}>Bestia</Button>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>perro</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Here is a sample placeholder"
                  size="sm"
                />
              </FormControl>
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                {isSignUp && (
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleSignUp}
                  >
                    Crear cuenta
                  </Button>
                )}
                {!isSignUp && (
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleSignIn}
                  >
                    Ingresar
                  </Button>
                )}
                <Button colorScheme="red" onClick={changeForm}>
                  {!isSignUp
                    ? "¿Nuevo usuario?, regístrese"
                    : "Ya tengo cuenta. Ingresar"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  return <Prepolleros />;
}

export async function getServerSideProps(context) {
  const { data: usuariosDB, error } = await supabaseClient
    .from("usuariospolla")
    .select("*");

  return {
    props: { usuariosDB }, // will be passed to the page component as props
  };
}

/* export const getServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx) {
    // Run queries with RLS on the server
    const { data } = await supabaseServerClient(ctx).from("test").select("*");
    return { props: { data } };
  },
}); */

/* export const getServerSideProps = withPageAuth({
  redirectTo: "/foo",
  async getServerSideProps(ctx) {
    // Access the user object
    const { user, accessToken } = await getUser(ctx);
    return { props: { email: user?.email } };
  },
}); */
