import React, {useState, useEffect} from 'react';
import {Button} from '../components/button';
import {Input} from '../components/input';
import {Label} from '../components/label';
import {Info} from 'lucide-react';
import {Bot, User} from 'lucide-react';
import ProgressModal from './modals/ProgressModal';

const StoreForm = () => {
    const [storeName, setStoreName] = useState('');
    const [description, setDescription] = useState('');
    const [ozonToken, setOzonToken] = useState('');
    const [wbToken, setWbToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [handoverOptions, setHandoverOptions] = useState({
        complaint: true,
        unclear: true,
        returnRequest: false,
        discount: false,
        legal: false,
        sensitiveWords: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    // ✅ Функция имитации API-запроса
    const fetchStoreData = async () => {
        try {
            // Здесь можно использовать fetch('/api/store'), axios.get(...), etc.
            await new Promise((resolve) => setTimeout(resolve, 1200)); // заглушка
            // Предположим, мы получили такие данные:
            const data = {
                storeName: 'ООО Ромашка',
                description: 'Магазин товаров для дома',
                ozonToken: 'sample-ozon-token',
                wbToken: 'sample-wb-token',
            };
            setStoreName(data.storeName);
            setDescription(data.description);
            setOzonToken(data.ozonToken);
            setWbToken(data.wbToken);
        } catch (error) {
            console.error('Ошибка при загрузке данных магазина:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStoreData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setMessage({type: 'success', text: 'Магазин успешно зарегистрирован!'});
        } catch (error) {
            setMessage({type: 'error', text: 'Ошибка при регистрации.'});
        } finally {
            setIsSubmitting(false);
        }
    };
    if (isLoading) {
        return (
            <div className="w-full mx-auto px-4 py-10 text-center text-muted-foreground">
                <p className="text-sm animate-pulse">Загрузка данных магазина...</p>
            </div>
        );
    }
    return (
        <div className="max-w-2xl space-y-6 py-4 px-6">
            <div>
                <h1 className="text-2xl font-semibold">Регистрация магазина</h1>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <Info className="w-4 h-4"/> Введите информацию для создания и интеграции магазина
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pb-16 sm:pb-4">
                <div className="space-y-2">
                    <Label htmlFor="storeName" className="text-sm text-muted-foreground">Название магазина</Label>
                    <Input
                        id="storeName"
                        placeholder="Например, OOO Ромашка"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm text-muted-foreground">Описание магазина</Label>
                    <textarea
                        id="description"
                        placeholder="Например, магазин товаров для дома"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full min-h-[100px] rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>

                <div className="pt-6 border-t border-border space-y-6">
                    <h3 className="text-sm font-semibold text-muted-foreground">
                        Условия, при которых ИИ передаёт диалог менеджеру:
                    </h3>

                    {[
                        ['complaint', 'Клиент жалуется или негативно настроен', 'Передача диалога поможет оперативно погасить негатив и сохранить клиента.'],
                        ['unclear', 'ИИ не понимает вопрос после нескольких попыток', 'Когда вопрос выходит за рамки базы знаний, нужен человек.'],
                        ['returnRequest', 'Запрос на возврат товара', 'Менеджер сможет уточнить детали и предложить альтернативу.'],
                        ['discount', 'Запрос на индивидуальную скидку', 'Требуется участие человека для оценки возможности предложения.'],
                        ['legal', 'Юридический или спорный вопрос', 'Такие вопросы требуют точности и ответственности со стороны менеджера.'],
                        ['sensitiveWords', 'Упоминание “директор”, “жалоба”, “отказ”', 'Сигналы о возможной эскалации — лучше передать человеку.'],
                    ].map(([key, label, hint]) => (
                        <div key={key} className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <span className="text-sm text-foreground">{label}</span>
                                    <p className="text-xs text-muted-foreground">{hint}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div
                                        onClick={() => setHandoverOptions(prev => ({...prev, [key]: !prev[key]}))}
                                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all shadow-inner ${
                                            handoverOptions[key]
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                                                : 'bg-muted'
                                        }`}
                                    >
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${
                                                handoverOptions[key] ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                        />
                                    </div>
                                    {handoverOptions[key] ? (
                                        <User className="w-5 h-5 text-primary"/>
                                    ) : (
                                        <Bot className="w-5 h-5 text-muted-foreground/40"/>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition 
    ${isSubmitting
                        ? 'bg-blue-100 text-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'}
  `}
                >
                    {isSubmitting && (
                        <svg
                            className="absolute left-3 w-4 h-4 animate-spin text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                    )}
                    <span className={`${isSubmitting ? 'pl-4' : ''}`}>
    {isSubmitting ? 'Регистрируем...' : 'Зарегистрировать'}
  </span>
                </Button>

            </form>
            <ProgressModal
                isOpen={isSubmitting}
                title="Регистрируем магазин"
                description="Пожалуйста, подождите, мы сохраняем ваши данные..."
            />
            {message && (
                <p
                    className={`text-sm text-center ${
                        message.type === 'success' ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    {message.text}
                </p>
            )}
        </div>
    );
};

export default StoreForm;
