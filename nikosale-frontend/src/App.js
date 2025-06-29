import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarLayout from './pages/Layout';
import ChatPage from './pages/ChatPage';
import Products from './pages/Products';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <SidebarLayout>
        <Routes>
          <Route path="/chats" element={<ChatPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          {/* Добавь остальные при необходимости */}
        </Routes>
      </SidebarLayout>
    </BrowserRouter>
  );
}

export default App;