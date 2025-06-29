import React, {useState, useEffect, useRef} from 'react';
import {Eye, EyeOff, Trash, Check} from 'lucide-react';
import {Input} from '../components/input';
import {Label} from '../components/label';
import {Button} from '../components/button';
import ConfirmModal from './modals/ConfirmModal';
import ozonLogo from '../assets/ozon.svg';
import wbLogo from '../assets/wildberries.svg';
import yaLogo from '../assets/ya_market.svg';
import SaveTokenModal from './modals/SaveTokenModal';
import DeleteTokenModal from './modals/DeleteTokenModal';


const maskToken = (token) => {
    const length = token.length;
    if (length <= 8) return '****'; // слишком короткий — просто скрыть

    const start = token.slice(0, 4);
    const end = token.slice(-4);
    return `${start}****${end}`;
};

const integrations = [
    {key: 'ozonToken', name: 'OZON', logo: ozonLogo, placeholder: 'Введите токен Ozon'},
    {key: 'wbToken', name: 'Wildberries', logo: wbLogo, placeholder: 'Введите токен Wildberries'},
    {key: 'yaToken', name: 'Яндекс Маркет', logo: yaLogo, placeholder: 'Введите токен Яндекс Маркета'},
    // {key: 'JivoToken', name: 'JivoSite', logo: JivoLogo, placeholder: 'Введите токен JivoSite'},
    {key: 'yaToken', name: 'Яндекс Маркет', logo: yaLogo, placeholder: 'Введите токен Яндекс Маркета'},
];

const IntegrationsTabs = () => {
    const [activeKey, setActiveKey] = useState(integrations[0].key);
    const [tokens, setTokens] = useState({});
    const [visible, setVisible] = useState({});
    const [dirty, setDirty] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [pendingTab, setPendingTab] = useState(null);
    const wrapperRef = useRef(null);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleVisibility = (key) => {
        setVisible((prev) => ({...prev, [key]: !prev[key]}));
    };

    const handleChange = (key, value) => {
        setTokens((prev) => ({...prev, [key]: value}));
        setDirty(!!value.trim());
    };

    const handleSave = () => {
        setDirty(false);
        alert('Токен сохранён!');
    };

    const handleTabClick = (key) => {
        if (dirty && key !== activeKey) {
            setPendingTab(key);
            setShowModal(true);
        } else {
            setActiveKey(key);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (dirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [dirty]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dirty && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowModal(true);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dirty]);

    const current = integrations.find((i) => i.key === activeKey);

    return (
        <div ref={wrapperRef} className="max-w-2xl space-y-6 py-4 px-6">
            <h1 className="text-2xl font-semibold">Маркетплейсы</h1>

            {/* Мобильные табы в стиле Material */}
            <div
                className="flex gap-3 overflow-x-auto snap-x scroll-smooth whitespace-nowrap justify-between scrollbar-hide pb-1 border-b">
                {integrations.map(({key, logo, name}) => {
                    const isActive = activeKey === key;
                    return (
                        <button
                            key={key}
                            onClick={() => handleTabClick(key)}
                            className={`relative flex flex-col items-center justify-center px-4 py-2 min-w-[100px] snap-start transition-all duration-300 ${
                                isActive
                                    ? 'text-indigo-600 font-semibold translate-y-[-2px]'
                                    : 'text-muted-foreground'
                            }`}
                        >
                            <img src={logo} alt={name}
                                 className="w-6 h-6 mb-1 object-contain transition-opacity duration-300"/>
                            <span className="text-xs truncate sm:hidden md:block">{name}</span>

                            {/* Animated underline */}
                            <span
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-indigo-600 transition-all duration-300 origin-center ${
                                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>


            {/* Ввод токена */}
            <div className="space-y-4">
                <Label htmlFor={current.key}>{current.placeholder}</Label>
                <div className="relative">
                    <input
                        id={current.key}
                        type={visible[current.key] ? 'text' : 'text'}
                        value={tokens[current.key] || ''}
                        onChange={(e) => handleChange(current.key, e.target.value)}
                        className="pr-10 font-mono w-full border rounded-md px-3 py-2 text-sm"
                        style={{WebkitTextSecurity: visible[current.key] ? 'none' : 'disc'}}
                    />
                    <button
                        type="button"
                        onClick={() => toggleVisibility(current.key)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        title={visible[current.key] ? 'Скрыть токен' : 'Показать токен'}
                    >
                        {visible[current.key] ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={() => setShowSaveModal(true)}
                        className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition"
                        disabled={!dirty}
                    >
                        <Check className="w-[16px] h-[16px] shrink-0"/>
                        <span className="leading-none">Сохранить токен</span>
                    </Button>

                    <Button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition"
                    >
                        <Trash className="w-[16px] h-[16px] shrink-0"/>
                        <span className="leading-none">Удалить токен</span>
                    </Button>


                </div>

            </div>

            {/* Модальное окно */}
            <ConfirmModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setPendingTab(null);
                }}
                onConfirm={() => {
                    setDirty(false);
                    setShowModal(false);
                    if (pendingTab) setActiveKey(pendingTab);
                    setPendingTab(null);
                }}
                title="Несохранённые изменения"
                description="Вы ввели токен, но не сохранили. Перейти без сохранения?"
                confirmText="Не сохранять"
                cancelText="Остаться"
            />

            {/* Модалка: Сохранить токен */}
            <SaveTokenModal
                isOpen={showSaveModal}
                onClose={() => setShowSaveModal(false)}
                onConfirm={() => {
                    setDirty(false);
                    setShowSaveModal(false);
                }}
                token={tokens[current.key]}
                service={current.name}
            />

            {/* Модалка: Удалить токен */}
            <DeleteTokenModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    setTokens((prev) => ({...prev, [current.key]: ''}));
                    setDirty(false);
                    setShowDeleteModal(false);
                }}
                service={current.name}
            />
        </div>
    );
};

export default IntegrationsTabs;
