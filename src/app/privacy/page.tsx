'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import DynamicBackground from '../../components/ui/DynamicBackground';
import { motion } from 'framer-motion';
import GlassCard from '../../components/ui/GlassCard';

const PrivacyPage = () => {
  return (
    <main className="relative min-h-screen bg-background text-white">
      <DynamicBackground />
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-4">PRIVACY <span className="text-primary">POLICY</span></h1>
            <p className="text-text-muted uppercase tracking-[0.3em] text-xs font-black italic">Last Updated: March 30, 2026</p>
          </motion.div>

          <div className="space-y-12">
            <GlassCard className="!p-10 border-white/5">
              <h2 className="text-2xl font-black uppercase italic tracking-wider mb-6 text-primary underline decoration-2 underline-offset-8">01. Data Collection</h2>
              <p className="text-text-muted leading-relaxed mb-6">
                GetBulk collects minimal personal information required to sustain your fitness journey. This includes your name, 
                fitness goals, and body metrics provided during the assessment. We utilize Clerk for secure authentication 
                and Supabase for high-performance data persistence.
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-3 pl-4">
                <li>Authenticated Profile Information</li>
                <li>Fitness Goal & Assessment Metadata</li>
                <li>Time-Series Body Metrics (Weight, Fat %)</li>
                <li>Workout Logs & Progression History</li>
              </ul>
            </GlassCard>

            <GlassCard className="!p-10 border-white/5">
              <h2 className="text-2xl font-black uppercase italic tracking-wider mb-6 text-primary underline decoration-2 underline-offset-8">02. Data Usage</h2>
              <p className="text-text-muted leading-relaxed">
                Your data is exclusively used to power the GetBulk engine. We do not sell, trade, or distribute your training 
                data to third parties. Every metric is locked behind Clerk’s elite authentication layer and Supabase’s 
                Row-Level Security (RLS). 
              </p>
            </GlassCard>

            <GlassCard className="!p-10 border-white/5">
              <h2 className="text-2xl font-black uppercase italic tracking-wider mb-6 text-primary underline decoration-2 underline-offset-8">03. Success Tracking</h2>
              <p className="text-text-muted leading-relaxed">
                We use PostHog for internal product analytics to understand which features help athletes the most. 
                This data is anonymized and used only to improve the system's architecture. 
              </p>
            </GlassCard>

            <GlassCard className="!p-10 border-white/5">
              <h2 className="text-2xl font-black uppercase italic tracking-wider mb-6 text-primary underline decoration-2 underline-offset-8">04. Your Rights</h2>
              <p className="text-text-muted leading-relaxed">
                You maintain absolute sovereignty over your training data. You can delete your profile and all associated 
                metrics at any time through the Command Center. 
              </p>
            </GlassCard>
            
            <div className="text-center pt-10">
               <p className="text-text-muted/40 uppercase tracking-[0.4em] text-[10px] font-black">
                  Questions? Contact our architect at <br />
                  <a href="mailto:Gauravgetbulk@gmail.com" className="text-primary hover:text-white transition-colors">Gauravgetbulk@gmail.com</a>
               </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPage;
