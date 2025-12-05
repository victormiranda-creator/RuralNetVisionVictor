import React, { useState } from 'react';
import { Eye, CheckCircle, AlertTriangle, Bell, Clock, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AlertsPage = () => {
  const { alerts } = useApp();
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

  const filteredAlerts = alerts.filter(a => filter === 'all' || a.type === filter);

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
           <div>
               <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                   <Eye className="text-yellow-600" /> Central de Monitoramento
               </h2>
               <p className="text-gray-500 text-sm">Acompanhe eventos e alertas em tempo real da sua propriedade.</p>
           </div>
           <div className="flex gap-2 text-sm bg-gray-50 p-1 rounded-lg border border-gray-200">
               {['all', 'critical', 'warning', 'info'].map((f) => (
                   <button
                      key={f}
                      onClick={() => setFilter(f as any)}
                      className={`px-3 py-1.5 rounded-md capitalize transition ${
                          filter === f ? 'bg-white text-gray-800 shadow-sm font-medium' : 'text-gray-500 hover:text-gray-700'
                      }`}
                   >
                       {f === 'all' ? 'Todos' : f === 'critical' ? 'Críticos' : f === 'warning' ? 'Avisos' : 'Info'}
                   </button>
               ))}
           </div>
       </div>

       <div className="grid gap-4">
           {filteredAlerts.length === 0 ? (
               <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                   <CheckCircle className="w-12 h-12 text-green-200 mx-auto mb-3" />
                   <p className="text-gray-400 font-medium">Nenhum alerta encontrado para este filtro.</p>
               </div>
           ) : (
               filteredAlerts.map(alert => (
                   <div key={alert.id} className={`bg-white p-5 rounded-xl border-l-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:shadow-md ${
                       alert.type === 'critical' ? 'border-l-red-500' : 
                       alert.type === 'warning' ? 'border-l-yellow-500' : 'border-l-blue-500'
                   }`}>
                       <div className="flex items-start gap-4">
                           <div className={`p-3 rounded-full ${
                               alert.type === 'critical' ? 'bg-red-50 text-red-500' : 
                               alert.type === 'warning' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-500'
                           }`}>
                               {alert.type === 'critical' ? <AlertTriangle className="w-6 h-6" /> : 
                                alert.type === 'warning' ? <AlertTriangle className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                           </div>
                           <div>
                               <h3 className="font-bold text-gray-800 text-lg">{alert.message}</h3>
                               <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                   <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {alert.time} • {alert.date}</span>
                                   {alert.deviceId && <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-500">ID: {alert.deviceId}</span>}
                               </div>
                           </div>
                       </div>
                       <div className="flex gap-2 self-end md:self-auto">
                           {alert.deviceId?.startsWith('cam') && (
                               <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2">
                                   <Eye className="w-4 h-4" /> Ver Câmera
                               </button>
                           )}
                           <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2" title="Tentar resolver automaticamente">
                               <RefreshCw className="w-4 h-4" /> Reiniciar
                           </button>
                       </div>
                   </div>
               ))
           )}
       </div>
    </div>
  );
};