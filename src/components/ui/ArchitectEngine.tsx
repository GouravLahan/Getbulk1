'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ArchitectEngine = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/5 shadow-3xl">
      {/* Background Energy Flow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          <path d="M0,200 C100,100 300,300 400,200" stroke="var(--primary)" fill="none" strokeWidth="0.5">
            <animate attributeName="d" values="M0,200 C100,100 300,300 400,200; M0,200 C100,300 300,100 400,200; M0,200 C100,100 300,300 400,200" dur="10s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Central Rotating Core */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="relative w-[80%] h-[80%] max-w-[400px] max-h-[400px]"
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 border-[0.5px] border-primary/20 rounded-full" />
        <div className="absolute inset-4 border-[0.5px] border-primary/40 rounded-full border-dashed" />
        
        {/* Isometric Grid Illusion */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full opacity-10 bg-[linear-gradient(45deg,var(--primary)_1px,transparent_1px),linear-gradient(-45deg,var(--primary)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* Floating Data Points */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 3 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className="absolute w-2 h-2 bg-primary rounded-full blur-[2px]"
            style={{ 
              top: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
              left: `${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Inner "Brain" Core */}
      <div className="absolute inset-0 flex items-center justify-center">
         <motion.div
           animate={{ 
             scale: [1, 1.05, 1],
           }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="w-48 h-48 relative flex items-center justify-center"
         >
           {/* SVG Neural Map */}
           <svg width="100%" height="100%" viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(212,255,0,0.4)]">
             <circle cx="50" cy="50" r="15" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
             {[0, 60, 120, 180, 240, 300].map(angle => (
               <g key={angle} transform={`rotate(${angle} 50 50)`}>
                 <line x1="50" y1="35" x2="50" y2="20" stroke="var(--primary)" strokeWidth="0.5" />
                 <circle cx="50" cy="20" r="2" fill="var(--primary)" />
                 <line x1="50" y1="20" x2="65" y2="10" stroke="var(--primary)" strokeWidth="0.3" strokeDasharray="2" />
               </g>
             ))}
           </svg>
           
           {/* Pulsing Center */}
           <motion.div 
             animate={{ opacity: [0.4, 1, 0.4] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute w-4 h-4 bg-primary rounded-full blur-[4px]" 
           />
         </motion.div>
      </div>

      {/* Scanning Line Effect */}
      <motion.div
        animate={{ y: ['0%', '600px', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10"
      />

      {/* Overlay Labels */}
      <div className="absolute top-10 left-10 space-y-2 pointer-events-none">
        <div className="text-[8px] font-black uppercase tracking-[0.4em] text-primary">ENGINE STATUS: ONLINE</div>
        <div className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40">CALIBRATING NEURAL ARCHITECTURE...</div>
      </div>
    </div>
  );
};

export default ArchitectEngine;
