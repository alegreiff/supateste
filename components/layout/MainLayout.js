import React, { useEffect, useState } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Avatar,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";

import { MobileNav } from "./MobileNav";
import { MenuIzquierdo } from "./MenuIzquierdo";
import useDatosPollero from "../../storedata/pollero";
import { EstadoPolla } from "./EstadoPolla";

export default function MainLayout({ children, cerrar }) {
  const { usuario: user } = useDatosPollero((state) => state);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("M O U N T E D");
    setMounted(true);
  }, []);
  return (
    mounted && (
      <>
        <Box minH="100vh">
          <MenuIzquierdo
            cerrar={cerrar}
            user={user}
            onClose={onClose}
            display={{ base: "none", md: "block" }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            colo
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <MenuIzquierdo user={user} onClose={onClose} cerrar={cerrar} />
            </DrawerContent>
          </Drawer>
          {/* mobilenav */}

          <MobileNav
            onOpen={onOpen}
            user={user}
            cerrar={cerrar}
            onClose={onClose}
          />
          <Box ml={{ base: 0, md: 60 }} p="4">
            {children}
          </Box>
        </Box>
      </>
    )
  );
}
