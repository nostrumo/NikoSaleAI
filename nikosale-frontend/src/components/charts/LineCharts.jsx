// components/charts/WeeklyStats.js
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const weeklyData = [
  { day: 'Пн', messages: 300 },
  { day: 'Вт', messages: 500 },
  { day: 'Ср', messages: 700 },
  { day: 'Чт', messages: 600 },
  { day: 'Пт', messages: 800 },
  { day: 'Сб', messages: 200 },
  { day: 'Вс', messages: 100 },
];

const WeeklyStats = () => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={weeklyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="messages" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default WeeklyStats;
