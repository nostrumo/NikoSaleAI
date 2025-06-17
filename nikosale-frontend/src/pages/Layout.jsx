import { useState } from 'react';
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

export default function SidebarLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: <MessageSquare size={20} />, label: 'Чаты' },
    { icon: <Box size={20} />, label: 'Товары' },
    { icon: <BarChart2 size={20} />, label: 'Аналитика' },
    'divider',
    { icon: <FileText size={20} />, label: 'Инструкции' },
    { icon: <HelpCircle size={20} />, label: 'Поддержка' },
    'divider',
    { icon: <Settings size={20} />, label: 'Настройка' },
    'divider',
    { icon: collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />, label: 'Скрыть', toggle: true }
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen relative overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex transition-all duration-300 shadow-md border-r border-gray-200  ${collapsed ? 'w-16' : 'w-64'} p-4 flex-col gap-4`}>
        <div className="text-lg font-bold mb-4">{!collapsed && 'Логотип'}</div>
        <nav className="flex flex-col gap-2 flex-grow">
          {menuItems.map((item, idx) => {
            if (item === 'divider') return <hr key={idx} className="border-gray-100 my-2" />;
            return (
              <button
                key={item.label}
                onClick={item.toggle ? () => setCollapsed(!collapsed) : undefined}
                className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100"
              >
                <span>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between shadow bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-center">Заголовок</span>
        </div>
        <div className="flex items-center gap-4">
          <Bell size={20} />
          <MessageSquare size={20} />
        </div>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4">
          <span className="text-lg font-bold">Меню</span>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item, idx) => {
            if (item === 'divider') return <hr key={idx} className="border-gray-700 my-2" />;
            return (
              <button
                key={item.label}
                onClick={() => item.toggle ? setMobileMenuOpen(false) : null}
                className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <main className="transition-all duration-300 flex-1 overflow-y-auto p-6">
        <div className="hidden md:block text-3xl font-bold text-gray-800 mb-6 px-6"><h1>Заголовок страницы</h1></div>
        {children}
      </main>
    </div>
  );
}
