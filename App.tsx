import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { DashboardClient } from './components/DashboardClient';
import { ProductionPage } from './components/ProductionPage';
import { AlertsPage } from './components/AlertsPage';
import { AIReports } from './components/AIReports';
import { SupportForm } from './components/SupportForm';
import { ProductsPage } from './components/ProductsPage';
import { AdminPanel } from './components/AdminPanel';
import { ChatAssistant } from './components/ChatAssistant';

const MainContent = () => {
  const { user, activeTab } = useApp();

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 md:pb-0">
      <Header />
      
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        {activeTab === 'admin' && user.role === 'admin' && <AdminPanel />}
        {activeTab === 'dashboard' && <DashboardClient />}
        {activeTab === 'production' && <ProductionPage />}
        {activeTab === 'alerts' && <AlertsPage />}
        {activeTab === 'reports' && <AIReports />}
        {activeTab === 'support' && <SupportForm />}
        {activeTab === 'products' && <ProductsPage />}
      </main>

      <ChatAssistant />

      {/* Footer Mobile visual */}
      <div className="mt-12 text-center text-gray-400 text-xs py-6 border-t">
        <p>&copy; 2025 RuralNet Vision & Mesh Sat. Bom Jesus, PI.</p>
        <p>Desenvolvido para UFPI - Campus Cinobelina Elvas</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}