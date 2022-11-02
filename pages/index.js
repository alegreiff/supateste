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
  VStack,
} from "@chakra-ui/react";
import {
  supabaseClient,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";

import { useUser } from "@supabase/auth-helpers-react";

import { useEffect, useState } from "react";
import useDatosPollero from "../storedata/pollero";
import Swal from "sweetalert2";
import { Prepolleros } from "../components/polla/Prepolleros";
import { useRouter } from "next/router";
import usePollaSettings from "../storedata/settings";
import { Reglamento } from "../components/polla/Reglamento";
//const user = false;

export default function Home({ usuariosDB, equiposDB, pollerosamigos }) {
  console.log("lespollereèsamiès", pollerosamigos);
  const router = useRouter();
  const query = router.query;

  const {
    usuario,
    setUsuario,
    clearUsuario,
    partidos,
    setPartidos,
    setPerfilUsuario,
    setPolleros,
    setEquipos,
    equipos,
    clearEquipos,
    setPollerosamigos,
  } = useDatosPollero((state) => state);

  const { setAllPronos } = usePollaSettings((state) => state);
  const { user, error, isLoading, accessToken } = useUser();
  if (user) {
    //router.push("/polla");
  }

  useEffect(() => {
    async function cargaPronos() {
      const { data: pronosDB, error } = await supabaseClient
        //console.log("Cargando matche's");
        .from("pronos")
        .select("*");

      console.log("PRONNO", pronosDB, error);

      setAllPronos(pronosDB);
    }
    cargaPronos();
  }, []);

  useEffect(() => {
    if (pollerosamigos) {
      setPollerosamigos(pollerosamigos);
    }
  }, []);
  useEffect(() => {
    //cargaPOLLEROS();
    if (usuariosDB) {
      setPolleros(usuariosDB);
    }

    if (equiposDB) {
      if (equipos.length === 0) {
        setEquipos(equiposDB);
      }
    }
  }, []);
  useEffect(() => {
    async function cargaPartidos() {
      const { data: db_partidos } = await supabaseClient
        //console.log("Cargando matche's");
        .from("partidospowerfull")
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

  async function cargaPOLLEROS() {
    const { data: usuariosDB, error } = await supabaseClient
      .from("usuariospolla")
      .select("*");
    console.log("MAGIS", usuariosDB, error);
    if (usuariosDB) {
      setPolleros(usuariosDB);
    }
  }

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
  const perdiMiClave = () => {
    localStorage.clear();
    clearEquipos();
  };
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
          confirmButtonText: "Prometo que lo haré",
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

  if (!user && !isLoading && query?.pollero === "test") {
    //if (!user && !isLoading) {
    return (
      <Flex justify={"center"} bg="gray.50">
        <VStack width="900px">
          <Text fontSize="30px" color="polla.catar">
            No es mi polla, no es tu polla. ¡Es Nuestra Polla!
          </Text>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>
                {isSignUp ? "Crea tu cuenta" : "Ingresa"}
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                nuestrapolla ✌️
              </Text>
            </Stack>
            <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
              <Stack spacing={4} as="form">
                {!isSignUp && (
                  <>
                    <FormLabel>Recomendado</FormLabel>
                    <Button colorScheme="pink" onClick={signInWithGoogle}>
                      Ingreso / registro con su cuenta de Gmail
                    </Button>
                  </>
                )}
                <hr />
                {/* <Button onClick={signInWithGitHub}>Log in with GitHub</Button>
              <hr /> */}
                {/* <Button onClick={perdiMiClave}>No tocar</Button> */}

                <FormControl id="email">
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
          <Reglamento />
        </VStack>
      </Flex>
    );
  }

  if (usuario && usuario.alias === null) {
    <Button
      colorScheme="pink"
      onClick={() => {
        router.push(`/perfil/${usuario?.id}`);
      }}
    >
      Importante: Complete su perfil
    </Button>;
  }

  return (
    <>
      <Text textAlign="center" fontSize="30px" color="polla.catar">
        No es mi polla, no es tu polla. ¡Es Nuestra Polla!
      </Text>
      <Reglamento />
      {/* <Prepolleros /> */}
    </>
  );
}

export async function getServerSideProps(context) {
  const { data: usuariosDB, error } = await supabaseServerClient(context)
    .from("usuariospolla")
    .select("*");

  const { data: equiposDB } = await supabaseServerClient(context)
    .from("posicionesequipos")
    .select("*");

  const { data: pollerosamigos } = await supabaseServerClient(context)
    .from("pollerosamigos")
    .select("*");

  return {
    props: { usuariosDB, equiposDB, pollerosamigos }, // will be passed to the page component as props
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

/* 
POLLEROS AMIGOS
1. Jaime de Greiff
2. Luis Carlos Urrutia
3. Alfonso Ospina Torres  fue pollero de Ricardo Ramírez
alfonso.ospina70@gmail.com / 3142957592
4. Juan Sebastian Salazar Piedrahita fue pollero mío ganador de Rusia 2018
js.salazarp@uniandes.edu.co
5. Esteban Muñoz 

Luis Fernando Velasco. Preguntar


*/
