import useDatosPollero from "../storedata/pollero";

export default function useIsAdmin() {
  const { usuario } = useDatosPollero((state) => state);
  let isAdmin = false;
  if (usuario?.id && usuario.id === "055e5fa9-ffb7-46ed-842e-7c04b4192d5c") {
    isAdmin = true;
  }

  return { isAdmin };
}
