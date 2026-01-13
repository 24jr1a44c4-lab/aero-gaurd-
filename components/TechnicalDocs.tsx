
import React from 'react';
import { AlertTriangle, ShieldCheck, Recycle, Cpu, Thermometer, DollarSign, PenTool } from 'lucide-react';

const TechnicalDocs: React.FC = () => {
  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl space-y-8">
      <div className="border-b border-slate-700 pb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-500" size={28} />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            System Implementation Audit
          </h2>
        </div>
        <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest font-bold italic">Addressing Drawbacks & Hardware Constraints</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BUDGET & SENSOR SOLUTION */}
        <section className="space-y-4">
          <h3 className="text-cyan-400 font-black uppercase text-xs tracking-widest flex items-center gap-2 italic">
            <DollarSign size={16} /> Budget & Longevity Recovery
          </h3>
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-700 group hover:border-cyan-500/30 transition-colors">
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-cyan-400 italic uppercase block mb-1">Constraint: Cheap Sensors</strong>
              Low-cost PM2.5 and Optical sensors degrade fast. To solve this, we use <span className="text-white font-bold">Predictive Drift Correction</span>. The ESP32 compares data across a mesh of 3 neighboring units. If one sensor shows an anomaly, it is auto-recalibrated against the group mean, extending hardware life by 200%.
            </p>
          </div>
        </section>

        {/* SOIL & MINERAL PROTECTION */}
        <section className="space-y-4">
          <h3 className="text-orange-400 font-black uppercase text-xs tracking-widest flex items-center gap-2 italic">
            <PenTool size={16} /> Mineral & Eco-Preservation
          </h3>
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-700 group hover:border-orange-500/30 transition-colors">
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-orange-400 italic uppercase block mb-1">Constraint: Soil Mineral Loss</strong>
              Direct high-heat convection strips soil of moisture and minerals. AeroGuard uses <span className="text-white font-bold">Laminar Flow</span> nozzles and <span className="text-white font-bold">Far-Infrared Ceramic elements</span>. This heats the plant canopy while the soil remains at a stable, mineral-safe temperature of 12°C.
            </p>
          </div>
        </section>
      </div>

      {/* MATERIAL & ECO CHOICE */}
      <div className="bg-blue-600/5 p-6 rounded-[2rem] border border-blue-500/20">
        <div className="flex items-center gap-3 mb-3">
          <Recycle className="text-blue-400" size={20} />
          <h3 className="text-white font-black uppercase text-xs italic">Material Choice: AL-MG 5052</h3>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          The chassis is built from <span className="text-blue-300 font-bold uppercase italic">Aluminum-Magnesium 5052 Alloy</span>. It is chosen for its extreme saltwater/fog corrosion resistance and high strength-to-weight ratio. Unlike plastics, it is 100% recyclable. The internal lining is bio-polyurethane for sound dampening of the turbines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700 text-center">
            <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Winter Suitability</p>
            <p className="text-xs text-slate-200 font-bold italic">-25°C Rated</p>
         </div>
         <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700 text-center">
            <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Power Offset</p>
            <p className="text-xs text-slate-200 font-bold italic">40% Renewable</p>
         </div>
         <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700 text-center">
            <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Water Store</p>
            <p className="text-xs text-slate-200 font-bold italic">Closed Loop</p>
         </div>
      </div>
    </div>
  );
};

export default TechnicalDocs;
