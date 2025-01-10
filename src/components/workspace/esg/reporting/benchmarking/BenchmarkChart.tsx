import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BenchmarkChartProps {
  data: any[];
  isLoading: boolean;
}

export const BenchmarkChart = ({ data, isLoading }: BenchmarkChartProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading benchmarks...
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="industry" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="average_value" fill="#6366F1" name="Industry Average" />
      </BarChart>
    </ResponsiveContainer>
  );
};