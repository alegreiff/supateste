import { Flex, Icon, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export const NavItem = ({ icon, children, ruta, ...rest }) => {
  return (
    <NextLink href={ruta} passHref>
      <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "white",
            color: "polla.catar",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              color="white"
              mr="4"
              fontSize="20"
              _groupHover={{
                textColor: "white",
                fontWeight: "bold",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

/*
<Link
      href={ruta}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
*/
/* 
Diez cosas de HTML
https://www.youtube.com/watch?v=1x0TITmM4Wc
1. contenteditable FALSE
2. input color FALSE
3. etiqueta mark FALSE
4. etiqueta meter FALSE
5. etiqueta progress FALSE
6. atributo spellcheck FALSE
7. details + summary FALSE
8. native dialog
9. label + input 
10. optgroup
11. datalist


*/
