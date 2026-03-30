'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Dumbbell, 
  Compass, 
  Activity, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

import GlassCard from '../ui/GlassCard';

const Benefits = () => {
  const benefits = [
    { 
      Icon: GraduationCap, 
      title: 'Free Fitness Knowledge', 
      description: 'Access high-quality training resources without any subscription fees.' 
    },
    { 
      Icon: Dumbbell, 
      title: 'Structured Workout Programs', 
      description: 'Follow professionally designed plans tailored to your specific goals.' 
    },
    { 
      Icon: Compass, 
      title: 'Beginner Friendly Guidance', 
      description: 'Step-by-step instructions that make starting your fitness journey easy.' 
    },
    { 
      Icon: Activity, 
      title: 'Home & Gym Options', 
      description: 'Whether you have a full gym or just your bodyweight, we have you covered.' 
    },
    { 
      Icon: Zap, 
      title: 'Science-Based Training', 
      description: 'Programs built on proven physiological principles for maximum results.' 
    },
    { 
      Icon: CheckCircle2, 
      title: 'Clear Exercise Instructions', 
      description: 'Master every move with detailed form guides and injury prevention tips.' 
    },
  ];

  return (
    <section id="benefits" className="py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-24"
        >
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Proven Methodology</span>
          <h2 className="text-[var(--text-xl)] font-black mb-6 uppercase tracking-tighter leading-none italic">
            Why Train With <span className="text-primary">GetBulk</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full shadow-[0_0_20px_rgba(212,255,0,0.6)]" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, idx) => (
            <GlassCard
              key={benefit.title}
              delay={0.1 * idx}
              className="group !p-10 hover:!bg-white/[0.02]"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="mb-10 relative z-10 inline-block text-primary p-4 rounded-2xl bg-primary/5 border border-primary/10 shadow-[0_0_20px_rgba(212,255,0,0.1)] group-hover:shadow-[0_0_30px_rgba(212,255,0,0.2)] transition-shadow duration-500"
              >
                <benefit.Icon size={32} strokeWidth={2} />
              </motion.div>
              
              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter italic group-hover:text-primary transition-colors duration-500">
                {benefit.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-500 font-medium">
                {benefit.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
