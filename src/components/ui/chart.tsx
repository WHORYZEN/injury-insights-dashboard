
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

// New components for individual chart types that match the import signatures used in the pages
type LineChartProps = {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
};

export function LineChart({ 
  data, 
  index, 
  categories,
  colors = ["#8884d8"], 
  valueFormatter = (value) => `${value}` 
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={index} />
        <YAxis tickFormatter={valueFormatter} />
        <Tooltip formatter={valueFormatter} />
        <Legend />
        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index % colors.length]}
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

type BarChartProps = {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
};

export function BarChart({ 
  data, 
  index, 
  categories,
  colors = ["#8884d8"], 
  valueFormatter = (value) => `${value}` 
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={index} />
        <YAxis tickFormatter={valueFormatter} />
        <Tooltip formatter={valueFormatter} />
        <Legend />
        {categories.map((category, idx) => (
          <Bar 
            key={category} 
            dataKey={category} 
            fill={colors[idx % colors.length]} 
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

type PieChartProps = {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
};

export function PieChart({ 
  data, 
  index, 
  categories, 
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"],
  valueFormatter = (value) => `${value}` 
}: PieChartProps) {
  const categoryKey = categories[0];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey={categoryKey}
          nameKey={index}
          label={({ name, value }) => `${name}: ${valueFormatter(value)}`}
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={valueFormatter} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
