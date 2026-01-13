
import React from 'react';
import { Box, Droplets, Zap, ShieldCheck, ArrowRight, Wind, Target, Recycle } from 'lucide-react';

const ProcessIntelligence: React.FC = () => {
  const processSteps = [
    {
      title: "Atmospheric Intake",
      input: "Saturated Fog & PM2.5",
      how: "1.7MHz Ultrasonic Resonator",
      why: "Aggregates micro-vapor into treatable liquid clusters.",
      icon: <Wind className="text-cyan-400" />,
      benefit: "Immediate 80% visibility restoration."
    },
    {
      title: "Phase-Change Chamber",
      input: "Moist Air Feed",
      how: "Adiabatic Compression Core",
      why: "Rapidly spikes pressure to force moisture beyond the dew point.",
      icon: <Box className="text-blue-400" />,
      benefit: "99% Water recovery from ambient fog."
    },
    {
      title: "Biological Distribution",
      input: "Cleaned Warm Air",
      how: "Laminar Flow Nozzles",
      why: "Prevents agricultural frost without dehydrating soil minerals.",
      icon: <Recycle className="text-emerald-400" />,
      benefit: "Safeguards root crops down to -5°C."
    }
  ];

  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700 pb-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
            <Target className="text-blue-400" /> System Lifecycle Intelligence
          </h2>
          <p className="text-slate-500 text-xs uppercase font-black tracking-widest mt-1">Technical Processing & Utility Mapping</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {processSteps.map((step, idx) => (
          <div key={idx} className="bg-slate-900/40 p-6 rounded-[2rem] border border-slate-700/50 hover:border-blue-500/30 transition-all group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-sm font-black text-white uppercase italic">{step.title}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Raw Input</p>
                <p className="text-xs text-slate-200 font-bold">{step.input}</p>
              </div>
              
              <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                <p className="text-[9px] text-blue-400 font-black uppercase mb-1 italic">The Mechanism</p>
                <p className="text-xs text-slate-400 leading-relaxed italic">{step.how}</p>
              </div>

              <div>
                <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Process Logic</p>
                <p className="text-xs text-slate-300 leading-relaxed">{step.why}</p>
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={14} />
                  <p className="text-[10px] font-black uppercase">Primary Benefit</p>
                </div>
                <p className="text-xs text-slate-400 mt-1 italic">{step.benefit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-2">
          <h4 className="text-white font-black uppercase text-sm italic">Summary of Utility</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            AeroGuard doesn't just clear fog; it <span className="text-white font-bold">converts environmental hazards into agricultural assets</span>. By capturing moisture that causes road accidents, we provide purified water and thermal regulation for winter crops, reducing water waste by 40% and accident rates by 90%.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-black/40 px-6 py-4 rounded-xl border border-white/5">
           <div className="text-center">
              <p className="text-[10px] text-slate-500 font-black uppercase">Water Yield</p>
              <p className="text-xl font-mono font-black text-blue-400">99.2%</p>
           </div>
           <div className="h-8 w-[1px] bg-slate-700" />
           <div className="text-center">
              <p className="text-[10px] text-slate-500 font-black uppercase">Visibility Gain</p>
              <p className="text-xl font-mono font-black text-emerald-400">8.5X</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessIntelligence;
