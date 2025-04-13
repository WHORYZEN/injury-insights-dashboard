"use strict";
import * as React from "react";
import {
  PieChart as PieReChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  LineChart as LineReChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart as BarReChart,
  Bar,
} from "recharts";

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  className?: string;
  showTooltip?: boolean;
  showLegend?: boolean;
  legendProps?: any;
}

export function PieChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"],
  valueFormatter = (value) => `${value}`,
  startAngle = 0,
  endAngle = 360,
  innerRadius = 0,
  outerRadius = "80%",
  paddingAngle = 0,
  className,
  showTooltip = true,
  showLegend = true,
  legendProps,
}: ChartProps) {
  const RADIAN = Math.PI / 180;
  
  // This is the fix for the TypeScript error - wrap renderCustomizedLabel in a React memo to ensure it returns a proper React element
  const renderCustomizedLabel = React.memo(
    ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return percent > 0.05 ? (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      ) : null;
    }
  );

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <PieReChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            paddingAngle={paddingAngle}
            dataKey={categories[0]}
            nameKey={index}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          {showTooltip && <Tooltip formatter={valueFormatter} />}
          {showLegend && (
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              {...legendProps}
            />
          )}
        </PieReChart>
      </ResponsiveContainer>
    </div>
  );
}

interface LineChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"],
  valueFormatter = (value) => `${value}`,
  className,
}: LineChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineReChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={index} />
          <YAxis tickFormatter={valueFormatter} />
          <Tooltip formatter={valueFormatter} />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
            />
          ))}
        </LineReChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"],
  valueFormatter = (value) => `${value}`,
  className,
}: BarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarReChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={index} />
          <YAxis tickFormatter={valueFormatter} />
          <Tooltip formatter={valueFormatter} />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
            />
          ))}
        </BarReChart>
      </ResponsiveContainer>
    </div>
  );
}
