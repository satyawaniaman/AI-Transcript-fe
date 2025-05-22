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
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Calendar, ChevronDown } from "lucide-react";
import { useGetObjectionCategoriesTrend } from "@/services/dashboard/query";

type CategoryKey =
  | "price"
  | "timing"
  | "trust"
  | "competition"
  | "stakeholders"
  | "other";

interface CategoryData {
  date: string;
  price: number;
  timing: number;
  trust: number;
  competition: number;
  stakeholders: number;
  other: number;
}

interface CategoryTotals {
  price: number;
  timing: number;
  trust: number;
  competition: number;
  stakeholders: number;
  other: number;
}

const categoryColors: Record<CategoryKey, string> = {
  price: "#ff6384",
  timing: "#36a2eb",
  trust: "#ffce56",
  competition: "#4bc0c0",
  stakeholders: "#9966ff",
  other: "#ff9f40",
};

const categoryLabels: Record<CategoryKey, string> = {
  price: "Price",
  timing: "Timing",
  trust: "Trust/Risk",
  competition: "Competition",
  stakeholders: "Stakeholders",
  other: "Other",
};

const dateRangeOptions = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 15 days", value: 15 },
  { label: "Last month", value: 30 },
  { label: "Last 3 months", value: 90 },
];

interface CategoryTrendChartProps {
  organizationId: string;
  startDate?: string;
  endDate?: string;
}

export function CategoryTrendChart({
  organizationId,
  startDate,
  endDate,
}: CategoryTrendChartProps) {
  // State for selected categories (Price selected by default)
  const [selectedCategories, setSelectedCategories] = React.useState<
    Set<CategoryKey>
  >(new Set(["price"]));

  // State for date range
  const [selectedDateRange, setSelectedDateRange] = React.useState(90); // Default to 3 months

  // State for dropdown visibility
  const [showCategoryDropdown, setShowCategoryDropdown] = React.useState(false);
  const [showDateDropdown, setShowDateDropdown] = React.useState(false);

  const { calculatedStartDate, calculatedEndDate } = React.useMemo(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - selectedDateRange);

    return {
      calculatedStartDate: startDate.toISOString().split("T")[0],
      calculatedEndDate: endDate.toISOString().split("T")[0],
    };
  }, [selectedDateRange]);

  const { data, isLoading, error } = useGetObjectionCategoriesTrend(
    organizationId,
    startDate || calculatedStartDate,
    endDate || calculatedEndDate
  );

  const filteredData = React.useMemo(() => {
    if (!data) return [];

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - selectedDateRange);

    return data.filter((item) => new Date(item.date) >= cutoffDate);
  }, [data, selectedDateRange]);

  // Process the data for chart display
  const processedData = React.useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];

    return filteredData.map((item) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));
  }, [filteredData]);

  // Calculate totals for selected categories
  const categoryTotals = React.useMemo((): CategoryTotals => {
    if (!data || data.length === 0) {
      return {
        price: 0,
        timing: 0,
        trust: 0,
        competition: 0,
        stakeholders: 0,
        other: 0,
      };
    }

    const totals: CategoryTotals = {
      price: 0,
      timing: 0,
      trust: 0,
      competition: 0,
      stakeholders: 0,
      other: 0,
    };

    data.forEach((item) => {
      (Object.keys(totals) as CategoryKey[]).forEach((key) => {
        totals[key] += item[key] || 0;
      });
    });

    return totals;
  }, [data]);

  // Handle category toggle
  const toggleCategory = (category: CategoryKey) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      // Don't allow deselecting all categories
      if (newSelected.size > 1) {
        newSelected.delete(category);
      }
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  // Get date range description
  const getDateRangeDescription = () => {
    const option = dateRangeOptions.find(
      (opt) => opt.value === selectedDateRange
    );
    return option?.label || "Custom range";
  };

  // Custom tooltip
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      const sortedPayload = [...payload].sort(
        (a, b) => (b.value || 0) - (a.value || 0)
      );

      return (
        <div className="p-3 bg-white border rounded-lg shadow-lg">
          <p className="text-gray-600 font-medium">{label}</p>
          {sortedPayload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render chart content
  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className="w-full h-64" />;
    }

    if (error) {
      return (
        <div className="w-full h-64 flex items-center justify-center text-red-500">
          Failed to load objection category data
        </div>
      );
    }

    if (!processedData || processedData.length === 0) {
      return (
        <div className="w-full h-64 flex items-center justify-center text-gray-500">
          No objection category data available for this time period
        </div>
      );
    }

    return (
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={processedData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              domain={[0, "auto"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {/* Render lines only for selected categories */}
            {selectedCategories.has("price") && (
              <Line
                type="monotone"
                dataKey="price"
                name="Price"
                stroke={categoryColors.price}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
            {selectedCategories.has("timing") && (
              <Line
                type="monotone"
                dataKey="timing"
                name="Timing"
                stroke={categoryColors.timing}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
            {selectedCategories.has("trust") && (
              <Line
                type="monotone"
                dataKey="trust"
                name="Trust/Risk"
                stroke={categoryColors.trust}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
            {selectedCategories.has("competition") && (
              <Line
                type="monotone"
                dataKey="competition"
                name="Competition"
                stroke={categoryColors.competition}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
            {selectedCategories.has("stakeholders") && (
              <Line
                type="monotone"
                dataKey="stakeholders"
                name="Stakeholders"
                stroke={categoryColors.stakeholders}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
            {selectedCategories.has("other") && (
              <Line
                type="monotone"
                dataKey="other"
                name="Other"
                stroke={categoryColors.other}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle>Sales Objection Categories</CardTitle>
            <CardDescription>{getDateRangeDescription()}</CardDescription>

            {/* Display totals for selected categories only */}
            {!isLoading && categoryTotals && (
              <div className="flex flex-wrap gap-2 mt-2 text-xs">
                {Array.from(selectedCategories).map((category) => (
                  <span
                    key={category}
                    style={{ color: categoryColors[category] }}
                    className="font-medium"
                  >
                    {categoryLabels[category]}: {categoryTotals[category]}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Controls in top-right corner */}
          <div className="flex gap-2">
            {/* Date Range Filter */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => {
                  setShowDateDropdown(!showDateDropdown);
                  setShowCategoryDropdown(false);
                }}
              >
                <Calendar className="h-4 w-4 mr-1" />
                {selectedDateRange}d
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
              {showDateDropdown && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border rounded-md shadow-lg z-10">
                  <div className="p-2 space-y-1">
                    <div className="font-medium text-sm p-2">Date Range</div>
                    {dateRangeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={
                          selectedDateRange === option.value
                            ? "default"
                            : "ghost"
                        }
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          setSelectedDateRange(option.value);
                          setShowDateDropdown(false);
                        }}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowDateDropdown(false);
                }}
              >
                <Settings className="h-4 w-4 mr-1" />
                Categories
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
              {showCategoryDropdown && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white border rounded-md shadow-lg z-10">
                  <div className="p-3 space-y-3">
                    <div className="font-medium text-sm">Show Categories</div>
                    {(Object.keys(categoryColors) as CategoryKey[]).map(
                      (category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={category}
                            checked={selectedCategories.has(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label
                            htmlFor={category}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                          >
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: categoryColors[category],
                              }}
                            />
                            {categoryLabels[category]}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
