'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverAlpha?: boolean;
}

const GlassCard = ({ 
  children, 
  className = "", 
  delay = 0,
  hoverAlpha = true 
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      whileHover={hoverAlpha ? { 
        y: -5, 
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        borderColor: "rgba(212, 255, 0, 0.2)"
      } : {}}
      className={`premium-glass rounded-[2rem] p-8 transition-all duration-500 ${className}`}
    >
      {/* Glossy Reflection Overlay */}
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
