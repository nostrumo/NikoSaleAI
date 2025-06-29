// components/charts/SentimentRatio.js
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const sentimentData = [
  { name: 'Вопросы', value: 350 },
  { name: 'Положительные отзывы', value: 500 },
  { name: 'Отрицательные отзывы', value: 150 },
];

const COLORS = ['#8884d8', '#00C49F', '#FF4D4F'];

const SentimentRatio = () => (
  <ResponsiveContainer width="100%" height={240}>
    <PieChart>
      <Pie
        data={sentimentData}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {sentimentData.map((entry, index) => (
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

export default SentimentRatio;
