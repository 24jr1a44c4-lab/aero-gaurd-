
import React from 'react';
import { TemperatureLevel, EnvironmentMode, PlantType } from '../types';
import { Thermometer, Zap, Leaf, Waves, Sun, Wind, CloudFog } from 'lucide-react';

interface Props {
  isOn: boolean;
  tempLevel: TemperatureLevel;
  mode: EnvironmentMode;
  plantType: PlantType;
  density: number;
}

const ThermalFieldVisualizer: React.FC<Props & { density: number }> = ({ isOn, tempLevel, mode, plantType, density }) => {
  const isHighHeat = tempLevel === TemperatureLevel.HIGH;
  const isLowHeat = tempLevel === TemperatureLevel.LOW;
  
  const heatColor = isHighHeat ? "#ef4444" : isLowHeat ? "#60a5fa" : "#fbbf24";
  
  // Physics logic mapping
  const physicsLabel = 
    plantType === PlantType.ROOT_CROP ? "Thermal Conduction (Deep Soil)" :
    plantType === PlantType.SUCCULENT ? "Infrared Radiation (Surface)" :
    "Swirling Convection (Air Canopy)";

  const physicsIcon = 
    plantType === PlantType.ROOT_CROP ? <Waves size={14} className="text-orange-400" /> :
    plantType === PlantType.SUCCULENT ? <Sun size={14} className="text-amber-400" /> :
    <Wind size={14} className="text-teal-400" />;

  return (
    <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden h-[450px]">
      {/* BACKGROUND FOG LAYER (CSS based for atmosphere) */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000" style={{ opacity: density / 100 }}>
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full blur-[60px] bg-white/10 mix-blend-overlay"
            style={{
              width: `${150 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 100}px`,
              top: `${Math.random() * 60}%`,
              left: isOn ? `${40 + Math.random() * 60}%` : `${Math.random() * 100}%`,
              transition: 'left 3s ease-in-out, opacity 1s',
              animation: `drift ${10 + Math.random() * 10}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      <div className="absolute top-6 left-6 z-20 space-y-2">
        <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase italic tracking-tighter">
          <Leaf className="text-emerald-400" size={16} /> Advanced Bio-Thermal Interaction
        </h3>
        <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-slate-700/50 backdrop-blur-sm">
              {physicsIcon}
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{physicsLabel}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-slate-700/50 backdrop-blur-sm">
              <CloudFog size={14} className="text-slate-400" />
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Fog: {density.toFixed(0)}%</span>
            </div>
        </div>
      </div>

      <svg viewBox="0 0 600 350" className="w-full h-full relative z-10">
        <defs>
          <filter id="heatGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="soilGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={heatColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Soil Cross-Section */}
        <rect x="0" y="220" width="600" height="130" fill="#141414" />
        <path d="M 0 220 Q 150 215 300 220 T 600 220" fill="#141414" stroke="#262626" />
        
        {/* Strata Lines */}
        <line x1="0" y1="260" x2="600" y2="260" stroke="#1f1f1f" strokeDasharray="5 5" />
        <line x1="0" y1="300" x2="600" y2="300" stroke="#1a1a1a" />

        {/* AeroGuard Nozzle System */}
        <g transform="translate(40, 160)">
          <rect x="0" y="0" width="50" height="70" rx="6" fill="#1e293b" stroke="#334155" />
          <path d="M 50 15 L 75 10 L 75 60 L 50 55 Z" fill="#334155" />
          {isOn && (
            <circle cx="60" cy="35" r="10" fill={heatColor} filter="url(#heatGlow)">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
            </circle>
          )}
        </g>

        {/* SVG Fog Particles Layer */}
        <g opacity={density / 100}>
          {[...Array(20)].map((_, i) => {
            const startX = Math.random() * 600;
            const startY = 50 + Math.random() * 150;
            return (
              <circle key={i} r={2 + Math.random() * 5} fill="white" opacity="0.15">
                <animate 
                  attributeName="cx" 
                  from={startX} 
                  to={isOn ? (startX < 150 ? startX + 200 : startX + 50) : startX + (Math.random() * 20 - 10)} 
                  dur={`${3 + Math.random() * 5}s`} 
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="opacity" 
                  values="0;0.2;0" 
                  dur={`${4 + Math.random() * 4}s`} 
                  repeatCount="indefinite" 
                />
              </circle>
            );
          })}
        </g>

        {/* Plant Rendering Logic */}
        <g transform="translate(450, 150)">
          <g transform="translate(30, 70)">
             {[...Array(5)].map((_, i) => (
                <path 
                  key={i} 
                  d={`M 0 0 Q ${-30 + i * 15} ${20 + i * 15} ${-10 + i * 5} ${80}`} 
                  fill="none" 
                  stroke={isOn && (plantType === PlantType.ROOT_CROP || plantType === PlantType.TROPICAL_FERN) ? heatColor : "#2d2d2d"} 
                  strokeWidth="1.5"
                  opacity={isOn ? 0.8 : 0.3}
                >
                  {isOn && <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite" />}
                </path>
             ))}
          </g>

          {plantType === PlantType.ROOT_CROP && (
            <g>
              <path d="M 30 100 Q 30 70 30 70" stroke="#065f46" strokeWidth="4" />
              <path d="M 20 70 L 40 70 L 30 130 Z" fill="#ea580c" />
              {isOn && <ellipse cx="30" cy="110" rx="20" ry="30" fill={heatColor} opacity="0.1" filter="url(#heatGlow)" />}
            </g>
          )}

          {plantType === PlantType.SUCCULENT && (
            <g transform="translate(10, 50)">
              <path d="M 20 20 L 10 0 L 30 20 Z" fill="#059669" />
              <path d="M 20 20 L 30 0 L 10 20 Z" fill="#059669" />
              <path d="M 20 20 L 20 50" stroke="#065f46" strokeWidth="10" strokeLinecap="round" />
            </g>
          )}

          {plantType === PlantType.TROPICAL_FERN && (
            <g>
              <path d="M 30 100 C 0 50 60 50 30 10" fill="none" stroke="#047857" strokeWidth="4" />
              {[...Array(6)].map((_, i) => (
                <ellipse key={i} cx={20 + i * 4} cy={30 + i * 8} rx="15" ry="5" fill="#10b981" transform={`rotate(${i * 20})`} />
              ))}
            </g>
          )}
        </g>

        {/* Heat Transfer Physics Visuals */}
        {isOn && (
          <g>
            {plantType === PlantType.ROOT_CROP && (
              <g>
                {[...Array(8)].map((_, i) => (
                  <circle key={i} r="4" fill={heatColor}>
                    <animateMotion 
                      path={`M 100 240 Q 250 ${240 + Math.sin(i) * 30} 450 ${280 + Math.cos(i) * 20}`} 
                      dur={`${2 + i * 0.2}s`} 
                      repeatCount="indefinite" 
                    />
                    <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                ))}
              </g>
            )}

            {plantType === PlantType.SUCCULENT && (
              <g opacity="0.6">
                 {[...Array(12)].map((_, i) => (
                   <line 
                    key={i} 
                    x1="90" y1="195" x2="480" y2={180 + i * 5} 
                    stroke={heatColor} 
                    strokeWidth="1" 
                    strokeDasharray="4 8"
                   >
                     <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
                   </line>
                 ))}
              </g>
            )}

            {plantType === PlantType.TROPICAL_FERN && (
              <g>
                {[...Array(5)].map((_, i) => (
                   <path 
                    key={i} 
                    d={`M 100 195 C 200 ${100 + i * 20} 350 ${50 + i * 10} 480 ${150 + i * 20}`} 
                    fill="none" 
                    stroke={heatColor} 
                    strokeWidth="2" 
                    strokeDasharray="5 15"
                    opacity="0.4"
                   >
                     <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                   </path>
                ))}
              </g>
            )}
          </g>
        )}

        {/* Global Soil Glow */}
        {isOn && (
          <ellipse cx="480" cy="280" rx="100" ry="40" fill="url(#soilGlow)" filter="url(#heatGlow)">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
          </ellipse>
        )}
      </svg>

      <div className="absolute bottom-6 left-10 flex gap-6 z-20">
        <div className="flex flex-col items-center">
          <div className="w-1 h-12 bg-slate-800 rounded-full relative overflow-hidden">
             <div className="absolute bottom-0 w-full bg-orange-500 transition-all duration-1000" style={{ height: isOn ? '70%' : '5%' }} />
          </div>
          <span className="text-[8px] font-black text-slate-500 uppercase mt-2">Soil Heat</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-1 h-12 bg-slate-800 rounded-full relative overflow-hidden">
             <div className="absolute bottom-0 w-full bg-emerald-500 transition-all duration-1000" style={{ height: isOn ? '95%' : '20%' }} />
          </div>
          <span className="text-[8px] font-black text-slate-500 uppercase mt-2">Plant Vigour</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-8 text-right bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50 z-20">
        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Biological Sync</p>
        <p className="text-sm font-black text-white uppercase italic">
          {isOn ? `${plantType.replace('_', ' ')}: SECURE` : "THERMAL DORMANT"}
        </p>
      </div>
    </div>
  );
};

export default ThermalFieldVisualizer;
