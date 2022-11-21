import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { NavItem } from "./NavItem";

import useMenuLateralPolla from "../../utils/useMenuLateralPolla";
import Countdown from "react-countdown";
import { ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

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

      {user ? (
        <Menu>
          <MenuButton ml={10} as={Button} rightIcon={<ChevronDownIcon />}>
            Pollero
          </MenuButton>
          <MenuList>
            <MenuItem>Posiciones</MenuItem>
            <MenuItem>
              <NextLink href="/polleros" passHref>
                <Link>Polleros</Link>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href="/polla/mipolla" passHref>
                <Link>Mi polla</Link>
              </NextLink>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        ""
      )}

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
      <Text padding={5} fontSize="20px" color="white">
        {user?.isAmigo ? "Pollero Amigo" : null}
      </Text>
      <Center>
        <Badge fontSize="2xl">
          <Countdown date={new Date("2022-11-20 09:00:00")} />
        </Badge>
      </Center>

      <Spacer />
    </Box>
  );
};

/* 
Lunes
Menos
canto
rengo
lenta
linda
pingo
cunde
*/
