import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { ChartDataPoint } from '../types';
import { PlusCircle, Trash2, RefreshCw } from 'lucide-react';

// Linear Regression helper
const calculateRegression = (data: ChartDataPoint[]) => {
  const n = data.length;
  if (n < 2) return { slope: 0, intercept: 0, r2: 0 };

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
  
  for (const point of data) {
    sumX += point.concentration;
    sumY += point.absorbance;
    sumXY += point.concentration * point.absorbance;
    sumX2 += point.concentration * point.concentration;
    sumY2 += point.absorbance * point.absorbance;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // R-squared calculation
  const ssTot = sumY2 - (sumY * sumY) / n;
  const ssRes = sumY2 - intercept * sumY - slope * sumXY; // Simplified for linear
  const r2 = 1 - (ssRes / ssTot); // Approximate

  return { slope, intercept, r2 };
};

const Simulation: React.FC = () => {
  const [data, setData] = useState<ChartDataPoint[]>([
    { concentration: 1, absorbance: 0.12 },
    { concentration: 3, absorbance: 0.35 },
    { concentration: 5, absorbance: 0.58 },
    { concentration: 10, absorbance: 1.15 },
  ]);
  const [newConc, setNewConc] = useState('');
  const [newAbs, setNewAbs] = useState('');
  const [sampleAbs, setSampleAbs] = useState('');

  const { slope, intercept, r2 } = useMemo(() => calculateRegression(data), [data]);

  const handleAddPoint = () => {
    if (newConc && newAbs) {
      setData([...data, { concentration: Number(newConc), absorbance: Number(newAbs) }].sort((a,b) => a.concentration - b.concentration));
      setNewConc('');
      setNewAbs('');
    }
  };

  const handleRemovePoint = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleReset = () => {
    setData([
        { concentration: 1, absorbance: 0.12 },
        { concentration: 3, absorbance: 0.35 },
        { concentration: 5, absorbance: 0.58 },
        { concentration: 10, absorbance: 1.15 },
    ]);
    setSampleAbs('');
  };

  // Generate line points for visualization
  const lineData = useMemo(() => {
    if (data.length === 0) return [];
    const maxX = Math.max(...data.map(d => d.concentration)) * 1.1;
    return [
      { concentration: 0, absorbance: intercept },
      { concentration: maxX, absorbance: slope * maxX + intercept }
    ];
  }, [data, slope, intercept]);

  const calculatedSampleConc = sampleAbs 
    ? (Number(sampleAbs) - intercept) / slope 
    : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulasi Kurva Kalibrasi</h2>
        <p className="text-slate-500 mb-6">Masukkan data standar untuk melihat kurva linearitas dan menghitung konsentrasi sampel berdasarkan Hukum Beer-Lambert.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">Input Data Standar</h3>
              <div className="flex space-x-2 mb-2">
                <input
                  type="number"
                  placeholder="Conc (ppm)"
                  className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newConc}
                  onChange={(e) => setNewConc(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Abs"
                  className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newAbs}
                  onChange={(e) => setNewAbs(e.target.value)}
                />
                <button 
                  onClick={handleAddPoint}
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                >
                  <PlusCircle size={20} />
                </button>
              </div>
              
              <div className="max-h-40 overflow-y-auto space-y-1 mt-3">
                {data.map((point, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm p-2 bg-white rounded border border-slate-100">
                    <span className="text-slate-600">C: {point.concentration} ppm</span>
                    <span className="font-mono text-slate-800">A: {point.absorbance}</span>
                    <button onClick={() => handleRemovePoint(idx)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
               <button onClick={handleReset} className="mt-4 flex items-center justify-center space-x-2 w-full text-xs text-slate-500 hover:text-slate-700 py-2">
                  <RefreshCw size={14} /> <span>Reset Data</span>
               </button>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-3 text-sm uppercase tracking-wide">Analisis Sampel</h3>
              <div className="mb-4">
                 <label className="block text-xs text-blue-600 mb-1">Absorbansi Sampel</label>
                 <input
                  type="number"
                  placeholder="Masukkan nilai Abs"
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={sampleAbs}
                  onChange={(e) => setSampleAbs(e.target.value)}
                />
              </div>
              
              {calculatedSampleConc !== null && (
                 <div className="bg-white p-3 rounded-lg border border-blue-100 text-center">
                    <p className="text-xs text-slate-400 mb-1">Konsentrasi Terhitung</p>
                    <p className="text-2xl font-bold text-blue-600">{calculatedSampleConc.toFixed(4)} <span className="text-sm font-normal">ppm</span></p>
                 </div>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 min-h-[400px] bg-white rounded-xl border border-slate-100 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4 text-sm text-slate-500">
               <div>
                 <span className="font-bold">Persamaan Regresi:</span> y = {slope.toFixed(4)}x + {intercept.toFixed(4)}
               </div>
               <div>
                  <span className="font-bold">R²:</span> {isNaN(r2) ? '0.000' : r2.toFixed(4)}
               </div>
            </div>
            
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="concentration" name="Concentration" unit=" ppm">
                    <Label value="Konsentrasi (ppm)" offset={-10} position="insideBottom" />
                  </XAxis>
                  <YAxis type="number" dataKey="absorbance" name="Absorbance">
                    <Label value="Absorbansi" angle={-90} position="insideLeft" />
                  </YAxis>
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  {/* The actual data points */}
                  <Scatter name="Standar" data={data} fill="#2563eb" r={6} />
                  
                  {/* The sample point if calculated */}
                  {calculatedSampleConc !== null && (
                     <Scatter 
                        name="Sampel" 
                        data={[{ concentration: calculatedSampleConc, absorbance: Number(sampleAbs) }]} 
                        fill="#ef4444" 
                        shape="star" 
                        r={10} 
                     />
                  )}
                </ScatterChart>
              </ResponsiveContainer>
              {/* Overlay SVG line for regression manually because Recharts Trendline is complex with Scatter */}
               {/* Note: In a real prod app we might calculate SVG path, but here we keep it simple or use a composed chart. 
                   For simplicity in this demo, points are sufficient to show distribution. */}
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">Titik biru: Standar • Bintang merah: Sampel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
