/*select * from fixture 
where fecha > ('2022-11-26 11:00')
and fecha < ('2022-11-26 17:00')




select username from pollerosamigos*/

/* 
select count(*) matches, TO_CHAR(fecha, 'DD-MM') mifecha, TO_CHAR(fecha, 'MM/DD/YYYY')::date dia
from fixture
group by mifecha, dia
order by dia



select count(*) matches, TO_CHAR(fecha, 'MM/DD/YYYY') fec
from fixture
group by fec
order by fec*/

/*CREATE OR REPLACE VIEW allpronos_grupos AS
SELECT u.alias, pronos.partido p, el.nombre loc, pronos.pron_loc gl,  pronos.pron_vis gv, ev.nombre vis,
	CASE 	WHEN pronos.comodin = true THEN 'SI'
			WHEN pronos.comodin = false THEN ' '
	END COM

FROM pronos
LEFT JOIN usuarios u on pronos.user_id = u.id
LEFT JOIN fixture f on pronos.partido = f.id
LEFT JOIN equipos el on el.id = f.loc
LEFT JOIN equipos ev on ev.id = f.vis
WHERE pronos.partido < 49
ORDER BY pronos.partido asc, UPPER(u.alias) asc*/


CREATE OR REPLACE VIEW testdrama AS

 SELECT test.p,
    count(*) AS pronostotales,
    count(*) FILTER (WHERE test.pl > test.pv) AS loc,
    count(*) FILTER (WHERE test.pv > test.pl) AS vis,
    count(*) FILTER (WHERE test.pv = test.pl) AS emp,
    count(*) FILTER (WHERE test.com = true) AS com,
    count(*) FILTER (WHERE test.com = true AND test.pl > test.pv ) comloc,
    count(*) FILTER (WHERE test.com = true AND test.pl < test.pv ) comvis,
    count(*) FILTER (WHERE test.com = true AND test.pl = test.pv ) comemp,
    round(100.0 * count(*) FILTER (WHERE test.pl > test.pv)::numeric / count(*)::numeric, 2)::double precision AS p_loc,
    round(100.0 * count(*) FILTER (WHERE test.pl < test.pv)::numeric / count(*)::numeric, 2)::double precision AS p_vis,
    round(100.0 * count(*) FILTER (WHERE test.pl = test.pv)::numeric / count(*)::numeric, 2)::double precision AS p_emp,
    round(100.0 * count(*) FILTER (WHERE test.com = true)::numeric / count(*)::numeric, 2)::double precision AS p_comsi,
    round(100.0 * count(*) FILTER (WHERE test.com = false)::numeric / count(*)::numeric, 2)::double precision AS p_comno,
    round(1.0 * sum(test.pl)::numeric / count(*)::numeric, 2)::double precision AS gpl,
    round(1.0 * sum(test.pv)::numeric / count(*)::numeric, 2)::double precision AS gpv,
    sum(test.pl + test.pv) AS gtot,
    round(1.0 * sum(test.pl + test.pv)::numeric / count(*)::numeric, 2)::double precision AS pgol
   FROM ( SELECT pronos.partido::integer AS p,
            pronos.pron_loc::integer AS pl,
            pronos.pron_vis::integer AS pv,
            pronos.comodin AS com
           FROM pronos) test
  GROUP BY test.p
  ORDER BY (round(1.0 * sum(test.pl + test.pv)::numeric / count(*)::numeric, 2)::double precision) DESC;



select * from  statusamigos where correo like '%domin%'




select count(*) from usuariospolla


R = / 24

CREATE OR REPLACE VIEW estatuspolleros as

select 
count(*) FILTER (WHERE u.pronos = 48) AS completos,
count(*) FILTER (WHERE u.pronos > 0 and u.pronos < 48 ) AS parciales,
count(*) FILTER (WHERE u.pronos = 0) AS enceros,
count(*) as registrados,
count(*) FILTER (WHERE u.amigo is not null) AS empollados,
count(*) FILTER (WHERE u.amigo is null) AS huerfanos,
count(*) FILTER (WHERE u."isPagado" is true) AS pagos,
count(*) FILTER (WHERE u."isPagado" is false and u.amigo is not null) AS enproceso,
sum(u.pronos) pronostotales
from usuariospolla u




