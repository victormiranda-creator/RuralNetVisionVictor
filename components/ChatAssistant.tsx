import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Bot, Minimize2, Loader2, Send } from 'lucide-react';
import { generateGeminiResponse } from '../services/geminiService';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';

export const ChatAssistant = () => {
  const { devices } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: 'Olá! Sou o assistente virtual da RuralNet. Como posso ajudar com a sua fazenda hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const deviceContext = JSON.stringify(devices.map(d => ({
      n: d.name, t: d.type, s: d.status, b: d.battery, temp: d.temperature
    })));

    const systemInstruction = `
      Você é um assistente técnico amigável da RuralNet Vision & Mesh Sat.
      Contexto dos dispositivos da fazenda (JSON): ${deviceContext}
      Se o usuário perguntar sobre problemas, use os dados do contexto (ex: bateria fraca, offline) para sugerir a causa.
    `;

    try {
      const response = await generateGeminiResponse(userMsg, systemInstruction);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Desculpe, estou com dificuldades de conexão no momento.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2 transition-all hover:scale-105 animate-bounce-subtle"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-bold hidden md:inline">Assistente Rural</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col h-[500px] animate-slide-up">
      {/* Chat Header */}
      <div className="bg-green-800 text-white p-4 rounded-t-xl flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-full">
            <Bot className="w-5 h-5 text-green-800" />
          </div>
          <div>
            <h3 className="font-bold text-sm">RuralBot</h3>
            <p className="text-xs text-green-200 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
            </p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded transition">
          <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-green-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-green-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 rounded-b-xl">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite a sua dúvida..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-gray-50"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white p-2 rounded-full transition shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};