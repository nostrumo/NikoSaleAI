// components/charts/UserActivityByHour.js
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const hourlyData = [
  { hour: '00:00', messages: 20 },
  { hour: '01:00', messages: 10 },
  { hour: '02:00', messages: 5 },
  { hour: '03:00', messages: 3 },
  { hour: '04:00', messages: 7 },
  { hour: '05:00', messages: 12 },
  { hour: '06:00', messages: 25 },
  { hour: '07:00', messages: 40 },
  { hour: '08:00', messages: 60 },
  { hour: '09:00', messages: 80 },
  { hour: '10:00', messages: 95 },
  { hour: '11:00', messages: 100 },
  { hour: '12:00', messages: 90 },
  { hour: '13:00', messages: 85 },
  { hour: '14:00', messages: 110 },
  { hour: '15:00', messages: 130 },
  { hour: '16:00', messages: 140 },
  { hour: '17:00', messages: 150 },
  { hour: '18:00', messages: 120 },
  { hour: '19:00', messages: 100 },
  { hour: '20:00', messages: 80 },
  { hour: '21:00', messages: 60 },
  { hour: '22:00', messages: 40 },
  { hour: '23:00', messages: 30 },
];

const UserActivityByHour = () => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={hourlyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="hour" interval={1} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="messages" fill="#8884d8" name="Сообщения" />
    </BarChart>
  </ResponsiveContainer>
);

export default UserActivityByHour;
