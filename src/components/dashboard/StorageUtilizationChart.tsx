
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Module A', used: 80, capacity: 100 },
  { name: 'Module B', used: 65, capacity: 100 },
  { name: 'Cargo Bay', used: 90, capacity: 100 },
  { name: 'Lab Storage', used: 50, capacity: 100 },
  { name: 'Personal', used: 70, capacity: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { used, capacity } = payload[0].payload;
    const percentUsed = (used / capacity) * 100;
    
    return (
      <div className="bg-card p-3 border rounded-md shadow-md">
        <p className="font-medium">{payload[0].payload.name}</p>
        <p className="text-sm text-muted-foreground">{`Used: ${used} units (${percentUsed.toFixed(0)}%)`}</p>
        <p className="text-sm text-muted-foreground">{`Free: ${capacity - used} units`}</p>
      </div>
    );
  }

  return null;
};

const StorageUtilizationChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="used"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StorageUtilizationChart;
