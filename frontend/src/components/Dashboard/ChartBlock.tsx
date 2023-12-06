"use client";
import React, { useContext } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { DataContext, IFilter } from "@/app.constants";

interface IGraphBlock {
  dataKey: keyof IFilter;
}

export const ChartBlock = ({ dataKey }: IGraphBlock) => {
  const chartData = useContext(DataContext);
  const xDataKey = chartData?.filter[dataKey]?.xDataKey!;
  const yDataKey = chartData?.filter[dataKey]?.yDataKey!;
  const color = chartData?.chartColor!;

  switch (chartData?.filter[dataKey]?.type) {
    case "pie":
      return (
        <ResponsiveContainer width={"99%"} height={300}>
          <PieChart>
            <Pie
              data={chartData?.data[dataKey]}
              dataKey={yDataKey}
              nameKey={xDataKey}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill={color}
              isAnimationActive={false}
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    case "line":
      return (
        <ResponsiveContainer width={"99%"} height={300}>
          <LineChart
            data={chartData?.data[dataKey]}
            margin={{ left: 10, right: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey={xDataKey} />
            <YAxis dataKey={yDataKey} mirror />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={yDataKey}
              stroke={color}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    case "bar":
      return (
        <ResponsiveContainer width={"99%"} height={300}>
          <BarChart
            data={chartData?.data[dataKey]}
            margin={{ left: 10, right: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey={xDataKey} />
            <YAxis dataKey={yDataKey} mirror />
            <Tooltip cursor={false} />
            <Legend />
            <Bar dataKey={yDataKey} fill={color} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      );
    case "area":
      return (
        <ResponsiveContainer width={"99%"} height={300}>
          <AreaChart
            data={chartData?.data[dataKey]}
            margin={{ left: 10, right: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey={xDataKey} />
            <YAxis dataKey={yDataKey} mirror />
            <Tooltip cursor={false} />
            <Area
              dataKey={yDataKey}
              fill={color}
              stroke={color}
              isAnimationActive={false}
            />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      );
    default:
      return null;
  }
};
