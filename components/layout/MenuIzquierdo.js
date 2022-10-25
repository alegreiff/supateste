import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { NavItem } from "./NavItem";

import useMenuLateralPolla from "../../utils/useMenuLateralPolla";

/* const LinkItems = [
  { name: "Home", icon: FiHome, ruta: "/" },
  { name: "Trending", icon: FiTrendingUp, ruta: "/" },
  { name: "Explore", icon: FiCompass, ruta: "/" },
  { name: "Partidos", icon: FiStar, ruta: "/partidos" },
]; */

export const MenuIzquierdo = ({ onClose, user, cerrar, ...rest }) => {
  const { elmenu } = useMenuLateralPolla();

  /* if (user?.id) {
    LinkItems.push({
      name: user.email,
      icon: FiSettings,
      ruta: `perfil/${user.id}`,
    });
  } */
  return (
    <Box
      transition="3s ease"
      //bg={useColorModeValue("white", "gray.900")}
      bg="polla.catar"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold"></Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {elmenu.map((link) => (
        <NavItem
          _hover={{
            bg: "polla.catarlight",
          }}
          key={link.name}
          icon={link.icon}
          ruta={link.ruta}
          onClick={onClose}
        >
          <Text color="white" fontSize={22}>
            {link.name}
          </Text>
        </NavItem>
      ))}

      {/* <Button onClick={cerrar}> Cerrar sesión</Button> */}

      <Image src="/logo.png" alt="Logo" />
    </Box>
  );
};
