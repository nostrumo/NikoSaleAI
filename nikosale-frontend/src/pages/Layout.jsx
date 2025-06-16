import React, { useState } from 'react';
import {
  BarChart2,
  Users,
  Activity,
  Package,
  LifeBuoy,
  BookOpen,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Plus,
  Bell,
  MessageSquare,
  X,
} from 'lucide-react';

const menuItems = [
  { label: 'Статистика', icon: BarChart2 },
  { label: 'Менеджеры', icon: Users },
  { label: 'Аналитика', icon: Activity },
  { label: 'Товары', icon: Package },
  { divider: true },
  { label: 'Поддержка', icon: LifeBuoy },
  { label: 'Инструкции', icon: BookOpen },
];

const BalanceCard = () => (
  <div className="bg-muted rounded-xl p-4 flex flex-col gap-2 text-sm">
    <div className="flex items-center justify-between">
      <span className="font-medium">Баланс</span>
      <Wallet className="w-4 h-4 text-muted-foreground" />
    </div>
    <div className="text-lg font-semibold">1 250 ₽</div>
    <button
      className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-md text-xs flex items-center justify-center gap-2"
    >
      <Plus className="w-4 h-4" /> Пополнить
    </button>
  </div>
);

const CollapsibleSidebar = ({ collapsed, setCollapsed }) => (
  <aside
    className={`flex flex-col justify-between bg-background border-r transition-all duration-300 px-2 py-4 h-screen
      ${collapsed ? 'w-16 relative z-40' : 'fixed inset-0 w-screen h-screen z-40'}
    `}
  >
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Логотип" className="h-6" />
          {!collapsed && <span className="text-lg font-semibold ml-2">NikoSale</span>}
        </div>
        {/* Кнопка закрытия для развёрнутого состояния на мобильных */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="text-muted-foreground hover:text-foreground p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div>
        {menuItems.map((item, idx) =>
          item.divider ? (
            <hr key={idx} className="my-2 border-border" />
          ) : (
            <button
              key={item.label}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm hover:bg-muted text-muted-foreground hover:text-foreground transition"
            >
              <item.icon className="w-4 h-4" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        )}
      </div>
    </div>
    {!collapsed && (
      <div className="px-2 mt-4">
        <BalanceCard />
      </div>
    )}
  </aside>
);

const Header = ({ collapsed, setCollapsed }) => (
  <header
    className={`fixed top-0 left-0 right-0 h-14 z-30 bg-background border-b flex items-center justify-between px-4 transition-all duration-300`}
  >
    <div className="text-lg font-semibold flex items-center">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-muted-foreground hover:text-foreground bg-background border rounded-full p-1 shadow mr-2"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
      Панель управления
    </div>
    <div className="flex items-center gap-4 text-muted-foreground">
      <button className="hover:text-foreground">
        <MessageSquare className="w-5 h-5" />
      </button>
      <button className="hover:text-foreground">
        <Bell className="w-5 h-5" />
      </button>
    </div>
  </header>
);

const Layout = ({ title = 'Панель управления', children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <CollapsibleSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col flex-1">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} title={title} />
        <main className="pt-14 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
