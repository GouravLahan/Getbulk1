'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EnergyVisual = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Central Core Glow */}
      <motion.div
        style={{ 
          x: mousePos.x * 0.5, 
          y: mousePos.y * 0.5 + (yParallax as any),
        }}
        className="relative w-[30vw] h-[30vw] min-w-[300px] min-h-[300px]"
      >
        {/* Main Orb */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary/20 rounded-full blur-[100px]"
        />
        
        {/* Inner Core */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[20%] border-2 border-primary/30 rounded-full flex items-center justify-center"
        >
          <div className="w-[10%] h-[10%] bg-primary shadow-[0_0_50px_rgba(212,255,0,0.8)] rounded-full" />
        </motion.div>

        {/* Pulse Rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1.5],
              opacity: [0.3, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 1,
              ease: "easeOut" 
            }}
            className="absolute inset-0 border border-primary/20 rounded-full"
          />
        ))}
      </motion.div>

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 opacity-40">
        <svg width="100%" height="100%" className="filter blur-sm">
          <defs>
            <filter id="energy-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
          </defs>
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              r={Math.random() * 2 + 1}
              fill="var(--primary)"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0 
              }}
              animate={{ 
                y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 20}%`],
                opacity: [0, 0.4, 0]
              }}
              transition={{ 
                duration: Math.random() * 5 + 3, 
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </svg>
      </div>

      {/* Kinetic Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
};

export default EnergyVisual;
