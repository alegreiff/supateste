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
    return "$" + num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
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
      <Heading color="polla.catar">
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
            <table className="reglamento">
              <thead>
                <tr>
                  <th>Votos</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>$100.000</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>$250.000</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>$150.000</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>$200.000</td>
                </tr>
              </tbody>
            </table>
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
            <table className="reglamento">
              <thead>
                <tr>
                  <th></th>
                  <th>Caso</th>
                  <th>Porcentaje del botín</th>
                  <th>Valor estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    Campeón de la polla (quien haga más puntos tras los 64
                    partidos)
                  </td>
                  <td>50%</td>
                  <td>{formatoNum(botin * 0.5)}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    Subcampeón de la polla (segundo con más puntos tras los 64
                    partidos)
                  </td>
                  <td>20%</td>
                  <td>{formatoNum(botin * 0.2)}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    Tercer puesto de la polla (tercero con más puntos tras los
                    64 partidos)
                  </td>
                  <td>10%</td>
                  <td>{formatoNum(botin * 0.1)}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    El mayor puntaje del grupo de cada pollero amigo (son varios
                    ganadores; el monto se reparte por partes iguales entre
                    quienes tras los 64 partidos punteen los grupos con al menos
                    10 inscritos)
                  </td>
                  <td>10%</td>
                  <td>{formatoNum(botin * 0.1)}</td>
                </tr>

                <tr>
                  <td>5</td>
                  <td>Pollero amigo del ganador de la polla.</td>
                  <td>5%</td>
                  <td>{formatoNum(botin * 0.05)}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>
                    Primer puesto de la fase de grupos (quien vaya adelante tras
                    los primeros 48 partidos)
                  </td>
                  <td>5%</td>
                  <td>{formatoNum(botin * 0.05)}</td>
                </tr>
              </tbody>
            </table>
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
                      <td>2 de diciembre (5:00 pm)</td>
                      <td>3 de diciembre(8:00 am)</td>
                    </tr>
                    <tr>
                      <td>Cuartos de final</td>
                      <td>6 de diciembre (5:00 pm)</td>
                      <td>9 de diciembre(8:00 am)</td>
                    </tr>
                    <tr>
                      <td>Semifinales</td>
                      <td>10 de diciembre(6:00 pm)</td>
                      <td>13 de diciembre( 12:00 m )</td>
                    </tr>
                    <tr>
                      <td>Partidos finales</td>
                      <td>14 de diciembre(5:00 pm)</td>
                      <td>17 de diciembre(8:00 am)</td>
                    </tr>
                  </tbody>
                </table>
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
            <table className="reglamento">
              <thead>
                <tr>
                  <th>Tipo de puntaje</th>
                  <th>Caso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GranChepazo</td>
                  <td>
                    Con comodín, Ud. acierta de manera exacta el marcador del
                    partido.
                  </td>
                </tr>
                <tr>
                  <td>Doble</td>
                  <td>
                    Con comodín, Ud. acierta la distribución de puntos de un
                    partido.
                  </td>
                </tr>
                <tr>
                  <td>Chepazo</td>
                  <td>
                    Sin comodín, Ud. acierta de manera exacta el marcador del
                    partido.
                  </td>
                </tr>
                <tr>
                  <td>Simple</td>
                  <td>
                    Sin comodín, Ud. acierta la distribución de puntos de un
                    partido.
                  </td>
                </tr>
                <tr>
                  <td>Blanco simple</td>
                  <td>Sin comodín, Ud. no acierta nada.</td>
                </tr>
                <tr>
                  <td>Blanco con comodín</td>
                  <td>
                    Con comodín, Ud. no acierta nada y desperdicia un comodín.
                  </td>
                </tr>
                <tr>
                  <td>Nulo</td>
                  <td>
                    Ojalá no ocurra. Ud. no inscribió el pronóstico dentro del
                    plazo establecido para hacerlo.
                  </td>
                </tr>
              </tbody>
            </table>
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
            <table className="reglamento">
              <thead>
                <tr>
                  <th>Tipo de puntaje</th>
                  <th>Grupos</th>
                  <th>Octavos</th>
                  <th>Cuartos</th>
                  <th>Semifinales</th>
                  <th>Finales</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GranChepazo</td>
                  <td>10</td>
                  <td>20</td>
                  <td>30</td>
                  <td>40</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>Doble</td>
                  <td>6</td>
                  <td>12</td>
                  <td>20</td>
                  <td>30</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>Chepazo</td>
                  <td>5</td>
                  <td>10</td>
                  <td>15</td>
                  <td>20</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>Simple</td>
                  <td>3</td>
                  <td>6</td>
                  <td>10</td>
                  <td>15</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>Blanco simple / Blanco con comodín / NULO</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
