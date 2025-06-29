// components/seo/ProductCardAnalysis.js
import React from 'react';

const mockData = [
  {
    name: 'Товар 1',
    titleLength: 55,
    hasKeywords: true,
    descriptionQuality: 'Высокая',
  },
  {
    name: 'Товар 2',
    titleLength: 30,
    hasKeywords: false,
    descriptionQuality: 'Средняя',
  },
  {
    name: 'Товар 3',
    titleLength: 70,
    hasKeywords: true,
    descriptionQuality: 'Низкая',
  },
];

const ProductCardAnalysis = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-left text-gray-500">
      <thead className="text-xs uppercase text-gray-700 border-b dark:border-zinc-700">
        <tr>
          <th className="py-2 pr-4">Название</th>
          <th className="py-2 pr-4">Длина заголовка</th>
          <th className="py-2 pr-4">Ключевые слова</th>
          <th className="py-2">Качество описания</th>
        </tr>
      </thead>
      <tbody>
        {mockData.map((item, index) => (
          <tr key={index} className="border-b dark:border-zinc-700">
            <td className="py-2 pr-4">{item.name}</td>
            <td className="py-2 pr-4">{item.titleLength} символов</td>
            <td className="py-2 pr-4">{item.hasKeywords ? '✅ Да' : '❌ Нет'}</td>
            <td className="py-2">{item.descriptionQuality}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductCardAnalysis;
