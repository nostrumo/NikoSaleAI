import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const messagesData = [
  { name: 'Ozon', messages: 2400 },
  { name: 'Wildberries', messages: 1800 },
  { name: 'Яндекс.Маркет', messages: 1300 },
  { name: 'AliExpress', messages: 900 },
];

const MessagesByMarketplace = () => (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={messagesData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="messages" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);
