'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CoachCorner from '../ai/CoachCorner';

const CoachDemo = () => {
  return (
    <section id="coach" className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">
                Your AI <span className="text-primary not-italic">Fitness Oracle</span>
              </h2>
              <p className="text-lg text-text-muted mb-12 max-w-xl">
                Experience the next evolution in personal training. Our RAG-powered AI Coach analyzes your real-time performance data to provide instantaneous, elite-level coaching advice.
              </p>
              
              <ul className="space-y-6 text-left inline-block p-0 m-0">
                {[
                  'Real-time Volume Analysis',
                  'Hyper-Personalized Nutrition Protocols',
                  'Adaptive Progressive Overload Scheduling',
                  '24/7 Elite Coaching Support'
                ].map((item, i) => (
                  <li key={i} className="list-none m-0 p-0">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 text-xs font-black uppercase tracking-widest group"
                    >
                      <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all shrink-0">
                        {i + 1}
                      </div>
                      <span>{item}</span>
                    </motion.div>
                  </li>
                ))}
              </ul>


            </motion.div>
          </div>

          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <CoachCorner />
            </motion.div>
            
            {/* Background Glow */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 blur-[100px] -z-10" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachDemo;
