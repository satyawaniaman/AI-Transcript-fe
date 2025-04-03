"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define types for our data structure
type ChartDataItem = {
  date: string;
  total: number;
  resolved: number;
};

type CategoryKey =
  | "price"
  | "timing"
  | "trust"
  | "competition"
  | "stakeholders"
  | "other";

// Define the structure for the line chart data
type LineChartDataItem = {
  date: string;
  price: number;
  timing: number;
  trust: number;
  competition: number;
  stakeholders: number;
  other: number;
};

type CategoryDataType = {
  [key in CategoryKey]: ChartDataItem[];
};

// Helper function to ensure resolved is always less than total by a random percentage
const getResolvedValue = (
  total: number,
  minPercentage = 0.3,
  maxPercentage = 0.9
) => {
  const percentage =
    minPercentage + Math.random() * (maxPercentage - minPercentage);
  return Math.min(total - 1, Math.floor(total * percentage));
};

// Base chart data
const chartData = [
  { date: "2024-04-01", total: 222, resolved: 150 },
  { date: "2024-04-02", total: 97, resolved: 180 },
  { date: "2024-04-03", total: 167, resolved: 120 },
  { date: "2024-04-04", total: 242, resolved: 260 },
  { date: "2024-04-05", total: 373, resolved: 290 },
  { date: "2024-04-06", total: 301, resolved: 340 },
  { date: "2024-04-07", total: 245, resolved: 180 },
  { date: "2024-04-08", total: 409, resolved: 320 },
  { date: "2024-04-09", total: 59, resolved: 110 },
  { date: "2024-04-10", total: 261, resolved: 190 },
  { date: "2024-04-11", total: 327, resolved: 350 },
  { date: "2024-04-12", total: 292, resolved: 210 },
  { date: "2024-04-13", total: 342, resolved: 380 },
  { date: "2024-04-14", total: 137, resolved: 220 },
  { date: "2024-04-15", total: 120, resolved: 170 },
  { date: "2024-04-16", total: 138, resolved: 190 },
  { date: "2024-04-17", total: 446, resolved: 360 },
  { date: "2024-04-18", total: 364, resolved: 410 },
  { date: "2024-04-19", total: 243, resolved: 180 },
  { date: "2024-04-20", total: 89, resolved: 150 },
  { date: "2024-04-21", total: 137, resolved: 200 },
  { date: "2024-04-30", total: 454, resolved: 380 },
  { date: "2024-05-10", total: 293, resolved: 330 },
  { date: "2024-05-20", total: 177, resolved: 230 },
  { date: "2024-05-31", total: 178, resolved: 230 },
  { date: "2024-06-10", total: 155, resolved: 200 },
  { date: "2024-06-20", total: 408, resolved: 450 },
  { date: "2024-06-30", total: 446, resolved: 400 },
];

