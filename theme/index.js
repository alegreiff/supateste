import { extendTheme, theme as base } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    polla: {
      eliminado: " #fdedec",
      clasificado: "#eafaf1",
      catar: "#6C1D45",
      catarlight: "#9F5078",
      catari: "#A10D50",
      local: "#A10D50",
      visitante: "#3E7594",
      empate: "#CEA02B",
      prono: "#2E7A61",
    },
  },
});

export default customTheme;
