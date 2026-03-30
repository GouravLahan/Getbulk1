'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Clock, 
  Activity, 
  Zap, 
  Dumbbell, 
  ChevronRight,
  Star
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import EnergyVisual from '../ui/EnergyVisual';

const MetricCard = ({ icon: Icon, label, value, className, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.8, type: "spring", bounce: 0.4 }}
    whileHover={{ y: -5, scale: 1.05 }}
    className={`absolute z-20 ${className}`}
  >
    <GlassCard className="!p-6 border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl group overflow-visible">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-[0_0_20px_rgba(212,255,0,0.2)] group-hover:bg-primary group-hover:text-black transition-all duration-500">
          <Icon size={28} />
        </div>
        <div className="space-y-1">
           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{label}</div>
           <div className="text-2xl font-black italic text-white tracking-tighter">{value}</div>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section id="home" className="relative h-screen min-h-[900px] bg-background overflow-hidden flex flex-col items-center justify-center border-b border-white/[0.03]">
      
      {/* Innovative Energy Background */}
      <div className="absolute inset-0 z-0">
        <EnergyVisual />
        {/* Atmosphere Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-background/40 to-transparent" />
      </div>

      {/* Main Typography Layer */}
      <div className="container relative z-10 flex flex-col items-center text-center">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative"
         >
            <h1 className="text-[9vw] lg:text-[7vw] font-black uppercase italic leading-[0.8] tracking-[-0.05em] mb-4">
              SCULPT <span className="text-primary text-premium-glow">YOUR</span> BODY,
            </h1>
            <h2 className="text-[9vw] lg:text-[7vw] font-black uppercase italic leading-[0.8] tracking-[-0.05em] text-white/90">
              ELEVATE <span className="text-primary text-premium-glow">YOUR</span> SPIRIT
            </h2>
         </motion.div>
      </div>

      {/* Kinetic Metric Cards */}
      <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block">
         <div className="container mx-auto h-full relative">
            <MetricCard 
               icon={Clock} 
               label="HOURS" 
               value="1.5" 
               className="top-[30%] left-[15%] pointer-events-auto" 
               delay={0.8}
            />
            <MetricCard 
               icon={Zap} 
               label="POSES" 
               value="20" 
               className="top-[30%] right-[15%] pointer-events-auto" 
               delay={1.0}
            />
            <MetricCard 
               icon={Activity} 
               label="KCAL" 
               value="550" 
               className="bottom-[30%] left-[12%] pointer-events-auto" 
               delay={1.2}
            />
            <MetricCard 
               icon={Dumbbell} 
               label="SETS" 
               value="5" 
               className="bottom-[30%] right-[12%] pointer-events-auto" 
               delay={1.4}
            />
         </div>
      </div>

      {/* Sidebar Labels */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-8 pointer-events-none hidden md:flex">
         {['P','R','E','V'].map((l, i) => (
           <span key={i} className="text-[12px] font-black text-white/10 uppercase tracking-widest">{l}</span>
         ))}
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-8 pointer-events-none hidden md:flex">
         {['N','E','X','T'].map((l, i) => (
           <span key={i} className="text-[12px] font-black text-white/10 uppercase tracking-widest">{l}</span>
         ))}
      </div>

      {/* Bottom UI Bar */}
      <div className="absolute bottom-16 left-0 right-0 z-30 pointer-events-none">
         <div className="container mx-auto px-10 flex justify-between items-end">
            
            {/* 12k+ Happy Spirits Rating */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1.5, duration: 1 }}
               className="flex flex-col gap-4 pointer-events-auto"
            >
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-background overflow-hidden bg-bg-alt">
                      <img src={`https://i.pravatar.cc/100?img=${i+40}`} alt="Rating User" className="w-full h-full object-cover grayscale" />
                    </div>
                  ))}
               </div>
               <div className="space-y-1">
                  <div className="flex items-center gap-2">
                     <span className="text-4xl font-black italic tracking-tighter text-white">12k+</span>
                     <div className="flex text-primary">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                     </div>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">HAPPY SPIRITS TRANSFORMED</div>
               </div>
            </motion.div>

            {/* Let's Start CTA */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1.7, duration: 1 }}
               className="pointer-events-auto"
            >
               <button 
                 onClick={() => window.location.href = '/start-training'}
                 className="group flex items-center gap-8 bg-primary hover:bg-white text-black px-12 py-8 rounded-[40px] shadow-[0_30px_70px_rgba(212,255,0,0.3)] transition-all duration-700 hover:scale-105 active:scale-95"
               >
                  <span className="text-xl font-black uppercase italic tracking-tighter">LET'S START</span>
                  <div className="flex">
                    <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                    <ChevronRight size={28} className="-ml-4 opacity-40 group-hover:translate-x-1 transition-transform" />
                    <ChevronRight size={28} className="-ml-4 opacity-20 group-hover:translate-x-1 transition-transform" />
                  </div>
               </button>
            </motion.div>
         </div>
      </div>

      <div className="absolute inset-0 grit-overlay opacity-20 pointer-events-none" />
    </section>
  );
};

export default Hero;
