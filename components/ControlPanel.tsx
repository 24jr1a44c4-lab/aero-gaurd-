
import React, { useState, useEffect } from 'react';
import { FogCondition, TemperatureLevel, AccuracyLevel, EfficiencyLevel, EnvironmentMode, SensorTier, SensorData, PlantType, DeviceStats } from '../types';
import { Thermometer, Droplets, Zap, Waves, CloudFog, Activity } from 'lucide-react';

interface Props {
  condition: FogCondition;
  setCondition: (c: FogCondition) => void;
  tempLevel: TemperatureLevel;
  setTempLevel: (t: TemperatureLevel) => void;
  accuracyLevel: AccuracyLevel;
  setAccuracyLevel: (a: AccuracyLevel) => void;
  efficiencyLevel: EfficiencyLevel;
  setEfficiencyLevel: (e: EfficiencyLevel) => void;
  plantType: PlantType;
  setPlantType: (p: PlantType) => void;
  sensorData: SensorData;
  stats: DeviceStats;
  mode: EnvironmentMode;
  setMode: (m: EnvironmentMode) => void;
  tier: SensorTier;
  setTier: (t: SensorTier) => void;
}

const ControlPanel: React.FC<Props> = ({ 
  condition, setCondition, 
  tempLevel, setTempLevel, 
  accuracyLevel, setAccuracyLevel,
  efficiencyLevel, setEfficiencyLevel,
  plantType, setPlantType,
  sensorData, stats, mode, setMode, 
  tier, setTier 
}) => {
  const [history, setHistory] = useState<number[]>(new Array(20).fill(0));

  // Update power history for the graph
  useEffect(() => {
    setHistory(prev => {
      const newHistory = [...prev.slice(1), stats.powerConsumption];
      return newHistory;
    });
  }, [stats.powerConsumption]);

  const maxPower = Math.max(...history, 1);

  return (
    <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-6">
      <div>
        <h2 className="text-lg font-black mb-4 flex items-center gap-2 uppercase italic tracking-tighter">
           Operation Context
        </h2>

        {/* FOG DENSITY REAL-TIME GAUGE */}
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] text-slate-400 font-black uppercase flex items-center gap-2">
              <CloudFog size={14} className="text-slate-500" /> Live Fog Density
            </label>
            <span className={`text-sm font-mono font-bold ${sensorData.fogDensity > 70 ? 'text-red-400' : sensorData.fogDensity > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {sensorData.fogDensity.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden p-[2px] border border-slate-700">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                sensorData.fogDensity > 70 ? 'bg-gradient-to-r from-red-600 to-red-400' : 
                sensorData.fogDensity > 30 ? 'bg-gradient-to-r from-amber-600 to-amber-400' : 
                'bg-gradient-to-r from-emerald-600 to-emerald-400'
              }`}
              style={{ width: `${sensorData.fogDensity}%` }}
            />
          </div>
        </div>

        {/* POWER CONSUMPTION REAL-TIME GRAPH */}
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 mb-6">
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] text-slate-400 font-black uppercase flex items-center gap-2">
              <Activity size={14} className="text-yellow-500" /> Power Usage (kWh)
            </label>
            <span className="text-xs font-mono font-bold text-yellow-400">
              {stats.powerConsumption.toFixed(3)}
            </span>
          </div>
          <div className="h-20 flex items-end gap-1 px-1">
            {history.map((val, i) => (
              <div 
                key={i}
                className="flex-1 bg-yellow-500/30 rounded-t-sm transition-all duration-300"
                style={{ height: `${(val / maxPower) * 100}%`, minHeight: '2px' }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 px-1">
            <span className="text-[7px] text-slate-600 font-bold uppercase">History (20s)</span>
            <span className="text-[7px] text-slate-600 font-bold uppercase">Real-time</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] text-slate-500 font-black uppercase block flex items-center gap-1">
              <Waves size={10} /> Set Environment
            </label>
            <div className="flex flex-col gap-2">
              <button onClick={() => setCondition(FogCondition.LOW)} className={`px-3 py-2 rounded-xl text-[8px] font-black border transition-all ${condition === FogCondition.LOW ? 'bg-slate-400 border-slate-300' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>LOW FOG</button>
              <button onClick={() => setCondition(FogCondition.MODERATE)} className={`px-3 py-2 rounded-xl text-[8px] font-black border transition-all ${condition === FogCondition.MODERATE ? 'bg-slate-500 border-slate-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>MED FOG</button>
              <button onClick={() => setCondition(FogCondition.HIGH)} className={`px-3 py-2 rounded-xl text-[8px] font-black border transition-all ${condition === FogCondition.HIGH ? 'bg-slate-600 border-slate-500' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>HIGH FOG</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] text-slate-500 font-black uppercase block flex items-center gap-1">
              <Zap size={10} /> Core Efficiency
            </label>
            <div className="flex flex-col gap-2">
              <button onClick={() => setEfficiencyLevel(EfficiencyLevel.HIGH)} className={`px-3 py-2 rounded-xl text-[8px] font-black border transition-all ${efficiencyLevel === EfficiencyLevel.HIGH ? 'bg-yellow-500 border-yellow-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>MAX</button>
              <button onClick={() => setEfficiencyLevel(EfficiencyLevel.MEDIUM)} className={`px-3 py-2 rounded-xl text-[8px] font-black border transition-all ${efficiencyLevel === EfficiencyLevel.MEDIUM ? 'bg-orange-500 border-orange-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>BALANCED</button>
              <button onClick={() => setEfficiencyLevel(EfficiencyLevel.LOW)} className={`px-3 py-2 rounded-xl text-[8px] font-black border transition-all ${efficiencyLevel === EfficiencyLevel.LOW ? 'bg-red-500 border-red-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>ECO</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] text-slate-500 font-black uppercase block">Heat Intensity</label>
            <div className="flex flex-col gap-2">
              <button onClick={() => setTempLevel(TemperatureLevel.LOW)} className={`px-3 py-2 rounded-xl text-[8px] font-black border transition-all ${tempLevel === TemperatureLevel.LOW ? 'bg-indigo-500 border-indigo-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>SOFT</button>
              <button onClick={() => setTempLevel(TemperatureLevel.HIGH)} className={`px-3 py-2 rounded-xl text-[8px] font-black border transition-all ${tempLevel === TemperatureLevel.HIGH ? 'bg-red-500 border-red-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>INTENSE</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] text-slate-500 font-black uppercase block">Sensor Logic</label>
            <div className="flex flex-col gap-2">
              <button onClick={() => setAccuracyLevel(AccuracyLevel.HIGH)} className={`px-3 py-2 rounded-xl text-[8px] font-black border transition-all ${accuracyLevel === AccuracyLevel.HIGH ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>ULTRA</button>
              <button onClick={() => setAccuracyLevel(AccuracyLevel.MEDIUM)} className={`px-3 py-2 rounded-xl text-[8px] font-black border transition-all ${accuracyLevel === AccuracyLevel.MEDIUM ? 'bg-cyan-500 border-cyan-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>STANDARD</button>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-6 border-t border-slate-700 mt-4">
          <label className="text-[9px] text-slate-500 font-black uppercase block mb-3 text-center">Agricultural Target Select</label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setPlantType(PlantType.ROOT_CROP)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-[9px] font-black uppercase transition-all border ${
                plantType === PlantType.ROOT_CROP ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'
              }`}
            >
              <span>Root Crop</span>
              <span className="opacity-50 text-[7px]">Conduction</span>
            </button>
            <button
              onClick={() => setPlantType(PlantType.SUCCULENT)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-[9px] font-black uppercase transition-all border ${
                plantType === PlantType.SUCCULENT ? 'bg-amber-500 border-amber-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'
              }`}
            >
              <span>Succulent</span>
              <span className="opacity-50 text-[7px]">Radiation</span>
            </button>
            <button
              onClick={() => setPlantType(PlantType.TROPICAL_FERN)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-[9px] font-black uppercase transition-all border ${
                plantType === PlantType.TROPICAL_FERN ? 'bg-teal-500 border-teal-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'
              }`}
            >
              <span>Tropical Fern</span>
              <span className="opacity-50 text-[7px]">Convection</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
            <Thermometer size={18} />
          </div>
          <div>
            <p className="text-[9px] text-slate-500 uppercase font-bold">Ambient Temp</p>
            <p className="font-mono text-sm">{sensorData.temperature.toFixed(1)}°C</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
            <Droplets size={18} />
          </div>
          <div>
            <p className="text-[9px] text-slate-500 uppercase font-bold">Ambient RH</p>
            <p className="font-mono text-sm">{sensorData.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
