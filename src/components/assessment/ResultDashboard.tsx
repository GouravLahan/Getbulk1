'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GeneratedPlan, 
  WorkoutDay 
} from '../../lib/plan-generator';
import PremiumButton from '../ui/PremiumButton';
import GlassCard from '../ui/GlassCard';
import { 
  Flame, 
  ChevronRight, 
  RefreshCcw,
  Utensils,
  Calendar,
  Zap,
  CheckCircle2,
  Activity,
  Award
} from 'lucide-react';

interface Props {
  plan: GeneratedPlan;
  onReset: () => void;
}

const ResultDashboard: React.FC<Props> = ({ plan, onReset }) => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const handleStartProgram = () => {
    setIsInitializing(true);
    setTimeout(() => {
      setIsInitializing(false);
      setIsStarted(true);
    }, 2000);
  };

  const handleEnterDashboard = async () => {
    setIsInitializing(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('getbulk_temp_plan', JSON.stringify(plan));
    }
    await new Promise(resolve => setTimeout(resolve, 1500));
    window.location.href = '/dashboard';
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-7xl mx-auto flex flex-col space-y-16 pb-24"
    >
      <AnimatePresence mode="wait">
        {isStarted && (
          <motion.div 
            key="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-3xl"
          >
            <GlassCard className="p-12 text-center max-w-md border-primary/30">
              <CheckCircle2 size={80} className="text-primary mx-auto mb-8 animate-bounce" />
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">Protocol <span className="text-primary not-italic">Engineered</span></h2>
              <p className="text-text-muted mb-8 uppercase font-black text-[10px] tracking-[0.2em] leading-loose opacity-60">
                Your elite transformation has been initialized. Redirecting to your high-performance training hub...
              </p>
              <PremiumButton 
                onClick={handleEnterDashboard}
                className="w-full"
              >
                {isInitializing ? "Initializing..." : "Enter Training Hub"}
              </PremiumButton>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/[0.05] pb-12">
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-4 text-primary mb-2">
            <Award size={48} className="animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              ELITE TRAINING<br /><span className="text-primary not-italic">BLUEPRINT</span>
            </h1>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex gap-4">
           <GlassCard className="px-6 py-3 rounded-full flex items-center gap-2 border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary italic">Live Optimization Active</span>
           </GlassCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Workout Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {plan.weeklySchedule.map((day: WorkoutDay) => (
            <motion.div 
              key={day.day}
              variants={itemVariants}
            >
              <GlassCard 
                className={`p-8 h-full transition-all duration-500 ${
                  day.muscleGroups[0] === 'Rest & Recovery' 
                    ? 'opacity-40 grayscale' 
                    : 'hover:border-primary/40 hover:shadow-primary/5'
                }`}
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">
                    {day.day}
                  </span>
                  {day.muscleGroups[0] !== 'Rest & Recovery' && (
                    <Zap size={16} className="text-primary" />
                  )}
                </div>

                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-8 group-hover:text-primary transition-colors">
                  {day.muscleGroups.join(' + ')}
                </h3>

                {day.muscleGroups[0] !== 'Rest & Recovery' && (
                  <ul className="grid grid-cols-1 gap-4 list-none p-0 m-0">
                    {day.exercises.map((ex: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] group/item hover:border-primary/20 transition-all">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0 group-hover/item:scale-150 transition-transform" />
                        <span className="text-[11px] font-bold uppercase tracking-wide text-text-muted group-hover/item:text-white transition-colors">
                          {ex}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Main Nutrition Card */}
          <motion.div 
            variants={itemVariants}
            className="group"
          >
            <GlassCard className="p-10 border-primary/20 relative overflow-hidden bg-primary/[0.03]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <Utensils size={40} className="mb-12 text-primary opacity-40" />
              
              <div className="space-y-2 mb-8">
                 <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
                   FUELING<br />STRATEGY
                 </h2>
              </div>

              <div className="flex items-baseline gap-2 mb-12">
                <span className="text-8xl font-black italic tracking-tighter leading-none text-primary">
                  {plan.nutrition.calories}
                </span>
                <span className="text-xl font-black uppercase tracking-widest italic text-text-muted">KCAL</span>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
                {[
                  { label: 'PRO', val: `${plan.nutrition.protein}g` },
                  { label: 'CARB', val: `${plan.nutrition.carbs}g` },
                  { label: 'FAT', val: `${plan.nutrition.fats}g` }
                ].map((stat: { label: string; val: string }) => (
                  <div key={stat.label}>
                     <div className="text-2xl font-black tracking-tighter text-white mb-1">{stat.val}</div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Recovery Optimization Pod */}
          <motion.div 
            variants={itemVariants}
          >
            <GlassCard className="p-10 space-y-10">
              <h3 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-3">
                <Activity className="text-primary" size={20} /> ADAPTATION METRICS
              </h3>
              
              <div className="space-y-8">
                {[
                  { icon: <Zap size={20} />, label: 'HYPERTROPHY', text: plan.recovery[0] },
                  { icon: <Flame size={20} />, label: 'METABOLIC', text: plan.recovery[2] },
                  { icon: <Award size={20} />, label: 'ENDURANCE', text: plan.lifestyle[0] },
                ].map((item: any, i: number) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <div className="space-y-1 pt-1">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-primary transition-colors">{item.label}</h4>
                      <p className="text-[11px] text-text-muted font-bold tracking-tight opacity-60 leading-relaxed group-hover:opacity-100 transition-opacity">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
             <PremiumButton 
              onClick={handleStartProgram}
              className="w-full"
             >
                {isInitializing ? <RefreshCcw className="animate-spin" size={16} /> : "INITIALIZE PROGRAM"}
             </PremiumButton>

             <button 
              onClick={onReset}
              className="w-full h-14 border border-white/10 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] text-text-muted hover:bg-white/[0.05] hover:text-white transition-all flex items-center justify-center gap-3"
             >
               <RefreshCcw size={14} className="opacity-40" /> RESET ASSESSMENT
             </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultDashboard;

