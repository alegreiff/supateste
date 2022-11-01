import { Badge, Stack } from "@chakra-ui/react";
import { format, parse, addHours } from "date-fns";
import { es } from "date-fns/locale";

export const FechaSingle = ({ date }) => {
  date = new Date(date);
  const dia = format(date, "cccc", { locale: es });
  const fecha = format(date, "MMM dd", { locale: es });
  const hora = format(date, "H':'mm a");
  return (
    <Stack direction="column">
      <div>
        <Badge fontSize="xs">{dia}</Badge>
        <Badge fontSize="xs">{fecha}</Badge>
      </div>
      <Badge fontSize="1rem" colorScheme="green">
        {hora}
      </Badge>
    </Stack>
  );
};

/* 

*/
