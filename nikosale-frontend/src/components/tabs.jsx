import React, { useState } from 'react';

export function Tabs({ defaultValue, children }) {
    const [activeTab, setActiveTab] = useState(defaultValue);
    const contextValue = { activeTab, setActiveTab };
    return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
}

const TabsContext = React.createContext();

export function TabsList({ children }) {
    return <div className="flex gap-2 border-b mb-4">{children}</div>;
}

export function TabsTrigger({ value, children }) {
    const { activeTab, setActiveTab } = React.useContext(TabsContext);
    const isActive = activeTab === value;

    return (
        <button
            onClick={() => setActiveTab(value)}
            className={`py-2 px-4 text-sm font-medium transition ${
                isActive
                    ? 'text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-500 border-b-2 border-transparent hover:text-gray-800'
            }`}
        >
            {children}
        </button>
    );
}

export function TabsContent({ value, children }) {
    const { activeTab } = React.useContext(TabsContext);
    if (activeTab !== value) return null;
    return <div className="mt-4">{children}</div>;
}
