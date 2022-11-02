import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Heading,
  HStack,
  Image,
  ListIcon,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  OrderedList,
  Spacer,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const Reglamento = () => {
  const [botin, setBotin] = useState(0);
  const [polleros, setPolleros] = useState(10);

  useEffect(
    (I) => {
      const botin = 200000 * polleros * 0.8;
      setBotin(botin);
    },
    [polleros]
  );

  const formatoNum = (num) => {
    return "$" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return 1;
  };
  return (
    <Box
      width={[
        "100%", // base
        "100%", // 480px upwards
        "100%", // 768px upwards
        "100%", // 992px upwards
      ]}
    >
      <Heading
        color="polla.catar"
        width={{ base: "80%", md: "80%", lg: "auto" }}
      >
        Esperamos estar al aire con registro de polleros el{" "}
        <strong>JUEVES 03</strong> de noviembre. Entretanto, entérense...
      </Heading>
      <Accordion allowToggle>
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
            registro puede ser de dos maneras:
            <OrderedList>
              <ListItem>
                <strong>Recomendado</strong>. Accediendo con su cuenta de Gmail
                (personal o empresarial). Al hacer click en{" "}
                <strong>Ingreso / registro con su cuenta de Gmail</strong> será
                dirigido a su cuenta de Gmail para autorizar el ingreso a
                Nuestra Polla.
              </ListItem>
              <ListItem>
                Registrándose por medio de un correo electrónico y una
                contraseña. En este caso recibirá un correo electrónico con el
                asunto <strong>Bienvenido a Nuestra Polla</strong> para validar
                su registro en el sitio. Búsquelo hasta en SPAM.
                <Image
                  padding={2}
                  src="./tutorial/correoenviado.png"
                  alt="Correo enviado mensaje"
                />
                <hr />
                <Image
                  padding={2}
                  src="./tutorial/correo.png"
                  alt="Correo enviado"
                />
                <p>
                  Únicamente deberá hacer clic en{" "}
                  <strong>Confirmar correo</strong> y será redirigido a la
                  página y en adelante podrá ingresar con el correo y la
                  contraseña seleccionadas.
                </p>
                <Alert status="info">
                  <AlertIcon />
                  Cualquier duda posterior podrá escribir a
                  webmaster@nuestrapolla.com
                </Alert>
              </ListItem>
            </OrderedList>
            <p>
              En este punto usted estará <strong>Registrado </strong> en el
              sitio. A continuación deberá ingresar al enlace de{" "}
              <strong>Perfil</strong>.
            </p>
            <p>
              En la sección de Perfil deberá registrarse como pollero por medio
              del siguiente formulario:
              <Image src="./tutorial/perfil.png" alt="Perfiol Pollero" />
            </p>
            <Alert status="info">
              <AlertIcon />
              Los polleros amigos son (por ahora): Luis Carlos Urrutia / Jaime
              de Greiff. Uno de ellos avalará su inscripción y lo contactará
              para el pago.
            </Alert>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Costo de inscripción
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Heading as="h2">Costo de inscripción: $200.000</Heading>
            <p>La encuesta publicada arrojó el siguiente resultado: </p>
            <Table className="reglamento">
              <Thead>
                <Tr>
                  <Th>Votos</Th>
                  <Th>Valor</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>$100.000</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>$250.000</Td>
                </Tr>
                <Tr>
                  <Td>6</Td>
                  <Td>$150.000</Td>
                </Tr>
                <Tr>
                  <Td>8</Td>
                  <Td>$200.000</Td>
                </Tr>
              </Tbody>
            </Table>
            <p>
              En consecuencia, el valor de inscripción es de{" "}
              <strong>$200.000</strong> (doscientos mil devaluados pesos)
            </p>
            <p>
              El <strong>80 %</strong> del dinero recaudado por concepto de
              inscripciones conforma el botín que se repartirán los ganadores.
              El <strong>20 %</strong> restante se destinará a cubrir los gastos
              administrativos y de mantenimiento de la página web y la
              inscripción de los polleros amigos (los polleros amigos con 10 o
              más polleros <strong>NO PAGARÁN</strong> inscripción)
            </p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Tabla de premios
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <HStack>
              <p>Con un total de </p>
              <NumberInput
                value={polleros}
                onChange={(e) => {
                  setPolleros(e);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <p>
                ... polleros, el botín sería de{" "}
                <strong>{formatoNum(botin)}</strong>{" "}
              </p>
            </HStack>
            <hr />
            <Table className="reglamento">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Caso</Th>
                  <Th>Porcentaje del botín</Th>
                  <Th>Valor estimado</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>
                    Campeón de la polla (quien haga más puntos tras los 64
                    partidos)
                  </Td>
                  <Td>50%</Td>
                  <Td>{formatoNum(botin * 0.5)}</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>
                    Subcampeón de la polla (segundo con más puntos tras los 64
                    partidos)
                  </Td>
                  <Td>20%</Td>
                  <Td>{formatoNum(botin * 0.2)}</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>
                    Tercer puesto de la polla (tercero con más puntos tras los
                    64 partidos)
                  </Td>
                  <Td>10%</Td>
                  <Td>{formatoNum(botin * 0.1)}</Td>
                </Tr>
                <Tr>
                  <Td>4</Td>
                  <Td>
                    El mayor puntaje del grupo de cada pollero amigo (son varios
                    ganadores; el monto se reparte por partes iguales entre
                    quienes tras los 64 partidos punteen los grupos con al menos
                    10 inscritos)
                  </Td>
                  <Td>10%</Td>
                  <Td>{formatoNum(botin * 0.1)}</Td>
                </Tr>

                <Tr>
                  <Td>5</Td>
                  <Td>Pollero amigo del ganador de la polla.</Td>
                  <Td>5%</Td>
                  <Td>{formatoNum(botin * 0.05)}</Td>
                </Tr>
                <Tr>
                  <Td>6</Td>
                  <Td>
                    Primer puesto de la fase de grupos (quien vaya adelante tras
                    los primeros 48 partidos)
                  </Td>
                  <Td>5%</Td>
                  <Td>{formatoNum(botin * 0.05)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
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
                La Polla Catar 2022 contempla los 64 partidos del Mundial. Los
                polleros deben asumir el compromiso de inscribir sus pronósticos
                en cinco momentos, porque en nuestro modelo se pronostica sobre
                partidos ciertos, no sobre posibles llaves definidas desde antes
                de que empiece el Mundial. No inscribir resultados significa
                perder los puntos de esa fase y restar muchas posibilidades de
                ser uno de los ganadores. Estos son los cinco momentos de
                inscripción de pronósticos y los plazos límite para hacerlo
                <hr />
                <Alert status="info">
                  <AlertIcon />
                  Todos los horarios corresponden a la hora estándar de
                  Colombia.
                </Alert>
                <Table className="reglamento">
                  <Thead>
                    <Tr>
                      <Th>Fase</Th>
                      <Th>Apertura</Th>
                      <Th>Cierre</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Grupos</Td>
                      <Td>Ahora mismo</Td>
                      <Td>Noviembre 21 (9:00 am)</Td>
                    </Tr>
                    <Tr>
                      <Td colSpan={3}>
                        <Alert status="info">
                          <AlertIcon />
                          <p>
                            Entre el final de fase de grupos y el inicio de fase
                            de octavos apenas hay <strong>15 horas</strong>.
                            Único plazo para cargar marcadores de octavos de
                            final. <strong>Compromiso requerido</strong>
                          </p>
                        </Alert>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Octavos de final</Td>
                      <Td>2 de diciembre (5:00 pm)</Td>
                      <Td>3 de diciembre(8:00 am)</Td>
                    </Tr>
                    <Tr>
                      <Td>Cuartos de final</Td>
                      <Td>6 de diciembre (5:00 pm)</Td>
                      <Td>9 de diciembre(8:00 am)</Td>
                    </Tr>
                    <Tr>
                      <Td>Semifinales</Td>
                      <Td>10 de diciembre(6:00 pm)</Td>
                      <Td>13 de diciembre( 12:00 m )</Td>
                    </Tr>
                    <Tr>
                      <Td>Partidos finales</Td>
                      <Td>14 de diciembre(5:00 pm)</Td>
                      <Td>17 de diciembre(8:00 am)</Td>
                    </Tr>
                  </Tbody>
                </Table>
                <p>
                  Aunque la fase de grupos tiene el 75 % de los partidos, no
                  estar en los primeros lugares cuando termine no significa que
                  no se pueda remontar. A medida que el Mundial avanza, la
                  puntuación que se obtiene aumenta (entre la primera y última
                  fase, cada acierto aumenta al menos cinco veces). Al final,
                  los ganadores serán quienes hayan sido constantes en la
                  inscripción de los pronósticos y hayan contado con más suerte.
                  O conocimiento. ¡Ambas, pues! ¡Bienvenidos y suerte para todas
                  las personas participantes!
                </p>
              </ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>

        {/* <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Registro de marcadores
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            atque sed, repudiandae, nostrum quod molestias voluptate odit aut ex
            delectus harum dolorem beatae tenetur quas amet, temporibus ut
            magnam alias?
          </AccordionPanel>
        </AccordionItem> */}
        {/* <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Sistema de juego
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            atque sed, repudiandae, nostrum quod molestias voluptate odit aut ex
            delectus harum dolorem beatae tenetur quas amet, temporibus ut
            magnam alias?
          </AccordionPanel>
        </AccordionItem> */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Puntuación
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Table className="reglamento">
              <Thead>
                <Tr>
                  <Th>Tipo de puntaje</Th>
                  <Th>Caso</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>GranChepazo</Td>
                  <Td>
                    Con comodín, Ud. acierta de manera exacta el marcador del
                    partido.
                  </Td>
                </Tr>
                <Tr>
                  <Td>Doble</Td>
                  <Td>
                    Con comodín, Ud. acierta la distribución de puntos de un
                    partido.
                  </Td>
                </Tr>
                <Tr>
                  <Td>Chepazo</Td>
                  <Td>
                    Sin comodín, Ud. acierta de manera exacta el marcador del
                    partido.
                  </Td>
                </Tr>
                <Tr>
                  <Td>Simple</Td>
                  <Td>
                    Sin comodín, Ud. acierta la distribución de puntos de un
                    partido.
                  </Td>
                </Tr>
                <Tr>
                  <Td>Blanco simple</Td>
                  <Td>Sin comodín, Ud. no acierta nada.</Td>
                </Tr>
                <Tr>
                  <Td>Blanco con comodín</Td>
                  <Td>
                    Con comodín, Ud. no acierta nada y desperdicia un comodín.
                  </Td>
                </Tr>
                <Tr>
                  <Td>Nulo</Td>
                  <Td>
                    Ojalá no ocurra. Ud. no inscribió el pronóstico dentro del
                    plazo establecido para hacerlo.
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Puntajes por fase
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Table className="reglamento">
              <Thead>
                <Tr>
                  <Th>Tipo de puntaje</Th>
                  <Th>Grupos</Th>
                  <Th>Octavos</Th>
                  <Th>Cuartos</Th>
                  <Th>Semifinales</Th>
                  <Th>Finales</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>GranChepazo</Td>
                  <Td>10</Td>
                  <Td>20</Td>
                  <Td>30</Td>
                  <Td>40</Td>
                  <Td>50</Td>
                </Tr>
                <Tr>
                  <Td>Doble</Td>
                  <Td>6</Td>
                  <Td>12</Td>
                  <Td>20</Td>
                  <Td>30</Td>
                  <Td>40</Td>
                </Tr>
                <Tr>
                  <Td>Chepazo</Td>
                  <Td>5</Td>
                  <Td>10</Td>
                  <Td>15</Td>
                  <Td>20</Td>
                  <Td>25</Td>
                </Tr>
                <Tr>
                  <Td>Simple</Td>
                  <Td>3</Td>
                  <Td>6</Td>
                  <Td>10</Td>
                  <Td>15</Td>
                  <Td>20</Td>
                </Tr>
                <Tr>
                  <Td>Blanco simple / Blanco con comodín / NULO</Td>
                  <Td>0</Td>
                  <Td>0</Td>
                  <Td>0</Td>
                  <Td>0</Td>
                  <Td>0</Td>
                </Tr>
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
