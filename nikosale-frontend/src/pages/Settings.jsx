import React, {useState} from 'react';
import {Bot, Users, Settings, Link2} from 'lucide-react';
import StoreRegistrationForm from './StoreRegistrationForm';
import Manager from './Manager';
import Layout from './Layout';

const sections = [
    {label: 'Настройка магазина', icon: Bot},
    {label: 'Менеджеры', icon: Users},
    {label: 'Настройка ИИ', icon: Settings},
    {label: 'Интеграции', icon: Link2},
];

const Sidebar = ({active, setActive}) => (
    <aside className="hidden lg:flex w-64 flex-col gap-2 bg-background border-r px-4 py-6">
        <div className="text-lg font-semibold px-2">Магазин</div>
        {sections.map(({label, icon: Icon}) => (
            <button
                key={label}
                onClick={() => setActive(label)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition text-sm ${
                    active === label ? 'bg-blue-600 text-white' : 'hover:bg-muted text-muted-foreground'
                }`}
            >
                <Icon className="w-4 h-4"/> <span className="truncate">{label}</span>
            </button>
        ))}
    </aside>
);

const MobileTabs = ({active, setActive}) => (
    <div
        className="lg:hidden w-full bg-background border-b flex overflow-x-auto gap-1 px-2 py-2 sm:gap-2 sm:px-4 sm:py-3 scrollbar-hide">
        {sections.map(({label, icon: Icon}) => (
            <button
                key={label}
                onClick={() => setActive(label)}
                className={`flex items-center gap-1 sm:gap-2 px-3 py-2 text-xs sm:text-sm rounded-lg whitespace-nowrap transition ${
                    active === label ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'
                }`}
            >
                <Icon className="w-4 h-4 shrink-0"/> <span className="truncate">{label}</span>
            </button>
        ))}
    </div>
);

const Header = () => (
    <header
        className="hidden lg:flex fixed top-0 left-64 right-0 h-14 bg-background border-b items-center justify-between px-6 z-20 shadow-sm">
        <h1 className="text-lg font-semibold">Панель управления</h1>
        <span className="text-sm text-muted-foreground">Добро пожаловать</span>
    </header>
);

const SectionContent = ({active, setActive}) => {
    switch (active) {
        case 'Настройка магазина':
            return <StoreRegistrationForm/>;
        case 'Менеджеры':
            return <Manager/>;
        case 'Настройка ИИ':
            return <div className="text-sm text-muted-foreground">Конфигурация поведения ИИ</div>;
        case 'Интеграции':
            return <div className="text-sm text-muted-foreground">Настройки интеграции с маркетплейсами</div>;
        default:
            return null;
    }
};

const SettingsLayout = () => {
    const [active, setActive] = useState(sections[0].label);

    return (
        <Layout>
            <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
                <Sidebar active={active} setActive={setActive}/>
                <div className="flex flex-col flex-1">
                    <Header/>
                    <div className="lg:hidden sticky top-0 z-30 bg-background">
                        <MobileTabs active={active} setActive={setActive}/>
                    </div>
                    <main className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6 lg:pt-20 lg:px-8">
                        <SectionContent active={active} setActive={setActive}/>
                    </main>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsLayout;