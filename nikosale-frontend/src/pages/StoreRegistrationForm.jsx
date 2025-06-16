import React, { useState, useEffect } from 'react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { Info } from 'lucide-react';

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
      setMessage({ type: 'success', text: 'Магазин успешно зарегистрирован!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при регистрации.' });
    } finally {
      setIsSubmitting(false);
    }
  };
    if (isLoading) {
        return (
            <div className="w-full max-w-screen-md mx-auto px-4 py-10 text-center text-muted-foreground">
                <p className="text-sm animate-pulse">Загрузка данных магазина...</p>
            </div>
        );
    }
    return (
        <div className="w-full max-w-screen-md mx-auto space-y-6 px-4">
            <div>
                <h2 className="text-xl font-semibold">Регистрация магазина</h2>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <Info className="w-4 h-4"/> Введите информацию для создания и интеграции магазина
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <Label htmlFor="storeName">Название магазина</Label>
                    <Input
                        id="storeName"
                        placeholder="Например, OOO Ромашка"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="description">Описание магазина</Label>
                    <textarea
                        id="description"
                        placeholder="Например, магазин товаров для дома"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="ozonToken">Ozon API токен</Label>
                        <Input
                            id="ozonToken"
                            placeholder="Введите токен Ozon"
                            value={ozonToken}
                            onChange={(e) => setOzonToken(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="wbToken">Wildberries API токен</Label>
                        <Input
                            id="wbToken"
                            placeholder="Введите токен Wildberries"
                            value={wbToken}
                            onChange={(e) => setWbToken(e.target.value)}
                        />
                        <a
                            href="https://docs.example.com/mp-tokens"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline mt-1 inline-block"
                        >
                            Инструкция по получению токенов
                        </a>
                    </div>
                </div>
                {(
                    <div className="space-y-3 mt-4">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                            Когда ИИ должен передать диалог менеджеру?
                        </h3>
                        {[
                            ['complaint', 'Клиент жалуется или негативно настроен'],
                            ['unclear', 'ИИ не понимает вопрос после нескольких попыток'],
                            ['returnRequest', 'Запрос на возврат товара'],
                            ['discount', 'Запрос на индивидуальную скидку'],
                            ['legal', 'Юридический или спорный вопрос'],
                            ['sensitiveWords', 'Упоминание “директор”, “жалоба”, “отказ”'],
                        ].map(([key, label]) => (
                            <div key={key} className="flex items-center justify-between">
                                <label className="text-sm">{label}</label>
                                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {handoverOptions[key] ? 'Менеджер' : 'ИИ'}
                  </span>
                                    <div
                                        onClick={() =>
                                            setHandoverOptions((prev) => ({...prev, [key]: !prev[key]}))
                                        }
                                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
                                            handoverOptions[key] ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}
                                    >
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                                                handoverOptions[key] ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
                    {isSubmitting ? 'Регистрируем...' : 'Зарегистрировать'}
                </Button>
            </form>

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
