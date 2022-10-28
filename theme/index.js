import { extendTheme, theme as base } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    polla: {
      eliminado: " #fdedec",
      clasificado: "#eafaf1",
      catar: "#6C1D45",
      catarlight: "#9F5078",
      catari: "#A10D50",
    },
  },
});

export default customTheme;
