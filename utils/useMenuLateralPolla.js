/*
import React from "react";
import copy from "copy-to-clipboard";

export default function useCopyToClipboard(resetInterval = null) {
  const [isCopied, setCopied] = React.useState(false);

  function handleCopy(text) {
    if (typeof text === "string" || typeof text == "number") {
      copy(text.toString());
      setCopied(true);
    } else {
      setCopied(false);
      console.error(
        `Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`
      );
    }
  }

  return [isCopied, handleCopy];
}
*/

import { useState } from "react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import useDatosPollero from "../storedata/pollero";

export default function useMenuLateralPolla() {
  const [usuariopolla, setUsuariopolla] = useState(null);
  const { usuario } = useDatosPollero((state) => state);

  const menuE = [
    { name: "Home", icon: FiHome, ruta: "/" },
    { name: "Polla", icon: FiTrendingUp, ruta: "/polla" },
    { name: "Explore", icon: FiCompass, ruta: "/" },
    { name: "Partidos", icon: FiStar, ruta: "/partidos" },
    {
      name: "Test",
      icon: FiStar,
      ruta: "/perfil/5a47d784-6ea8-4864-9ecf-22b2f07a0e83",
    },
  ];
  if (usuario?.email) {
    menuE.push({ name: "Perfil", icon: FiStar, ruta: `/perfil/${usuario.id}` });
  }

  return [usuariopolla, menuE];
}

/* const elementosMenu = () => {
  
} */

//export default MenuLateral;
