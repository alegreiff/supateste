CREATE OR REPLACE FUNCTION test_fixture(pt integer, ml integer, mv integer)
 RETURNS TABLE(ideq integer, nom text, g integer, e integer, p integer, f integer, c integer)
 LANGUAGE plpgsql
AS $function$
DECLARE
res varchar;

localid integer := (select el.id from fixture f 
LEFT JOIN equipos el ON f.loc = el.id
where f.id = pt);

visitid integer := (select ev.id from fixture f 
LEFT JOIN equipos ev ON f.vis = ev.id
where f.id = pt);


BEGIN
RAISE NOTICE 'LOCAL IS % %', localid, visitid;
IF ml > mv THEN 
res = 'LOCAL';
ELSEIF ml < mv THEN  
res = 'VISITANTE';
ELSEIF ml = mv THEN  
res = 'EMPATE';
END IF;

IF res = 'LOCAL' THEN
UPDATE equipos
SET "PG" = "PG" +1, "GF" = "GF" + ml, "GC" = "GC" + mv
WHERE id = localid;

UPDATE equipos
SET "PP" = "PP" +1, "GF" = "GF" + mv, "GC" = "GC" + ml
WHERE id = visitid;

ELSEIF res = 'VISITANTE' THEN

UPDATE equipos
SET "PG" = "PG" +1, "GF" = "GF" + mv, "GC" = "GC" + ml
WHERE id = visitid;

UPDATE equipos
SET "PP" = "PP" +1, "GF" = "GF" + ml, "GC" = "GC" + mv
WHERE id = localid;

ELSEIF res = 'EMPATE' THEN
UPDATE equipos
SET "PE" = "PE" +1, "GF" = "GF" + ml, "GC" = "GC" + mv
WHERE id = localid;

UPDATE equipos
SET "PE" = "PE" +1, "GF" = "GF" + mv, "GC" = "GC" + ml
WHERE id = visitid;

END IF;



RETURN QUERY    SELECT eq.id::int, eq.nombre, eq."PG"::int, eq."PE"::int, eq."PP"::int, eq."GF"::int, eq."GC"::int
                FROM equipos eq;


END;
$function$