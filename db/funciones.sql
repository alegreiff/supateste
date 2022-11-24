--INIX3
CREATE OR REPLACE FUNCTION public.tempoclear(OUT m character varying)
 RETURNS character varying
 LANGUAGE plpgsql
AS $function$
BEGIN

UPDATE temporepronos
SET procesado = false, resultado = null, puntos = null

where temporepronos.id >0;

UPDATE temporefixture
SET mlocal = null, mvisit = null, procesado = false
WHERE temporefixture.id >0;

SELECT 'Éxitos' as "resp" INTO pronos_clear.m;

END;

$function$
--FINE3 
--INIX2
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
--FINE2
--INICIO
CREATE OR REPLACE FUNCTION public.procesamarcadorqps(pt integer, ml integer, mv integer)
 RETURNS TABLE(p integer, com boolean, pl integer, pv integer, resultado resultadoprono, pts integer)
 LANGUAGE plpgsql
AS $function$
DECLARE
ptgch int; 
ptdbl int; 
ptchp int; 
ptsim int;
res varchar;
BEGIN

IF pt < 49 THEN ptgch = 10; ptdbl = 6; 	ptchp = 5; ptsim = 3; 
	ELSEIF pt > 48 AND pt <57 THEN ptgch = 20; ptdbl = 12; 	ptchp = 10; ptsim = 6; 
	ELSEIF pt > 56 AND pt <61 THEN ptgch = 30; ptdbl = 20; 	ptchp = 15; ptsim = 10; 
	ELSEIF pt > 60 AND pt <63 THEN ptgch = 40; ptdbl = 30; 	ptchp = 20; ptsim = 15; 
	ELSEIF pt > 62 THEN ptgch = 50; ptdbl = 40; 	ptchp = 25; ptsim = 20;	
END IF;
RAISE NOTICE 'PUNTOS: % % % %', ptgch, ptchp, ptdbl, ptsim;
IF ml > mv THEN 
res = 'LOCAL';
ELSEIF ml < mv THEN  
res = 'VISITANTE';
ELSEIF ml = mv THEN  
res = 'EMPATE';
END IF;

			

IF res = 'LOCAL' THEN
			UPDATE temporepronos 
			SET procesado = true, 
			resultado = CASE
						WHEN pron_loc <= pron_vis AND comodin = true THEN 'blancoconcomodin'::resultadoprono
						WHEN pron_loc <= pron_vis AND comodin = false THEN 'blancosimple'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = true THEN 'granchepazo'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = false THEN 'chepazo'::resultadoprono
						WHEN pron_loc > pron_vis AND comodin = true THEN 'doble'::resultadoprono
						WHEN pron_loc > pron_vis AND comodin = false THEN 'simple'::resultadoprono
						ELSE NULL
						END
			WHERE  partido = pt;
ELSEIF res = 'VISITANTE' THEN
			UPDATE temporepronos 
			SET procesado = true, 
			resultado = CASE
						WHEN pron_loc >= pron_vis AND comodin = true THEN 'blancoconcomodin'::resultadoprono
						WHEN pron_loc >= pron_vis AND comodin = false THEN 'blancosimple'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = true THEN 'granchepazo'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = false THEN 'chepazo'::resultadoprono
						WHEN pron_loc < pron_vis AND comodin = true THEN 'doble'::resultadoprono
						WHEN pron_loc < pron_vis AND comodin = false THEN 'simple'::resultadoprono
						ELSE NULL
						END
			WHERE  partido = pt;

ELSEIF res = 'EMPATE' THEN
			UPDATE temporepronos 
			SET procesado = true, 
			resultado = CASE
						WHEN pron_loc != pron_vis AND comodin = true THEN 'blancoconcomodin'::resultadoprono
						WHEN pron_loc != pron_vis AND comodin = false THEN 'blancosimple'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = true THEN 'granchepazo'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = false THEN 'chepazo'::resultadoprono
						WHEN pron_loc = pron_vis AND comodin = true THEN 'doble'::resultadoprono
						WHEN pron_loc = pron_vis AND comodin = false THEN 'simple'::resultadoprono
						ELSE NULL
						END
			WHERE  partido = pt;
END IF;

			UPDATE temporepronos 
			SET puntos =
			CASE 
			WHEN temporepronos.resultado = 'granchepazo'::resultadoprono THEN ptgch::int
			WHEN temporepronos.resultado = 'chepazo'::resultadoprono THEN ptchp::int
			WHEN temporepronos.resultado = 'doble'::resultadoprono THEN ptdbl::int
			WHEN temporepronos.resultado = 'simple'::resultadoprono THEN ptsim::int
			ELSE 0
			END
			WHERE  partido = pt;

			RETURN QUERY SELECT p.partido::int, p.comodin, p.pron_loc::int, p.pron_vis::int, p.resultado, p.puntos::int
			FROM temporepronos p
			WHERE partido = pt;

			UPDATE temporefixture
			SET mlocal = ml, mvisit = mv, procesado = true
			WHERE id = pt;
END;
$function$
--FIN



