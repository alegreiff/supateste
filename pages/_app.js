import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import "../styles/globals.css";
import MainLayout from "../components/layout/MainLayout";
import useDatosPollero from "../storedata/pollero";
import { useRouter } from "next/router";

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
    <ChakraProvider>
      <UserProvider supabaseClient={supabaseClient}>
        <MainLayout cerrar={handleSignOut}>
          <Component {...pageProps} />
        </MainLayout>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
