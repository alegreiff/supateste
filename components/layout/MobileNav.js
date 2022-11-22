import { FiStar } from "react-icons/fi";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { FiMenu, FiBell, FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import useMenuLateralPolla from "../../utils/useMenuLateralPolla";
import { EstadoPolla } from "./EstadoPolla";
import useDatosPollero from "../../storedata/pollero";
import { useRouter } from "next/router";

export const MobileNav = ({ onOpen, user, cerrar, ...rest }) => {
  const { equipos } = useDatosPollero((state) => state);
  const { isOpen: isO, onOpen: onO, onClose: onC } = useDisclosure();
  const btnRef = React.useRef();
  const { userMenu } = useMenuLateralPolla();
  const [bandera, setBandera] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (user?.favorito) {
      const bandera = equipos.find((eq) => eq.id === user.favorito).code;
      console.log({ bandera });
      setBandera(bandera);
    }
  }, []);

  const localStorageClear = () => {
    localStorage.clear();
    cerrar();
    router.push("/");
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      //bg={useColorModeValue("white", "gray.900")}
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <Drawer
        isOpen={isO}
        placement="right"
        onClose={onC}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Estado Polla</DrawerHeader>

          <DrawerBody>
            <EstadoPolla />
          </DrawerBody>

          <DrawerFooter>ff</DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Image
        src="/letrero.png"
        alt="nuestra polla"
        width={{ base: "200px", md: "300px", lg: "auto" }}
      />
      <Spacer />
      {/* <Button ref={btnRef} color="polla.catar" onClick={onO}>
        ?
      </Button> */}
      <IconButton
        ref={btnRef}
        onClick={onO}
        size="lg"
        icon={<FiHelpCircle />}
      />

      <Spacer />
      <IconButton
        display={{ base: "flex", md: "none" }}
        color="white"
        background="polla.catar"
        _hover={{ background: "polla.catarlight" }}
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
      ></Text>

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
                      <Text fontSize="sm">{user.alias}</Text>
                      <Image
                        border={`3px solid`}
                        src={`/banderas/${bandera.toLowerCase()}.png`}
                        alt={user.favorito}
                        height={22}
                        width={22}
                        borderRadius="full"
                      />
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
