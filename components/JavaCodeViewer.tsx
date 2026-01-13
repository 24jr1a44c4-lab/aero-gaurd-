
import React from 'react';
import { Terminal } from 'lucide-react';

const JavaCodeViewer: React.FC = () => {
  const javaCode = `
/**
 * AeroGuard Intelligent Fog & Pollution Processor - V4.0
 * Architecture for Budget-Conscious High-Performance Hardware
 */
public class AeroGuardSystem {
    private SensorFusion coreSensors;
    private FiltrationEngine filterCore;
    private ThermalModulator heater;
    
    // Safety Thresholds
    private static final double MAX_SOIL_CONDUCTIVITY_LOSS = 0.05;
    private static final double MIN_VISIBILITY_THRESHOLD = 20.0;

    public void runOperationCycle() {
        // 1. DATA ACQUISITION & ERROR CORRECTION
        // Uses software-defined compensation for low-cost sensor drift
        AtmosphereData data = coreSensors.getCompensatedReadings();
        
        // 2. POLLUTION FILTERING (HEPA + Activated Carbon)
        if (data.getPm25() > 100) {
            filterCore.engageHighVelocityScrubbing();
            // Pulse ultrasonic cleaning to prevent cheap filter clogging
            filterCore.triggerUltrasonicPulse(); 
        }

        // 3. FOG ABSORPTION (Adiabatic Compression)
        if (data.getFogDensity() > 40) {
            double compressionRatio = calculateEfficiency(data);
            compressHumidityToReservoir(compressionRatio);
        }

        // 4. BIOLOGICAL SAFETY (Plant Protection)
        maintainPlantVitality(data.getAmbientTemp());
    }

    private void maintainPlantVitality(double ambient) {
        if (ambient < 0) {
            // Supply Far-Infrared heat (Ceramic) instead of dry hot air
            // This prevents soil mineral leaching and dehydration
            heater.emitTargetedWavelength(32.5); 
            
            if (heater.detectSoilStress()) {
                heater.switchToLaminarPulseMode(); // Gentle thermal distribution
            }
        }
    }
}

/**
 * Handles the recovery of project drawbacks (Budget & Sensor Longevity)
 */
class CalibrationEngine {
    public double filterCheapSensorNoise(double rawValue) {
        // Kalman filter implementation to make $5 sensors perform like $50 sensors
        return kalmanUpdate(rawValue);
    }
}
`;

  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl overflow-hidden flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Terminal size={20} className="text-cyan-400" />
          </div>
          <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
            Backend Engine V4
          </h2>
        </div>
        <span className="text-[10px] font-mono bg-slate-900 px-3 py-1 rounded-full text-slate-500 border border-slate-700">
          STABLE_DISTRIBUTION
        </span>
      </div>
      
      <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto border border-slate-700/50 shadow-inner group flex-1">
        <pre className="text-[11px] font-mono text-cyan-500/80 leading-relaxed group-hover:text-cyan-400 transition-colors">
          <code>{javaCode}</code>
        </pre>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
           <h4 className="text-emerald-400 font-black text-[10px] uppercase mb-1 italic">Eco-Safe Logic</h4>
           <p className="text-[10px] text-slate-500 leading-tight">Prevents soil mineral burnout via conductivity feedback loops.</p>
        </div>
        <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20">
           <h4 className="text-blue-400 font-black text-[10px] uppercase mb-1 italic">Sensor Thrift</h4>
           <p className="text-[10px] text-slate-500 leading-tight">Software-side noise cancellation allows the use of budget ESP32 components.</p>
        </div>
      </div>
    </div>
  );
};

export default JavaCodeViewer;
