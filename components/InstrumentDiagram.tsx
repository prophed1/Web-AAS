import React from 'react';

const InstrumentDiagram: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 text-white p-6 rounded-2xl shadow-xl overflow-x-auto">
      <h3 className="text-center text-slate-300 mb-8 font-medium uppercase tracking-widest text-sm">Diagram Alur Instrumen AAS</h3>
      
      <div className="flex items-center justify-between min-w-[800px] gap-4 relative py-10">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent -z-0"></div>

        {/* HCL */}
        <div className="relative z-10 flex flex-col items-center group">
          <div className="w-32 h-20 border-2 border-yellow-400 bg-slate-800 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.2)] group-hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all">
            <span className="font-bold text-yellow-400">HCL</span>
          </div>
          <div className="mt-4 text-center">
            <p className="font-bold text-sm">Sumber Cahaya</p>
            <p className="text-xs text-slate-400">Spesifik Unsur</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-yellow-400 animate-pulse">➤</div>

        {/* Atomizer */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-32 h-32 border-2 border-orange-500 bg-slate-800 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.3)] relative overflow-hidden">
            <div className="absolute bottom-0 w-full h-1/2 bg-orange-500/20 blur-xl animate-pulse"></div>
            <span className="font-bold text-orange-400 z-10">Nyala</span>
            <span className="text-xs text-orange-300 z-10">(Atomizer)</span>
          </div>
          <div className="mt-4 text-center">
            <p className="font-bold text-sm">Sampel</p>
            <p className="text-xs text-slate-400">Atomisasi (Ground State)</p>
          </div>
          {/* Sample Input */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="h-10 w-0.5 bg-slate-600"></div>
            <div className="px-3 py-1 bg-slate-700 rounded text-xs">Nebulizer</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-yellow-400 animate-pulse">➤</div>

        {/* Monochromator */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-32 h-20 border-2 border-blue-400 bg-slate-800 rounded-lg flex items-center justify-center transform -skew-x-12">
            <span className="font-bold text-blue-400 transform skew-x-12">Mono</span>
          </div>
          <div className="mt-4 text-center">
            <p className="font-bold text-sm">Monokromator</p>
            <p className="text-xs text-slate-400">Seleksi Panjang Gelombang</p>
          </div>
        </div>

         {/* Arrow */}
         <div className="text-yellow-400 animate-pulse">➤</div>

        {/* Detector */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 border-2 border-green-400 bg-slate-800 rounded-lg flex items-center justify-center">
            <span className="font-bold text-green-400">Detektor</span>
          </div>
          <div className="mt-4 text-center">
            <p className="font-bold text-sm">PMT</p>
            <p className="text-xs text-slate-400">Optik ke Listrik</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-green-500">➤</div>

        {/* Readout */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-16 bg-green-900/50 border border-green-500 rounded flex items-center justify-center font-mono text-xl text-green-400 shadow-inner">
            0.432
          </div>
          <div className="mt-4 text-center">
            <p className="font-bold text-sm">Readout</p>
            <p className="text-xs text-slate-400">Absorbansi</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InstrumentDiagram;
