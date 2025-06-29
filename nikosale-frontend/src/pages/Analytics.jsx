import React from 'react';
import {Card, CardContent} from '../components/card';
import { Info } from 'lucide-react';

import WeeklyStats from '../components/charts/LineCharts';
import MessagesPieChart from '../components/charts/PieChart';
import SentimentRatio from '../components/charts/SentimentRatio';
import ProductCardAnalysis from '../components/charts/ProductCardAnalysis';
import ReviewTrends from '../components/charts/ReviewTrends';
import QuestionToReviewConversion from '../components/charts/QuestionToReviewConversion';
import UserActivityByHour from '../components/charts/UserActivityByHour';

const Dashboard = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Карточки с количественными данными (заглушка) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item, idx) => (
                    <Card key={idx}>
                        <CardContent>
                            <h3 className="text-sm font-medium text-gray-500">Метрика {item}</h3>
                            <p className="text-2xl font-semibold text-gray-800 dark:text-white">123</p>
                            <p className="text-xs text-gray-400 mt-1">Описание метрики</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
                {/* Конверсия: вопросы → отзывы */}
                <Card>
                    <CardContent>
                        <div className="relative group inline-block">
                            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                Конверсия
                                <Info size={16} className="text-gray-400 cursor-pointer text-sm"/>

                                <div
                                    className="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 bottom-full left-0 mb-1 w-64 shadow-lg">
                                    Показывает, какая часть вопросов перерастает в отзывы (положительные или
                                    отрицательные)
                                </div>
                            </h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            Сравнение количества заданных вопросов и оставленных отзывов
                        </p>
                        <QuestionToReviewConversion/>
                    </CardContent>
                </Card>
            </div>

            {/* LineChart + PieChart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-2">Активность по дням недели</h2>
                        <p className="text-sm text-gray-500 mb-4">Количество сообщений по дням</p>
                        <WeeklyStats/>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-2">Сообщения на маркетплейсах</h2>
                        <p className="text-sm text-gray-500 mb-4">Распределение по платформам</p>
                        <MessagesPieChart/>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {/* Время активности пользователей */}
                <Card>
                    <CardContent>
                        <div className="relative group inline-block">
                            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                Время активности пользователей
                                <Info  size={16} className="text-gray-400 cursor-pointer text-sm"/>

                                <div
                                    className="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 bottom-full left-0 mb-1 w-72 shadow-lg">
                                    Распределение количества сообщений по часам суток. Помогает определить, в какое
                                    время дня пользователи наиболее активны.
                                </div>
                            </h2>
                        </div>

                        <UserActivityByHour/>
                    </CardContent>
                </Card>
            </div>
            {/* LineChart + PieChart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-2">Динамика отзывов по дням</h2>
                        <p className="text-sm text-gray-500 mb-4">Изменение количества положительных и отрицательных
                            отзывов</p>
                        <ReviewTrends/>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <div className="relative group inline-block">
                            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                Анализ отзывов
                                <Info  size={16} className="text-gray-400 cursor-pointer text-sm"/>

                                <div
                                    className="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 bottom-full left-0 mb-1 w-72 shadow-lg">
                                    Отображает соотношение типов сообщений от пользователей: сколько вопросов, сколько
                                    положительных и отрицательных отзывов.
                                </div>
                            </h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            Распределение типов пользовательских сообщений
                        </p>

                        <SentimentRatio/>
                    </CardContent>
                </Card>


            </div>
            <div className="grid grid-cols-1 gap-4">
                {/* Анализ SEO карточек товаров */}
                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-2">Анализ SEO карточек товаров</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Качество заголовков, наличие ключевых слов и описаний
                        </p>
                        <ProductCardAnalysis/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
