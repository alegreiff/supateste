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

  const elmenu = [
    { name: "Inicio", icon: FiHome, ruta: "/" },
    { name: "Polla", icon: FiTrendingUp, ruta: "/polla" },
    /* { name: "Explore", icon: FiCompass, ruta: "/" }, */
    { name: "Partidos", icon: FiStar, ruta: "/partidos" },

    /* { name: "Pronos", icon: FiStar, ruta: "/polla/pronos" }, */
    /* {
      name: "Test",
      icon: FiStar,
      ruta: "/perfil/5a47d784-6ea8-4864-9ecf-22b2f07a0e83",
    } */

    ,
  ];
  if (usuario?.alias) {
    elmenu.push({
      name: "Pronos",
      icon: FiStar,
      ruta: `/polla/pronos`,
    });
  }

  if (usuario?.email) {
    elmenu.push({
      name: "Perfil",
      icon: FiStar,
      ruta: `/perfil/${usuario.id}`,
    });
    elmenu.push({
      name: "Test",
      icon: FiStar,
      ruta: `/chat`,
    });
  }

  const userMenu = [
    { name: "Perfil", icon: FiStar, ruta: `/perfil/${usuario?.id}` },
    { name: "Mis pronósticos", icon: FiStar, ruta: `/polla/pronos` },
  ];

  return { usuariopolla, elmenu, userMenu };
}

/* const elementosMenu = () => {
  
} */

//export default MenuLateral;
