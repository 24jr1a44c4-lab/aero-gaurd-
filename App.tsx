
import React, { useState, useEffect } from 'react';
import { FogCondition, TemperatureLevel, AccuracyLevel, EfficiencyLevel, EnvironmentMode, SensorTier, SensorData, DeviceStats, SafetyStatus, PlantType } from './types';
import DeviceAnimation from './components/DeviceAnimation';
import ControlPanel from './components/ControlPanel';
import TechnicalDocs from './components/TechnicalDocs';
import JavaCodeViewer from './components/JavaCodeViewer';
import ThermalFieldVisualizer from './components/ThermalFieldVisualizer';
import WaterHarvestingVisualizer from './components/WaterHarvestingVisualizer';
import BuildInventory from './components/BuildInventory';
import PlantRequirementsTable from './components/PlantRequirementsTable';
import ProcessIntelligence from './components/ProcessIntelligence';
import { Activity, ShieldCheck, Zap, Recycle, Cpu, Eye, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  const [condition, setCondition] = useState<FogCondition>(FogCondition.MODERATE);
  const [tempLevel, setTempLevel] = useState<TemperatureLevel>(TemperatureLevel.MODERATE);
  const [accuracyLevel, setAccuracyLevel] = useState<AccuracyLevel>(AccuracyLevel.MEDIUM);
  const [efficiencyLevel, setEfficiencyLevel] = useState<EfficiencyLevel>(EfficiencyLevel.HIGH);
  const [mode, setMode] = useState<EnvironmentMode>(EnvironmentMode.URBAN);
  const [plantType, setPlantType] = useState<PlantType>(PlantType.ROOT_CROP);
  const [tier, setTier] = useState<SensorTier>(SensorTier.PREMIUM);
  const [isCleaning, setIsCleaning] = useState(false);
  
  const [sensorData, setSensorData] = useState<SensorData>({
    humidity: 85,
    visibility: 200,
    pm25: 120,
    temperature: -2,
    fogDensity: 65
  });
  
  const [stats, setStats] = useState<DeviceStats>({
    powerConsumption: 0,
    renewableOffset: 0,
    waterCollected: 0,
    filtrationEfficiency: 98,
    soilMineralSafety: 100,
    filterClogLevel: 5,
    meshNodes: 12
  });

  const roadClearView = Math.min(100, Math.floor(sensorData.visibility / 10));

  useEffect(() => {
    switch (condition) {
      case FogCondition.LOW:
        setAccuracyLevel(AccuracyLevel.HIGH);
        setSensorData(prev => ({ ...prev, fogDensity: 20, visibility: 800 }));
        break;
      case FogCondition.MODERATE:
        setAccuracyLevel(AccuracyLevel.MEDIUM);
        setSensorData(prev => ({ ...prev, fogDensity: 50, visibility: 350 }));
        break;
      case FogCondition.HIGH:
        setAccuracyLevel(AccuracyLevel.LOW);
        setSensorData(prev => ({ ...prev, fogDensity: 85, visibility: 50 }));
        break;
    }
  }, [condition]);

  useEffect(() => {
    let interval: any;
    if (isOn && !isCleaning) {
      interval = setInterval(() => {
        const recoveryPotential = sensorData.fogDensity / 100; 
        const powerMult = mode === EnvironmentMode.HIGHWAY ? 1.5 : 1.0;
        const tempMult = tempLevel === TemperatureLevel.HIGH ? 1.8 : tempLevel === TemperatureLevel.LOW ? 0.6 : 1.0;
        const effMult = efficiencyLevel === EfficiencyLevel.HIGH ? 1.5 : efficiencyLevel === EfficiencyLevel.LOW ? 0.5 : 1.0;
        const accuracyMult = accuracyLevel === AccuracyLevel.HIGH ? 1.2 : 0.8;
        
        const baseConsumption = ((condition === FogCondition.HIGH ? 0.08 : 0.04) * powerMult * tempMult * effMult);
        const greenEnergy = baseConsumption * 0.4;

        setSensorData(prev => ({
          ...prev,
          temperature: tempLevel === TemperatureLevel.HIGH ? Math.min(25, prev.temperature + 0.1) : prev.temperature,
          fogDensity: Math.max(0, prev.fogDensity - (0.5 * effMult * accuracyMult)),
          visibility: Math.min(1000, prev.visibility + (5 * effMult))
        }));

        setStats(prev => ({
          ...prev,
          powerConsumption: prev.powerConsumption + (baseConsumption - greenEnergy),
          renewableOffset: prev.renewableOffset + greenEnergy,
          waterCollected: prev.waterCollected + (0.01 * recoveryPotential * effMult),
          soilMineralSafety: mode === EnvironmentMode.FIELD ? Math.max(85, prev.soilMineralSafety - 0.002) : 100,
          filterClogLevel: Math.min(100, prev.filterClogLevel + (0.05 * effMult))
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOn, isCleaning, condition, mode, efficiencyLevel, accuracyLevel, tempLevel, sensorData.fogDensity]);

  const safety = (() => {
    if (!isOn) return { level: 'Safe', message: 'System Standby' };
    if (isCleaning) return { level: 'Warning', message: 'Self-Cleaning Active' };
    if (stats.soilMineralSafety < 90) return { level: 'Critical', message: 'Thermal Soil Stress' };
    if (stats.filterClogLevel > 85) return { level: 'Warning', message: 'Maintenance Needed' };
    if (roadClearView < 20) return { level: 'Critical', message: 'Severe Visibility Warning' };
    return { level: 'Safe', message: 'Operation Normal' };
  })();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 text-slate-200">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-700 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent uppercase italic">
              AeroGuard
            </h1>
            <span className="bg-slate-800 text-slate-500 text-[10px] px-2 py-0.5 rounded border border-slate-700 font-mono">DEPLOYMENT_V3.0</span>
          </div>
          <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black flex items-center gap-2">
            <Recycle size={12} /> INTELLIGENT FOG & AGRI-THERMAL INTERFACE
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border shadow-lg transition-all duration-500 ${
            safety.level === 'Safe' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' :
            safety.level === 'Warning' ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' :
            'bg-red-500/10 border-red-500/50 text-red-500'
          }`}>
            {safety.level === 'Safe' ? <ShieldCheck size={18} /> : <AlertTriangle size={18} />}
            <span className="font-bold text-xs uppercase">{safety.message}</span>
          </div>
          <button 
            onClick={() => setIsOn(!isOn)}
            className={`px-8 py-3 rounded-xl font-black transition-all shadow-xl active:scale-95 border border-white/10 ${
              isOn ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-500/20'
            }`}
          >
            {isOn ? 'STOP SYSTEM' : 'START CORE'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-[2rem] p-1 border border-slate-800 shadow-2xl overflow-hidden relative">
             <DeviceAnimation isOn={isOn} condition={condition} tempLevel={tempLevel} density={sensorData.fogDensity} mode={mode} isCleaning={isCleaning} />
          </div>

          <ProcessIntelligence />

          <WaterHarvestingVisualizer isOn={isOn} sensorData={sensorData} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase italic tracking-tighter">
                    <Eye className="text-blue-400" size={16} /> Road Visibility Metric
                  </h3>
                  <span className="text-2xl font-mono text-blue-400">{roadClearView}%</span>
               </div>
               <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700 p-1">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1000" style={{ width: `${roadClearView}%` }} />
               </div>
            </div>

            <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase italic tracking-tighter">
                    <ShieldCheck className="text-emerald-400" size={16} /> Safety Score
                  </h3>
                  <span className="text-2xl font-mono text-emerald-400">{(stats.soilMineralSafety * 0.9 + (100 - stats.filterClogLevel) * 0.1).toFixed(0)}%</span>
               </div>
               <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700 p-1">
                  <div className="h-full bg-gradient-to-r from-emerald-600 to-green-400 rounded-full transition-all duration-1000" style={{ width: `${(stats.soilMineralSafety * 0.9 + (100 - stats.filterClogLevel) * 0.1)}%` }} />
               </div>
            </div>
          </div>

          <ThermalFieldVisualizer isOn={isOn} tempLevel={tempLevel} mode={mode} plantType={plantType} density={sensorData.fogDensity} />
        </div>

        <div className="space-y-6">
          <ControlPanel 
            condition={condition} setCondition={setCondition} 
            tempLevel={tempLevel} setTempLevel={setTempLevel}
            accuracyLevel={accuracyLevel} setAccuracyLevel={setAccuracyLevel}
            efficiencyLevel={efficiencyLevel} setEfficiencyLevel={setEfficiencyLevel}
            plantType={plantType} setPlantType={setPlantType}
            sensorData={sensorData}
            stats={stats}
            mode={mode} setMode={setMode}
            tier={tier} setTier={setTier}
          />
          <PlantRequirementsTable />
        </div>
      </div>

      <BuildInventory />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TechnicalDocs />
        <JavaCodeViewer />
      </div>
    </div>
  );
};

export default App;