select count(*) from usuariospolla
where pronos = 0

R = / 49



select count(*) from usuariospolla
where amigo is not null

select count(*) from usuariospolla
where amigo is null



select sum(pron_loc) + sum(pron_vis) from pronos


select * from pronos order by cambios desc









Select u.hincha, count(u.hincha) cuantos
from usuarios u
group by u.hincha
order by cuantos desc



CREATE OR REPLACE VIEW posicionespollerostest as
select u.alias, sum(p.puntos) pts,
count(*) FILTER (WHERE p.resultado = 'granchepazo') AS gch,
count(*) FILTER (WHERE p.resultado = 'doble') AS dbl,
count(*) FILTER (WHERE p.resultado = 'chepazo') AS ch,
count(*) FILTER (WHERE p.resultado = 'simple') AS sim,
count(*) FILTER (WHERE p.resultado = 'blancoconcomodin') AS bkc,
count(*) FILTER (WHERE p.resultado = 'blancosimple') AS bks, 
count(*) FILTER (WHERE p.comodin = true) AS usedcom,
count(*) FILTER (WHERE p.resultado = 'blancoconcomodin') + count(*) FILTER (WHERE p.resultado = 'blancosimple') as blanco,

(select count(*) from fixture where fixture.procesado = true) - 
(count(*) FILTER (WHERE p.resultado = 'granchepazo') 
+ count(*) FILTER (WHERE p.resultado = 'doble')
+ count(*) FILTER (WHERE p.resultado = 'chepazo')
+ count(*) FILTER (WHERE p.resultado = 'simple')
+ count(*) FILTER (WHERE p.resultado = 'blancoconcomodin')
+ count(*) FILTER (WHERE p.resultado = 'blancosimple'))
 nulo,
 u.id as userid

from pronos p
LEFT JOIN usuarios u on u.id = p.user_id
where p.procesado = true

group by u.alias, u.id
order by pts desc, blanco asc, ch desc, gch desc


/* 

'blancoconcomodin'::resultadoprono
						WHEN pron_loc <= pron_vis AND comodin = false THEN 'blancosimple'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = true THEN 'granchepazo'::resultadoprono
						WHEN pron_loc = ml AND pron_vis = mv AND comodin = false THEN 'chepazo'::resultadoprono
						WHEN pron_loc > pron_vis AND comodin = true THEN 'doble'::resultadoprono
						WHEN pron_loc > pron_vis AND comodin = false THEN 'simple'::resultadoprono
						
						*/





select correo, pronos
from usuariospolla up
left join usuarios u on u.id = up.id
Where up.pronos < 48 AND up.pronos > 0


select correo, pronos, up.alias
from usuariospolla up
left join usuarios u on u.id = up.id
Where up.pronos = 0 and up.alias is not null


select alias from usuariospolla
where alias like '%ess%'

/* */

select add_prono('6aa94c33-8f59-4c61-9b6f-4a27761fc07c', 50, 7, 7, false );
--select getUsers();

--user_id_input uuid, partido_input integer, pron_loc_input integer, pron_vis_input integer, comodin_input boolean


select up.alias, up.pronos, u.correo
from usuariospolla up
left join usuarios u on up.id = u.id

where pronos < 48 and up.amigo is not null


--OFICIAL CATAR  VS ECUADOR 0 2
select * from procesamarcador(1, 0, 2);
--INGLATERRA IRÁN
select * from procesamarcador(3, 6, 2);
-- SENEGAL HOLANDA
select * from procesamarcador(2, 0, 2);
-- 4  USA GALES 
select * from procesamarcador(4, 1, 1);

