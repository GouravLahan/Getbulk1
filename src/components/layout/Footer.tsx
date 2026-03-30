'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const FinalCTA = () => {
  return (
    <section id="final-cta" className="py-32 bg-background relative overflow-hidden border-t border-white/[0.05]">
      <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full translate-y-1/2 opacity-30" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-9xl font-black mb-10 tracking-tighter"
        >
          Your Journey <br /><span className="text-primary italic">Starts Now</span>
        </motion.h2>
        <p className="text-text-muted text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed">
          Start training smarter with structured workouts and clear guidance. No credit card required.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Link href="#start" className="btn btn-primary bg-primary text-background px-12 py-6 text-xl shadow-primary-glow">
            Start Training for Free
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const links = [
    { 
      title: 'Platform', 
      items: [
        { name: 'Workouts', href: '/#workouts' },
        { name: 'Library', href: '/#library' },
        { name: 'Nutrition', href: '/#nutrition' },
        { name: 'Programs', href: '/#programs' },
        { name: 'Community', href: '/community' }
      ] 
    },
    { 
      title: 'About', 
      items: [
        { name: 'About GetBulk', href: '/about' },
        { name: 'Contact Us', href: 'mailto:Gauravgetbulk@gmail.com' },
        { name: 'Privacy Policy', href: '/privacy' }
      ] 
    },
  ];

  return (
    <footer className="py-20 bg-background border-t border-white/[0.05]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="logo text-3xl font-bold mb-6 tracking-tighter uppercase">
            Get<span className="text-primary">Bulk</span>
          </div>
          <p className="text-text-muted max-w-sm leading-relaxed">
            Empowering anyone to build strength and discipline through free, science-based fitness education.
          </p>
        </div>
        {links.map((group) => (
          <div key={group.title}>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-primary">{group.title}</h4>
            <ul className="space-y-4">
              {group.items.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-text-muted hover:text-primary transition-colors text-sm font-semibold tracking-wide">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container mx-auto px-6 pt-12 border-t border-white/[0.02] flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-text-muted/50 text-xs font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} GetBulk. All rights reserved.
        </p>
        <div className="flex gap-8">
          {['Twitter', 'Instagram', 'Discord'].map((social) => (
            <span key={social} className="text-text-muted/30 hover:text-primary transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest">
              {social}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};
