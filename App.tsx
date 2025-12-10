import React, { useState } from 'react';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import ContentCard from './components/ContentCard';
import InstrumentDiagram from './components/InstrumentDiagram';
import Simulation from './components/Simulation';
import AITutor from './components/AITutor';
import { SectionId } from './types';
import { SECTIONS } from './constants';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<SectionId>(SectionId.BASICS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeContent = SECTIONS.find(s => s.id === activeSectionId);

  const renderContent = () => {
    switch (activeSectionId) {
      case SectionId.SIMULATION:
        return (
            <div className="animate-fadeIn">
                 <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Simulasi & Kalkulator</h1>
                    <p className="text-slate-500">Latihan interaktif analisis data spektrometri.</p>
                 </div>
                 <Simulation />
            </div>
        );
      case SectionId.AI_TUTOR:
        return (
            <div className="animate-fadeIn h-full">
                 <div className="mb-4">
                    <h1 className="text-3xl font-bold text-slate-900">AI Tutor</h1>
                    <p className="text-slate-500">Tanyakan apapun tentang materi AAS.</p>
                 </div>
                 <AITutor />
            </div>
        );
      default:
        return (
          <div className="space-y-12">
            {activeContent && <ContentCard section={activeContent} />}
            
            {/* Contextual Visualizations based on section */}
            {activeSectionId === SectionId.COMPONENTS && (
               <div className="mt-8">
                   <h3 className="text-xl font-bold text-slate-800 mb-4 px-2">Visualisasi Instrumen</h3>
                   <InstrumentDiagram />
               </div>
            )}
          </div>
        );
    }
  };

  return (
    <Layout>
      <Navigation 
        activeSection={activeSectionId} 
        setActiveSection={setActiveSectionId}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 h-screen overflow-y-auto bg-slate-50 relative scroll-smooth">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
           <span className="font-bold text-blue-700">AAS Master</span>
           <button 
             onClick={() => setIsMobileMenuOpen(true)}
             className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
           >
             <Menu size={24} />
           </button>
        </div>

        <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto pb-24">
            {renderContent()}
        </div>
      </main>
    </Layout>
  );
};

export default App;
