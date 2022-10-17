import { extendTheme, theme as base } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    polla: {
      eliminado: " #fdedec",
      clasificado: "#eafaf1",
    },
  },
});

export default customTheme;
