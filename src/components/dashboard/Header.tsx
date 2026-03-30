'use client';

import React from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Zap, 
  ChevronDown 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  user?: {
    full_name?: string;
    email?: string;
  };
}

const Header: React.FC<Props> = ({ user }) => {
  return (
    <header className="h-24 sticky top-0 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05] z-30 px-10 flex items-center justify-between">
      {/* Search Bar Placeholder */}
      <div className="relative w-96 group hidden md:block">
        <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Search workouts or nutrition..." 
          className="w-full h-12 bg-white/[0.03] border border-white/[0.05] rounded-2xl pl-12 pr-5 text-sm font-medium focus:outline-none focus:border-primary/20 transition-all placeholder:text-[10px] placeholder:font-black placeholder:uppercase placeholder:tracking-widest"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Quick Stats Summary */}
        <div className="hidden lg:flex items-center gap-8 mr-8">
           <div className="text-right">
              <div className="text-[9px] font-[900] uppercase tracking-[0.2em] text-text-muted mb-1 opacity-50">STREAK</div>
              <div className="flex items-center gap-2 text-primary font-black uppercase text-xs">
                <Zap size={14} className="fill-current" />
                12 DAYS
              </div>
           </div>
           <div className="text-right">
              <div className="text-[9px] font-[900] uppercase tracking-[0.2em] text-text-muted mb-1 opacity-50">NEXT SESSION</div>
              <div className="text-white font-black uppercase text-xs">TODAY, 6:00 PM</div>
           </div>
        </div>

        {/* Notifications */}
        <button 
          title="Notifications"
          aria-label="View notifications"
          className="relative p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-all group"
        >
          <Bell size={20} className="text-text-muted group-hover:text-white transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary ring-4 ring-[#050505] animate-pulse" />
        </button>

        {/* User Profile Hookup */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-4 pl-4 pr-3 py-2 bg-white/[0.03] border border-white/[0.05] rounded-2xl hover:bg-white/[0.08] transition-all"
        >
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-black uppercase tracking-widest text-white leading-none">
              {user?.full_name || 'ELITE ATHLETE'}
            </div>
            <div className="text-[8px] font-black uppercase tracking-widest text-primary mt-1 leading-none">
              PRO MEMBER
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group overflow-hidden border border-primary/20">
             <User size={20} />
          </div>
          <ChevronDown size={14} className="text-text-muted" />
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
