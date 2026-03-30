'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  showChevron?: boolean;
  disabled?: boolean;
}

const PremiumButton = ({ 
  children, 
  onClick, 
  className = "", 
  variant = 'primary',
  showChevron = true,
  disabled = false
}: PremiumButtonProps) => {
  return (
    <motion.button
      whileHover={!disabled ? { 
        scale: 1.05,
        y: -3,
        boxShadow: variant === 'primary' 
          ? "0 20px 40px -10px rgba(212, 255, 0, 0.4)" 
          : "0 20px 40px -10px rgba(255, 255, 255, 0.1)"
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`
        relative overflow-hidden group px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-500
        ${variant === 'primary' 
          ? 'bg-primary text-black' 
          : 'bg-white/5 text-white border border-white/10 backdrop-blur-md'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Shimmer Sweep Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-shimmer" />
      </div>

      {/* Radial Hover Glow (Pulse) */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_0%,_transparent_70%)]" 
        style={{ 
          background: variant === 'primary' 
            ? 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(212, 255, 0, 0.15) 0%, transparent 70%)'
        }} 
      />

      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
        {showChevron && (
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        )}
      </span>
    </motion.button>
  );
};

export default PremiumButton;