-- 5  FRANCIA AUSTRALIA
select * from procesamarcador(5, 4, 1);
-- 6 DINAMARCA TUNEZ
select * from procesamarcador(6, 0, 0);
-- 7 MEXICO POLONIA
select * from procesamarcador(7, 0, 0);
-- 8 ARGENTINA ARABIA
select * from procesamarcador(8, 1, 2);

-- 9 BELGICA CANADÁ
select * from procesamarcador(9, 1, 0);
-- 10 ESPAÑA COSTA RICA
select * from procesamarcador(10, 7, 0);
-- 11 ALEMANIA JAPÓN
select * from procesamarcador(11, 1, 2);
-- 12  MARRUECCOS CROACIA
select * from procesamarcador(12, 0, 0);
-- 13 SUIZA CAMERUN
select * from procesamarcador(13, 1, 0);
-- 14 URUGUAY COREA DEL SUR
select * from procesamarcador(14, 0, 0);
-- 15 PORTUGAL GHANA
select * from procesamarcador(15, 3, 2);
-- 16 Brasil SERBIA
select * from procesamarcador(16, 2, 0);
-- 17 Gales- IRAN
select * from procesamarcador(17, 0, 2);
-- 18 QATAR - SENEGAL
select * from procesamarcador(18, 1, 3);
-- 19  HOLANDA - ECUADOR
select * from procesamarcador(19, 1, 1);
-- 20  INGLATERRA ESTADOS UNIDOS
select * from procesamarcador(20, 0, 0);
-- 21  TÚNEZ AUSTRALIA
select * from procesamarcador(21, 0, 0);
-- 22  POLONIA ARABIA
select * from procesamarcador(22, 0, 0);
-- 23  FRANCIA DINAMARCA
select * from procesamarcador(23, 0, 0);
-- 24  ARGENTINA MÉXICO
select * from procesamarcador(24, 0, 0);

select * from pronos_clear()

--MARCADORES PROBABLES
select 
count(*) as polleros,
concat(p.pron_loc, '-',p.pron_vis) as marcador, 
count(*) FILTER (WHERE p.comodin = true) AS "con comodín",
count(*) FILTER (WHERE p.comodin = false) AS "sin comodín"
from pronos p
where p.partido = 8
group by marcador
order by polleros desc

/* */



select u.alias, p.pron_loc, p.pron_vis, p.comodin 
from pronos p
left join usuariospolla u
on u.id = p.user_id
where p.partido = 3
--order by concat(p.pron_loc, '',p.pron_vis) desc
order by p.pron_vis desc


--MARCADORES PROBABLES
select 
count(*) as polleros,
concat(p.pron_loc, '-',p.pron_vis) as marcadores, 
count(*) FILTER (WHERE p.comodin = true) AS "Con comodín",
count(*) FILTER (WHERE p.comodin = false) AS "Sin comodín"
from pronos p
where p.partido = 6
group by marcadores
order by polleros desc







select u.alias, pron_loc, pron_vis, cambios
from pronos 
LEFT join usuariospolla u
on pronos.user_id = u.id
where partido = 7
and pron_loc = 0 
and pron_vis = 0
--and cambios > 1








--MARCADORES PROBABLES
select 
count(*) as num,
concat(p.pron_loc, '-',p.pron_vis) as pron, 
count(*) FILTER (WHERE p.comodin = true) AS csi,
count(*) FILTER (WHERE p.comodin = false) AS cno
from pronos p
group by pron
order by num desc






--MARCADORES PROBABLES
select u.alias, pp.pts, pp.pos, p.comodin
from pronos p
LEFT JOIN usuariospolla u
LEFT JOIN posicionespollerostest pp ON u.id = pp.userid
ON u.id = p.user_id
where p.partido = 5
and p.pron_loc = 4
and p.pron_vis = 1
order by pos ASC, p.comodin desc




