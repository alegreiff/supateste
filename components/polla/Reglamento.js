import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  ListIcon,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";

export const Reglamento = () => {
  return (
    <Box
      width={[
        "100%", // base
        "100%", // 480px upwards
        "100%", // 768px upwards
        "100%", // 992px upwards
      ]}
    >
      <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Generalidades
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <UnorderedList>
              <ListItem>
                La polla para Catar 2022 consiste en una sola polla que
                contempla los 64 partidos. Los polleros deben asumir el
                compromiso de inscribir sus pronósticos en cinco momentos,
                porque en nuestro modelo se pronostica sobre partidos ciertos,
                no sobre posibles llaves definidas desde antes que empiece el
                mundial. No inscribir resultados significa perder los puntos de
                esa fase y restar muchas posibilidades de ser uno de los
                ganadores. Estos son los cinco momentos de inscripción de
                pronósticos y los plazos límite para hacerlo.
                <hr />
                <Alert status="info">
                  <AlertIcon />
                  Todos los horarios corresponden a la hora estándar de
                  Colombia.
                </Alert>
                <table className="reglamento">
                  <thead>
                    <tr>
                      <th>Fase</th>
                      <th>Apertura</th>
                      <th>Cierre</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Grupos</td>
                      <td>Ahora mismo</td>
                      <td>Noviembre 21 (9:00 am)</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <Alert status="info">
                          <AlertIcon />
                          <p>
                            Entre el final de fase de grupos y el inicio de fase
                            de octavos apenas hay <strong>15 horas</strong>.
                            Único plazo para cargar marcadores de octavos de
                            final. <strong>Compromiso requerido</strong>
                          </p>
                        </Alert>
                      </td>
                    </tr>
                    <tr>
                      <td>Octavos de final</td>
                      <td>Diciembre 02 (5:00 pm)</td>
                      <td>Diciembre 03 (8:00 am)</td>
                    </tr>
                    <tr>
                      <td>Cuartos de final</td>
                      <td>Diciembre 06 (5:00 pm)</td>
                      <td>Diciembre 09 (8:00 am)</td>
                    </tr>
                    <tr>
                      <td>Semifinales</td>
                      <td>Diciembre 10 (6:00 pm)</td>
                      <td>Diciembre 13 ( 12:00 m )</td>
                    </tr>
                    <tr>
                      <td>Partidos finales</td>
                      <td>Diciembre 14 (5:00 pm)</td>
                      <td>Diciembre 17 (8:00 am)</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  Aunque la fase de grupos tiene el 75% de los partidos del
                  mundial, no estar en los primeros lugares cuando esta termine
                  no significa que no se pueda remontar. A medida que el mundial
                  avanza, la puntuación que se obtiene aumenta. Al final, los
                  ganadores serán quienes hayan sido constantes en la
                  inscripción de los pronósticos y hayan contado con más suerte.
                  O conocimiento. ¡Ambas, pues! ¡Bienvenidos y suerte para
                  todos!
                </p>
              </ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Inscripción
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Usted deberá registrarse en el sitio https://nuestrapolla.com. El
            registro puede ser de dos maneras_
            <OrderedList>
              <ListItem>
                Accediendo con su cuenta de Gmail (personal o empresarial)
              </ListItem>
              <ListItem>
                Registrándose por medio de un correo electrónico y una
                contraseña. En este caso recibirá un correo electrónico para
                validar su registro en el sitio.
              </ListItem>
            </OrderedList>
            En este punto usted estará <strong>Registrado </strong> en el sitio.
            A continuación deberá ingresar al enlace de <strong>Perfil</strong>
            <OrderedList>
              <ListItem>
                El correo electrónico de comunicación de los procesos de la
                polla
              </ListItem>
              <ListItem>Su nombre</ListItem>
              <ListItem>
                Su nombre de pollero (alias que lo identificará en la polla).
              </ListItem>
              <ListItem>
                La contraseña de acceso a la página de la polla (entre 8 y 15
                caracteres, debe tener al menos una mayúscula, una minúscula y
                un número)
              </ListItem>
              <ListItem>
                Quién es su pollero amigo (debe seleccionarlo del listado)
              </ListItem>
              <ListItem>
                El martes 12 de junio, día en que se cierra la inscripción de la
                polla, el pollero amigo informará al pollero mayor si avala su
                participación
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
