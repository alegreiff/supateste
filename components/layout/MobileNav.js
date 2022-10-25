import { FiStar } from "react-icons/fi";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import useMenuLateralPolla from "../../utils/useMenuLateralPolla";

export const MobileNav = ({ onOpen, user, cerrar, ...rest }) => {
  const { userMenu } = useMenuLateralPolla();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {user?.isAmigo ? "Pollero Amigo" : null}
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {user?.email ? (
                  <Avatar
                    size={"lg"}
                    src={`https://dsbiqexajjcyswddmxve.supabase.co/storage/v1/object/public/${user?.foto}`}
                  />
                ) : (
                  <IconButton
                    as={Box}
                    variant="solid"
                    aria-label="open menu"
                    icon={<BsPersonCircle />}
                    fontSize="40px"
                  />
                )}

                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {user?.email ? (
                    <>
                      <Text fontSize="sm">
                        {user.alias} {user.favorito}{" "}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {user.email}
                      </Text>
                    </>
                  ) : (
                    <Text fontSize="sm">Anónimo</Text>
                  )}
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            {user && (
              <MenuList>
                {/* <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem> */}

                {user &&
                  userMenu.map((link, i) => (
                    <MenuItem key={i}>
                      <NextLink href={link.ruta} passHref>
                        <Link
                          style={{ textDecoration: "none" }}
                          _focus={{ boxShadow: "none" }}
                        >
                          {link.name}
                        </Link>
                      </NextLink>
                    </MenuItem>
                  ))}

                <MenuDivider />
                <MenuItem onClick={cerrar}>Cerrar sesión</MenuItem>
              </MenuList>
            )}
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
