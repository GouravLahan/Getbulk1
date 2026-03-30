'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Library = () => {
  const [filter, setFilter] = useState('All');
  
  const exercises = [
    { name: 'Deadlift', category: 'Strength', equipment: 'Barbell' },
    { name: 'Pushups', category: 'Bodyweight', equipment: 'None' },
    { name: 'Squats', category: 'Strength', equipment: 'Barbell' },
    { name: 'Plank', category: 'Core', equipment: 'None' },
    { name: 'Pullups', category: 'Bodyweight', equipment: 'Bar' },
    { name: 'Rows', category: 'Strength', equipment: 'Dumbbell' },
  ];

  const categories = ['All', 'Strength', 'Bodyweight', 'Core'];

  const filteredExercises = filter === 'All' 
    ? exercises 
    : exercises.filter(ex => ex.category === filter);

  return (
    <section id="library" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Exercise <span className="text-primary italic">Library</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto opacity-70">
            Master your form with our database of 100+ expert-verified exercises.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                filter === cat 
                  ? 'bg-primary text-background border-primary shadow-lg shadow-primary/20' 
                  : 'bg-white/5 text-text-muted border-white/10 hover:border-primary/40'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredExercises.map((ex, index) => (
              <motion.div
                key={ex.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group p-8 bg-bg-secondary/40 backdrop-blur-sm rounded-3xl border border-white/[0.04] hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {ex.category}
                  </div>
                  <div className="text-text-muted text-[10px] uppercase font-bold tracking-widest opacity-40">
                    {ex.equipment}
                  </div>
                </div>
                
                <h3 className="relative z-10 text-2xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                  {ex.name}
                </h3>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  className="h-0.5 bg-primary/20 mt-4 mb-6"
                />
                
                <a href="#" className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-colors flex items-center gap-2 group/link">
                  View Guide
                  <motion.span 
                    whileHover={{ x: 5 }}
                    className="inline-block"
                  >→</motion.span>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Library;
