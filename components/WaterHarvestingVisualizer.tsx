
import React, { useState, useEffect } from 'react';
import { SensorData } from '../types';
import { Droplets, Wind, Box, ThermometerSnowflake, Activity, ChevronRight, Zap, Gauge } from 'lucide-react';

interface Props {
  isOn: boolean;
  sensorData: SensorData;
}

const WaterHarvestingVisualizer: React.FC<Props> = ({ isOn, sensorData }) => {
  const [pressure, setPressure] = useState(0);
  const waterRate = (sensorData.humidity * 0.15 * (isOn ? 1 : 0)).toFixed(2);
  
  // Simulate fluctuating pressure when system is on
  useEffect(() => {
    let interval: any;
    if (isOn) {
      interval = setInterval(() => {
        setPressure(14.7 + Math.random() * 5 + (sensorData.humidity / 10));
      }, 1000);
    } else {
      setPressure(0);
    }
    return () => clearInterval(interval);
  }, [isOn, sensorData.humidity]);

  const harvestingParts = [
    {
      name: "Ultrasonic Resonator",
      desc: "Vibrates at 1.7MHz to aggregate micro-fog into heavy clusters.",
      icon: <Wind size={18} className="text-cyan-400" />,
      color: "border-cyan-500/30"
    },
    {
      name: "Adiabatic Compressor",
      desc: "Spikes vapor pressure to force moisture beyond the dew point.",
      icon: <Box size={18} className="text-slate-400" />,
      color: "border-slate-500/30"
    },
    {
      name: "Peltier Chill-Plate",
      desc: "Solid-state cooling surfaces that capture liquid runoff.",
      icon: <ThermometerSnowflake size={18} className="text-blue-400" />,
      color: "border-blue-500/30"
    }
  ];

  return (
    <div className="bg-slate-800 rounded-[2.5rem] p-8 border border-slate-700 shadow-2xl space-y-8 overflow-hidden relative">
      {/* Background Cinematic Lighting */}
      <div className={`absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full transition-opacity duration-1000 ${isOn ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-slate-700/50 pb-8 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className={`p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/20 transition-transform ${isOn ? 'animate-pulse scale-110' : ''}`}>
              <Droplets className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
              Atmospheric Liquefaction
            </h2>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mt-3 ml-1 flex items-center gap-2">
            <Activity size={12} className="text-blue-500" /> Molecular Phase-Change Engine
          </p>
        </div>

        <div className="flex gap-4 w-full xl:w-auto">
          <div className="flex-1 xl:flex-none bg-black/40 px-6 py-4 rounded-2xl border border-blue-500/10 backdrop-blur-xl shadow-xl flex flex-col justify-center min-w-[140px]">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-1">Pressure (PSI)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-mono text-cyan-400 font-black tracking-tighter">{pressure.toFixed(1)}</span>
              <Gauge size={14} className="text-cyan-500/50" />
            </div>
          </div>
          <div className="flex-1 xl:flex-none bg-blue-500/10 px-6 py-4 rounded-2xl border border-blue-400/20 backdrop-blur-xl shadow-xl flex flex-col justify-center min-w-[140px]">
            <p className="text-[10px] text-blue-500/60 font-black uppercase tracking-wider mb-1">Yield (L/HR)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-mono text-blue-400 font-black tracking-tighter">{waterRate}</span>
              <span className="text-[10px] text-blue-500/40 font-black">STB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
        {/* Cinematic Conversion Chamber (7 cols) */}
        <div className="xl:col-span-7 bg-[#020617] rounded-[3rem] border border-slate-800 shadow-inner relative overflow-hidden flex items-center justify-center min-h-[320px]">
          {/* Internal Grid Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]" />

          <svg viewBox="0 0 600 240" className="w-full h-full relative z-10 px-8">
            <defs>
              <filter id="neonBlur">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="pistonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>

            {/* STAGE 1: VAPOR VORTEX */}
            <g opacity={isOn ? 1 : 0.2}>
              <rect x="20" y="80" width="80" height="80" rx="40" fill="#0f172a" stroke="#1e293b" strokeDasharray="4 4" />
              <Wind x="45" y="105" size={30} className="text-cyan-500/30" />
              {isOn && [...Array(20)].map((_, i) => (
                <circle key={`p-${i}`} r="1.2" fill="white">
                  <animate attributeName="cx" values="60;140" dur={`${0.8 + Math.random()}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" values={`${120 + Math.sin(i) * 30};${120 + Math.cos(i) * 5}`} dur="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.8;0" dur="1s" repeatCount="indefinite" />
                </circle>
              ))}
            </g>

            {/* STAGE 2: HIGH-FIDELITY COMPRESSION */}
            <g transform="translate(160, 60)">
              {/* Glass Chamber Surround */}
              <rect x="0" y="0" width="200" height="120" rx="20" fill="#0f172a" fillOpacity="0.5" stroke="#1e293b" />
              
              {/* The Compression Wave */}
              {isOn && (
                <rect x="150" y="5" width="40" height="110" rx="5" fill="#0ea5e9" filter="url(#neonBlur)" opacity="0.3">
                  <animate attributeName="width" values="40;10;40" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.1;0.6;0.1" dur="1.5s" repeatCount="indefinite" />
                </rect>
              )}

              {/* Piston Mechanics */}
              <rect x="10" y="10" width="40" height="100" rx="8" fill="url(#pistonGrad)">
                <animateTransform 
                  attributeName="transform" 
                  type="translate" 
                  values="0,0; 130,0; 0,0" 
                  dur="1.5s" 
                  repeatCount="indefinite" 
                />
              </rect>
              
              {/* Internal Pressure Spark */}
              {isOn && (
                <circle cx="180" cy="60" r="15" fill="#38bdf8" filter="url(#neonBlur)">
                  <animate attributeName="r" values="5;20;5" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.5;0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
            </g>

            {/* STAGE 3: FLUID EXTRACTION */}
            <g transform="translate(420, 80)">
              <rect x="0" y="0" width="120" height="100" rx="15" fill="#0f172a" stroke="#1e293b" />
              <path d="M 20 0 L 20 80 Q 20 90 30 90 L 90 90" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              
              {/* Chill Plate */}
              <rect x="40" y="10" width="40" height="50" rx="4" fill="#1e293b" stroke={isOn ? '#60a5fa' : '#334155'} />
              <ThermometerSnowflake x="52" y="25" size={16} className={isOn ? 'text-blue-400 animate-pulse' : 'text-slate-600'} />

              {/* Liquid Accumulation Physics */}
              {isOn && [...Array(10)].map((_, i) => (
                <circle key={`drop-${i}`} r="2.5" fill="#38bdf8">
                  <animate 
                    attributeName="cx" 
                    values={`${50 + (i % 3) * 5};${50 + (i % 3) * 5}`} 
                    dur="1s" 
                    repeatCount="indefinite" 
                  />
                  <animate 
                    attributeName="cy" 
                    values="55;110" 
                    dur={`${0.6 + Math.random() * 0.4}s`}
                    begin={`${i * 0.1}s`}
                    repeatCount="indefinite" 
                  />
                  <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                </circle>
              ))}

              {/* Water in the pipe tray */}
              {isOn && (
                <rect x="10" y="105" width="100" height="10" rx="5" fill="#38bdf8" opacity="0.4">
                  <animate attributeName="height" values="2;8;2" dur="3s" repeatCount="indefinite" />
                </rect>
              )}
            </g>

            {/* Flow Connector Lines */}
            <path d="M 100 120 L 160 120 M 360 120 L 420 120" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />
          </svg>
          
          {/* Status HUD Overlays */}
          <div className="absolute bottom-6 flex gap-10">
            <div className="text-center">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Resonance</p>
              <div className="h-1 w-12 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div className={`h-full bg-cyan-500 transition-all duration-1000 ${isOn ? 'w-full' : 'w-0'}`} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Cooling</p>
              <div className="h-1 w-12 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div className={`h-full bg-blue-500 transition-all duration-1000 ${isOn ? 'w-full' : 'w-0'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Hardware Spec (5 cols) */}
        <div className="xl:col-span-5 flex flex-col justify-between gap-4">
          <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-700/50 flex-1 group hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Zap size={18} />
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Conversion Protocol</h3>
            </div>
            <p className="text-[12px] text-slate-400 leading-relaxed italic border-l-2 border-blue-500/20 pl-4 py-1">
              "System leverages <span className="text-blue-400 font-bold">Adiabatic Compression</span> logic. By rapidly increasing PSI, airborne moisture particles collide and merge into dense liquid droplets before being flash-cooled via thermo-electric plates."
            </p>
          </div>

          <div className="space-y-3">
            {harvestingParts.map((part, idx) => (
              <div key={idx} className={`flex gap-4 p-4 bg-slate-900/40 rounded-2xl border ${part.color} hover:bg-slate-900/60 transition-all cursor-default group`}>
                <div className="bg-slate-800 p-3 rounded-xl h-fit group-hover:bg-slate-700 transition-colors shadow-lg border border-white/5">
                  {part.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-white uppercase tracking-tighter italic">{part.name}</h4>
                    <ChevronRight size={12} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight group-hover:text-slate-400 transition-colors">{part.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterHarvestingVisualizer;
