import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const reviewData = [
  { date: '01.06', positive: 120, negative: 40 },
  { date: '02.06', positive: 150, negative: 30 },
  { date: '03.06', positive: 180, negative: 50 },
  { date: '04.06', positive: 170, negative: 60 },
  { date: '05.06', positive: 190, negative: 40 },
  { date: '06.06', positive: 160, negative: 30 },
  { date: '07.06', positive: 200, negative: 50 },
];

const ReviewTrends = () => (
  <ResponsiveContainer width="100%" height={260}>
    <AreaChart data={reviewData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FF4D4F" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#FF4D4F" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="positive" stroke="#00C49F" fillOpacity={1} fill="url(#colorPos)" name="Положительные" />
      <Area type="monotone" dataKey="negative" stroke="#FF4D4F" fillOpacity={1} fill="url(#colorNeg)" name="Отрицательные" />
    </AreaChart>
  </ResponsiveContainer>
);

export default ReviewTrends;
