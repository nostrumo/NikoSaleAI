import {useRef, useEffect, useState} from 'react';
import {
    Menu,
    MessageSquare,
    Box,
    BarChart2,
    FileText,
    HelpCircle,
    Settings,
    ChevronLeft,
    ChevronRight,
    Bell,
    X,
} from 'lucide-react';
import {NavLink, useLocation} from 'react-router-dom';
import DropdownLayout from '../components/DropdownLayout';
import NotificationsList from '../components/NotificationsList.jsx';

const pageTitles = {
    '/chats': 'Чаты',
    '/products': 'Товары',
    '/analytics': 'Аналитика',
    '/instructions': 'Инструкции',
    '/support': 'Поддержка',
    '/settings': 'Настройки',
};


export default function SidebarLayout({children}) {
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // открыть меню (и моб, и десктоп)
    const openSidebar = () => setIsSidebarOpen(true);
    // закрыть
    const closeSidebar = () => setIsSidebarOpen(false);
    // toggle
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => {
            const newState = !prev;
            console.log(`Сайдбар теперь ${newState ? 'открыт' : 'закрыт'}`);
            return newState;
        });
    };
    const location = useLocation();
    const [unreadChats, setUnreadChats] = useState(true);
    const [unreadNotifications, setUnreadNotifications] = useState(true);
    const title = pageTitles[location.pathname] || 'Заголовок';
    const menuItems = [
        {icon: <MessageSquare size={20}/>, label: 'Чаты', path: '/chats'},
        {icon: <Box size={20}/>, label: 'Товары', path: '/products'},
        {icon: <BarChart2 size={20}/>, label: 'Аналитика', path: '/analytics'},
        'divider',
        {icon: <FileText size={20}/>, label: 'Инструкции', path: '/instructions'},
        {icon: <HelpCircle size={20}/>, label: 'Поддержка', path: '/support'},
        'divider',
        {icon: <Settings size={20}/>, label: 'Настройка', path: '/settings'},
        'divider',
        {icon: isSidebarOpen ? <ChevronRight size={20}/> : <ChevronLeft size={20}/>, label: 'Скрыть', toggle: true}
    ];
    useEffect(() => {
        const handleClickOutside = (event) => {
            const sidebar = sidebarRef.current;

            console.log('--- Проверка клика вне сайдбара ---');
            console.log('Сайдбар открыт:', isSidebarOpen);
            console.log('Сайдбар существует:', !!sidebar);
            console.log('Элемент клика:', event.target);

            if (isSidebarOpen) {
                if (sidebar) {
                    if (!sidebar.contains(event.target)) {
                        setIsSidebarOpen(false);
                    } else {
                    }
                } else {
                }
            } else {
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen]);


    return (
        <div className="flex flex-col md:flex-row h-screen relative overflow-hidden bg-gray-50 text-gray-900">
            {/* Desktop Sidebar */}
            <aside
                ref={sidebarRef}
                className={`hidden md:flex transition-all duration-300 shadow-md border-r border-gray-200  ${!isSidebarOpen ? 'w-16' : 'w-64'} p-4 flex-col gap-4`}>
                <div
                    className="text-xl font-extrabold mb-4 tracking-tight text-gray-800">{isSidebarOpen && 'Логотип'}</div>
                <nav className="flex flex-col gap-2 flex-grow">
                    {menuItems.map((item, idx) => {
                        if (item === 'divider') return <hr key={idx} className="border-gray-300 my-2"/>;

                        if (item.toggle) {
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => setIsSidebarOpen(prev => !prev)}
                                    className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 text-left"
                                >
                                    <span>{item.icon}</span>
                                    {isSidebarOpen && <span>{item.label}</span>}
                                </button>
                            );
                        }

                        return (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({isActive}) =>
                                    `flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 text-left ${
                                        isActive ? 'bg-gray-100 font-semibold text-primary' : ''
                                    }`
                                }
                            >
                                <span>{item.icon}</span>
                                {isSidebarOpen && <span>{item.label}</span>}
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Header */}
            <header
                className="md:hidden flex items-center justify-between shadow bg-white border-b border-gray-200 px-4 py-4">
                <div className="flex items-center gap-2">
                    <button onClick={toggleSidebar}>
                        <Menu size={24}/>
                    </button>
                    <span
                        className="absolute left-1/2 transform -translate-x-1/2 text-2xl  font-semibold tracking-tight text-center">{title}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <MessageSquare size={20} className="text-gray-600"/>
                        {unreadChats && (
                            <span
                                className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 animate-pulse ring-2 ring-white"/>
                        )}
                    </div>
                    <div className="relative">
                        <DropdownLayout
                            trigger={<Bell size={20} className="text-gray-600"/>}
                        >
<NotificationsList />
                        </DropdownLayout>

                        {unreadNotifications && (
                            <span
                                className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 animate-pulse ring-2 ring-white"/>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Menu Fullscreen Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <span className="text-lg font-bold">Меню</span>
                    <button onClick={() => setIsSidebarOpen(false)}>
                        <X size={24}/>
                    </button>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                    {menuItems.map((item, idx) => {
                        if (item === 'divider') return <hr key={idx} className="border-gray-300 my-2"/>;

                        if (item.toggle) {
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 text-left"
                                >
                                    <span>{item.icon}</span>
                                    {isSidebarOpen && <span>{item.label}</span>}
                                </button>
                            );
                        }

                        return (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)} // <--- вот это добавляем
                                className={({isActive}) =>
                                    `flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 text-left ${
                                        isActive ? 'bg-gray-100 font-semibold text-primary' : ''
                                    }`
                                }
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}

                </nav>
            </div>

            <main className="transition-all duration-300 flex-1 overflow-y-auto md:px-6">
                <div
                    className="hidden md:block text-4xl text-gray-800 my-6 px-6  font-semibold tracking-tight leading-snug ">
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl  font-semibold tracking-tight">{title}</h1>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <MessageSquare size={20} className="text-gray-600"/>
                                {unreadChats && (
                                    <span
                                        className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 animate-pulse ring-2 ring-white"/>
                                )}
                            </div>
                            <div className="relative">
                                <DropdownLayout
                                    trigger={<Bell size={20} className="text-gray-600"/>}
                                >
<NotificationsList />
                                </DropdownLayout>
                                {unreadNotifications && (
                                    <span
                                        className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 animate-pulse ring-2 ring-white"/>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                {children}
            </main>
        </div>
    );
}
