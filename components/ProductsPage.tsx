import React from 'react';
import { Wifi, Camera, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductsPage = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="text-center py-8 bg-green-900 rounded-xl text-white mb-6 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center bg-blend-overlay">
            <h2 className="text-3xl font-bold mb-2">Soluções Rurais</h2>
            <p className="text-green-100">Tecnologia que chega onde o asfalto termina.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                    <Wifi className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">RuralNet Mesh</h3>
                <p className="text-gray-500 text-sm mb-4">
                    Conectividade total em toda a propriedade. Levamos internet do escritório ao curral e maquinário com nossa tecnologia de repetição de sinal.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Cobertura de grandes áreas</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Baixa latência</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Resistente a intempéries</li>
                </ul>
                <button onClick={() => setActiveTab('support')} className="w-full py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 text-sm font-medium">Solicitar Orçamento</button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                    <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Vision Sat</h3>
                <p className="text-gray-500 text-sm mb-4">
                    Monitoramento inteligente 24/7. Proteja seu património e acompanhe a operação remotamente através da nossa aplicação.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Visão Noturna e Térmica</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Energia Solar Integrada</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Alertas de Movimento</li>
                </ul>
                <button onClick={() => setActiveTab('support')} className="w-full py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 text-sm font-medium">Solicitar Orçamento</button>
            </div>
        </div>
    </div>
  );
};