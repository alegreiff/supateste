import _ from "lodash";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import useDatosPollero from "../../storedata/pollero";
import usePollaSettings from "../../storedata/settings";
import useFase from "../../hooks/useFase";
import { useEffect, useState } from "react";

export default function PronosPage({ user }) {
  const { partidos: basepartidos } = useDatosPollero((state) => state);
  const { fechas } = usePollaSettings((state) => state);
  const { estado, fase, cargaPronos, rondas, comodines } = useFase(fechas);
  //console.log(estado, fase, cargaPronos);

  console.log(estado, fase, cargaPronos, rondas, comodines);
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    if (cargaPronos) {
      if (fase === 1) {
        const part = basepartidos.filter((match) => match.grupo);
        setPartidos(part);
      } else if (fase === 5) {
        const part = basepartidos.filter((match) => match.id > 62);
        setPartidos(part);
      } else {
        const part = basepartidos.filter((match) => match.ronda === rondas[0]);
        setPartidos(part);
      }
    }
  }, []);

  return (
    <>
      <h2>Página de pronósticos</h2>
      {cargaPronos &&
        partidos.map((pt) => (
          <div key={pt.id}>
            {pt.eqloc} - {pt.fecha} - {pt.eqvis}
          </div>
        ))}
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
