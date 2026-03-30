'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  CheckCircle2, 
  Trophy, 
  Activity, 
  Flame, 
  Dumbbell, 
  ChevronRight, 
  ArrowUpRight,
  Target,
  Utensils,
  Plus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { logWeight, completeWorkout, getDashboardData, logMeal } from '../actions/dashboard';
import PremiumButton from '../../components/ui/PremiumButton';
import GlassCard from '../../components/ui/GlassCard';

const DashboardPage = () => {
  const [dbData, setDbData] = useState<{ profile: any, metrics: any[], logs: any[], nutrition: any[] } | null>(null);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [weightInput, setWeightInput] = useState('');
  const [kcalInput, setKcalInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Exercise Session inputs: { [id]: { weight: '', reps: '', sets: '', notes: '' } }
  const [exerciseLogs, setExerciseLogs] = useState<Record<number, { weight: string, reps: string, sets: string, notes: string }>>({});

  // Stats derived from DB data
  const [stats, setStats] = useState({
    streak: 0,
    currentWeight: 0,
    startingWeight: 0,
    caloriesBurned: '0',
    accuracy: 0,
    todayKcal: 0,
    todayProtein: 0,
    todayCarbs: 0,
    todayFats: 0,
    targetKcal: 2850,
    targetProtein: 180,
    targetCarbs: 380,
    targetFats: 65,
    todayWorkout: {
      day: '',
      muscleGroups: ['Rest'],
      exercises: ['Recovery Walk']
    },
    programDay: 1
  });
  
  const activityFeed = [
    { user: "Alex M.", action: "crushed Legs", time: "2m ago" },
    { user: "Sarah K.", action: "logged 2800 kcal", time: "5m ago" },
    { user: "Mike R.", action: "hit 100kg Bench", time: "12m ago" },
    { user: "Jason D.", action: "started Day 12", time: "15m ago" },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (isWorkoutStarted) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isWorkoutStarted]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const data = await getDashboardData();
      if (data) {
        setDbData(data);
        calculateStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (data: { profile: any, metrics: any[], logs: any[], nutrition: any[] }) => {
    const today = new Date().toISOString().split('T')[0];
    const assessment = data.profile?.assessment_data;
    
    // Progression logic: count completed logs to find "Program Day"
    const completedLogCount = data.logs.length;
    const programDay = completedLogCount + 1; // Unlocking logic
    
    // Pick the workout based on program day (mod wrap if program ends, though we assume 84 days)
    const schedule = assessment?.weeklySchedule || [];
    const todayWorkoutIndex = (programDay - 1) % schedule.length;
    const todayWorkout = schedule[todayWorkoutIndex];

    // 1. Streak Calculation
    let streak = 0;
    if (data.logs.length > 0) {
      const uniqueDates = [...new Set(data.logs.map((l: any) => l.completed_at.split('T')[0]))].sort().reverse();
      let checkDate = new Date(today);
      for (const logDate of uniqueDates as string[]) {
        if (logDate === checkDate.toISOString().split('T')[0]) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // 2. Weight Trends
    const startingWeight = data.metrics[0]?.weight || data.profile?.assessment_data?.weight || 85.0;
    const currentWeight = data.metrics[data.metrics.length - 1]?.weight || startingWeight;

    // 3. Nutrition for TODAY
    const todayLogs = data.nutrition.filter((n: any) => n.logged_at.split('T')[0] === today);
    const todayKcal = todayLogs.reduce((acc, curr) => acc + curr.calories, 0);
    const todayProtein = todayLogs.reduce((acc, curr) => acc + (curr.protein || 0), 0);
    const todayCarbs = todayLogs.reduce((acc, curr) => acc + (curr.carbs || 0), 0);
    const todayFats = todayLogs.reduce((acc, curr) => acc + (curr.fats || 0), 0);

    setStats({
      streak,
      currentWeight,
      startingWeight,
      caloriesBurned: (data.logs.length * 450).toLocaleString(),
      accuracy: data.logs.length > 0 ? 94 : 0,
      todayKcal,
      todayProtein,
      todayCarbs,
      todayFats,
      targetKcal: assessment?.nutrition?.calories || 2850,
      targetProtein: assessment?.nutrition?.protein || 180,
      targetCarbs: assessment?.nutrition?.carbs || 380,
      targetFats: assessment?.nutrition?.fats || 65,
      todayWorkout: todayWorkout || { day: 'Rest', muscleGroups: ['Rest'], exercises: ['Recovery Walk'] },
      programDay
    });
  };

  const handleStartSession = () => {
    setIsWorkoutStarted(true);
    setTimer(0);
    setCompletedExercises([]);
    setExerciseLogs({});
  };

  const handleCompleteWorkout = async () => {
    if (completedExercises.length === 0) {
      setIsWorkoutStarted(false);
      return;
    }
    
    // Gather detailed exercises
    const detailedLogs = stats.todayWorkout.exercises.map((name, idx) => ({
      name,
      completed: completedExercises.includes(idx),
      data: exerciseLogs[idx] || { weight: '', reps: '', sets: '', notes: '' }
    }));

    try {
      const workoutName = stats.todayWorkout.muscleGroups.join(' & ') + ' session';
      await completeWorkout(workoutName, detailedLogs, Math.round(timer / 60));
      
      setCompletedExercises([]);
      setIsWorkoutStarted(false);
      setTimer(0);
      await fetchDashboardData();
    } catch (err) {
      alert('Failed to save workout');
    }
  };

  const updateExerciseLog = (idx: number, field: string, val: string) => {
    setExerciseLogs(prev => ({
      ...prev,
      [idx]: { ... (prev[idx] || { weight: '', reps: '', sets: '', notes: '' }), [field]: val }
    }));
  };

  const toggleExercise = (id: number) => {
    if (!isWorkoutStarted) return;
    setCompletedExercises(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleLogWeight = async () => {
    const val = parseFloat(weightInput);
    if (isNaN(val)) return;
    try {
      await logWeight(val);
      setWeightInput('');
      await fetchDashboardData();
    } catch (err) {
      alert('Failed to log weight');
    }
  };

  const handleLogMeal = async () => {
    const kcal = parseInt(kcalInput);
    if (isNaN(kcal)) return;
    try {
      // Simple log for now: distribute macros as 30/50/20 for demo
      const p = Math.floor((kcal * 0.3) / 4);
      const c = Math.floor((kcal * 0.5) / 4);
      const f = Math.floor((kcal * 0.2) / 9);
      await logMeal(kcal, p, c, f);
      setKcalInput('');
      await fetchDashboardData();
    } catch (err) {
      alert('Failed to log meal');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Welcome & Summary Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-12 border-b border-white/[0.03]">
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-4 text-primary group">
            <div className="w-10 h-10 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center shadow-2xl group-hover:bg-primary group-hover:text-black transition-all duration-700">
              <CheckCircle2 size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">Athlete Systems Online</span>
          </div>
          <h1 className="text-[var(--text-2xl)] font-black uppercase italic tracking-tighter leading-tight text-premium-glow">
            COMMAND<br />CENTER
          </h1>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex gap-16 pb-2">
           <div className="space-y-2 group">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted opacity-40 group-hover:text-primary/60 transition-colors">CURRENT STREAK</div>
              <div className="text-xl font-black uppercase italic tracking-wider text-primary group-hover:scale-110 transition-transform origin-left">{stats.streak} DAYS</div>
           </div>
           <div className="space-y-2 group">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted opacity-40 group-hover:text-white/60 transition-colors">PROGRAM PROGRESS</div>
              <div className="text-xl font-black uppercase italic tracking-wider text-white group-hover:scale-110 transition-transform origin-left">DAY {stats.programDay} / 84</div>
           </div>
        </motion.div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Todays Workout & Tracking */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Live System Pulse */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6 p-6 rounded-[32px] bg-white/[0.01] border border-white/[0.03] overflow-hidden group"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-bg-alt overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              ))}
            </div>
            <div className="flex-1 overflow-hidden h-5 relative">
               <AnimatePresence mode="wait">
                  <motion.div 
                    key={timer % activityFeed.length}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="absolute inset-0 flex items-center gap-2"
                  >
                    <span className="text-primary font-black uppercase text-[10px] whitespace-nowrap">{activityFeed[timer % activityFeed.length].user}</span>
                    <span className="text-text-muted font-bold text-[9px] uppercase tracking-tighter whitespace-nowrap">{activityFeed[timer % activityFeed.length].action}</span>
                    <span className="text-[8px] font-medium text-text-dim ml-auto">{activityFeed[timer % activityFeed.length].time}</span>
                  </motion.div>
               </AnimatePresence>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-[8px] font-black text-primary uppercase">Live</span>
            </div>
          </motion.div>

          {/* Today's Workout Card */}
          <GlassCard className="relative overflow-hidden group border-white/[0.05]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex justify-between items-start mb-10">
               <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">SCEDULED SESSION</div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tight">{stats.todayWorkout.muscleGroups.join(' & ')}</h2>
               </div>
               {isWorkoutStarted ? (
                 <div className="flex items-center gap-4">
                    <div className="px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-black text-primary animate-pulse flex items-center gap-2">
                       <Zap size={14} /> {formatTime(timer)}
                    </div>
                 </div>
               ) : (
                 <div className="px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] font-black uppercase tracking-widest">
                   READY TO START
                 </div>
               )}
            </div>

            <div className="space-y-6 mb-10">
              {stats.todayWorkout.exercises.map((ex, i) => (
                <div 
                  key={i} 
                  className={`p-6 rounded-[24px] border transition-all ${
                    completedExercises.includes(i) 
                      ? 'border-primary/40 bg-primary/5' 
                      : 'border-white/[0.03] bg-white/[0.01]'
                  } ${!isWorkoutStarted ? 'opacity-40 grayscale pointer-events-none' : ''}`}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          onClick={() => toggleExercise(i)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                            completedExercises.includes(i) ? 'bg-primary text-background' : 'bg-white/5 text-text-muted hover:border-primary/40 border border-transparent'
                          }`}
                        >
                          {completedExercises.includes(i) ? <CheckCircle2 size={20} /> : <div className="text-xs font-black">{i + 1}</div>}
                        </div>
                        <div className="text-base font-black uppercase tracking-tight">{ex}</div>
                      </div>
                    </div>

                    {/* Manual Inputs Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-text-muted opacity-60">WEIGHT (KG)</label>
                          <input 
                            type="number" 
                            placeholder="0"
                            value={exerciseLogs[i]?.weight || ''}
                            onChange={(e) => updateExerciseLog(i, 'weight', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2 text-xs font-black uppercase outline-none focus:border-primary/40 transition-colors"
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-text-muted opacity-60">REPS</label>
                          <input 
                            type="number" 
                            placeholder="0"
                            value={exerciseLogs[i]?.reps || ''}
                            onChange={(e) => updateExerciseLog(i, 'reps', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2 text-xs font-black uppercase outline-none focus:border-primary/40 transition-colors"
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-text-muted opacity-60">SETS</label>
                          <input 
                            type="number" 
                            placeholder="0"
                            value={exerciseLogs[i]?.sets || ''}
                            onChange={(e) => updateExerciseLog(i, 'sets', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2 text-xs font-black uppercase outline-none focus:border-primary/40 transition-colors"
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-text-muted opacity-60">NOTES</label>
                          <input 
                            type="text" 
                            placeholder="..."
                            value={exerciseLogs[i]?.notes || ''}
                            onChange={(e) => updateExerciseLog(i, 'notes', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2 text-xs font-black uppercase outline-none focus:border-primary/40 transition-colors"
                          />
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {!isWorkoutStarted ? (
                <PremiumButton 
                  onClick={handleStartSession}
                  className="w-full h-16 py-0 col-span-2"
                >
                  <span className="flex items-center justify-center gap-3">
                    START SESSION
                    <ChevronRight size={18} />
                  </span>
                </PremiumButton>
              ) : (
                <>
                  <button 
                    onClick={() => setIsWorkoutStarted(false)}
                    className="h-16 rounded-[24px] bg-white/[0.03] border border-white/[0.05] text-xs font-black uppercase transition-all hover:bg-red-500/10 hover:border-red-500/20 text-red-500"
                  >
                    CANCEL
                  </button>
                  <PremiumButton 
                    onClick={handleCompleteWorkout}
                    className="w-full h-16 py-0"
                  >
                    <span className="flex items-center justify-center gap-3">
                      SAVE SESSION
                      <CheckCircle2 size={18} />
                    </span>
                  </PremiumButton>
                </>
              )}
            </div>
          </GlassCard>

          {/* Weekly Progress Tracker */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-8">
              <div className="p-10 rounded-[48px] bg-white/[0.01] border border-white/[0.03] space-y-8 group hover:!bg-white/[0.02] transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] animate-pulse" />
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500 shadow-xl relative z-10">
                   <Target size={28} />
                </div>
                <div className="relative z-10">
                   <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3 opacity-40">TARGET ACCURACY</div>
                   <div className="text-4xl font-black uppercase italic tracking-tighter leading-none">{stats.accuracy}%</div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 relative z-10">
                   <motion.div initial={{ width: 0 }} animate={{ width: `${stats.accuracy}%` }} className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(212,255,0,0.4)]" />
                </div>
              </div>

             <div className="p-10 rounded-[48px] bg-white/[0.01] border border-white/[0.03] space-y-8 group hover:!bg-white/[0.02] transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-[50px] animate-pulse" />
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary/5 transition-all duration-500 shadow-xl relative z-10">
                   <Flame size={28} />
                </div>
                <div className="relative z-10">
                   <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3 opacity-40">CALORIES LOGGED</div>
                   <div className="text-4xl font-black uppercase italic tracking-tighter leading-none">{stats.caloriesBurned}</div>
                </div>
                <div className="flex items-center gap-3 text-secondary relative z-10">
                   <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">LIVE DATA STREAM</span>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Right Column: Metrics & Nutrition */}
        <div className="lg:col-span-5 space-y-10">
          
          {/* Body Metrics Progress Chart */}
          <motion.div 
            variants={itemVariants}
            className="p-10 rounded-[48px] bg-white/[0.02] border border-white/[0.05]"
          >
            <div className="flex justify-between items-start mb-8">
               <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">BODY PROGRESS</div>
                  <h3 className="text-xl font-black uppercase italic tracking-tight">WEIGHT TRACKER</h3>
               </div>
               <Activity className="text-primary/40" size={20} />
            </div>

            <div className="h-56 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dbData?.metrics.length ? dbData.metrics : [{ logged_at: '', weight: 0 }]}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="6 6" stroke="#ffffff03" vertical={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 10, 10, 0.9)', 
                      backdropFilter: 'blur(20px) saturate(1.8)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)', 
                      borderRadius: '20px', 
                      padding: '16px',
                      boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px var(--color-glass-shine)'
                    }}
                    labelStyle={{ display: 'none' }}
                    content={({ payload, active }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="premium-glass p-4 rounded-2xl border-primary/20">
                            <p className="text-[9px] font-black uppercase text-text-muted mb-2 tracking-widest">{payload[0].payload.logged_at}</p>
                            <div className="flex items-baseline gap-2">
                              <p className="text-2xl font-black italic text-primary leading-none">{payload[0].value}</p>
                              <span className="text-[10px] font-bold opacity-40 uppercase">KG</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="var(--primary)" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorWeight)"
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/[0.05]">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1 opacity-50">STARTING</div>
                  <div className="text-lg font-black uppercase italic">{stats.startingWeight.toFixed(1)} KG</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1 opacity-50">CURRENT</div>
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-black uppercase italic text-primary">{stats.currentWeight.toFixed(1)} KG</div>
                  </div>
                </div>
            </div>

            {/* Manual Update Input */}
            <div className="mt-6 flex gap-2">
              <input 
                type="number"
                placeholder="Log Weight (KG)"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider outline-none focus:border-primary/40 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleLogWeight()}
              />
              <button 
                onClick={handleLogWeight}
                aria-label="Log new weight entry"
                className="w-10 h-10 bg-primary text-background rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              >
                <Plus size={18} />
              </button>
            </div>
          </motion.div>

          {/* Nutrition targets Pod */}
          <motion.div 
            whileHover={{ y: -5 }}
            variants={itemVariants}
            className="p-12 rounded-[56px] bg-primary text-black space-y-10 relative overflow-hidden group shadow-[0_40px_80px_-20px_rgba(212,255,0,0.2)]"
          >
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            <div className="flex justify-between items-start relative z-10">
               <div className="space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">FUEL TARGET</div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-[0.85]">DAILY<br />SYSTEM</h3>
               </div>
               <div className="w-14 h-14 bg-black/5 border border-black/10 rounded-2xl flex items-center justify-center">
                 <Utensils className="text-black/60" size={28} />
               </div>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex items-baseline gap-3">
                 <span className="text-7xl font-black italic tracking-tighter text-black leading-none">
                    {stats.todayKcal.toLocaleString()}
                 </span>
                 <span className="text-[14px] font-black uppercase tracking-widest text-black/30 italic">
                   / {stats.targetKcal.toLocaleString()} KCAL
                 </span>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-black/10">
                 <div>
                    <div className="text-2xl font-black italic mb-1 text-black leading-none">{stats.todayProtein}g</div>
                    <div className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">PROTEIN</div>
                 </div>
                 <div>
                    <div className="text-2xl font-black italic mb-1 text-black leading-none">{stats.todayCarbs}g</div>
                    <div className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">CARBS</div>
                 </div>
                 <div>
                    <div className="text-2xl font-black italic mb-1 text-black leading-none">{stats.todayFats}g</div>
                    <div className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">FATS</div>
                 </div>
              </div>
            </div>

            <div className="relative z-10 flex gap-3">
              <input 
                type="number"
                placeholder="Log Calories"
                value={kcalInput}
                onChange={(e) => setKcalInput(e.target.value)}
                className="flex-1 bg-black/5 border border-black/10 rounded-2xl px-6 py-4 text-sm font-black placeholder:text-black/30 text-black uppercase tracking-widest outline-none focus:bg-white/20 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleLogMeal()}
              />
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogMeal}
                className="w-14 h-14 bg-black text-primary rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <Plus size={24} strokeWidth={3} />
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Quick Action Floating Button */}
      <motion.div 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="fixed bottom-10 right-10 z-50 group"
      >
        <button 
          onClick={() => {/* Open Quick Log Modal */}}
          className="w-20 h-20 bg-primary rounded-[28px] shadow-[0_20px_50px_rgba(212,255,0,0.3)] flex items-center justify-center text-black transition-all hover:shadow-[0_25px_60px_rgba(212,255,0,0.5)] active:scale-95"
        >
          <Zap size={32} strokeWidth={3} className="group-hover:animate-pulse" />
        </button>
        <div className="absolute top-1/2 right-[120%] -translate-y-1/2 px-4 py-2 bg-black border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-5 group-hover:translate-x-0 pointer-events-none">
          UNLEASH HYPER-LOG
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
