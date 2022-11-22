import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";

import { useUser } from "@supabase/auth-helpers-react";

import { useEffect, useState } from "react";
import useDatosPollero from "../storedata/pollero";
import Swal from "sweetalert2";
import { Prepolleros } from "../components/polla/Prepolleros";
import { useRouter } from "next/router";
import usePollaSettings from "../storedata/settings";
import { Reglamento } from "../components/polla/Reglamento";
import { StatusPolleros } from "../components/estatus/StatusPolleros";
import { Polleropuntos } from "../components/polla/posiciones/polleropuntos";
//const user = false;

export default function Home({
  usuariosDB,
  equiposDB,
  pollerosamigos,
  fechaspolla,
  statspronos,
  tablapos,
}) {
  //console.log("lespollereèsamiès", pollerosamigos);
  console.log({ tablapos });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const query = router.query;
  console.log({ statspronos });
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
    setFechasPartidos,
    setStatsPronos,
  } = useDatosPollero((state) => state);

  const { setAllPronos, setPosiciones } = usePollaSettings((state) => state);
  const { user, error, isLoading, accessToken } = useUser();

  useEffect(() => {
    //localStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }, []);

  if (user) {
    //router.push("/polla");
  }

  useEffect(() => {
    if (statspronos) {
      setStatsPronos(statspronos);
    }
    if (fechaspolla) {
      setFechasPartidos(fechaspolla);
    }
    if (tablapos) {
      setPosiciones(tablapos);
    }
  }, [
    fechaspolla,
    setFechasPartidos,
    statspronos,
    setStatsPronos,
    setPosiciones,
    tablapos,
  ]);

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

    //if (partidos.length === 0) {
    cargaPartidos();
    //}
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

  const handleResetPassword = async () => {
    const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email,
      { redirectTo: "https://nuestrapolla.com/reset-password" }
    );
    onClose();
    //console.log({ data, error });
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

  //if (!user && !isLoading && query?.pollero === "test") {
  if (!user && !isLoading) {
    return (
      <>
        <Flex justify={"center"} bg="gray.50">
          <VStack width="900px">
            <Text padding="16" fontSize="30px" color="polla.catar">
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
                        Ingreso con su cuenta de Gmail
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
                    {/* <Button colorScheme="red" onClick={changeForm}>
                      {!isSignUp
                        ? "¿Nuevo usuario?, regístrese"
                        : "Ya tengo cuenta. Ingresar"}
                    </Button> */}
                    <Button onClick={onOpen}>Perdí mi contraseña</Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <Reglamento />
          </VStack>
        </Flex>
        <StatusPolleros />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Recuperación de contraseña</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <p>
                  Se le enviará un correo con el asunto: Nuestra Polla recuperar
                  contraseña. Revise su correo y haga clic en el enlace{" "}
                  <strong>Cambiar la contraseña</strong>
                  <hr />
                  <br />
                </p>
                <FormLabel>Correo registrado</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleResetPassword}>
                Enviar solicitud
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  if (usuario?.alias === null) {
    return (
      <>
        <Spacer />
        <Button
          size="lg"
          colorScheme="pink"
          onClick={() => {
            router.push(`/perfil/${usuario?.id}`);
          }}
        >
          Importante: Complete su perfil antes de poder cargar marcadores o ser
          validado como Pollero Amigo.
        </Button>
        <Spacer />
        <Box>
          Si usted está en proceso de ser pollero amigo, seleccione como pollero
          amigo al POLLERO MAYOR
        </Box>
      </>
    );
  }

  return (
    <>
      <Polleropuntos />

      <Box p={5}>
        <Button colorScheme="pink">
          <Link
            href="https://www.nuestrapolla.com/pollafasegrupos.pdf"
            isExternal
          >
            PDF transparencia. Fase de grupos
          </Link>
        </Button>
      </Box>

      <StatusPolleros />
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

  const { data: fechaspolla, error: errorfechas } = await supabaseServerClient(
    context
  )
    .from("fechaspolla")
    .select("*");

  const { data: statspronos, error: stats } = await supabaseServerClient(
    context
  )
    .from("testdrama")
    .select("*");

  const { data: tablapos, errorPos } = await supabaseServerClient(context)
    .from("posicionespollerostest")
    .select("*");

  return {
    props: {
      usuariosDB,
      equiposDB,
      pollerosamigos,
      fechaspolla,
      statspronos,
      tablapos,
    }, // will be passed to the page component as props
  };
}