---------
-- POR POLLERO

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
           FROM fixture
          WHERE fixture.procesado = true)) - (count(*) FILTER (WHERE p.resultado = 'granchepazo'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'doble'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'chepazo'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'simple'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancoconcomodin'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancosimple'::resultadoprono)) AS nulo,
    u.id AS userid,
    pm.username AS amigo
   FROM pronos p
     LEFT JOIN usuarios u ON u.id = p.user_id
     LEFT JOIN pollerosamigos pm ON pm.id = u.amigo
  WHERE p.procesado = true
  and pm.username like '%Jaime%'
  GROUP BY u.alias, u.id, pm.username;


--

select statusamigos.pollero, statusamigos.correo, statusamigos."isPagado", u.notas
from statusamigos
LEFT join usuarios u on u.correo = statusamigos.correo
where statusamigos.polleroamigo like '%Jai%'


select * from statusamigos where correo like '%olga%'
/* */
DROP VIEW posicionespollerostest
CREATE OR REPLACE VIEW posicionespollerostest as
select 
RANK() over 
 (order by 
 sum(p.puntos) desc, 
 count(*) FILTER (WHERE p.resultado = 'blancoconcomodin') + count(*) FILTER (WHERE p.resultado = 'blancosimple') asc,
 count(*) FILTER (WHERE p.resultado = 'chepazo') desc,
 count(*) FILTER (WHERE p.resultado = 'granchepazo') desc
 ) pos,
u.alias, sum(p.puntos) pts,
count(*) FILTER (WHERE p.resultado = 'granchepazo') AS gch,
count(*) FILTER (WHERE p.resultado = 'doble') AS dbl,
count(*) FILTER (WHERE p.resultado = 'chepazo') AS ch,
count(*) FILTER (WHERE p.resultado = 'simple') AS sim,
count(*) FILTER (WHERE p.resultado = 'blancoconcomodin') AS bkc,
count(*) FILTER (WHERE p.resultado = 'blancosimple') AS bks, 
count(*) FILTER (WHERE p.comodin = true) AS usedcom,
count(*) FILTER (WHERE p.resultado = 'blancoconcomodin') + count(*) FILTER (WHERE p.resultado = 'blancosimple') as blanco,

(select count(*) from fixture where fixture.procesado = true) - 
(count(*) FILTER (WHERE p.resultado = 'granchepazo') 
+ count(*) FILTER (WHERE p.resultado = 'doble')
+ count(*) FILTER (WHERE p.resultado = 'chepazo')
+ count(*) FILTER (WHERE p.resultado = 'simple')
+ count(*) FILTER (WHERE p.resultado = 'blancoconcomodin')
+ count(*) FILTER (WHERE p.resultado = 'blancosimple'))
 nulo,
 u.id as userid
 

from pronos p
LEFT JOIN usuarios u on u.id = p.user_id
where p.procesado = true

group by u.alias, u.id
--order by pts desc, blanco asc, ch desc, gch desc



select * from usuarios where usuarios.correo like 'jorg%'




select * from pronos where pronos.user_id = 'e5e5354a-fd5e-4bab-b907-c046696228a8'
--BORRADO DE PRONOS DE POPCULTURA



select * from users where users.id = '6a5285e1-0dd5-48f5-8ae3-c5fdacd871d0'


select * from usuariospolla u where pronos = 0
and amigo is not null

/* */
--CREATE OR REPLACE VIEW puntosporpartido AS

select 
p.partido,
sum(p.puntos) puntos,
count(*) FILTER (WHERE p.resultado = 'granchepazo') AS gch,
count(*) FILTER (WHERE p.resultado = 'doble') AS dbl,
count(*) FILTER (WHERE p.resultado = 'chepazo') AS ch,
count(*) FILTER (WHERE p.resultado = 'simple') AS sim,
count(*) FILTER (WHERE p.resultado = 'blancoconcomodin') AS bkc,
count(*) FILTER (WHERE p.resultado = 'blancosimple') AS bks,
count(*) FILTER (WHERE p.comodin = true) AS usedcom,
count(*) FILTER (WHERE p.resultado = 'granchepazo') + count(*) FILTER (WHERE p.resultado = 'chepazo') +count(*) FILTER (WHERE p.resultado = 'doble') + count(*) FILTER (WHERE p.resultado = 'simple') conpuntos,
count(*) FILTER (WHERE p.resultado = 'blancoconcomodin') + count(*) FILTER (WHERE p.resultado = 'blancosimple') as blancos
from pronos p where p.procesado = true
group by(p.partido)
ORDER BY p.partido asc