CREATE OR REPLACE FUNCTION pollapartidopronos(pt integer)
RETURNS TABLE (p int, nom text, pun integer, score text, c boolean)
LANGUAGE plpgsql
AS $$ 
BEGIN
RETURN QUERY SELECT 
pp.pos::integer, pp.alias::text, pp.pts::integer, 
concat(p.pron_loc, ' - ',p.pron_vis)::text as marcador,
p.comodin
from posicionespollerostest pp
LEFT JOIN pronos p ON p.user_id = pp.userid
WHERE p.partido = pt
ORDER BY pp.pos

END;
$$




CREATE OR REPLACE FUNCTION pollamarcadorespartido(pt integer)
RETURNS TABLE( personas integer, conc integer, sinc integer, score text )
LANGUAGE plpgsql
AS $$
BEGIN

RETURN QUERY SELECT count(*)::integer as polleros,
count(*) FILTER (WHERE p.comodin = true)::integer AS "cc",
count(*) FILTER (WHERE p.comodin = false)::integer AS "sc",
concat(p.pron_loc, '-',p.pron_vis)::text as marcador
FROM pronos p
WHERE p.partido = pt
GROUP BY marcador
ORDER BY polleros desc;

END;

$$









CREATE OR REPLACE FUNCTION public.procesamarcador(pt integer, ml integer, mv integer)
 RETURNS TABLE(p integer, com boolean, pl integer, pv integer, resultado resultadoprono, pts integer)
 LANGUAGE plpgsql
AS $function$
DECLARE
ptgch int; 
ptdbl int; 
ptchp int; 
ptsim int;
res varchar;
BEGIN

IF pt < 49 THEN ptgch = 10; ptdbl = 6; 	ptchp = 5; ptsim = 3; 
	ELSEIF pt > 48 AND pt <57 THEN ptgch = 20; ptdbl = 12; 	ptchp = 10; ptsim = 6; 
	ELSEIF pt > 56 AND pt <61 THEN ptgch = 30; ptdbl = 20; 	ptchp = 15; ptsim = 10; 
	ELSEIF pt > 60 AND pt <63 THEN ptgch = 40; ptdbl = 30; 	ptchp = 20; ptsim = 15; 
	ELSEIF pt > 62 THEN ptgch = 50; ptdbl = 40; 	ptchp = 25; ptsim = 20;	
END IF;
RAISE NOTICE 'PUNTOS: % % % %', ptgch, ptchp, ptdbl, ptsim;
IF ml > mv THEN 
res = 'LOCAL';
ELSEIF ml < mv THEN  
res = 'VISITANTE';
ELSEIF ml = mv THEN  
res = 'EMPATE';
END IF;

			

IF res = 'LOCAL' THEN
			UPDATE pronos 
			SET procesado = true, 
			resultado = CASE
						WHEN pron_loc <= pron_vis AND comodin = true THEN 'blancoconcomodin'::resultadoprono
						WHEN pron_loc <= pron_vis AND comodin = false THEN 'blancosimple'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = true THEN 'granchepazo'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = false THEN 'chepazo'::resultadoprono
						WHEN pron_loc > pron_vis AND comodin = true THEN 'doble'::resultadoprono
						WHEN pron_loc > pron_vis AND comodin = false THEN 'simple'::resultadoprono
						ELSE NULL
						END
			WHERE  partido = pt;
ELSEIF res = 'VISITANTE' THEN
			UPDATE pronos 
			SET procesado = true, 
			resultado = CASE
						WHEN pron_loc >= pron_vis AND comodin = true THEN 'blancoconcomodin'::resultadoprono
						WHEN pron_loc >= pron_vis AND comodin = false THEN 'blancosimple'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = true THEN 'granchepazo'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = false THEN 'chepazo'::resultadoprono
						WHEN pron_loc < pron_vis AND comodin = true THEN 'doble'::resultadoprono
						WHEN pron_loc < pron_vis AND comodin = false THEN 'simple'::resultadoprono
						ELSE NULL
						END
			WHERE  partido = pt;

ELSEIF res = 'EMPATE' THEN
			UPDATE pronos 
			SET procesado = true, 
			resultado = CASE
						WHEN pron_loc != pron_vis AND comodin = true THEN 'blancoconcomodin'::resultadoprono
						WHEN pron_loc != pron_vis AND comodin = false THEN 'blancosimple'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = true THEN 'granchepazo'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = false THEN 'chepazo'::resultadoprono
						WHEN pron_loc = pron_vis AND comodin = true THEN 'doble'::resultadoprono
						WHEN pron_loc = pron_vis AND comodin = false THEN 'simple'::resultadoprono
						ELSE NULL
						END
			WHERE  partido = pt;
END IF;

			UPDATE pronos 
			SET puntos =
			CASE 
			WHEN pronos.resultado = 'granchepazo'::resultadoprono THEN ptgch::int
			WHEN pronos.resultado = 'chepazo'::resultadoprono THEN ptchp::int
			WHEN pronos.resultado = 'doble'::resultadoprono THEN ptdbl::int
			WHEN pronos.resultado = 'simple'::resultadoprono THEN ptsim::int
			ELSE 0
			END
			WHERE  partido = pt;

			RETURN QUERY SELECT p.partido::int, p.comodin, p.pron_loc::int, p.pron_vis::int, p.resultado, p.puntos::int
			FROM pronos p
			WHERE partido = pt;

			UPDATE fixture
			SET mlocal = ml, mvisit = mv, procesado = true
			WHERE id = pt;
END;
$function$