// Create category-specific mock data with distinct patterns
const createCategoryData = () => {
  // Price objections: High volume, seasonal pattern with peaks in mid-month
  const price = chartData.map((item) => {
    const date = new Date(item.date);
    const dayOfMonth = date.getDate();
    // Create a mid-month peak pattern
    const multiplier = dayOfMonth > 10 && dayOfMonth < 20 ? 0.5 : 0.3;
    // Add seasonal variation with higher numbers in May
    const monthFactor = date.getMonth() === 4 ? 1.3 : 1;
    const total = Math.floor(item.total * multiplier * monthFactor * 0.5);
    return {
      date: item.date,
      total: total,
      resolved: getResolvedValue(total, 0.55, 0.75),
    };
  });

  // Timing objections: Spiky pattern with specific peaks
  const timing = chartData.map((item) => {
    const date = new Date(item.date);
    const dayOfMonth = date.getDate();
    const isSpike = dayOfMonth % 10 <= 2;
    const multiplier = isSpike ? 0.45 : 0.15;
    const total = Math.floor(item.total * multiplier * 0.5);
    return {
      date: item.date,
      total: total,
      resolved: getResolvedValue(total, 0.6, 0.85),
    };
  });

  // Trust/Risk objections: Steady but concerning trend with increasing numbers
  const trust = chartData.map((item, index) => {
    const date = new Date(item.date);
    const monthIndex = date.getMonth() - 3; // Starting from April (0) to June (2)
    const trendFactor = 0.15 + monthIndex * 0.05;
    const total = Math.floor(item.total * trendFactor * 0.5);
    return {
      date: item.date,
      total: total,
      resolved: getResolvedValue(
        total,
        0.35,
        0.65 - (index / chartData.length) * 0.2
      ),
    };
  });

  // Competition objections: Cyclical with weekly pattern
  const competition = chartData.map((item) => {
    const date = new Date(item.date);
    const dayOfWeek = date.getDay();
    // Higher on weekdays (Mon-Fri), lower on weekends
    const multiplier = dayOfWeek > 0 && dayOfWeek < 6 ? 0.25 : 0.1;
    const total = Math.floor(item.total * multiplier * 0.5);
    return {
      date: item.date,
      total: total,
      resolved: getResolvedValue(
        total,
        dayOfWeek <= 3 ? 0.6 : 0.5,
        dayOfWeek <= 3 ? 0.8 : 0.7
      ),
    };
  });

  // Stakeholder objections: Low volume but with specific event-based spikes
  const stakeholders = chartData.map((item) => {
    const date = new Date(item.date);
    const dayOfMonth = date.getDate();
    const monthIndex = date.getMonth();

    // Specific events (meetings, quarter-end, etc.)
    const isQuarterEnd = monthIndex === 5 && dayOfMonth >= 25; // End of Q2 (June)
    const isMonthEnd = dayOfMonth >= 28;
    const isMonthStart = dayOfMonth <= 3;

    let multiplier = 0.08; // Base rate
    if (isQuarterEnd) multiplier = 0.3;
    else if (isMonthEnd) multiplier = 0.2;
    else if (isMonthStart) multiplier = 0.15;

    const total = Math.floor(item.total * multiplier * 0.5);
    return {
      date: item.date,
      total: total,
      resolved: getResolvedValue(
        total,
        isQuarterEnd ? 0.3 : 0.4,
        isQuarterEnd ? 0.5 : 0.6
      ),
    };
  });

  // Other objections: Random pattern with gradual improvement in resolution rate
  const other = chartData.map((item, index) => {
    const randomFactor = 0.15 + Math.random() * 0.1;
    const total = Math.floor(item.total * randomFactor * 0.5);
    return {
      date: item.date,
      total: total,
      resolved: getResolvedValue(
        total,
        0.3 + (index / chartData.length) * 0.2,
        0.5 + (index / chartData.length) * 0.25
      ),
    };
  });

  return {
    price,
    timing,
    trust,
    competition,
    stakeholders,
    other,
  };
};

const categoryData: CategoryDataType = createCategoryData();

// Prepare the combined data for the line chart
// We'll take a sample of the data points to avoid overcrowding
const prepareLineChartData = (): LineChartDataItem[] => {
  // We'll take every 7th day to get weekly data points
  const sampledData = chartData;

  // Map the data to include all category totals
  return sampledData.map((item) => {
    const dateIndex = chartData.findIndex((d) => d.date === item.date);
    const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return {
      date: formattedDate,
      price: categoryData.price[dateIndex].total,
      timing: categoryData.timing[dateIndex].total,
      trust: categoryData.trust[dateIndex].total,
      competition: categoryData.competition[dateIndex].total,
      stakeholders: categoryData.stakeholders[dateIndex].total,
      other: categoryData.other[dateIndex].total,
    };
  });
};

const lineChartData = prepareLineChartData();

// Define colors for the categories
const categoryColors = {
  price: "#ff6384",
  timing: "#36a2eb",
  trust: "#ffce56",
  competition: "#4bc0c0",
  stakeholders: "#9966ff",
  other: "#ff9f40",
};

export function CategoryTrendChart() {
  // Calculate trend percentage - using the Price category as an example
  const calculateTrendPercentage = () => {
    const priceData = categoryData.price;
    const lastMonthData = priceData.slice(-10);
    const previousMonthData = priceData.slice(-20, -10);

    const lastMonthTotal = lastMonthData.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const previousMonthTotal = previousMonthData.reduce(
      (sum, item) => sum + item.total,
      0
    );

    if (previousMonthTotal === 0) return 0;

    const percentageChange =
      ((lastMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
    return percentageChange.toFixed(1).toString();
  };

  // Define tooltip props interface
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border rounded-lg shadow-lg">
          <p className="text-gray-600 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Objection Categories</CardTitle>
        <CardDescription>April - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineChartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                name="Price"
                stroke={categoryColors.price}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="timing"
                name="Timing"
                stroke={categoryColors.timing}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="trust"
                name="Trust/Risk"
                stroke={categoryColors.trust}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="competition"
                name="Competition"
                stroke={categoryColors.competition}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="stakeholders"
                name="Stakeholders"
                stroke={categoryColors.stakeholders}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="other"
                name="Other"
                stroke={categoryColors.other}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {isTrendingUp ? (
                <>
                  Price objections trending up by {trendPercentage}% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Price objections trending down by{" "}
                  {Math.abs(parseFloat(trendPercentage.toString()))}% this month{" "}
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total objections by category for the last 3 months
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
