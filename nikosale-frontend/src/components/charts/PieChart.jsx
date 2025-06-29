// components/charts/MessagesPieChart.js
import {
  PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer
} from 'recharts';

const pieData = [
  { name: 'Ozon', value: 2400 },
  { name: 'Wildberries', value: 1800 },
  { name: 'Яндекс.Маркет', value: 1300 },
  { name: 'AliExpress', value: 900 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MessagesPieChart = () => (
  <ResponsiveContainer width="100%" height={240}>
    <PieChart>
      <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        layout="vertical"
        align="right"
        verticalAlign="middle"
      />
    </PieChart>
  </ResponsiveContainer>
);

export default MessagesPieChart;
