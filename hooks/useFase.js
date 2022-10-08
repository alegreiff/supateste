export default function useFase(fechas) {
  const comodinesGrupos = 2;
  const comodinesOctavos = 2;
  const comodinesCuartos = 2;
  const comodinesSemifinales = 2;
  const comodinesFinales = 1;
  let retorno;

  if (fechas.HOY < fechas.INICIO_GRUPOS)
    retorno = new Array("CARGA GRUPOS", 1, true, [1, 2, 3], comodinesGrupos);

  if (
    fechas.HOY > fechas.INICIO_GRUPOS &&
    fechas.HOY <= fechas.INICIO_OCTAVOS
  ) {
    if (fechas.HOY < fechas.FIN_GRUPOS) {
      retorno = new Array("JUGANDO GRUPOS", 0, false, []);
    } else {
      if (fechas.HOY < fechas.LIMITE_OCTAVOS) {
        retorno = new Array("CARGA OCTAVOS", 2, true, [4], comodinesOctavos);
      } else {
        retorno = new Array("CERRADA CARGA OCTAVOS", 0, false, []);
      }
    }
  }

  if (
    fechas.HOY > fechas.INICIO_OCTAVOS &&
    fechas.HOY <= fechas.INICIO_CUARTOS
  ) {
    if (fechas.HOY < fechas.FIN_OCTAVOS) {
      retorno = new Array("JUGANDO OCTAVOS", 0, false, []);
    } else {
      retorno = new Array("CARGA CUARTOS", 3, true, [5], comodinesCuartos);
    }
  }

  if (fechas.HOY > fechas.INICIO_CUARTOS && fechas.HOY <= fechas.INICIO_SEMIS) {
    if (fechas.HOY < fechas.FIN_CUARTOS) {
      retorno = new Array("JUGANDO CUARTOS", 0, false, []);
    } else {
      retorno = new Array("CARGA SEMIS", 4, true, [6], comodinesSemifinales);
    }
  }

  if (fechas.HOY > fechas.INICIO_SEMIS && fechas.HOY <= fechas.INICIO_FINALES) {
    if (fechas.HOY < fechas.FIN_SEMIS) {
      retorno = new Array("JUGANDO SEMIS", 0, false, []);
    } else {
      retorno = new Array("CARGA FINALES", 5, true, [7, 8], comodinesFinales);
    }
  }

  if (fechas.HOY > fechas.INICIO_FINALES) {
    retorno = new Array("POLLA FINALIZADA", 0, false);
  }

  return {
    fecha: fechas.HOY,
    estado: retorno[0],
    fase: retorno[1],
    cargaPronos: retorno[2],
    rondas: retorno[3],
    comodines: retorno[4] ? retorno[4] : null,
  };
}

/* 
CASOS

menor INICIO GRUPOS

mayor INICIO GRUPOS y menor que INICIO OCTAVOS

mayor INICIO OCTAVOS y menor que INICIO CUARTOS

mayor que INICIO CUARTOS y menor que INICIO SEMIS

mayor que INICIO SEMIS y menor que INICIO FINALES

mayor que INICIOM FINALES



*/