select * from statusamigos 
where statusamigos."isPagado" = false


CREATE OR REPLACE VIEW posicionespollerostest AS
 
 SELECT  rank()  OVER (  ORDER BY  (sum(p.puntos)) DESC, 
 (count(*) FILTER (WHERE p.resultado = 'blancoconcomodin'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancosimple'::resultadoprono)) ASC, 
 (count(*) FILTER (WHERE p.resultado = 'chepazo'::resultadoprono)) DESC, 
 (count(*) FILTER (WHERE p.resultado = 'granchepazo'::resultadoprono)) DESC,
 (count(*) FILTER (WHERE p.resultado = 'simple'::resultadoprono)) DESC,
 (count(*) FILTER (WHERE p.resultado = 'doble'::resultadoprono)) DESC
 
 
 ) AS pos,
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
           FROM fixture
          WHERE fixture.procesado = true)) - (count(*) FILTER (WHERE p.resultado = 'granchepazo'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'doble'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'chepazo'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'simple'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancoconcomodin'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancosimple'::resultadoprono)) AS nulo,
    u.id AS userid
   FROM pronos p
     LEFT JOIN usuarios u ON u.id = p.user_id
  WHERE p.procesado = true
  GROUP BY u.alias, u.id;

/* */
--DROP VIEW posicionespollerostest
CREATE OR REPLACE VIEW posicionespollerostest AS
 
 SELECT  rank()  OVER (  ORDER BY  (sum(p.puntos)) DESC, 
 (count(*) FILTER (WHERE p.resultado = 'blancoconcomodin'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancosimple'::resultadoprono)) ASC, 
 (count(*) FILTER (WHERE p.resultado = 'chepazo'::resultadoprono)) DESC, 
 (count(*) FILTER (WHERE p.resultado = 'granchepazo'::resultadoprono)) DESC,
 (count(*) FILTER (WHERE p.resultado = 'simple'::resultadoprono)) DESC,
 (count(*) FILTER (WHERE p.resultado = 'doble'::resultadoprono)) DESC
 
 
 ) AS pos,
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
           FROM fixture
          WHERE fixture.procesado = true)) - (count(*) FILTER (WHERE p.resultado = 'granchepazo'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'doble'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'chepazo'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'simple'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancoconcomodin'::resultadoprono) + count(*) FILTER (WHERE p.resultado = 'blancosimple'::resultadoprono)) AS nulo,
    u.id AS userid, pm.username amigo
    
   FROM pronos p
     LEFT JOIN usuarios u ON u.id = p.user_id
     LEFT JOIN pollerosamigos pm ON pm.id = u.amigo
  WHERE p.procesado = true
  GROUP BY u.alias, u.id, pm.username;



/**/
----- CONSULTAS ORDENADAS ---

-- 
--MARCADORES PROBABLES POR PARTIDO

/*select 
count(*) as polleros,
count(*) FILTER (WHERE p.comodin = true) AS "cc",
count(*) FILTER (WHERE p.comodin = false) AS "sc",
concat(p.pron_loc, ' - ',p.pron_vis) as marcador

from pronos p
where p.partido = 12
group by marcador
order by polleros desc

select * from pronopartido(5)

select * from pollamarcadorespartido(14)*/

select 
pp.pos, pp.alias, pp.pts, 
concat(p.pron_loc, ' - ',p.pron_vis) as marcador,
p.comodin
from posicionespollerostest pp
LEFT JOIN pronos p ON p.user_id = pp.userid
WHERE p.partido = 12
ORDER BY pp.pos

/**/
/*
select * from temporefixture t where t.procesado = true

select * from tempoclear();
select * from procesamarcadorqps(13, 2, 0)

select * from tempoposiciones

select count(*) from temporepronos where procesado 

TRUNCATE table temporepronos 

create TEMP table temporepronos as (select * from pronos);
*/

--DROP TABLE IF EXISTS  temporepronos CASCADE 
TRUNCATE  TABLE  temporepronos;
INSERT INTO temporepronos select * from pronos;

select * from procesamarcadorqps(13, 0, 0);
select * from procesamarcadorqps(14, 0, 0);
select * from procesamarcadorqps(15, 0, 1);
select * from procesamarcadorqps(16, 0, 0);
select * from tempoposiciones;

--select * from temporepronos;

/*
FUNCION
crea temp table tempouser
RETURNS OK
IF OK
INSERT INTO tempouser
IF OK
EJECUTA FUNCION 

TRUNCATE  TABLE  temporepronos;
INSERT INTO temporepronos select * from pronos;
FOREACH IN tempouser 

select * from procesamarcadorqps(13, 0, 0);
select * from procesamarcadorqps(14, 0, 0);
select * from procesamarcadorqps(15, 0, 1);
select * from procesamarcadorqps(16, 0, 0);
RETURNS OK
IF OK
select * from tempoposiciones;

 */
 
 
 CREATE TEMP TABLE student(stud_id serial NOT NULL PRIMARY KEY, stud_name VARCHAR(80));
select * from student;


create temp table yu;

/* */


--create type qpspronos as (integer[]);
DROP FUNCTION pruebafuncionx( arr qpsprono[] )

CREATE OR REPLACE FUNCTION pruebafuncionx( arr qpsprono[] )
RETURNS TABLE (p integer, nom text, pun integer)
LANGUAGE plpgsql
AS $$

DECLARE
   numpronos integer := array_length(arr, 1);
   indicep integer := 1;
	--valores integer[] := unnest(arr);

  

BEGIN

create TEMP table IF NOT EXISTS temporefixture as (select * from fixture);
TRUNCATE  TABLE  temporefixture;
INSERT INTO temporefixture select * from fixture;

create TEMP  table IF NOT EXISTS temporepronos as (select * from pronos);
TRUNCATE  TABLE  temporepronos;
INSERT INTO temporepronos select * from pronos;


WHILE indicep <= numpronos LOOP
      --RAISE NOTICE '%', arr[indicep][0]::int;
		RAISE NOTICE '%', arr[indicep].ppp;
		PERFORM procesamarcadorqps(arr[indicep].ppp, arr[indicep].mmll, arr[indicep].mmvv);
		--PERFORM procesamarcadorqps(unnest(arr[indicep])::integer[]);
      indicep = indicep + 1;
      
   END LOOP;




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
  --PERFORM procesamarcadorqps(13, 3, 0);
  --PERFORM procesamarcadorqps(14, 2, 0);
  --PERFORM procesamarcadorqps(15, 4, 1);
  --PERFORM procesamarcadorqps(16, 0, 0);
  
  RETURN QUERY (select pos::integer, alias::text, pts::integer from tempoposiciones);



--SELECT 'Éxitos' as "resp" INTO pruebafuncion.m;
END;

$$


select * from tempoposiciones

select * from pruebafuncion(); 

select * from pruebafuncionx(array[row(14,1,0)]::qpsprono[]); 
select * from pruebafuncionx(array[row(14,1,0),row(15,2,0),row(16,3,1)]::qpsprono[]); 

select * from pruebafuncionx(array[row(16,2,0)]::qpsprono[]); 



select * from temporefixture;
select * from procesamarcadorqps(14, 1, 0)
select * from tempoposiciones


select * from pollapartidopronos(16)

select alias from posicionespollerostest 


select SUM(gch * 10 + dbl * 6), pos, alias, usedcom from posicionespollerostest
group by pos, alias, usedcom
order by sum desc




/**/
DROP FUNCTION public.procesamarcadorqps(qpsprono)
FUNCTION public.procesamarcadorqps(pt integer, ml integer, mv integer)

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
/**/