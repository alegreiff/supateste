import {
  Box,
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

const LinkItems = [
  { name: "Home", icon: FiHome, ruta: "/" },
  { name: "Trending", icon: FiTrendingUp, ruta: "/" },
  { name: "Explore", icon: FiCompass, ruta: "/" },
  { name: "Partidos", icon: FiStar, ruta: "/partidos" },
  { name: "Settings", icon: FiSettings, ruta: "/" },
];

export const MenuIzquierdo = ({ onClose, ...rest }) => {
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
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} ruta={link.ruta}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
