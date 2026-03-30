'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDashboardData } from '../../actions/dashboard';
import GlassCard from '../../../components/ui/GlassCard';
import { Dumbbell, Calendar, Target, Zap, Lock, CheckCircle2 } from 'lucide-react';

const PlanPage = () => {
  const [plan, setPlan] = useState<any>(null);
  const [logsCount, setLogsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getDashboardData();
      if (data?.profile?.assessment_data) {
        setPlan(data.profile.assessment_data);
        setLogsCount(data.logs.length);
      }
      setIsLoading(false);
    }
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!plan) return <div>No plan found. Please complete the assessment.</div>;

  const currentProgramDay = logsCount + 1;

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Dumbbell size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">ACTIVE PROTOCOL</span>
        </div>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-tight">
          {plan.programName}
        </h1>
        <div className="flex gap-8 text-text-muted">
           <div className="flex items-center gap-2">
             <Calendar size={14} className="text-primary" />
             <span className="text-[10px] font-black uppercase tracking-widest">{plan.timeline}</span>
           </div>
           <div className="flex items-center gap-2">
             <Target size={14} className="text-primary" />
             <span className="text-[10px] font-black uppercase tracking-widest">{plan.difficulty} Difficulty</span>
           </div>
           <div className="flex items-center gap-2">
             <Zap size={14} className="text-primary" />
             <span className="text-[10px] font-black uppercase tracking-widest text-white">DAY {currentProgramDay} / 84</span>
           </div>
        </div>
      </header>

      {/* 12 Week Grid Simulation */}
      <div className="space-y-10">
        <h3 className="text-2xl font-black uppercase italic tracking-tight">TRAINING SCHEDULE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* We repeat the weekly schedule to fill the program visual, marking by program day */}
          {Array.from({ length: 28 }).map((_, globalIdx) => {
            const schedule = plan.weeklySchedule || [];
            const dayIdx = globalIdx % (schedule.length || 1);
            const day = schedule[dayIdx] || { day: 'Rest', muscleGroups: ['Rest'], exercises: [] };
            const programDay = globalIdx + 1;
            const isCompleted = programDay < currentProgramDay;
            const isCurrent = programDay === currentProgramDay;
            const isLocked = programDay > currentProgramDay;

            return (
              <motion.div 
                key={globalIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (globalIdx % 8) * 0.05 }}
              >
                <GlassCard className={`p-8 h-full flex flex-col border-white/[0.05] transition-all duration-500 ${
                  isCurrent ? 'border-primary/40 bg-primary/5 shadow-[0_0_40px_-10px_rgba(212,255,0,0.2)]' : 
                  isLocked ? 'opacity-30 grayscale pointer-events-none' : 'opacity-80'
                }`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">DAY {programDay}</span>
                      <span className="text-xs font-bold text-text-muted">{day.day}</span>
                    </div>
                    {isCompleted ? <CheckCircle2 size={16} className="text-primary" /> : isLocked ? <Lock size={16} className="text-white/20" /> : <Zap size={16} className="text-primary" />}
                  </div>
                  <h3 className="text-lg font-black uppercase italic mb-4">{day.muscleGroups.join(' & ')}</h3>
                  <ul className="space-y-2 mt-auto">
                    {day.exercises.slice(0, 3).map((ex: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] text-text-muted group">
                        <div className="w-1 h-1 bg-primary/40 rounded-full" />
                        <span className="font-medium tracking-tight truncate">{ex}</span>
                      </li>
                    ))}
                    {day.exercises.length > 3 && <li className="text-[8px] uppercase tracking-widest opacity-30 mt-1 cursor-default">+{day.exercises.length - 3} MORE MOVEMENTS</li>}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
