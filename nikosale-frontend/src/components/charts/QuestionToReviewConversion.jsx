// components/charts/QuestionToReviewConversion.js
import {
  ComposedChart, XAxis, YAxis, Tooltip, Legend, Bar, Line, ResponsiveContainer, CartesianGrid
} from 'recharts';

const conversionData = [
  { date: '01.06', questions: 80, reviews: 40 },
  { date: '02.06', questions: 100, reviews: 70 },
  { date: '03.06', questions: 90, reviews: 65 },
  { date: '04.06', questions: 120, reviews: 100 },
  { date: '05.06', questions: 110, reviews: 85 },
];

const QuestionToReviewConversion = () => (
  <ResponsiveContainer width="100%" height={260}>
    <ComposedChart data={conversionData}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="questions" barSize={20} fill="#8884d8" name="Вопросы" />
      <Line type="monotone" dataKey="reviews" stroke="#00C49F" name="Отзывы" />
    </ComposedChart>
  </ResponsiveContainer>
);

export default QuestionToReviewConversion;
