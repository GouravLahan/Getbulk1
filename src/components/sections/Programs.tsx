'use client';

import React from 'react';
import { motion } from 'framer-motion';

import GlassCard from '../ui/GlassCard';

const Programs = () => {
  const programs = [
    { title: 'Beginner Fitness Plan', difficulty: 'Beginner', description: 'The perfect starting point for those new to exercise.' },
    { title: 'Muscle Gain Program', difficulty: 'Intermediate', description: 'Hypertrophy-focused training to build serious lean mass.' },
    { title: 'Fat Loss Program', difficulty: 'All Levels', description: 'High-intensity and metabolic conditioning for weight management.' },
    { title: 'Home Workout Plan', difficulty: 'Home', description: 'Effective strength training using minimal or no equipment.' },
  ];

  return (
    <section id="workouts" className="py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-24"
        >
          <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Engineered Excellence</span>
          <h2 className="text-[var(--text-xl)] font-black mb-6 uppercase tracking-tighter leading-none italic">
            Explore Workout <span className="text-primary">Programs</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full shadow-[0_0_20px_rgba(212,255,0,0.6)]" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, idx) => (
            <GlassCard
              key={program.title}
              delay={0.15 * idx}
              className="group !p-10 flex flex-col items-start text-left !bg-white/[0.01] hover:!bg-white/[0.03]"
            >
              <div className="relative z-10 bg-primary/10 text-primary text-[9px] font-black px-5 py-2 rounded-full mb-10 uppercase tracking-[0.3em] border border-primary/20 shadow-lg shadow-primary/5">
                {program.difficulty}
              </div>
              
              <h3 className="relative z-10 text-2xl font-black mb-6 uppercase tracking-tighter leading-none italic group-hover:text-primary transition-colors duration-500">
                {program.title}
              </h3>
              
              <p className="relative z-10 text-text-muted text-sm mb-12 flex-grow leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-500 font-medium">
                {program.description}
              </p>
              
              <motion.a 
                href="/start-training" 
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "var(--color-primary)", 
                  color: "#000",
                  boxShadow: "0 15px 30px -10px rgba(212, 255, 0, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-full py-5 border border-primary/20 rounded-2xl text-center text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl overflow-hidden"
              >
                View Program
              </motion.a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
