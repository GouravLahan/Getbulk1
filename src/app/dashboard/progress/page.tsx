'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDashboardData } from '../../actions/dashboard';
import GlassCard from '../../../components/ui/GlassCard';
import { Activity, TrendingDown, TrendingUp, BarChart, History } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

const ProgressPage = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const dbData = await getDashboardData();
      if (dbData) {
        setData(dbData);
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

  const metrics = data?.metrics || [];
  const logs = data?.logs || [];
  const startWeight = metrics[0]?.weight || 0;
  const currentWeight = metrics[metrics.length - 1]?.weight || 0;
  const totalDifference = currentWeight - startWeight;

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Activity size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">PROGRESS ANALYTICS</span>
        </div>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-tight">
          CHARTING<br />THE EVOLUTION
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weight Progression */}
        <div className="lg:col-span-8">
          <GlassCard className="p-10 border-white/[0.05] h-full">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-40">METRIC ANALYSIS</span>
                <h3 className="text-2xl font-black uppercase italic">WEIGHT PROGRESSION</h3>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-2 ${totalDifference <= 0 ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                {totalDifference <= 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                {Math.abs(totalDifference).toFixed(1)} KG OVERALL
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.length ? metrics : [{ logged_at: '', weight: 0 }]}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4FF00" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D4FF00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                  <XAxis 
                    dataKey="logged_at" 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    tickFormatter={(val) => new Date(val).toLocaleDateString()}
                  />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#ffffff20" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    labelStyle={{ color: '#ffffff40', fontWeight: 'bold' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-white/10 p-3 rounded-lg">
                            <p className="text-[10px] font-black uppercase text-text-muted mb-1">{payload[0].payload.logged_at}</p>
                            <p className="text-sm font-black text-primary">{payload[0].value} KG</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#D4FF00" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorWeight)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-4 space-y-6">
           <GlassCard className="p-8 border-white/[0.05]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-primary">
                   <BarChart size={20} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">SUMMARY</div>
              </div>
              <div className="space-y-6">
                <div>
                   <div className="text-xs font-black uppercase opacity-60 mb-1">Total Workouts</div>
                   <div className="text-4xl font-black italic">{logs.length}</div>
                </div>
                <div>
                   <div className="text-xs font-black uppercase opacity-60 mb-1">Consistency Score</div>
                   <div className="text-4xl font-black italic text-primary">94%</div>
                </div>
              </div>
           </GlassCard>

           <GlassCard className="p-8 border-white/[0.05] flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-primary">
                   <History size={20} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">STRENGTH HISTORY</div>
              </div>
              <div className="space-y-6">
                 {logs.slice(0, 5).map((log: any, i: number) => (
                    <div key={i} className="space-y-3 pb-4 border-b border-white/[0.03] last:border-0">
                       <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black uppercase tracking-wider text-primary">{log.workout_name}</span>
                          <span className="text-[9px] font-bold text-text-muted">{new Date(log.completed_at).toLocaleDateString()}</span>
                       </div>
                       <div className="space-y-1 pl-2 border-l border-primary/20">
                          {log.exercises?.map((ex: any, idx: number) => (
                             <div key={idx} className="flex justify-between items-center text-[10px]">
                                <span className="font-bold opacity-60 text-white">{ex.name}</span>
                                <span className="italic font-black text-primary">
                                   {ex.data?.weight || '0'}KG × {ex.data?.reps || '0'}
                                </span>
                             </div>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
