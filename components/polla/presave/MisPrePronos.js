import { Badge } from "@chakra-ui/react";
import React from "react";

export const MisPrePronos = ({ pronos, partidos, pronosdb }) => {
  const partidoView = (local, visitante, nl, nv, nc, old, ol, ov, oc) => {
    console.log("OLDS", ol, ov, oc);
    if (old) {
      return (
        <>
          <Badge colorScheme="red">
            {local} {ol} vs {ov} {visitante}{" "}
            {oc ? "CON comodín" : "SIN comodín"}
          </Badge>
          <Badge colorScheme="green">
            {local} {nl} vs {nv} {visitante}{" "}
            {nc ? "CON comodín" : "SIN comodín"}
          </Badge>
        </>
      );
    } else {
      return (
        <>
          <Badge colorScheme="green">
            {local} {nl} vs {nv} {visitante}{" "}
            {nc ? "CON comodín" : "SIN comodín"}
          </Badge>
        </>
      );
    }
  };

  const muestrapartido = (id, ml, mv, com) => {
    const partido = partidos.find((p) => p.id === id);

    const old = pronosdb.find((pr) => pr.partido === id);

    if (old) {
      return partidoView(
        partido.eqloc,
        partido.eqvis,
        ml,
        mv,
        com,
        true,
        old.pron_loc,
        old.pron_vis,
        old.comodin
      );
    } else {
      return partidoView(
        partido.eqloc,
        partido.eqvis,
        ml,
        mv,
        com,
        false,
        null,
        null,
        null
      );
    }
    /* return (
      <>
        <Badge colorScheme="red">
          {old.pron_loc} - {old.pron_vis}
          {old.comodin ? "Con comodín" : "Sin comodín"}
        </Badge>

        <Badge colorScheme="green">
          {ml} - {mv}
          {com ? "Con comodín" : "Sin comodín"}
        </Badge>
        
      </>
    ); */
  };

  return (
    <>
      {pronos &&
        pronos.map((pron) => (
          <div key={pron.partido}>
            {muestrapartido(
              pron.partido,
              pron.pron_loc,
              pron.pron_vis,
              pron.comodin
            )}
          </div>
        ))}
    </>
  );
};

/* 

[
  {"id":200,"created_at":"2022-10-30T17:09:30.09016+00:00","user_id":"d604791c-02f8-4e62-bdfd-b955d8578cbc","partido":13,"pron_loc":0,"pron_vis":0,"comodin":true,"grupo":"G","cambios":2},{"id":201,"created_at":"2022-10-30T17:09:30.09016+00:00","user_id":"d604791c-02f8-4e62-bdfd-b955d8578cbc","partido":16,"pron_loc":0,"pron_vis":1,"comodin":false,"grupo":"G","cambios":2},
  
  {"id":196,"created_at":"2022-10-30T17:09:30.09016+00:00","user_id":"d604791c-02f8-4e62-bdfd-b955d8578cbc","partido":29,"pron_loc":0,"pron_vis":0,"comodin":true,"grupo":"G","cambios":2}]
*/
