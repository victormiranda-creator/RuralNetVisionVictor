import React from 'react';
import { MapPin, Tractor, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminPanel = () => {
  const { tickets, updateTicketStatus } = useApp();

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
          <div>
              <h2 className="text-2xl font-bold text-gray-800">Painel Técnico</h2>
              <p className="text-sm text-gray-500">Gestão de chamados e manutenções - Bom Jesus, PI</p>
          </div>
          <div className="flex gap-2">
              <div className="bg-white px-4 py-2 rounded shadow-sm border text-sm">
                  <span className="block text-xs text-gray-400">Total Chamados</span>
                  <span className="font-bold text-lg">{tickets.length}</span>
              </div>
              <div className="bg-white px-4 py-2 rounded shadow-sm border text-sm">
                  <span className="block text-xs text-gray-400">Pendentes</span>
                  <span className="font-bold text-lg text-yellow-600">{tickets.filter(t => t.status !== 'concluido').length}</span>
              </div>
          </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
          <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                  <tr>
                      <th className="p-4">Cliente / Local</th>
                      <th className="p-4">Tipo</th>
                      <th className="p-4">Descrição</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Ação</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  {tickets.map(ticket => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                          <td className="p-4">
                              <div className="font-medium text-gray-800">{ticket.userName}</div>
                              <div className="text-xs text-gray-400 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {ticket.location}
                              </div>
                          </td>
                          <td className="p-4 capitalize">
                              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                                  {ticket.type}
                              </span>
                          </td>
                          <td className="p-4 text-gray-600 max-w-xs truncate" title={ticket.description}>
                              {ticket.description}
                          </td>
                          <td className="p-4">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  ticket.status === 'concluido' ? 'bg-green-100 text-green-700' :
                                  ticket.status === 'em_progresso' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                  {ticket.status.replace('_', ' ').toUpperCase()}
                              </span>
                          </td>
                          <td className="p-4">
                              <div className="flex gap-2">
                                  {ticket.status !== 'em_progresso' && ticket.status !== 'concluido' && (
                                      <button 
                                          onClick={() => updateTicketStatus(ticket.id, 'em_progresso')}
                                          className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Iniciar Atendimento">
                                          <Tractor className="w-4 h-4" />
                                      </button>
                                  )}
                                  {ticket.status !== 'concluido' && (
                                      <button 
                                          onClick={() => updateTicketStatus(ticket.id, 'concluido')}
                                          className="p-2 text-green-600 hover:bg-green-50 rounded" title="Concluir">
                                          <CheckCircle className="w-4 h-4" />
                                      </button>
                                  )}
                              </div>
                          </td>
                      </tr>
                  ))}
                  {tickets.length === 0 && (
                      <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-400">Nenhum chamado registrado.</td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
    </div>
  );
};