import React, {useState} from 'react';
import {Bot, Users, Settings, Link2} from 'lucide-react';
import StoreRegistrationForm from './StoreRegistrationForm';
import PromtSetup from './PromtSetup';
import Integrations from './Integrations';
import StepForm from './step_form/StepManager';
import Manager from './Manager';
import IntegrationsPage from "../components/IntegrationsPage";

const sections = [
    {label: 'Магазин', icon: Bot},
    {label: 'Менеджеры', icon: Users},
    {label: 'Настройка ИИ', icon: Settings},
    {label: 'Интеграции', icon: Link2},
];

const Sidebar = ({active, setActive}) => (
    <aside className="hidden md:flex w-64 flex-col gap-2 bg-background border-r px-4 py-6">
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

const BottomTabs = ({active, setActive}) => (
    <div
        className="fixed bottom-0 left-0 w-full bg-background border-t z-40 flex justify-around items-center h-16 md:hidden">
        {sections.map(({label, icon: Icon}) => {
            const isActive = active === label;
            return (
                <button
                    key={label}
                    onClick={() => setActive(label)}
                    className="flex flex-col items-center text-xs focus:outline-none transition"
                >
                    <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-muted-foreground'}`}/>
                    <span className={`mt-1 ${isActive ? 'text-blue-600 font-medium' : 'text-muted-foreground'}`}>
            {label}
          </span>
                </button>
            );
        })}
    </div>)


const SectionContent = ({active, setActive}) => {
    switch (active) {
        case 'Магазин':
            return <StoreRegistrationForm/>;
        case 'Менеджеры':
            return <Manager/>;
        case 'Настройка ИИ':
            return <PromtSetup/>;
        case 'Интеграции':
            return <IntegrationsPage/>;
        default:
            return null;
    }
};

const SettingsLayout = () => {
    const [active, setActive] = useState(sections[0].label);

    return (
        <div className="flex w-full bg-background text-foreground  mb-16 sm:mb-0">
            {/* Desktop Sidebar */}
            <Sidebar active={active} setActive={setActive}/>

            <div className="flex flex-col flex-1">

                {/* Mobile Tabs */}
                <BottomTabs active={active} setActive={setActive}/>

                {/* Main Content */}
                <main className="flex-1">
                    <SectionContent active={active} setActive={setActive}/>
                </main>
            </div>
        </div>
    );
};


export default SettingsLayout;