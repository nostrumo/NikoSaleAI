import React from 'react';


export default function ProductCardPlaceholder() {
  return (
    <div className="animate-pulse rounded-xl border bg-white shadow-sm overflow-hidden">
      {/* Изображение с соотношением 1:1 */}
      <div className="w-full aspect-square bg-gray-200 flex items-center justify-center" />

      {/* Контент */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        {/* Иконки маркетплейсов */}
        <div className="flex gap-2 pt-2">
          <div className="w-6 h-6 bg-gray-200 rounded-md" />
          <div className="w-6 h-6 bg-gray-200 rounded-md" />
          <div className="w-6 h-6 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}
