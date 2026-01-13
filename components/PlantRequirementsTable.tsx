
import React from 'react';
import { PlantType } from '../types';
import { Thermometer, Droplets, Zap, ShieldCheck } from 'lucide-react';

const PlantRequirementsTable: React.FC = () => {
  const requirements = [
    {
      type: "Root Crop",
      temp: "15°C - 22°C",
      method: "Conduction",
      moisture: "65%",
      safety: "Soil Mineral Watch"
    },
    {
      type: "Succulent",
      temp: "20°C - 30°C",
      method: "Radiation",
      moisture: "20%",
      safety: "Surface Burn Prevention"
    },
    {
      type: "Tropical Fern",
      temp: "24°C - 28°C",
      method: "Convection",
      moisture: "85%",
      safety: "Humidity Retention"
    }
  ];

  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl overflow-hidden">
      <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase italic tracking-tighter mb-6">
        <ShieldCheck className="text-emerald-500" size={20} /> Agricultural Threshold Matrix
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="pb-4 text-[10px] font-black text-slate-500 uppercase">Plant Species</th>
              <th className="pb-4 text-[10px] font-black text-slate-500 uppercase">Optimum Temp</th>
              <th className="pb-4 text-[10px] font-black text-slate-500 uppercase">Transfer Mode</th>
              <th className="pb-4 text-[10px] font-black text-slate-500 uppercase">Target RH</th>
              <th className="pb-4 text-[10px] font-black text-slate-500 uppercase">Protocol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {requirements.map((req, idx) => (
              <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                <td className="py-4 text-sm font-bold text-emerald-400 italic">{req.type}</td>
                <td className="py-4 text-xs font-mono text-slate-300">{req.temp}</td>
                <td className="py-4 text-[10px] font-black uppercase text-amber-500">{req.method}</td>
                <td className="py-4 text-xs text-slate-400">{req.moisture}</td>
                <td className="py-4 text-[10px] text-slate-500 italic">{req.safety}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlantRequirementsTable;
