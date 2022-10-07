import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import "../styles/globals.css";
import MainLayout from "../components/layout/MainLayout";
import useDatosPollero from "../storedata/pollero";

function MyApp({ Component, pageProps }) {
  const { clearUsuario } = useDatosPollero((state) => state);

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    clearUsuario();
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
