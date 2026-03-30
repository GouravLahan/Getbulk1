'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../../components/ui/GlassCard';
import { Search, Filter, Dumbbell, Zap, Target, BookOpen } from 'lucide-react';

const EXERCISES = [
  { name: 'Bench Press', muscle: 'Chest', equipment: 'Barbell', level: 'Intermediate' },
  { name: 'Incline DB Press', muscle: 'Chest', equipment: 'Dumbbells', level: 'Beginner' },
  { name: 'Cable Fly', muscle: 'Chest', equipment: 'Cable', level: 'Beginner' },
  { name: 'Deadlift', muscle: 'Back', equipment: 'Barbell', level: 'Advanced' },
  { name: 'Lat Pulldown', muscle: 'Back', equipment: 'Machine', level: 'Beginner' },
  { name: 'Dumbbell Row', muscle: 'Back', equipment: 'Dumbbells', level: 'Beginner' },
  { name: 'Squats', muscle: 'Legs', equipment: 'Barbell', level: 'Intermediate' },
  { name: 'Leg Press', muscle: 'Legs', equipment: 'Machine', level: 'Beginner' },
  { name: 'Leg Extensions', muscle: 'Legs', equipment: 'Machine', level: 'Beginner' },
  { name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell', level: 'Intermediate' },
  { name: 'Lateral Raise', muscle: 'Shoulders', equipment: 'Dumbbells', level: 'Beginner' },
  { name: 'Bicep Curl', muscle: 'Biceps', equipment: 'Dumbbells', level: 'Beginner' },
  { name: 'Tricep Pushdown', muscle: 'Triceps', equipment: 'Cable', level: 'Beginner' },
  { name: 'Romanian Deadlift', muscle: 'Legs', equipment: 'Barbell', level: 'Intermediate' },
  { name: 'Hammer Curls', muscle: 'Biceps', equipment: 'Dumbbells', level: 'Beginner' },
  { name: 'Dips', muscle: 'Triceps', equipment: 'Bodyweight', level: 'Intermediate' },
];

const MUSCLE_GROUPS = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Biceps', 'Triceps'];

const ExerciseLibraryPage = () => {
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');

  const filteredExercises = EXERCISES.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = selectedMuscle === 'All' || ex.muscle === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <BookOpen size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">RESOURCE CENTER</span>
        </div>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-tight">
          EXERCISE<br />LIBRARY
        </h1>
      </header>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 p-8 rounded-[32px] bg-white/[0.02] border border-white/[0.05]">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-primary" size={20} />
          <input 
            type="text" 
            placeholder="Search movements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl py-4 pl-16 pr-6 text-xs font-black uppercase outline-none focus:border-primary/40 transition-all"
          />
        </div>
        
        <div className="flex border-l border-white/[0.05] pl-6 overflow-x-auto gap-2 no-scrollbar">
          {MUSCLE_GROUPS.map(muscle => (
             <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedMuscle === muscle 
                    ? 'bg-primary text-background' 
                    : 'bg-white/[0.03] text-text-muted hover:bg-white/[0.08]'
                }`}
             >
                {muscle}
             </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredExercises.map((ex, idx) => (
            <motion.div
              layout
              key={ex.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
            >
              <GlassCard className="p-8 h-full flex flex-col border-white/[0.05] hover:border-primary/40 group transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                    <Dumbbell size={24} />
                  </div>
                  <span className="text-[9px] font-black uppercase px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
                    {ex.level}
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase italic mb-2 group-hover:text-primary transition-colors">{ex.name}</h3>
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/[0.03]">
                   <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#D4FF00]">
                      <Target size={12} /> {ex.muscle}
                   </span>
                   <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-text-muted opacity-40">
                      <Zap size={12} /> {ex.equipment}
                   </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredExercises.length === 0 && (
        <div className="py-20 text-center">
            <h2 className="text-2xl font-black uppercase italic text-text-muted opacity-40">NO MOVEMENTS FOUND</h2>
            <p className="text-xs uppercase tracking-widest mt-2">Adjust your filters or search query</p>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibraryPage;
