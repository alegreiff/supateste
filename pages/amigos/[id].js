import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PollerosAMigosAdmin() {
  const router = useRouter();
  const { id } = router.query;

  const [polleros, setPolleros] = useState([]);

  useEffect(() => {
    async function cargaMisPolleros() {
      console.log("MIS", { id });
      let { data, error } = await supabaseClient.rpc("mispolleros", {
        pollero: id,
      });

      if (error) console.error("ERRATA", error);
      else setPolleros(data);
    }
    cargaMisPolleros();
  }, []);

  return (
    <>
      <h3>Polleros amigos {id}</h3>
      <p>Proximamente administración de sus polleros</p>
      {polleros &&
        polleros.map((pollero) => (
          <div key={pollero.userid}>
            <p>
              {" "}
              {pollero.apodo} - {pollero.mail}{" "}
            </p>
          </div>
        ))}
    </>
  );
}
