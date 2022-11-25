--ORIGINAL PROCESAMARCADOR
/* 
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

*/