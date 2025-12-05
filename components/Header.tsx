import React, { useState } from 'react';
import { Signal, Menu, X, LogOut, TrendingUp, Bell, Sparkles, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = () => {
  const { user, activeTab, setActiveTab, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const role = user?.role;

  return (
    <div className="bg-green-800 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActiveTab(role === 'admin' ? 'admin' : 'dashboard')}
        >
          <div className="bg-white p-1 rounded-full">
            <Signal className="text-green-800 w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-wide">
            RuralNet <span className="font-light text-green-200">Vision</span>
          </span>
        </div>
        
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          {role === 'client' && (
            <>
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`hover:text-green-200 transition ${activeTab === 'dashboard' ? 'text-green-200 border-b-2 border-green-200' : ''}`}
              >
                Painel
              </button>
              <button 
                onClick={() => setActiveTab('production')} 
                className={`hover:text-green-200 transition flex items-center gap-1 ${activeTab === 'production' ? 'text-green-200 border-b-2 border-green-200' : ''}`}
              >
                <TrendingUp className="w-3 h-3" /> Produção
              </button>
              <button 
                onClick={() => setActiveTab('alerts')} 
                className={`hover:text-green-200 transition flex items-center gap-1 ${activeTab === 'alerts' ? 'text-green-200 border-b-2 border-green-200' : ''}`}
              >
                <Bell className="w-3 h-3" /> Alertas
              </button>
              <button 
                onClick={() => setActiveTab('reports')} 
                className={`hover:text-green-200 transition flex items-center gap-1 ${activeTab === 'reports' ? 'text-green-200 border-b-2 border-green-200' : ''}`}
              >
                <Sparkles className="w-3 h-3" /> Relatórios IA
              </button>
              <button 
                onClick={() => setActiveTab('support')} 
                className={`hover:text-green-200 transition ${activeTab === 'support' ? 'text-green-200 border-b-2 border-green-200' : ''}`}
              >
                Suporte
              </button>
              <button 
                onClick={() => setActiveTab('products')} 
                className={`hover:text-green-200 transition ${activeTab === 'products' ? 'text-green-200 border-b-2 border-green-200' : ''}`}
              >
                Soluções
              </button>
            </>
          )}
          
          {role === 'admin' && (
             <span className="bg-green-900 px-3 py-1 rounded ring-1 ring-white/20 text-green-100 flex items-center gap-2">
               <Shield className="w-3 h-3" /> Modo Administrador
             </span>
          )}

          <button 
            onClick={logout}
            className="flex items-center gap-1 hover:text-red-200 transition ml-4 opacity-80 hover:opacity-100"
            title="Sair"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 pb-2 border-t border-green-700 pt-4">
          {role === 'client' && (
            <>
              <button onClick={() => { setActiveTab('dashboard'); setIsMenuOpen(false); }} className="text-left py-2 px-2 hover:bg-green-700 rounded">Painel do Produtor</button>
              <button onClick={() => { setActiveTab('production'); setIsMenuOpen(false); }} className="text-left py-2 px-2 hover:bg-green-700 rounded flex items-center gap-2"><TrendingUp className="w-3 h-3" /> Produção & Perdas</button>
              <button onClick={() => { setActiveTab('alerts'); setIsMenuOpen(false); }} className="text-left py-2 px-2 hover:bg-green-700 rounded flex items-center gap-2"><Bell className="w-3 h-3" /> Alertas</button>
              <button onClick={() => { setActiveTab('reports'); setIsMenuOpen(false); }} className="text-left py-2 px-2 hover:bg-green-700 rounded flex items-center gap-2"><Sparkles className="w-3 h-3" /> Relatórios Inteligentes</button>
              <button onClick={() => { setActiveTab('support'); setIsMenuOpen(false); }} className="text-left py-2 px-2 hover:bg-green-700 rounded">Meus Chamados</button>
              <button onClick={() => { setActiveTab('products'); setIsMenuOpen(false); }} className="text-left py-2 px-2 hover:bg-green-700 rounded">Nossas Soluções</button>
            </>
          )}
           <button onClick={logout} className="text-left py-2 px-2 bg-red-900/50 hover:bg-red-900 rounded text-red-100 flex items-center gap-2"><LogOut className="w-4 h-4" /> Sair</button>
        </div>
      )}
    </div>
  );
};