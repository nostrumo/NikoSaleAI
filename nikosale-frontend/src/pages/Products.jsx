import React, {useState, useEffect} from 'react';
import {Input} from '../components/input';
import {Select} from '../components/select';
import {Label} from '../components/label';
import {Search} from 'lucide-react';
import ProductCardPlaceholder from '../components/ProductCardPlaceholder';
import ProductCard from '../components/ProductCard';

const mockProducts = [
    {
        id: 1,
        name: 'Товар 1',
        description: 'Очень очень коротконе описание самого лучшего товара',
        price: 1990,
        marketplaces: {ozon: true, wb: false, yandex: true},
    },
    {
        id: 2,
        name: 'Товар 2',
        description: 'Очень очень коротконе описание самого лучшего',
        price: 2990,
        marketplaces: {ozon: false, wb: false, yandex: false},
    },
];

export default function Products() {
    const [search, setSearch] = useState('');
    const [selectedMarketplace, setSelectedMarketplace] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Эмуляция загрузки
    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    const filteredProducts = mockProducts.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesMarketplace =
            !selectedMarketplace || p.marketplaces[selectedMarketplace];
        return matchesSearch && matchesMarketplace;
    });

    return (
        <div className="space-y-6 px-4 pb-32 sm:pb-20 relative py-8">
            {/* Фильтры и кнопка */}
            <div className="flex flex-wrap justify-between gap-4 items-end">
                <div className="flex flex-wrap gap-4 items-end">
                    {/* Поиск */}
                    <div className="flex flex-col">
                        <Label className="mb-1">Поиск</Label>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground"/>
                            <Input
                                placeholder="Найти товар..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    {/* Маркетплейс */}
                    <div className="flex flex-col">
                        <Label className="mb-1">Маркетплейс</Label>
                        <Select value={selectedMarketplace} onChange={(e) => setSelectedMarketplace(e.target.value)}>
                            <option value="">Все</option>
                            <option value="ozon">Ozon</option>
                            <option value="wb">Wildberries</option>
                            <option value="yandex">Яндекс</option>
                        </Select>
                    </div>
                </div>

                {/* Кнопка добавления */}
                <div className="hidden sm:block">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
                        + Добавить продукт
                    </button>
                </div>
            </div>

            {/* Кнопка на мобильных */}
            <div className="sm:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
                <button
                    className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-700 transition">
                    + Добавить продукт
                </button>
            </div>

            {/* Сетка карточек */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {isLoading
                    ? Array.from({length: 6}).map((_, idx) => (
                        <ProductCardPlaceholder key={idx}/>
                    ))
                    : filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
            </div>
        </div>
    );
}
