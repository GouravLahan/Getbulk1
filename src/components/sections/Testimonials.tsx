'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { supabase } from '../../lib/supabase';

const ELITE_TESTIMONIALS = [
  {
    name: "MARCUS CHEN",
    role: "ELITE POWERLIFTER",
    text: "THE PROGRESSION ENGINE IN GETBULK IS UNMATCHED. I'VE GAINED 12KG OF LEAN MASS IN 4 MONTHS.",
    rating: 5,
    img: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    name: "SARAH JENKINS",
    role: "HYBRYID ATHLETE",
    text: "FINALLY A PLATFORM THAT TREATS NUTRITION AND TRAINING AS A SINGLE UNIT. THE UX IS SILKY SMOOTH.",
    rating: 5,
    img: "https://i.pravatar.cc/150?u=sarah"
  }
];

const Testimonials = () => {
  const [userFeedback, setUserFeedback] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!supabase) return;
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (data) setUserFeedback(data);
    };

    fetchFeedback();

    // Enable Realtime Subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'testimonials'
        },
        (payload: any) => {
          console.log("New Echo Received via Realtime:", payload.new);
          setUserFeedback((prev) => [payload.new, ...prev].slice(0, 10));
        }
      )
      .subscribe((status: string) => {
        console.log("Realtime Subscription Status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const allTestimonials = [...ELITE_TESTIMONIALS, ...userFeedback];

  return (
    <section id="testimonials" className="py-40 bg-transparent overflow-hidden relative">
      <div className="container mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-4 text-primary mb-6"
        >
          <div className="h-[1px] w-12 bg-primary/30" />
          <span className="text-[10px] font-black uppercase tracking-[0.6em]">GLOBAL IMPACT</span>
          <div className="h-[1px] w-12 bg-primary/30" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-black uppercase italic tracking-tighter"
        >
          ATHLETE <span className="text-primary">ECHO</span>
        </motion.h2>
      </div>

      <div className="flex relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-10 whitespace-nowrap px-5"
        >
          {[...allTestimonials, ...allTestimonials].map((t, i) => (
            <GlassCard 
              key={i} 
              className="w-[450px] shrink-0 !p-10 border-primary/10 hover:border-primary/40 transition-colors group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="flex gap-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <Quote size={40} className="text-white/5 opacity-40 group-hover:text-primary/20 transition-colors" />
              </div>

              <p className="whitespace-normal text-lg font-bold text-white/80 leading-relaxed mb-10 italic uppercase border-l-2 border-primary/20 pl-6 group-hover:border-primary transition-colors relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-all bg-bg-alt">
                  <img 
                    src={t.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=d4ff00&color=000&bold=true`} 
                    alt={t.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                    {t.name}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/60">
                    {t.role || 'Athlete'}
                  </div>
                </div>
              </div>
              
              {/* Subtle Scanline Overlay for user feedback */}
              {!t.img && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,255,0,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20" />
              )}
            </GlassCard>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-primary/5 blur-[250px] pointer-events-none -z-10" />
    </section>
  );
};

export default Testimonials;
