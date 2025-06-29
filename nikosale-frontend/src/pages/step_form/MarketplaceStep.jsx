import { useState } from 'react';
import ozonLogo from '../../assets/ozon.svg';
import wbLogo from '../../assets/wildberries.svg';
import yaLogo from '../../assets/ya_market.svg';
import tgLogo from '../../assets/tg.webp';
import jivoLogo from '../../assets/jivo.webp';
import avitoLogo from '../../assets/avito.webp';

const marketplaces = [
  {
    id: 'wildberries',
    name: 'Wildberries',
    description: 'Добавить магазин',
    logo: wbLogo,
  },
  {
    id: 'ozon',
    name: 'Ozon',
    description: 'Добавить аккаунт',
    logo: ozonLogo,
  },
  {
    id: 'yamarket',
    name: 'Я.Маркет',
    description: 'Добавить аккаунт',
    logo: yaLogo,
  },
  {
    id: 'avito',
    name: 'Авито',
    description: 'Добавить аккаунт',
    logo: avitoLogo,
  },
  {
    id: 'jivosite',
    name: 'Jivosite',
    description: 'Добавить аккаунт',
    logo: jivoLogo,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Добавить аккаунт',
    logo: tgLogo,
  },
];

export default function MarketplaceStep({ onNext }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Выберите маркетплейс</h1>
      <p className="text-sm text-gray-500 mb-6">
        Выберите маркетплейс — дальше подскажем, что делать: создать магазин или подключить аккаунт.
      </p>

      {/* 🔲 Адаптивные плитки */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto mb-6 p-3">
        {marketplaces.map((mp) => (
          <div
            key={mp.id}
            onClick={() => setSelected(mp.id)}
            className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center text-center transition shadow-sm
              ${
                selected === mp.id
                  ? 'border-blue-500 ring-2 ring-blue-400 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <img src={mp.logo} alt={mp.name} className="w-10 h-10 mb-2" />
            <div className="hidden sm:block">
              <div className="font-medium text-sm">{mp.name}</div>
              <div className="text-xs text-gray-500">{mp.description}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        disabled={!selected}
        onClick={() => onNext(selected)}
      >
        Продолжить
      </button>
    </div>
  );
}
