'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import DynamicBackground from '../../components/ui/DynamicBackground';
import { ShieldCheck, Zap, Heart, Activity } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

const AboutPage = () => {
  return (
    <main className="relative min-h-screen bg-background">
      <DynamicBackground />
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 bg-primary/10 px-6 py-2 rounded-full text-primary mb-8 border border-primary/20"
            >
              <Zap size={16} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">OUR MISSION</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-[8vw] font-black uppercase italic tracking-tighter leading-[0.85] mb-10"
            >
              ELITE <span className="text-primary">ENGINEERING</span> <br />
              FOR THE HUMAN SPIRIT
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-text-muted text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
            >
              GetBulk isn't just an app; it's a digital manifestation of discipline. 
              We've engineered a system that removes the guesswork from progress, 
              connecting pure data with raw physical potential.
            </motion.p>
          </div>

          {/* Philosophy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40">
             <GlassCard className="!p-12 border-white/5 space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                   <ShieldCheck size={32} />
                </div>
                <h3 className="text-4xl font-black italic uppercase tracking-tighter">DATA-DRIVEN <br />DISCIPLINE</h3>
                <p className="text-text-muted text-lg leading-relaxed">
                   We believe in the power of objective metrics. Every rep, every gram, 
                   and every second of tension is tracked to ensure the path to peak performance 
                   is visible, repeatable, and science-based.
                </p>
             </GlassCard>

             <GlassCard className="!p-12 border-white/5 space-y-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                   <Activity size={32} />
                </div>
                <h3 className="text-4xl font-black italic uppercase tracking-tighter">THE HYBRID <br />ATHLETE</h3>
                <p className="text-text-muted text-lg leading-relaxed">
                   Specialization is for insects. GetBulk is designed for the modern hybrid 
                   athlete—those who demand elite strength without sacrificing cardiovascular 
                   superiority or cognitive clarity.
                </p>
             </GlassCard>
          </div>

          {/* Founders Core Vision */}
          <div className="relative mb-40">
             <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10" />
             <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="flex-1 space-y-8">
                   <div className="inline-flex items-center gap-3 text-primary">
                      <Heart size={20} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">FOUNDER'S VISION</span>
                   </div>
                   <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
                      BUILT BY AN <br />
                      <span className="text-primary underline decoration-4 underline-offset-8">ARCHITECT</span>
                   </h2>
                   <p className="text-text-muted text-lg leading-relaxed italic">
                      "I built GetBulk because I needed a sanctuary for my own data. 
                      Standard fitness apps were too soft—too focused on marketing and not 
                      enough on the raw mechanics of the body. GetBulk is for the 3%, 
                      the ones who want to see their potential mapped in high-definition."
                   </p>
                   <div className="font-serif italic text-3xl text-primary/60 tracking-widest">— G.L.</div>
                </div>
                <div className="flex-1 w-full aspect-square relative rounded-[40px] overflow-hidden border border-white/10 group">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent z-10" />
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(212,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(212,255,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] animate-mesh" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1/2 h-1/2 border-4 border-primary/20 rounded-full animate-ping" />
                      <div className="absolute w-1/4 h-1/4 bg-primary/40 rounded-full blur-3xl animate-pulse" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
