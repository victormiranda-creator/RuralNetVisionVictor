import React from 'react';
import { TrendingUp, ArrowUp, DollarSign, Beef, Sprout, AlertOctagon, Video } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductionPage = () => {
  const { productionEvents } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
       {/* Header Section */}
       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             <TrendingUp className="text-green-600" /> Inteligência de Produção
          </h2>
          <p className="text-gray-500 text-sm">Monitoramento de ativos biológicos e prevenção de perdas via Vision AI.</p>
       </div>

       {/* Metrics Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
             <div>
               <p className="text-xs font-bold text-gray-400 uppercase">Perdas Evitadas (Mês)</p>
               <h3 className="text-2xl font-bold text-green-700 mt-1">R$ 14.500</h3>
               <span className="text-xs text-green-600 flex items-center gap-1"><ArrowUp className="w-3 h-3"/> +12% vs mês anterior</span>
             </div>
             <div className="bg-green-50 p-3 rounded-full text-green-600">
               <DollarSign className="w-6 h-6" />
             </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
             <div>
               <p className="text-xs font-bold text-gray-400 uppercase">Rebanho Monitorado</p>
               <h3 className="text-2xl font-bold text-gray-800 mt-1">1.240 Cab.</h3>
               <span className="text-xs text-gray-500">Atualizado via VisionSat</span>
             </div>
             <div className="bg-blue-50 p-3 rounded-full text-blue-600">
               <Beef className="w-6 h-6" />
             </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
             <div>
               <p className="text-xs font-bold text-gray-400 uppercase">Saúde da Lavoura</p>
               <h3 className="text-2xl font-bold text-gray-800 mt-1">98%</h3>
               <span className="text-xs text-gray-500">Área sem invasões/pragas detectadas</span>
             </div>
             <div className="bg-yellow-50 p-3 rounded-full text-yellow-600">
               <Sprout className="w-6 h-6" />
             </div>
          </div>
       </div>

       {/* Events List */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Registro de Eventos Vision</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {productionEvents.map((event) => (
               <div key={event.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 transition">
                  <div className="flex items-start gap-4">
                     <div className={`p-2 rounded-lg mt-1 ${
                        event.type === 'loss_prevention' ? 'bg-red-50 text-red-600' : 
                        event.type === 'production' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'
                     }`}>
                        {event.type === 'loss_prevention' ? <AlertOctagon className="w-5 h-5" /> : 
                         event.type === 'production' ? <Beef className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                     </div>
                     <div>
                        <h4 className="font-bold text-gray-800 text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                           <Video className="w-3 h-3" /> {event.location} • {event.time}
                        </p>
                     </div>
                  </div>
                  
                  <div className="mt-2 md:mt-0 flex items-center gap-4 text-sm">
                     <span className={`px-2 py-1 rounded text-xs font-medium ${
                        event.type === 'loss_prevention' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                     }`}>
                        {event.impact}
                     </span>
                     {event.value !== '-' && (
                        <span className="font-bold text-gray-700">{event.value}</span>
                     )}
                     <button className="text-green-700 hover:underline text-xs">Ver Clip</button>
                  </div>
               </div>
            ))}
          </div>
       </div>
    </div>
  );
};