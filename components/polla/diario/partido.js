import { Badge, Box, HStack, SimpleGrid, Spacer } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import useDatosPollero from "../../../storedata/pollero";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
  Label,
} from "recharts";
import { Rivales } from "./Rivales";

function CustomLabel({ viewBox, value1, value2 }) {
  const { cx, cy } = viewBox;
  return (
    <svg
      className="recharts-text recharts-label"
      textAnchor="middle"
      dominantBaseline="central"
    >
      <text x={cx} y={cy} fill="#3d405c">
        <tspan x={cx} dy="0em" alignmentBaseline="middle" fontSize="26">
          {value1}
        </tspan>
        <tspan x={cx} dy="1.8em" fontSize="14">
          {value2}
        </tspan>
      </text>
    </svg>
  );
}

function CustomLabelSINO({ viewBox, value1, value2 }) {
  const { cx, cy } = viewBox;
  return (
    <svg
      className="recharts-text recharts-label"
      textAnchor="middle"
      dominantBaseline="central"
    >
      <text x={cx} y={cy} fill="#2E7A61">
        <tspan
          x={cx}
          dy="-2em"
          alignmentBaseline="middle"
          fontSize="20"
          fontWeight="bolder"
        >
          SI {value1}
        </tspan>
      </text>
      <text x={cx} y={cy} fill="#CA1448">
        <tspan x={cx} dy="-1em" fontSize="20" fontWeight="bolder">
          NO {value2}
        </tspan>
      </text>
    </svg>
  );
}

export const PartidoDiario = ({ partido, prono, statsmatch }) => {
  const { statspronos } = useDatosPollero((state) => state);
  const [stats, setStats] = useState(null);
  const [pie, setPie] = useState(null);
  const [comData, setComData] = useState(null);
  const [cdat, setCdat] = useState(null);
  const [sicom, setSicom] = useState(null);

  useEffect(() => {
    const localStats = statspronos.find((stats) => stats.p === partido.id);
    console.log({ localStats });
    setStats(localStats);

    const ladata = [
      { name: partido.eqloc, value: localStats.p_loc, fill: "#A10D50" },
      { name: "Empate", value: localStats.p_emp, fill: "#CEA02B" },
      { name: partido.eqvis, value: localStats.p_vis, fill: "#3E7594" },
    ];

    let locName = partido.eqloc;
    let visName = partido.eqvis;
    const comodinesData = [
      {
        name: "Comodines",
        SI: localStats.com,
        NO: localStats.pronostotales - localStats.com,
        [locName]: localStats.comloc,
        [visName]: localStats.comvis,
        Empate: localStats.comemp,
      },
    ];
    console.log({ comodinesData });

    const losdatos = [
      { name: partido.eqloc, value: localStats.comloc, fill: "#A10D50" },
      { name: "Empate", value: localStats.comemp, fill: "#CEA02B" },
      { name: partido.eqvis, value: localStats.comvis, fill: "#3E7594" },
    ];

    const losdatosdos = [
      { name: "SI", value: localStats.com, fill: "#2E7A61" },
      {
        name: "NO",
        value: localStats.pronostotales - localStats.com,
        fill: "#CA1448",
      },
    ];

    setSicom(losdatosdos);
    setCdat(losdatos);
    setPie(ladata);
    setComData(comodinesData);
  }, [partido, statspronos]);

  const renderLabel = useCallback((piePiece) => {
    return piePiece.name + " ";
  }, []);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontWeight="bolder"
        fontSize="17"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <SimpleGrid columns={[1, null, 2]} spacing="20px">
        <Rivales partido={partido} prono={prono} statsmatch={statsmatch} />

        <Box
          style={{
            backgroundImage: 'url("/logoback.png")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "25%",
            backgroundPosition: "top right",
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pie}
                dataKey="value"
                cx={130}
                cy={100}
                //labelLine={false}
                //label={renderCustomizedLabel}
                outerRadius={70}
                innerRadius={0}
                legendType="circle"
                label
              >
                {pie?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    stroke="#ABB9C9"
                    strokeWidth={4}
                    strokeOpacity={0.5}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend align="left" verticalAlign="top" />

              <Pie
                data={cdat}
                cx={250}
                cy={200}
                //startAngle={180}
                //endAngle={0}
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
                legendType="none"
              >
                <Label
                  width={30}
                  position="center"
                  content={
                    <CustomLabel value1={stats?.com} value2={"Comodines"} />
                  }
                ></Label>
              </Pie>
              <Pie
                data={sicom}
                cx={120}
                cy={280}
                //startAngle={180}
                //endAngle={0}
                innerRadius={65}
                outerRadius={80}
                paddingAngle={10}
                dataKey="value"
                startAngle={180}
                endAngle={0}
                legendType="none"
              >
                <Label
                  width={30}
                  position="center"
                  content={
                    <CustomLabelSINO
                      value1={stats?.com}
                      value2={stats?.pronostotales - stats?.com}
                    />
                  }
                ></Label>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* <ResponsiveContainer width="100%" height={250}>
          <BarChart
            width={200}
            height={300}
            data={comData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="SI" stackId="sn" fill="#2E7A61" />
            <Bar dataKey="NO" stackId="sn" fill="#CA1448" />

            <Bar dataKey={partido.eqloc} stackId="si" fill="#A10D50" />
            <Bar dataKey={partido.eqvis} stackId="si" fill="#3E7594" />
            <Bar dataKey="Empate" stackId="si" fill="#CEA02B" />
          </BarChart>
        </ResponsiveContainer> */}

        {/* <Box bg="tomato" height="20">
          {JSON.stringify(stats)}
        </Box> */}
        {/* <Box>{JSON.stringify(partido)}</Box> */}
      </SimpleGrid>
    </>
  );
};

/* 
{"partido":{"id":1,"grupo":"A","ronda":1,"fecha":"2022-11-20T16:00:00+00:00","eqloc":"Qatar","locid":"QA","eqvis":"Ecuador","visid":"EC","power":2894,"idvis":11,"idloc":24,"mlocal":null,"mvisit":null,"procesado":false}}
*/
