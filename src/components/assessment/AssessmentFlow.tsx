import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssessmentData } from '../../lib/plan-generator';
import PremiumButton from '../ui/PremiumButton';
import GlassCard from '../ui/GlassCard';
import { 
  ChevronRight, 
  ChevronLeft, 
  Dumbbell, 
  Target, 
  Zap, 
  User, 
  Home, 
  Building2,
  Activity
} from 'lucide-react';

interface Props {
  step: number;
  data: Partial<AssessmentData>;
  onUpdate: (data: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
  onGenerate: () => void;
}

const AssessmentFlow: React.FC<Props> = ({ step, data, onUpdate, onNext, onBack, onGenerate }) => {
  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const ProgressBanner = () => (
    <div className="w-full h-1 bg-white/5 rounded-full mb-12 overflow-hidden flex">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${(step / 6) * 100}%` }}
        className="h-full bg-primary shadow-[0_0_15px_rgba(212,255,0,0.5)]"
      />
    </div>
  );

  return (
    <div className="flex-grow flex flex-col justify-center py-12 w-full max-w-4xl mx-auto">
      <ProgressBanner />
      
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" {...slideVariants} className="text-center px-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary mx-auto mb-12 shadow-2xl shadow-primary/5 border border-primary/20"
            >
              <Zap size={40} className="fill-primary" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] uppercase tracking-tighter italic">
              UNLEASH YOUR<br /><span className="text-primary not-italic">ULTIMATE VERSION</span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-16 max-w-2xl mx-auto font-medium opacity-60 leading-relaxed">
              Analyze your physical profile and goals to generate a 100% personalized training protocol engineered for your success.
            </p>
            <PremiumButton 
              onClick={onNext}
              className="mx-auto"
            >
              Start Assessment
            </PremiumButton>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" {...slideVariants} className="max-w-xl mx-auto w-full">
            <h2 className="text-4xl font-black mb-10 text-center uppercase tracking-tighter italic flex items-center justify-center gap-4">
              <User className="text-primary" /> Personal <span className="text-primary not-italic">Profile</span>
            </h2>
            <GlassCard className="p-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-text-muted tracking-widest pl-2">Age</label>
                  <input 
                    type="number" 
                    placeholder="25"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-2xl font-black focus:border-primary/50 outline-none transition-all"
                    value={data.age || ''}
                    onChange={(e) => onUpdate({ age: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-text-muted tracking-widest pl-2">Gender</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-black focus:border-primary/50 outline-none transition-all appearance-none uppercase"
                    value={data.gender || 'male'}
                    onChange={(e) => onUpdate({ gender: e.target.value as any })}
                  >
                    <option value="male" className="bg-background text-white">Male</option>
                    <option value="female" className="bg-background text-white">Female</option>
                    <option value="other" className="bg-background text-white">Other</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-text-muted tracking-widest pl-2">Weight (KG)</label>
                  <input 
                    type="number" 
                    placeholder="75"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-2xl font-black focus:border-primary/50 outline-none transition-all"
                    value={data.weight || ''}
                    onChange={(e) => onUpdate({ weight: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-text-muted tracking-widest pl-2">Height (CM)</label>
                  <input 
                    type="number" 
                    placeholder="180"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-2xl font-black focus:border-primary/50 outline-none transition-all"
                    value={data.height || ''}
                    onChange={(e) => onUpdate({ height: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-12 w-full">
                <button 
                  onClick={onBack}
                  className="flex-1 border border-white/10 rounded-xl py-5 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <PremiumButton 
                  onClick={onNext}
                  className="flex-1"
                >
                  Next
                </PremiumButton>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" {...slideVariants} className="max-w-2xl mx-auto w-full">
            <h2 className="text-4xl font-black mb-12 text-center uppercase tracking-tighter italic">
              WHAT IS YOUR <span className="text-primary not-italic">GOAL?</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'build-muscle', label: 'Build Muscle', icon: <Zap size={24} />, desc: 'Hypertrophy focus' },
                { id: 'lose-fat', label: 'Lose Fat', icon: <Target size={24} />, desc: 'Fat loss & shreds' },
                { id: 'strength', label: 'Peak Strength', icon: <Dumbbell size={24} />, desc: 'Lifting heavy' },
                { id: 'general', label: 'General Fitness', icon: <Activity size={24} />, desc: 'Heart health' }
              ].map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => onUpdate({ goal: goal.id as any })}
                >
                  <GlassCard className={`p-6 text-left transition-all duration-300 relative overflow-hidden group ${
                    data.goal === goal.id ? 'border-primary/50 bg-primary/5' : ''
                  }`}>
                    <div className={`mb-4 ${data.goal === goal.id ? 'text-primary' : 'text-text-muted group-hover:text-white'}`}>
                      {goal.icon}
                    </div>
                    <h3 className={`font-black uppercase text-sm tracking-widest mb-1 ${data.goal === goal.id ? 'text-primary' : 'text-white'}`}>
                      {goal.label}
                    </h3>
                    <p className="text-[10px] uppercase font-black text-text-muted opacity-50">{goal.desc}</p>
                  </GlassCard>
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-12 w-full">
              <button 
                onClick={onBack} 
                className="flex-1 border border-white/10 rounded-xl py-5 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
              >
                Back
              </button>
              <PremiumButton onClick={onNext} className="flex-1">Next</PremiumButton>
            </div>
          </motion.div>
        )}

        {step >= 3 && step <= 5 && (
          <motion.div key="sgeneric" {...slideVariants} className="max-w-xl mx-auto w-full text-center">
             {step === 3 && (
               <>
                 <h2 className="text-4xl font-black mb-12 uppercase italic">Experience <span className="text-primary not-italic">Level</span></h2>
                 <div className="space-y-4">
                   {['beginner', 'intermediate', 'advanced'].map(lvl => (
                     <button
                        key={lvl}
                        onClick={() => { onUpdate({ experience: lvl as any }); onNext(); }}
                        className="w-full text-left"
                     >
                       <GlassCard className={`p-8 uppercase font-black tracking-[0.2em] transition-all flex justify-between items-center ${
                         data.experience === lvl ? 'border-primary/50 bg-primary/5 text-primary' : 'text-text-muted'
                       }`}>
                         {lvl}
                         {data.experience === lvl && <ChevronRight size={20} />}
                       </GlassCard>
                     </button>
                   ))}
                 </div>
               </>
             )}

             {step === 4 && (
               <>
                 <h2 className="text-4xl font-black mb-12 uppercase italic">Training <span className="text-primary not-italic">Location</span></h2>
                 <div className="grid grid-cols-2 gap-4">
                   {[
                     { id: 'gym', label: 'Gym', icon: <Building2 size={32} /> },
                     { id: 'home', label: 'Home', icon: <Home size={32} /> },
                   ].map(env => (
                     <button
                        key={env.id}
                        onClick={() => { onUpdate({ environment: env.id as any }); onNext(); }}
                     >
                       <GlassCard className={`p-10 uppercase font-black tracking-widest transition-all h-full flex flex-col items-center gap-4 ${
                         data.environment === env.id ? 'border-primary/50 bg-primary/5 text-primary' : 'text-text-muted'
                       }`}>
                         <div className={data.environment === env.id ? 'text-primary' : 'text-text-muted'}>{env.icon}</div>
                         {env.label}
                       </GlassCard>
                     </button>
                   ))}
                 </div>
               </>
             )}

             {step === 5 && (
               <>
                 <h2 className="text-4xl font-black mb-12 uppercase italic">Weekly <span className="text-primary not-italic">Commitment</span></h2>
                 <GlassCard className="p-8 text-left mb-12">
                    <div className="space-y-4 mb-8">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-1">Days / Week</label>
                      <input 
                        type="range" min="2" max="6" step="1" 
                        value={data.frequency || 3}
                        onChange={(e) => onUpdate({ frequency: parseInt(e.target.value) })}
                        className="w-full accent-primary h-2 rounded-full cursor-pointer"
                      />
                      <div className="text-3xl font-black uppercase italic text-primary">{data.frequency} Days</div>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-1">Duration / Session (Min)</label>
                       <div className="flex gap-2">
                         {[30, 45, 60, 90].map(d => (
                           <button 
                             key={d} 
                             onClick={() => onUpdate({ duration: d })}
                             className={`flex-1 py-4 rounded-xl text-xs font-black transition-all ${
                               data.duration === d 
                               ? 'bg-primary text-background' 
                               : 'bg-white/5 border border-white/10 hover:bg-white/10 text-text-muted'
                             }`}
                           >
                              {d}
                           </button>
                         ))}
                       </div>
                    </div>
                 </GlassCard>
                 <PremiumButton onClick={onNext} className="w-full">Continue</PremiumButton>
               </>
             )}

             {step < 5 && (
                <button onClick={onBack} className="mt-8 text-text-muted text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Go Back</button>
             )}
          </motion.div>
        )}

        {step >= 6 && (
           <motion.div key="sfinal" {...slideVariants} className="max-w-xl mx-auto w-full text-center">
             <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary mx-auto mb-12 border border-primary/20 shadow-[0_0_30px_rgba(212,255,0,0.2)]">
               <Activity size={40} className="animate-pulse" />
             </div>
             <h2 className="text-5xl font-black mb-8 uppercase italic leading-tight">ENGINEERING YOUR<br /><span className="text-primary not-italic">PROTOCOL</span></h2>
             <p className="text-text-muted uppercase font-black tracking-[0.3em] text-[10px] mb-12 opacity-60">Optimizing volume, density, and recovery cycles...</p>
             <PremiumButton 
              onClick={onGenerate}
              className="w-full hover:shadow-primary/40"
             >
               Generate My Final Plan
             </PremiumButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssessmentFlow;

