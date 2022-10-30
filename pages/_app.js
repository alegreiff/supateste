import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import "../styles/globals.css";
import MainLayout from "../components/layout/MainLayout";
import useDatosPollero from "../storedata/pollero";
import { useRouter } from "next/router";
import customTheme from "../theme";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const { clearUsuario, clearPolleros } = useDatosPollero((state) => state);
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    clearUsuario();
    clearPolleros();
    router.push("/api/auth/logout");
  };
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={customTheme}>
        <UserProvider supabaseClient={supabaseClient}>
          <MainLayout cerrar={handleSignOut}>
            <Component {...pageProps} />
          </MainLayout>
        </UserProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;

/* 
Esta polla no está abierta a todo aquel que quiera participar; se accede por invitación de uno de los polleros amigos, quienes hacen viable el proceso. Los polleros amigos se encargan de dar a conocer la polla, avalar a quienes se registran para participar, recoger el dinero de la inscripción, enviarlo a la administración para realizar los pagos y apoyar a su grupo de polleros en cualquier duda que surja y establecer contacto con el administrador de la polla y de la página web que la soporta.
*/
