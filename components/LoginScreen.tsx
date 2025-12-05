import React, { useState } from 'react';
import { Signal, Tractor, User, ChevronDown, Shield, Settings, Lock, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginScreen = () => {
  const { login } = useApp();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const verifyAdminPassword = () => {
    // Simulation
    if (adminPassword === 'admin123') {
      login('admin');
    } else {
      setLoginError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')" }}
      ></div>
      
      <div className="z-10 text-center mb-8 animate-fade-in">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full inline-block mb-4 border border-white/20">
          <Signal className="text-green-400 w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">RuralNet <span className="font-light text-green-400">Vision</span></h1>
        <p className="text-green-100 mt-2 text-lg">Soluções em Conectividade e Monitoramento Rural</p>
        <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Bom Jesus, Piauí</p>
      </div>

      <div className="z-10 grid md:grid-cols-2 gap-6 w-full max-w-2xl animate-slide-up">
        {/* Card Produtor */}
        <button 
          onClick={() => login('client')}
          className="bg-white hover:bg-green-50 p-8 rounded-2xl shadow-xl transition-all hover:scale-105 group border-2 border-transparent hover:border-green-500 text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
            <Tractor className="w-24 h-24 text-green-800" />
          </div>
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition">
            <User className="w-6 h-6 text-green-700 group-hover:text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Sou Produtor</h3>
          <p className="text-gray-500 text-sm">Acesse o painel da sua fazenda, monitore as câmeras Vision e a rede Mesh.</p>
          <div className="mt-6 flex items-center text-green-700 font-bold text-sm">
            Entrar no Sistema <ChevronDown className="ml-1 rotate-[-90deg]" />
          </div>
        </button>

        {/* Card Técnico */}
        <button 
          onClick={() => setShowAdminLogin(true)}
          className="bg-gray-800 hover:bg-gray-700 p-8 rounded-2xl shadow-xl transition-all hover:scale-105 group border-2 border-transparent hover:border-gray-500 text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
            <Shield className="w-24 h-24 text-white" />
          </div>
          <div className="bg-gray-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-600 transition">
            <Settings className="w-6 h-6 text-gray-300 group-hover:text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Acesso Técnico</h3>
          <p className="text-gray-400 text-sm">Área restrita para gestão de chamados, manutenção e equipe técnica.</p>
          <div className="mt-6 flex items-center text-gray-300 font-bold text-sm">
            Painel Admin <Lock className="w-4 h-4 ml-2" />
          </div>
        </button>
      </div>

      {/* Modal de Senha Admin */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 relative">
              <button 
                onClick={() => { setShowAdminLogin(false); setAdminPassword(''); setLoginError(''); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-700" />
                  Acesso Restrito
              </h3>
              <p className="text-gray-500 text-sm mb-4">Por favor, insira a senha de administrador para continuar.</p>
              
              <div className="space-y-4">
                <div>
                  <input 
                      type="password" 
                      value={adminPassword}
                      onChange={(e) => { setAdminPassword(e.target.value); setLoginError(''); }}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                      placeholder="Senha de Acesso"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && verifyAdminPassword()}
                  />
                  {loginError && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="w-3 h-3" /> {loginError}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-3">
                    <button 
                        onClick={() => { setShowAdminLogin(false); setAdminPassword(''); setLoginError(''); }}
                        className="flex-1 py-2.5 text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg font-medium text-sm transition"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={verifyAdminPassword}
                        className="flex-1 py-2.5 bg-green-700 text-white rounded-lg font-medium text-sm hover:bg-green-800 transition shadow-sm"
                    >
                        Entrar
                    </button>
                </div>
              </div>
          </div>
        </div>
      )}

      <div className="z-10 mt-12 text-gray-500 text-xs">
        &copy; 2025 RuralNet Vision & Mesh Sat - UFPI Campus Cinobelina Elvas
      </div>
    </div>
  );
};