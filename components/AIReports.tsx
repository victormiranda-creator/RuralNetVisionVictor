import React, { useState } from 'react';
import { Sparkles, FileText, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateGeminiResponse } from '../services/geminiService';

export const AIReports = () => {
  const { devices } = useApp();
  const [report, setReport] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    // Clean data for AI prompt to save tokens but keep relevant info
    const devicesSummary = devices.map(d => ({
        name: d.name,
        type: d.type,
        status: d.status,
        battery: d.battery,
        temp: d.temperature,
        location: d.location
    }));

    const devicesJson = JSON.stringify(devicesSummary);
    const systemInstruction = "Você é um técnico especialista da RuralNet Vision. Gere um relatório profissional em Markdown.";
    const prompt = `
      Analise os seguintes dados dos dispositivos de um cliente rural no Piauí:
      ${devicesJson}
      
      Gere um "Relatório Diário de Saúde Tecnológica da Fazenda".
      Estrutura:
      1. Resumo Geral (1 frase)
      2. Status da Rede Mesh (Conectividade e Cobertura)
      3. Status das Câmeras Vision (Segurança, Temperaturas e Baterias)
      4. Recomendações de Manutenção (Atenção especial para dispositivos offline ou com alta temperatura).
      
      Use um tom profissional, direto e amigável. Use emojis apropriados de campo/tecnologia. Formate em Markdown.
    `;
    
    const result = await generateGeminiResponse(prompt, systemInstruction);
    setReport(result);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Sparkles className="text-yellow-300" /> Relatório Diário Inteligente</h2>
            <p className="text-purple-200 text-sm max-w-lg">
              Utilizamos Inteligência Artificial para analisar a telemetria dos seus equipamentos em tempo real e gerar insights sobre a saúde da sua infraestrutura rural.
            </p>
          </div>
          <FileText className="w-16 h-16 text-white opacity-20" />
        </div>
        
        <button 
          onClick={generateReport} 
          disabled={loading}
          className="mt-6 bg-white text-purple-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-purple-50 transition flex items-center gap-2 shadow-md disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-purple-600" />}
          {loading ? 'Analisando 9 Dispositivos...' : 'Gerar Relatório Agora'}
        </button>
      </div>

      {report && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-slide-up">
           <div className="prose prose-green max-w-none text-sm text-gray-700">
             <div className="flex items-center gap-2 mb-4 pb-4 border-b">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-xs font-bold text-gray-400 uppercase">Análise Gerada por Gemini AI</span>
             </div>
             <div dangerouslySetInnerHTML={{ 
               __html: report
                 .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                 .replace(/### (.*?)\n/g, '<h3 class="text-lg font-bold text-green-800 mt-4 mb-2">$1</h3>')
                 .replace(/- (.*?)\n/g, '<li class="ml-4 list-disc">$1</li>')
                 .replace(/\n/g, '<br/>') 
             }} />
           </div>
        </div>
      )}
    </div>
  );
};