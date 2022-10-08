import {
  Box,
  Button,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { NavItem } from "./NavItem";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
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
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {elmenu.map((link) => (
        <NavItem key={link.name} icon={link.icon} ruta={link.ruta}>
          {link.name}
        </NavItem>
      ))}
      <Button onClick={cerrar}> Cerrar sesión</Button>
    </Box>
  );
};
