'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface Message {
  text: string;
  role: 'user' | 'coach';
}

const CoachCorner = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome back. How's your recovery feeling today?", role: 'coach' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, role: 'user' }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { text: data.response, role: 'coach' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Connection error. Coach is offline.", role: 'coach' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <GlassCard className="flex flex-col h-[500px] w-full max-w-xl mx-auto border-primary/20 shadow-primary/5">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Bot className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest">Coach's Corner</h3>
            <span className="text-[10px] text-primary font-bold animate-pulse">● AI Performance Advisor</span>
          </div>
        </div>
        <Sparkles className="text-white/20" size={20} />
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-thin scrollbar-thumb-white/10"
      >
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed
                ${m.role === 'user' 
                  ? 'bg-primary text-background' 
                  : 'bg-white/5 border border-white/10 text-white/80'}
              `}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-2">
              <Loader2 className="animate-spin text-primary" size={16} />
              <span className="text-[10px] uppercase font-bold text-white/40">Analyzing Data...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your hypertrophy split..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary/50 transition-all font-medium"
        />
        <button 
          onClick={handleSend}
          aria-label="Send message"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-background flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <Send size={14} />
        </button>
      </div>

    </GlassCard>
  );
};

export default CoachCorner;
