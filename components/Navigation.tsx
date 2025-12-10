import React from 'react';
import { SECTIONS } from '../constants';
import { SectionId } from '../types';
import { Beaker, Activity, Bot } from 'lucide-react';

interface NavigationProps {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeSection, 
  setActiveSection, 
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {

  const handleNavClick = (id: SectionId) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  const navClasses = (isActive: boolean) => 
    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
      isActive 
        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`
        fixed md:relative z-30 w-72 h-full bg-white border-r border-slate-200 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-2 text-blue-700 font-bold text-2xl tracking-tight">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Beaker size={24} />
            </div>
            <span>AAS Master</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wider">Modul Pembelajaran</p>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={navClasses(activeSection === section.id)}
            >
              <section.icon size={20} />
              <span className="font-medium text-sm">{section.title}</span>
            </div>
          ))}

          <div className="my-4 border-t border-slate-100 mx-2"></div>

          <div
            onClick={() => handleNavClick(SectionId.SIMULATION)}
            className={navClasses(activeSection === SectionId.SIMULATION)}
          >
            <Activity size={20} />
            <span className="font-medium text-sm">Simulasi Kalibrasi</span>
          </div>

          <div
            onClick={() => handleNavClick(SectionId.AI_TUTOR)}
            className={navClasses(activeSection === SectionId.AI_TUTOR)}
          >
            <Bot size={20} />
            <span className="font-medium text-sm">Tanya AI Tutor</span>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">© 2024 AAS Education</p>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
