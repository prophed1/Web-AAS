import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { AAS_CONTENT_CONTEXT } from '../constants';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Halo! Saya asisten AAS Anda. Anda bisa bertanya tentang prinsip kerja, gangguan (interferensi), atau cara menghitung konsentrasi sampel. Apa yang ingin Anda pelajari?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const apiKey = process.env.API_KEY || '';
        if (!apiKey) {
             throw new Error("API Key not found");
        }
        
        const ai = new GoogleGenAI({ apiKey });
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: input,
            config: {
                systemInstruction: AAS_CONTENT_CONTEXT,
                temperature: 0.3, // Keep it factual based on the context
            }
        });

        const text = response.text;
        
        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: text || "Maaf, saya tidak bisa menghasilkan jawaban saat ini.",
            timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
        console.error("Error generating response:", error);
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "Maaf, terjadi kesalahan koneksi dengan layanan AI. Pastikan API Key telah terkonfigurasi.",
            timestamp: Date.now(),
            isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
                <Sparkles size={20} className="text-yellow-300" />
                <span className="font-bold">AAS AI Tutor</span>
            </div>
            <span className="text-xs bg-blue-500 px-2 py-1 rounded text-blue-100">Gemini 2.5 Flash</span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
            {messages.map((msg) => (
                <div 
                    key={msg.id} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`
                        flex max-w-[80%] md:max-w-[70%] 
                        ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'} 
                        space-x-3
                    `}>
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                            ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}
                        `}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        
                        <div className={`
                            p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap
                            ${msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                : msg.isError 
                                    ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-none'
                                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                            }
                        `}>
                            {msg.text}
                        </div>
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                     <div className="flex items-center space-x-3 ml-11">
                         <div className="bg-slate-200 p-3 rounded-2xl rounded-tl-none">
                            <Loader2 size={20} className="animate-spin text-slate-500" />
                         </div>
                     </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-end space-x-2 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                <textarea
                    className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 text-sm p-2 text-slate-700 placeholder-slate-400"
                    placeholder="Tanya tentang gangguan kimia atau cara kerja HCL..."
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className={`
                        p-2 rounded-lg transition-colors flex-shrink-0
                        ${!input.trim() || isLoading 
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }
                    `}
                >
                    <Send size={18} />
                </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-2">
                AI dapat membuat kesalahan. Selalu verifikasi informasi penting.
            </p>
        </div>
    </div>
  );
};

export default AITutor;
