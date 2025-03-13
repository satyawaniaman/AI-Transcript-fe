import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface DataPoint {
  time?: string;
  name?: string;
  score?: number;
  positive?: number;
  neutral?: number;
  negative?: number;
  [key: string]: string | number | undefined; // More specific than any
}

interface SentimentChartProps {
  data: DataPoint[];
  timeKey?: string;
  scoreKey?: string;
  showLegend?: boolean;
}

const defaultData = [
  { name: 'Call 1', positive: 65, neutral: 30, negative: 5 },
  { name: 'Call 2', positive: 70, neutral: 25, negative: 5 },
  { name: 'Call 3', positive: 60, neutral: 30, negative: 10 },
  { name: 'Call 4', positive: 75, neutral: 20, negative: 5 },
  { name: 'Call 5', positive: 68, neutral: 27, negative: 5 },
  { name: 'Call 6', positive: 72, neutral: 25, negative: 3 },
  { name: 'Call 7', positive: 78, neutral: 20, negative: 2 },
  { name: 'Call 8', positive: 80, neutral: 18, negative: 2 },
  { name: 'Call 9', positive: 75, neutral: 22, negative: 3 },
  { name: 'Call 10', positive: 82, neutral: 15, negative: 3 },
];

const SentimentChart: React.FC<SentimentChartProps> = ({ 
  data = defaultData, 
  timeKey = "time", 
  scoreKey = "score",
  showLegend = true
}) => {
  // If data has score and time properties, transform it for the chart
  const chartData = data.length > 0 && 
    Object.prototype.hasOwnProperty.call(data[0], scoreKey) && 
    Object.prototype.hasOwnProperty.call(data[0], timeKey)
    ? data.map(point => ({
        name: (point as DataPoint)[timeKey],
        sentiment: (point as DataPoint)[scoreKey] as number * 100, // Convert 0-1 scale to 0-100 percentage
      }))
    : data;

  // Determine what keys to show based on the data format
  const hasScoreFormat = data.length > 0 && Object.prototype.hasOwnProperty.call(data[0], scoreKey);
  const hasPositiveNegativeFormat = data.length > 0 && Object.prototype.hasOwnProperty.call(data[0], 'positive');

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => `${value}%`}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value) => [`${value}%`, '']}
            labelStyle={{ fontWeight: 'bold' }}
            contentStyle={{ 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          />
          {showLegend && <Legend />}
          
          {hasScoreFormat && (
            <Line 
              type="monotone" 
              dataKey="sentiment" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Sentiment"
            />
          )}
          
          {hasPositiveNegativeFormat && (
            <>
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="#60A5FA" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#EF4444" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;
