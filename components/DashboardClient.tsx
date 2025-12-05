import React, { useState } from 'react';
import { MapPin, Wifi, Camera, TrendingUp, DollarSign, Eye, AlertTriangle, Cpu, Thermometer, Clock, Settings, Video, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardClient = () => {
  const { devices, alerts, setActiveTab } = useApp();
  const [expandedDevice, setExpandedDevice] = useState<string | null>(null);
  
  const onlineCount = devices.filter(d => d.status === 'online').length;
  const warningCount = devices.filter(d => d.status !== 'online').length;

  const toggleExpand = (id: string) => {
    setExpandedDevice(expandedDevice === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Olá, Fazenda Santa Inês</h2>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Bom Jesus, PI • Plano Rural Premium
          </p>
        </div>
        <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100 flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${warningCount === 0 ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
          <span className="font-medium text-green-800">
            {warningCount === 0 ? 'Sistema Operacional' : `${warningCount} Alertas Ativos`}
          </span>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs uppercase font-bold">Conectividade Mesh</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {Math.round(devices.filter(d => d.type === 'mesh').reduce((acc, curr) => acc + (curr.signal || 0), 0) / devices.filter(d => d.type === 'mesh').length)}%
              </h3>
            </div>
            <Wifi className="text-blue-500 bg-blue-50 p-2 w-10 h-10 rounded-lg" />
          </div>
          <div className="mt-4 text-xs text-gray-400">Média de sinal da rede</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs uppercase font-bold">Câmeras Vision</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{devices.filter(d => d.type === 'camera' && d.status === 'online').length}/{devices.filter(d => d.type === 'camera').length}</h3>
            </div>
            <Camera className="text-purple-500 bg-purple-50 p-2 w-10 h-10 rounded-lg" />
          </div>
          <div className="mt-4 text-xs text-orange-500 font-medium">{devices.filter(d => d.battery !== undefined && d.battery < 20).length} baterias críticas</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition group" onClick={() => setActiveTab('production')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs uppercase font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3 text-green-500" /> Produção</p>
              <h3 className="text-lg font-bold text-gray-800 mt-1 group-hover:text-green-700 transition">Ver Ganhos</h3>
            </div>
            <DollarSign className="text-green-600 bg-green-50 p-2 w-10 h-10 rounded-lg" />
          </div>
          <div className="mt-4 text-xs text-gray-400">Gestão de perdas e ativos</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition" onClick={() => setActiveTab('alerts')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs uppercase font-bold">Monitoramento</p>
              <h3 className="text-lg font-bold text-gray-800 mt-1">{alerts.filter(a => !a.read).length} Alertas</h3>
            </div>
            <Eye className="text-yellow-600 bg-yellow-50 p-2 w-10 h-10 rounded-lg" />
          </div>
          <div className="mt-4 text-xs text-gray-400">Clique para ver detalhes</div>
        </div>
      </div>

      {/* Detailed Device List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Dispositivos em Rede ({devices.length})</h3>
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border">Atualizado: Agora mesmo</span>
        </div>
        <div className="divide-y divide-gray-100">
          {devices.map((device) => (
            <div key={device.id} className="transition hover:bg-gray-50">
              {/* Main Row */}
              <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(device.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${device.type === 'mesh' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'}`}>
                      {device.type === 'mesh' ? <Wifi className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm flex items-center gap-2">
                        {device.name}
                        {device.status === 'warning' && <AlertTriangle className="w-3 h-3 text-yellow-500" />}
                        {device.status === 'offline' && <AlertTriangle className="w-3 h-3 text-red-500" />}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {device.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:gap-6">
                   {/* Battery Indicator */}
                   {device.battery !== undefined && (
                      <div className="flex flex-col items-end">
                          <span className={`text-xs font-bold ${device.battery < 20 ? 'text-red-600' : 'text-gray-600'}`}>
                              {device.battery}%
                          </span>
                          <div className="w-8 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                              <div 
                                  className={`h-full rounded-full ${device.battery < 20 ? 'bg-red-500' : 'bg-green-500'}`} 
                                  style={{ width: `${device.battery}%` }}
                              ></div>
                          </div>
                      </div>
                   )}

                   {/* Signal Indicator for Mesh */}
                   {device.signal !== undefined && device.type === 'mesh' && (
                      <div className="text-right hidden sm:block">
                          <span className="text-xs text-gray-400 block">Sinal</span>
                          <span className={`text-sm font-bold ${device.signal < 50 ? 'text-yellow-600' : 'text-green-600'}`}>
                              {device.signal}%
                          </span>
                      </div>
                   )}

                   <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium w-24 justify-center ${
                     device.status === 'online' ? 'bg-green-100 text-green-700' : 
                     device.status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                   }`}>
                     <div className={`w-2 h-2 rounded-full ${
                        device.status === 'online' ? 'bg-green-500' : 
                        device.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                     }`}></div>
                     {device.status === 'online' ? 'Online' : device.status === 'warning' ? 'Atenção' : 'Offline'}
                   </div>
                   
                   {expandedDevice === device.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedDevice === device.id && (
                  <div className="bg-gray-50 px-4 pb-4 pt-0 border-t border-gray-100 text-sm animate-fade-in">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div className="bg-white p-3 rounded border border-gray-200">
                              <span className="text-xs text-gray-400 flex items-center gap-1 mb-1"><Cpu className="w-3 h-3" /> Modelo</span>
                              <span className="font-medium text-gray-700">{device.model}</span>
                          </div>
                          <div className="bg-white p-3 rounded border border-gray-200">
                              <span className="text-xs text-gray-400 flex items-center gap-1 mb-1"><Thermometer className="w-3 h-3" /> Temp. Interna</span>
                              <span className={`font-medium ${device.temperature > 45 ? 'text-red-600' : 'text-gray-700'}`}>
                                  {device.temperature > 0 ? `${device.temperature}°C` : 'N/A'}
                              </span>
                          </div>
                          <div className="bg-white p-3 rounded border border-gray-200">
                              <span className="text-xs text-gray-400 flex items-center gap-1 mb-1"><Clock className="w-3 h-3" /> Última Atividade</span>
                              <span className="font-medium text-gray-700">{device.lastActive}</span>
                          </div>
                          <div className="bg-white p-3 rounded border border-gray-200">
                              <span className="text-xs text-gray-400 flex items-center gap-1 mb-1"><Settings className="w-3 h-3" /> Firmware</span>
                              <span className="font-medium text-gray-700">{device.firmware}</span>
                          </div>
                      </div>
                      
                      {device.type === 'camera' && device.status !== 'offline' && (
                          <div className="mt-4 flex justify-end">
                              <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
                                  <Video className="w-4 h-4" /> Ver Em Direto
                              </button>
                          </div>
                      )}
                       {device.type === 'camera' && device.status === 'offline' && (
                          <div className="mt-4 flex justify-end">
                              <button className="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                                  <Video className="w-4 h-4" /> Sinal Indisponível
                              </button>
                          </div>
                      )}
                  </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};