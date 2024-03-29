import { useState } from "react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import useDatosPollero from "../storedata/pollero";

export default function useMenuLateralPolla() {
  const [usuariopolla, setUsuariopolla] = useState(null);
  const { usuario } = useDatosPollero((state) => state);
  //console.log({ usuario });

  const menuPollero = [];
  if (usuario?.alias) {
    /* menuPollero.push({
      name: "Polla diaria",
      icon: FiStar,
      ruta: `/polla/polla`,
    }); */
    /* menuPollero.push({
      name: "Posiciones",
      icon: FiStar,
      ruta: `/polla/posiciones`,
    }); */
    /* menuPollero.push({
      name: "Pronos",
      icon: FiStar,
      ruta: `/polla/pronos`,
    }); */
    menuPollero.push({
      name: "Mi Polla",
      icon: FiStar,
      ruta: `/polla/mipolla`,
    });
    menuPollero.push({
      name: "Polleros",
      icon: FiStar,
      ruta: `/polleros`,
    });
  }

  const elmenu = [
    { name: "Inicio", icon: FiHome, ruta: "/" },
    { name: "Posiciones", icon: FiHome, ruta: "/polla/posiciones" },
    //{ name: "Polla", icon: FiStar, ruta: "/polla/polla" },
    //{ name: "Mi Polla", icon: FiStar, ruta: "/polla/mipolla" },
    //{ name: "Polleros", icon: FiUsers, ruta: "/polleros" },

    /* { name: "Explore", icon: FiCompass, ruta: "/" }, */
    { name: "Partidos", icon: FiStar, ruta: "/partidos" },

    /* PDF TEMPORAL */
    //{ name: "Test PDF", icon: FiStar, ruta: "/pdf" },
    /* FIN PDF Temporal */

    /* { name: "Pronos", icon: FiStar, ruta: "/polla/pronos" }, */
    /* {
      name: "Test",
      icon: FiStar,
      ruta: "/perfil/5a47d784-6ea8-4864-9ecf-22b2f07a0e83",
    } */

    ,
  ];

  if (usuario?.isAmigo) {
    elmenu.push({
      name: "Mis polleros",
      icon: FiStar,
      ruta: `/amigos/${usuario.id}`,
    });
  }

  if (usuario?.email) {
    /* elmenu.push({
      name: "Perfil",
      icon: FiStar,
      ruta: `/perfil/${usuario.id}`,
    }); */
    /* elmenu.push({
      name: "Poner marcadores",
      icon: FiStar,
      ruta: `/polla/pronos`,
    }); */
    elmenu.push({
      name: "Polla diaria",
      icon: FiStar,
      ruta: `/polla/polla`,
    });
    elmenu.push({
      name: "Chat",
      icon: FiStar,
      ruta: `/chat`,
    });
  }

  const userMenu = [
    { name: "Perfil", icon: FiStar, ruta: `/perfil/${usuario?.id}` },
    { name: "Mis pronósticos", icon: FiStar, ruta: `/polla/pronos` },
  ];

  return { usuariopolla, elmenu, userMenu, menuPollero };
}

/* const elementosMenu = () => {
  
} */

//export default MenuLateral;
