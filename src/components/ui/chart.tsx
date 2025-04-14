
import React from "react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

type ChartProps = {
  data: any[];
  type: "bar" | "line" | "pie";
  dataKey: string;
  nameKey?: string;
  colors?: string[];
  height?: number;
  width?: number;
  legend?: boolean;
  grid?: boolean;
  tooltip?: boolean;
};

const defaultColors = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

export function Chart({
  data,
  type,
  dataKey,
  nameKey = "name",
  colors = defaultColors,
  height = 300,
  width = 500,
  legend = true,
  grid = true,
  tooltip = true,
}: ChartProps) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <RechartsBarChart data={data} width={width} height={height}>
            {grid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={nameKey} />
            <YAxis />
            {tooltip && <Tooltip />}
            {legend && <Legend />}
            <Bar dataKey={dataKey} fill={colors[0]} />
          </RechartsBarChart>
        );
      case "line":
        return (
          <RechartsLineChart data={data} width={width} height={height}>
            {grid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={nameKey} />
            <YAxis />
            {tooltip && <Tooltip />}
            {legend && <Legend />}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              activeDot={{ r: 8 }}
            />
          </RechartsLineChart>
        );
      case "pie":
        return (
          <RechartsPieChart width={width} height={height}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={(entry) => entry[nameKey]}
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            {tooltip && <Tooltip />}
            {legend && <Legend />}
          </RechartsPieChart>
        );
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return <ResponsiveContainer width="100%" height={height}>{renderChart()}</ResponsiveContainer>;
}
