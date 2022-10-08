import _ from "lodash";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import useDatosPollero from "../../storedata/pollero";
import usePollaSettings from "../../storedata/settings";
import useFase from "../../hooks/useFase";

export default function PronosPage({ user }) {
  const { partidos } = useDatosPollero((state) => state);
  const { fechas } = usePollaSettings((state) => state);
  const { estado, fase, cargaPronos } = useFase(fechas);
  //console.log(estado, fase, cargaPronos);

  return (
    <>
      <h2>Página de pronósticos</h2>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/polla",
  async getServerSideProps(ctx) {
    // Access the user object
    const { user, accessToken } = await getUser(ctx);
    return { props: { email: user?.email } };
  },
});
