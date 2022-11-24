CREATE OR REPLACE FUNCTION pruebafuncion( out m character varying )
RETURNS character varying
 LANGUAGE plpgsql
AS $function$
BEGIN


create TEMP table temporefixture as (select * from fixture);
create TEMP table temporepronos as (select * from pronos);
TRUNCATE  TABLE  temporepronos;
INSERT INTO temporepronos select * from pronos;
BEGIN TRANSACTION;

CREATE OR REPLACE VIEW tempoposiciones AS 
SELECT rank() OVER (ORDER BY (sum(p.puntos)) DESC, (count(*) FILTER (WHERE p.resultado = 'blancoconcomodin'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancosimple'::resultadoprono)), (count(*) FILTER (WHERE p.resultado = 'chepazo'::resultadoprono)) DESC, (count(*) FILTER (WHERE p.resultado = 'granchepazo'::resultadoprono)) DESC, (count(*) FILTER (WHERE p.resultado = 'simple'::resultadoprono)) DESC, (count(*) FILTER (WHERE p.resultado = 'doble'::resultadoprono)) DESC) AS pos,
    u.alias,
    sum(p.puntos) AS pts,
    count(*) FILTER (WHERE p.resultado = 'granchepazo'::resultadoprono) AS gch,
    count(*) FILTER (WHERE p.resultado = 'doble'::resultadoprono) AS dbl,
    count(*) FILTER (WHERE p.resultado = 'chepazo'::resultadoprono) AS ch,
    count(*) FILTER (WHERE p.resultado = 'simple'::resultadoprono) AS sim,
    count(*) FILTER (WHERE p.resultado = 'blancoconcomodin'::resultadoprono) AS bkc,
    count(*) FILTER (WHERE p.resultado = 'blancosimple'::resultadoprono) AS bks,
    count(*) FILTER (WHERE p.comodin = true) AS usedcom,
    count(*) FILTER (WHERE p.resultado = 'blancoconcomodin'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancosimple'::resultadoprono) AS blanco,
    (( SELECT count(*) AS count
           FROM temporefixture
          WHERE temporefixture.procesado = true)) - (count(*) FILTER (WHERE p.resultado = 'granchepazo'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'doble'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'chepazo'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'simple'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancoconcomodin'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancosimple'::resultadoprono)) AS nulo,
    u.id AS userid,
    pm.username AS amigo
   FROM temporepronos p
     LEFT JOIN usuarios u ON u.id = p.user_id
     LEFT JOIN pollerosamigos pm ON pm.id = u.amigo
  WHERE p.procesado = true
  GROUP BY u.alias, u.id, pm.username;
select * from procesamarcadorqps(13, 3, 0);
select * from procesamarcadorqps(14, 2, 0);
select * from procesamarcadorqps(15, 4, 1);
select * from procesamarcadorqps(16, 0, 0);
select * from tempoposiciones;
COMMIT;


SELECT 'Éxitos' as "resp" INTO pruebafuncion.m;
END;

$function$