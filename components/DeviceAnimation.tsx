
import React, { useMemo } from 'react';
import { FogCondition, TemperatureLevel, EnvironmentMode } from '../types';
import { Droplets, Wind, Activity, Zap } from 'lucide-react';

interface Props {
  isOn: boolean;
  condition: FogCondition;
  tempLevel: TemperatureLevel;
  density: number;
  mode: EnvironmentMode;
  isCleaning: boolean;
}

const DeviceAnimation: React.FC<Props> = ({ isOn, condition, tempLevel, density, mode, isCleaning }) => {
  // Enhanced particle system with vortex physics
  const particles = useMemo(() => {
    // Count scales with density to show severity
    const count = Math.min(500, Math.floor((density / 100) * 400) + 100);
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 120 - 10, 
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      depth: Math.random(),
      speed: 1.5 + Math.random() * 3,
      offset: Math.random() * 10,
      swirlRadius: 5 + Math.random() * 20,
      chaos: Math.random() * 2 - 1,
    }));
  }, [density]);

  const fogOpacity = density / 100;

  return (
    <div className="relative w-full h-[600px] bg-[#010204] flex items-center justify-center overflow-hidden rounded-[4rem] border border-slate-800 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]">
      {/* ATMOSPHERIC BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 transition-all duration-1000 ${
          mode === EnvironmentMode.FIELD ? 'bg-orange-950/10' : 
          mode === EnvironmentMode.HIGHWAY ? 'bg-blue-950/10' : 'bg-slate-900/15'
        }`} />
        
        {/* Suction Glow Field */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isOn ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: `radial-gradient(circle at 35% 50%, rgba(14, 165, 233, 0.2) 0%, transparent 60%)`
          }}
        />
      </div>

      {/* VORTEX PARTICLE SIMULATION */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="particleGrad">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vortexGrad">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </radialGradient>
          </defs>

          {particles.map((p) => {
            const isInfluenced = isOn;
            const blur = (1 - p.depth) * 2;
            
            return (
              <circle
                key={p.id}
                r={p.size * 0.25}
                fill={isInfluenced && p.x < 85 ? "url(#vortexGrad)" : "url(#particleGrad)"}
                style={{
                  opacity: (0.15 + (fogOpacity * 0.7)) * (0.3 + p.depth * 0.7),
                  filter: `blur(${blur}px)`,
                  transition: 'fill 0.4s ease-out, opacity 1s',
                }}
              >
                {!isOn ? (
                  <>
                    <animate attributeName="cx" values={`${p.x}%;${p.x + 1}%;${p.x}%`} dur={`${p.speed * 6}s`} begin={`${p.offset}s`} repeatCount="indefinite" />
                    <animate attributeName="cy" values={`${p.y}%;${p.y + 1}%;${p.y}%`} dur={`${p.speed * 7}s`} begin={`${p.offset}s`} repeatCount="indefinite" />
                  </>
                ) : (
                  <>
                    {/* SPIRAL VORTEX LOGIC: Particles tighten toward (35, 50) */}
                    <animate 
                      attributeName="cx" 
                      values={`${p.x}%; 65%; 38%; 32%`} 
                      keyTimes="0; 0.5; 0.9; 1"
                      dur={`${p.speed / (1.5 + density/40)}s`} 
                      begin={`${p.offset}s`} 
                      repeatCount="indefinite" 
                    />
                    <animate 
                      attributeName="cy" 
                      values={`${p.y}%; ${50 + Math.sin(p.offset) * p.swirlRadius}%; 50%; 50%`} 
                      keyTimes="0; 0.5; 0.9; 1"
                      dur={`${p.speed / (1.5 + density/40)}s`} 
                      begin={`${p.offset}s`} 
                      repeatCount="indefinite" 
                    />
                    <animate attributeName="opacity" values="0.3;1;0.6;0" dur={`${p.speed / (1.5 + density/40)}s`} begin={`${p.offset}s`} repeatCount="indefinite" />
                  </>
                )}
              </circle>
            );
          })}
        </svg>
      </div>

      {/* CORE HARDWARE INTERFACE */}
      <div className="relative z-20 flex items-center justify-center translate-x-24 scale-125">
        <svg width="500" height="400" viewBox="0 0 500 400">
          <defs>
            <filter id="glowCore">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* ATMOSPHERIC FLOW RIBBONS */}
          {isOn && (
            <g>
              {[...Array(10)].map((_, i) => (
                <path
                  key={i}
                  d={`M -350 ${60 + i * 28} Q -120 ${60 + i * 28 + Math.sin(i) * 30} 55 200`}
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="0.8"
                  strokeDasharray="50 150"
                  opacity="0.25"
                >
                  <animate attributeName="stroke-dashoffset" from="200" to="0" dur={`${0.4 + (i % 2) * 0.1}s`} repeatCount="indefinite" />
                </path>
              ))}
            </g>
          )}

          {/* MAIN CHASSIS */}
          <g transform="translate(100, 110)">
            <rect x="0" y="0" width="280" height="180" rx="45" fill="url(#chassisGrad)" stroke="#ffffff10" strokeWidth="1" />
            <rect x="15" y="15" width="250" height="150" rx="35" fill="#020408" />

            {/* INTAKE NOZZLE */}
            <g transform="translate(-65, 40)">
              <path d="M 0 0 L 85 0 L 85 100 L 0 100 Q -35 50 0 0" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <g transform="translate(42, 50)">
                <circle r="44" fill="#010204" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.1" />
                
                {/* HIGH-SPEED TURBINE */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 0 0"
                    to="-360 0 0"
                    dur={isOn ? `${0.2 - (density/800)}s` : "0s"}
                    repeatCount="indefinite"
                  />
                  {[0, 60, 120, 180, 240, 300].map(deg => (
                    <g key={deg} transform={`rotate(${deg})`}>
                      <path d="M -4 -38 L 4 -38 L 8 0 L -8 0 Z" fill="#334155" />
                      {isOn && <path d="M -4 -38 L 4 -38 L 14 0 L -14 0 Z" fill="#38bdf8" opacity="0.15" />}
                    </g>
                  ))}
                </g>
                
                {/* RESONANCE CORE SPARK */}
                {isOn && (
                  <circle r="9" fill="#38bdf8" filter="url(#glowCore)">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="0.05s" repeatCount="indefinite" />
                    <animate attributeName="r" values="7;11;7" dur="0.8s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            </g>

            {/* STATUS DASHBOARD */}
            <g transform="translate(85, 40)">
              <rect x="0" y="0" width="150" height="100" rx="20" fill="#000" stroke="#1e293b" />
              {isOn ? (
                <g>
                  {/* Digital Spectrum Bars */}
                  {[...Array(18)].map((_, i) => (
                    <rect key={i} x={18 + i * 7} y={50 - Math.random() * 25} width="3" height={10 + Math.random() * 40} fill="#38bdf8" opacity="0.7">
                      <animate attributeName="height" values="5;45;5" dur={`${0.3 + Math.random() * 0.4}s`} repeatCount="indefinite" />
                      <animate attributeName="y" values="47;27;47" dur={`${0.3 + Math.random() * 0.4}s`} repeatCount="indefinite" />
                    </rect>
                  ))}
                </g>
              ) : (
                <text x="75" y="55" textAnchor="middle" fill="#334155" fontSize="8" fontWeight="bold" className="uppercase tracking-[0.4em]">Standby</text>
              )}
            </g>
          </g>
        </svg>
      </div>

      {/* FLOATING TELEMETRY */}
      <div className="absolute top-12 right-12 flex flex-col gap-4 z-30">
        <div className="bg-black/90 backdrop-blur-2xl border border-slate-800 p-5 rounded-[2rem] shadow-2xl min-w-[200px] border-l-4 border-l-blue-500">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
              <Wind size={14} className="text-blue-400" /> Flow Velocity
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-white">
              {isOn ? (118.5 + (density * 0.6) + Math.random()).toFixed(1) : "0.0"}
            </span>
            <span className="text-[12px] text-blue-500 font-black italic tracking-tighter">m/s</span>
          </div>
        </div>

        <div className="bg-black/90 backdrop-blur-2xl border border-slate-800 p-5 rounded-[2rem] shadow-2xl min-w-[200px] border-l-4 border-l-cyan-500">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
              <Droplets size={14} className="text-cyan-400" /> Intake Rate
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-white">
              {isOn ? (density * 0.98).toFixed(1) : "0.0"}
            </span>
            <span className="text-[12px] text-cyan-500 font-black italic tracking-tighter">%</span>
          </div>
        </div>
      </div>

      {/* SYSTEM STATUS */}
      <div className="absolute bottom-12 left-12 flex items-center gap-4 z-30 bg-black/80 border border-slate-800 px-6 py-4 rounded-[1.5rem] backdrop-blur-xl">
         <div className={`p-2 rounded-full ${isOn ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
            <Activity size={18} className={isOn ? 'animate-pulse' : ''} />
         </div>
         <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Processing Mode</span>
            <span className="text-xs font-bold text-slate-200">
              {isOn ? (isCleaning ? "AUTO_CLEANING_ACTIVE" : "VORTEX_ABSORPTION") : "CORE_DORMANT"}
            </span>
         </div>
      </div>
    </div>
  );
};

export default DeviceAnimation;
