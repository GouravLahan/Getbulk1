'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ShieldCheck, Code2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import ArchitectEngine from '../ui/ArchitectEngine';

const Architect = () => {
  return (
    <section className="py-40 bg-background relative overflow-hidden">
      {/* Topographic Detail Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,500 C200,400 400,600 600,500 C800,400 1000,600 1000,500" stroke="var(--primary)" fill="none" strokeWidth="0.5" />
          <path d="M0,600 C200,500 400,700 600,600 C800,500 1000,700 1000,600" stroke="var(--primary)" fill="none" strokeWidth="0.5" />
          <path d="M0,400 C200,300 400,500 600,400 C800,300 1000,500 1000,400" stroke="var(--primary)" fill="none" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 blur-[150px] rounded-full animate-mesh" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/5 blur-[120px] rounded-full animate-mesh" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Innovative Architect Visual */}
          <div className="flex-1 order-2 lg:order-1">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="relative"
             >
                <ArchitectEngine />

                {/* Floating Badge */}
                <motion.div 
                   initial={{ x: 20, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5, duration: 0.8 }}
                   className="absolute -top-10 -right-10 bg-primary px-8 py-4 rounded-none border border-black text-black font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl skew-x-[-12deg] z-20"
                >
                   ENGINEERED BY G.L.
                </motion.div>
             </motion.div>
          </div>

          {/* Content Side */}
          <div className="flex-1 order-1 lg:order-2 space-y-12">
             <div className="space-y-6">
                <motion.div 
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="flex items-center gap-4 text-primary"
                >
                   <Code2 size={24} />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em]">ELITE DEVELOPMENT CYCLE</span>
                </motion.div>
                <motion.h2 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                   className="text-6xl font-black uppercase italic tracking-tighter leading-[0.85]"
                >
                   FOUNDER'S <br />
                   <span className="text-primary tracking-[-0.08em]">VISION</span>
                </motion.h2>
                <div className="relative">
                   <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-primary/20" />
                   <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="text-text-muted text-lg leading-relaxed max-w-lg mb-8 italic"
                   >
                      "GETBULK is not just software; it's a digital manifestation of discipline. 
                      I engineered this system to remove the guesswork from progress, 
                      blending high-tech analytics with the raw energy of elite training."
                   </motion.p>
                   {/* Digital Signature Simulation */}
                   <motion.div 
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: "auto", opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, duration: 1.5 }}
                      className="text-3xl font-serif italic text-primary/80 tracking-widest pl-4 border-l-4 border-primary/40 select-none"
                   >
                      Gourav Lahan
                   </motion.div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.6 }}
                   className="flex items-start gap-4 group"
                >
                   <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <MapPin size={20} />
                   </div>
                   <div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-1 opacity-40">HQ LOCATION</div>
                      <div className="text-sm font-bold uppercase tracking-tight text-white">ASSAM, INDIA</div>
                   </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.7 }}
                   className="flex items-start gap-4 group"
                >
                   <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <Mail size={20} />
                   </div>
                   <div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-1 opacity-40">DIRECT ACCESS</div>
                      <a href="mailto:Gauravgetbulk@gmail.com" className="text-sm font-bold uppercase tracking-tight text-white hover:text-primary transition-colors">Gauravgetbulk@gmail.com</a>
                   </div>
                </motion.div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architect;
