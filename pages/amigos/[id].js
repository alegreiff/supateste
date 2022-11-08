import { useRouter } from "next/router";

export default function PollerosAMigosAdmin() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <h3>Polleros amigos {id}</h3>
      <p>Proxiomamente administración de sus polleros</p>
    </>
  );
}
