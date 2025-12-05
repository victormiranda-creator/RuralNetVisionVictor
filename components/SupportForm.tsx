import React, { useState } from 'react';
import { Phone, Sparkles, Send, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateGeminiResponse } from '../services/geminiService';

export const SupportForm = () => {
  const { user, tickets, addTicket } = useApp();
  const [type, setType] = useState('internet');
  const [desc, setDesc] = useState('');
  const [aiDiagnosis, setAiDiagnosis] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAiDiagnosis = async () => {
    if (!desc) return;
    setLoadingAi(true);
    const systemInstruction = "Você é um técnico de suporte da RuralNet. Seja conciso e ofereça 3 soluções práticas.";
    const prompt = `
      O cliente relatou o seguinte problema: "${desc}" no equipamento do tipo "${type}".
      Forneça 3 sugestões curtas de "Auto-Resolução" que o cliente pode tentar agora.
    `;
    
    const result = await generateGeminiResponse(prompt, systemInstruction);
    setAiDiagnosis(result);
    setLoadingAi(false);
  };

  const handleSubmit = () => {
      addTicket({
          type: type as any,
          description: desc,
      });
      setDesc('');
      setAiDiagnosis('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-600" />
          Solicitar Assistência Técnica
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Descreva o problema com detalhes. Use a nossa IA para tentar resolver rapidamente antes de abrir um chamado.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Problema</label>
            <div className="grid grid-cols-3 gap-2">
              {['internet', 'camera', 'outros'].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-2 text-sm rounded-lg border ${
                    type === t 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  } capitalize transition`}
                >
                  {t === 'internet' ? 'Internet/Mesh' : t === 'camera' ? 'Câmeras/Vision' : 'Outros'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Problema</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none min-h-[120px]"
              placeholder="Ex: A câmera do curral está desligando sozinha à noite..."
            />
          </div>
          
          {/* AI Diagnosis Section */}
          <div className="flex gap-2">
            <button
              onClick={handleAiDiagnosis}
              disabled={!desc || loadingAi}
              className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-3 rounded-lg transition flex items-center justify-center gap-2 border border-purple-200"
            >
              {loadingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Diagnosticar com IA
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!desc}
              className="flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Abrir Chamado
            </button>
          </div>

          {/* AI Result Display */}
          {aiDiagnosis && (
            <div className="mt-4 bg-purple-50 border border-purple-100 p-4 rounded-lg animate-fade-in">
               <div className="flex items-center gap-2 mb-2">
                 <Sparkles className="w-4 h-4 text-purple-600" />
                 <h4 className="font-bold text-purple-800 text-sm">Diagnóstico Inteligente</h4>
               </div>
               <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                 {aiDiagnosis}
               </div>
               <div className="mt-3 text-xs text-gray-500 italic border-t border-purple-100 pt-2">
                 *Sugestões geradas automaticamente. Se não resolver, prossiga com a abertura do chamado.
               </div>
            </div>
          )}

        </div>
      </div>

      {/* Lista de Chamados do Usuário */}
      <div className="space-y-3">
          <h3 className="font-bold text-gray-700 ml-1">Seus Chamados Recentes</h3>
          {tickets.filter(t => t.userId === user?.uid).length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-400">
                  Nenhum chamado aberto recentemente.
              </div>
          ) : (
              tickets.filter(t => t.userId === user?.uid).map(ticket => (
                  <div key={ticket.id} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                      <div>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              ticket.status === 'concluido' ? 'bg-green-100 text-green-700' :
                              ticket.status === 'em_progresso' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                              {ticket.status.replace('_', ' ').toUpperCase()}
                          </span>
                          <p className="text-gray-800 text-sm mt-1">{ticket.description}</p>
                          <p className="text-xs text-gray-400 mt-1">Aberto em: {new Date(ticket.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                      </div>
                  </div>
              ))
          )}
      </div>
    </div>
  );
};