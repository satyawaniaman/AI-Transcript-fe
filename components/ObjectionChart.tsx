"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  { date: "2024-04-22", total: 224, resolved: 170 },
  { date: "2024-04-23", total: 138, resolved: 230 },
  { date: "2024-04-24", total: 387, resolved: 290 },
  { date: "2024-04-25", total: 215, resolved: 250 },
  { date: "2024-04-26", total: 75, resolved: 130 },
  { date: "2024-04-27", total: 383, resolved: 420 },
  { date: "2024-04-28", total: 122, resolved: 180 },
  { date: "2024-04-29", total: 315, resolved: 240 },
  { date: "2024-04-30", total: 454, resolved: 380 },
  { date: "2024-05-01", total: 165, resolved: 220 },
  { date: "2024-05-02", total: 293, resolved: 310 },
  { date: "2024-05-03", total: 247, resolved: 190 },
  { date: "2024-05-04", total: 385, resolved: 420 },
  { date: "2024-05-05", total: 481, resolved: 390 },
  { date: "2024-05-06", total: 498, resolved: 520 },
  { date: "2024-05-07", total: 388, resolved: 300 },
  { date: "2024-05-08", total: 149, resolved: 210 },
  { date: "2024-05-09", total: 227, resolved: 180 },
  { date: "2024-05-10", total: 293, resolved: 330 },
  { date: "2024-05-11", total: 335, resolved: 270 },
  { date: "2024-05-12", total: 197, resolved: 240 },
  { date: "2024-05-13", total: 197, resolved: 160 },
  { date: "2024-05-14", total: 448, resolved: 490 },
  { date: "2024-05-15", total: 473, resolved: 380 },
  { date: "2024-05-16", total: 338, resolved: 400 },
  { date: "2024-05-17", total: 499, resolved: 420 },
  { date: "2024-05-18", total: 315, resolved: 350 },
  { date: "2024-05-19", total: 235, resolved: 180 },
  { date: "2024-05-20", total: 177, resolved: 230 },
  { date: "2024-05-21", total: 82, resolved: 140 },
  { date: "2024-05-22", total: 81, resolved: 120 },
  { date: "2024-05-23", total: 252, resolved: 290 },
  { date: "2024-05-24", total: 294, resolved: 220 },
  { date: "2024-05-25", total: 201, resolved: 250 },
  { date: "2024-05-26", total: 213, resolved: 170 },
  { date: "2024-05-27", total: 420, resolved: 460 },
  { date: "2024-05-28", total: 233, resolved: 190 },
  { date: "2024-05-29", total: 78, resolved: 130 },
  { date: "2024-05-30", total: 340, resolved: 280 },
  { date: "2024-05-31", total: 178, resolved: 230 },
  { date: "2024-06-01", total: 178, resolved: 200 },
  { date: "2024-06-02", total: 470, resolved: 410 },
  { date: "2024-06-03", total: 103, resolved: 160 },
  { date: "2024-06-04", total: 439, resolved: 380 },
  { date: "2024-06-05", total: 88, resolved: 140 },
  { date: "2024-06-06", total: 294, resolved: 250 },
  { date: "2024-06-07", total: 323, resolved: 370 },
  { date: "2024-06-08", total: 385, resolved: 320 },
  { date: "2024-06-09", total: 438, resolved: 480 },
  { date: "2024-06-10", total: 155, resolved: 200 },
  { date: "2024-06-11", total: 92, resolved: 150 },
  { date: "2024-06-12", total: 492, resolved: 420 },
  { date: "2024-06-13", total: 81, resolved: 130 },
  { date: "2024-06-14", total: 426, resolved: 380 },
  { date: "2024-06-15", total: 307, resolved: 350 },
  { date: "2024-06-16", total: 371, resolved: 310 },
  { date: "2024-06-17", total: 475, resolved: 520 },
  { date: "2024-06-18", total: 107, resolved: 170 },
  { date: "2024-06-19", total: 341, resolved: 290 },
  { date: "2024-06-20", total: 408, resolved: 450 },
  { date: "2024-06-21", total: 169, resolved: 210 },
  { date: "2024-06-22", total: 317, resolved: 270 },
  { date: "2024-06-23", total: 480, resolved: 530 },
  { date: "2024-06-24", total: 132, resolved: 180 },
  { date: "2024-06-25", total: 141, resolved: 190 },
  { date: "2024-06-26", total: 434, resolved: 380 },
  { date: "2024-06-27", total: 448, resolved: 490 },
  { date: "2024-06-28", total: 149, resolved: 200 },
  { date: "2024-06-29", total: 103, resolved: 160 },
  { date: "2024-06-30", total: 446, resolved: 400 },
];

const chartConfig = {
  objectionss: {
    label: "Objections",
  },
  total: {
    label: "total",
    color: "hsl(var(--chart-1))",
  },
  resolved: {
    label: "resolved",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ObjectionChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Objection Trends Over Time</CardTitle>
          <CardDescription>
            Showing total objections and resolved objections for the last 3
            months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-total)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-total)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillresolved" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-resolved)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-resolved)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="resolved"
              type="natural"
              fill="url(#fillresolved)"
              stroke="var(--color-resolved)"
              stackId="a"
            />
            <Area
              dataKey="total"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-total)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}