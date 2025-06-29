import React from 'react';
import OzonIcon from '../assets/ozon.webp';
import WBIcon from '../assets/wildberries.webp';
import YandexIcon from '../assets/ya_market.webp';
import NoImage from '../assets/no-image.png';
import { MoveRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const renderMarketplaceIcon = (active, src, alt) => (
    <img
      src={src}
      alt={alt}
      className={`w-6 h-6 object-contain transition ${
        active ? 'opacity-100' : 'opacity-30 grayscale'
      }`}
    />
  );

  return (
    <div className="group relative rounded-xl border bg-white shadow-sm overflow-hidden transition-all hover:shadow-md hover:scale-[1.01]">
      {/* Картинка товара */}
      <div className="w-full aspect-square bg-gray-100 overflow-hidden flex items-center justify-center">
        <img
          src={product.image || NoImage}
          alt={product.name}
          className="w-full h-full object-contain transition duration-300 group-hover:brightness-75"
        />
      </div>

      {/* Контент */}
      <div className="p-4 space-y-2 transition group-hover:opacity-80">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <span className="text-base font-semibold text-gray-800 whitespace-nowrap">
            {product.price.toLocaleString()} ₽
          </span>
        </div>

        {/* Короткое описание */}
        {product.description && (
          <p className="text-xs text-gray-500 line-clamp-1">
            {product.description}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          {renderMarketplaceIcon(product.marketplaces.ozon, OzonIcon, 'Ozon')}
          {renderMarketplaceIcon(product.marketplaces.wb, WBIcon, 'WB')}
          {renderMarketplaceIcon(product.marketplaces.yandex, YandexIcon, 'Yandex')}
        </div>
      </div>

      {/* Стрелка */}
      <MoveRight
        className="absolute top-2 right-4 w-7 h-7 text-white opacity-0 translate-x-2 group-hover:opacity-90 group-hover:translate-x-0 transition-all duration-300 z-10"
      />
    </div>
  );
}
