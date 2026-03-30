'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Star, Send, X, CheckCircle } from 'lucide-react';
import GlassCard from './GlassCard';

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!supabase) {
      console.error("Supabase client is not initialized. Please check your environment variables.");
      setError("Database connection error. Please try again later.");
      return;
    }

    try {
      const { error: dbError } = await supabase.from('testimonials').insert([
        {
          name: formData.name,
          role: formData.role || 'Athlete',
          text: formData.text,
          rating: rating,
          is_verified: false
        }
      ]);

      if (dbError) {
        console.error("Supabase Insertion Error:", dbError);
        setError(`Upload failed: ${dbError.message}`);
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setFormData({ name: '', role: '', text: '' });
      }, 3000);
    } catch (err: any) {
      console.error("Unexpected submission error:", err);
      setError("An unexpected error occurred. Connecting to architecture...");
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -10 }}
        className="fixed bottom-10 right-10 z-[100] bg-primary text-background px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-primary-glow flex items-center gap-3 group"
      >
        <span className="hidden md:block">SUBMIT ECHO</span>
        <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-background/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close feedback form"
                className="absolute -top-12 right-0 text-white/40 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>

              <GlassCard className="!p-12 border-primary/20 shadow-primary-glow/5">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <CheckCircle size={80} className="text-primary mx-auto mb-6 animate-bounce" />
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">ECHO RECEIVED</h3>
                    <p className="text-text-muted">Your testimony has been synced to the global collective.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                       <h2 className="text-4xl font-black uppercase italic tracking-tighter">SUBMIT YOUR <span className="text-primary">ECHO</span></h2>
                       {error ? (
                          <p className="text-red-500 text-xs font-bold uppercase tracking-widest bg-red-500/10 p-4 rounded-xl border border-red-500/20">{error}</p>
                       ) : (
                          <p className="text-text-muted uppercase tracking-[0.2em] text-[10px] font-black">Reflect your progress to the world.</p>
                       )}
                    </div>

                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-125"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            size={28}
                            className={`transition-colors ${rating >= star ? 'fill-primary text-primary' : 'text-white/10'}`}
                          />
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <input 
                         required
                         type="text" 
                         placeholder="NAME / ALIAS"
                         value={formData.name}
                         onChange={e => setFormData({...formData, name: e.target.value})}
                         className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
                       />
                       <input 
                         type="text" 
                         placeholder="ROLE (e.g. LIFTER)"
                         value={formData.role}
                         onChange={e => setFormData({...formData, role: e.target.value})}
                         className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
                       />
                    </div>

                    <textarea 
                      required
                      placeholder="YOUR TESTIMONY..."
                      value={formData.text}
                      onChange={e => setFormData({...formData, text: e.target.value})}
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all resize-none"
                    />

                    <button 
                      type="submit"
                      className="w-full bg-primary hover:bg-white text-background py-6 rounded-[2rem] font-black uppercase italic tracking-tighter text-xl transition-all shadow-primary-glow flex items-center justify-center gap-4 group"
                    >
                      SYNC FEEDBACK
                      <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-all" />
                    </button>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackForm;
