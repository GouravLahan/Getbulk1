'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDashboardData } from '../../actions/dashboard';
import GlassCard from '../../../components/ui/GlassCard';
import { Utensils, Apple, Coffee, Moon } from 'lucide-react';

const NutritionPlanPage = () => {
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getDashboardData();
      if (data?.profile?.assessment_data) {
        setPlan(data.profile.assessment_data.nutrition);
      }
      setIsLoading(false);
    }
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-[0_0_20px_rgba(212,255,0,0.2)]" />
      </div>
    );
  }

  if (!plan) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-text-muted mb-4 opacity-50">
        <Utensils size={40} strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-black italic uppercase tracking-tighter">No Nutrition Plan Found</h2>
      <p className="text-text-muted max-w-xs text-sm font-medium">Please complete your initial fitness assessment to generate your custom fueling protocol.</p>
    </div>
  );

  const icons = [<Coffee key="0" />, <Apple key="1" />, <Utensils key="2" />, <Moon key="3" />];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="space-y-16 pb-20"
    >
      <header className="space-y-6">
        <div className="flex items-center gap-4 text-primary">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(212,255,0,0.1)]">
            <Utensils size={20} strokeWidth={2} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">Hyper-Personalized Protocol</span>
        </div>
        <h1 className="text-[var(--text-2xl)] font-black uppercase italic tracking-tighter leading-tight text-premium-glow">
          FUELING<br />YOUR AMBITION
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Macros summary */}
        <div className="lg:col-span-12 xl:col-span-4">
          <GlassCard className="!p-12 h-full bg-primary flex flex-col justify-between border-none shadow-[0_40px_100px_-20px_rgba(212,255,0,0.25)] relative overflow-hidden group">
            {/* Animated Swirl in BG */}
            <div className="absolute -top-[20%] -right-[20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-black/50 mb-4">DAILY TARGET</div>
              <div className="text-7xl font-black italic tracking-tighter text-black flex items-end gap-2 leading-none mb-10">
                {plan.calories.toLocaleString()} 
                <span className="text-[20px] not-italic text-black/40 font-black tracking-widest pb-1 uppercase">KCAL</span>
              </div>
              
              <div className="space-y-8 pt-10 border-t border-black/[0.08]">
                <div className="flex justify-between items-center group/item">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black/5 border border-black/10 flex flex-col items-center justify-center">
                      <span className="text-[9px] font-bold text-black/40 uppercase">PRO</span>
                    </div>
                    <div>
                      <div className="text-2xl font-black italic text-black leading-none">{plan.protein}G</div>
                      <div className="text-[9px] font-black text-black/30 uppercase tracking-[0.1em] mt-1">PROTEIN</div>
                    </div>
                  </div>
                  <div className="h-1 lg:w-32 bg-black/[0.1] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-black/60 rounded-full" 
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center group/item">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black/5 border border-black/10 flex flex-col items-center justify-center">
                      <span className="text-[9px] font-bold text-black/40 uppercase">CARB</span>
                    </div>
                    <div>
                      <div className="text-2xl font-black italic text-black leading-none">{plan.carbs}G</div>
                      <div className="text-[9px] font-black text-black/30 uppercase tracking-[0.1em] mt-1">CARBS</div>
                    </div>
                  </div>
                  <div className="h-1 lg:w-32 bg-black/[0.1] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-black/40 rounded-full" 
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center group/item">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black/5 border border-black/10 flex flex-col items-center justify-center">
                      <span className="text-[9px] font-bold text-black/40 uppercase">FAT</span>
                    </div>
                    <div>
                      <div className="text-2xl font-black italic text-black leading-none">{plan.fats}G</div>
                      <div className="text-[9px] font-black text-black/30 uppercase tracking-[0.1em] mt-1">FATS</div>
                    </div>
                  </div>
                  <div className="h-1 lg:w-32 bg-black/[0.1] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "40%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full bg-black/20 rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Meal Structure */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-10">
           <div className="flex items-center gap-6 group">
             <h3 className="text-3xl font-black uppercase italic tracking-tighter">MEAL STRUCTURE</h3>
             <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-primary/20 transition-colors duration-1000" />
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {plan.mealStructure?.map((meal: string, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: idx * 0.15,
                    ease: [0.21, 0.47, 0.32, 0.98] 
                  }}
                >
                  <GlassCard className="!p-10 h-full flex flex-col gap-8 !bg-white/[0.01] hover:!bg-white/[0.03] group/card">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-primary group-hover/card:scale-110 group-hover/card:bg-primary/5 group-hover/card:border-primary/20 transition-all duration-500 shadow-xl">
                        {icons[idx] || <Utensils size={24} />}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 group-hover/card:text-primary/40 transition-colors">PHASE {idx + 1}</span>
                    </div>
                    <div className="space-y-4">
                       <p className="text-lg font-bold leading-relaxed italic text-white/90 group-hover/card:text-white transition-colors">{meal}</p>
                    </div>
                    <div className="mt-auto pt-6 border-t border-white/[0.03] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">OPTIMIZED ABSORPTION</span>
                    </div>
                  </GlassCard>
                </motion.div>
             ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NutritionPlanPage;
