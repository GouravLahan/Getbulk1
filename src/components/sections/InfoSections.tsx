'use client';

import React from 'react';
import { motion } from 'framer-motion';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const Nutrition = () => {
  const nutritionCards = [
    { title: 'Protein Optimization', description: 'How much you need and the best sources for muscle repair.' },
    { title: 'Calorie Balance', description: 'Understanding the math behind weight gain and fat loss.' },
    { title: 'Bulking & Cutting', description: 'Safe strategies for body recomposition at any stage.' },
    { title: 'Meal Planning', description: 'Simple ways to prep your weekly food without stress.' },
  ];

  return (
    <section id="nutrition" className="py-24 bg-bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">
            Fuel Your Body <span className="text-primary italic">Properly</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg opacity-80 mb-8">
            Nutrition is the foundation of your fitness success. Learn the basics with our expert guides.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {nutritionCards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                transition: { duration: 0.3 } 
              }}
              className="p-10 bg-background rounded-3xl border border-white/[0.03] hover:border-primary/20 transition-all duration-500 shadow-xl shadow-black/20"
            >
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed opacity-70">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const AgeGroups = () => {
  const ages = [
    { title: 'Teen Fitness', p: 'Building a healthy foundation for young athletes.' },
    { title: 'Adult Strength', p: 'Functional power for the demands of daily life.' },
    { title: 'Beginner 0-1', p: 'Getting started from zero with safe, smart progression.' },
    { title: '40+ Mobility', p: 'Protecting joints while maintaining strength and vitality.' },
  ];

  return (
    <section id="age-groups" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-16 uppercase tracking-tight">
            Fitness for Every <span className="text-primary italic">Age Group</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ages.map((age) => (
            <motion.div
              key={age.title}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              className="p-10 border border-white/[0.03] bg-bg-secondary/40 backdrop-blur-sm rounded-3xl hover:bg-bg-secondary/80 transition-all duration-500 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-125 transition-transform duration-500">
                <span className="text-xl font-black italic">!</span>
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter italic">
                {age.title}
              </h3>
              <p className="text-text-muted text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                {age.p}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
