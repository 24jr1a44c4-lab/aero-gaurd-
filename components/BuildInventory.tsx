
import React from 'react';
import { Cpu, Box, Shield, Droplets, Thermometer, Wind, Link, Settings, Layers } from 'lucide-react';

const BuildInventory: React.FC = () => {
  const parts = [
    {
      icon: <Cpu className="text-cyan-400" />,
      name: "ESP32-S3 Core",
      use: "AI Drift Correction",
      desc: "Handles sensor fusion algorithms to compensate for budget hardware noise."
    },
    {
      icon: <Box className="text-slate-400" />,
      name: "AL-MG 5052 Alloy",
      use: "Anti-Corrosive Body",
      desc: "Specified for high-humidity winter roads. Recyclable and lightweight."
    },
    {
      icon: <Layers className="text-emerald-400" />,
      name: "Dual Filter Stack",
      use: "PM2.5 Pollution Scrubbing",
      desc: "HEPA layer for particulates + Bio-Activated Carbon for chemical pollutants."
    },
    {
      icon: <Droplets className="text-blue-400" />,
      name: "Adiabatic Chamber",
      use: "Humidity Compression",
      desc: "Converts harvested fog into liquid water for storage and agricultural use."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-cyan-500/10 rounded-2xl">
            <Settings className="text-cyan-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              Hardware Architecture
            </h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Industrial Deployment Manifest</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {parts.map((part, idx) => (
            <div key={idx} className="bg-slate-900/50 border border-slate-700 p-6 rounded-[2rem] flex gap-5 hover:border-cyan-500/50 transition-all group">
              <div className="bg-slate-800 p-4 rounded-2xl h-fit group-hover:bg-slate-700 transition-colors shadow-lg">{part.icon}</div>
              <div>
                <h4 className="text-sm font-black text-white mb-1 uppercase italic tracking-tight">{part.name}</h4>
                <p className="text-[10px] text-cyan-400 font-bold uppercase mb-2 italic tracking-widest">{part.use}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{part.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black/30 p-6 rounded-2xl border border-slate-700/50">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 text-center italic">Pollution Logic Flow</h3>
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center flex-1">
                 <p className="text-[9px] text-slate-500 font-bold uppercase mb-2">1. Intake</p>
                 <div className="h-1 bg-slate-700 rounded-full w-full mb-1" />
                 <p className="text-[10px] text-slate-400 italic">Fog + Heavy Particles</p>
              </div>
              <ArrowRight className="text-slate-700 hidden md:block" />
              <div className="text-center flex-1">
                 <p className="text-[9px] text-emerald-500 font-bold uppercase mb-2">2. Scrubbing</p>
                 <div className="h-1 bg-emerald-500 rounded-full w-full mb-1" />
                 <p className="text-[10px] text-slate-400 italic">HEPA + Carbon Fusion</p>
              </div>
              <ArrowRight className="text-slate-700 hidden md:block" />
              <div className="text-center flex-1">
                 <p className="text-[9px] text-blue-500 font-bold uppercase mb-2">3. Output</p>
                 <div className="h-1 bg-blue-500 rounded-full w-full mb-1" />
                 <p className="text-[10px] text-slate-400 italic">Purified Humid Air</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default BuildInventory;
