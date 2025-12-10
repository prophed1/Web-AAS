import React from 'react';
import { ContentSection } from '../types';
import ReactMarkdown from 'react-markdown';

// Simple markdown renderer replacement since we can't easily install react-markdown in this environment perfectly
// We will build a custom simple renderer for the specific content structure we have
const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-4 text-slate-700 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;
        
        if (trimmed.startsWith('### ')) {
          return <h3 key={idx} className="text-xl font-bold text-slate-900 mt-6 mb-3">{trimmed.replace('### ', '')}</h3>;
        }
        if (trimmed.startsWith('#### ')) {
          return <h4 key={idx} className="text-lg font-semibold text-slate-800 mt-4 mb-2">{trimmed.replace('#### ', '')}</h4>;
        }
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
           return (
            <div key={idx} className="flex items-start space-x-2 ml-4">
               <span className="text-blue-500 mt-1.5">•</span>
               <span>{trimmed.replace(/^[\*\-]\s/, '')}</span>
            </div>
           );
        }
        if (/^\d+\./.test(trimmed)) {
             return (
            <div key={idx} className="flex items-start space-x-2 ml-4">
               <span className="font-semibold text-slate-900 w-5">{trimmed.split('.')[0]}.</span>
               <span className="flex-1">{trimmed.replace(/^\d+\.\s/, '')}</span>
            </div>
           );
        }
        
        return <p key={idx}>{trimmed}</p>;
      })}
    </div>
  );
};

const ContentCard: React.FC<{ section: ContentSection }> = ({ section }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <header className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
            <section.icon size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{section.title}</h1>
        </div>
        
        {section.summary && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-3">Ringkasan Materi</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {section.summary.map((point, i) => (
                <li key={i} className="flex items-start text-sm text-indigo-900">
                  <span className="mr-2 text-indigo-400">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
        <SimpleMarkdown content={section.content} />
      </div>
    </div>
  );
};

export default ContentCard;
