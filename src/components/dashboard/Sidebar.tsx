'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Zap, 
  Library, 
  Utensils, 
  Activity, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import { signOut } from '../../app/auth/actions';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
    { name: 'My Workout Plan', icon: <Dumbbell size={20} />, href: '/dashboard/plan' },
    { name: 'Exercise Library', icon: <Library size={20} />, href: '/dashboard/library' },
    { name: 'Nutrition Plan', icon: <Utensils size={20} />, href: '/dashboard/nutrition' },
    { name: 'Progress Tracker', icon: <Activity size={20} />, href: '/dashboard/progress' },
    { name: 'Community', icon: <Users size={20} />, href: '/dashboard/community' },
    { name: 'Settings', icon: <Settings size={20} />, href: '/dashboard/settings' },
  ];

  return (
    <aside className="w-72 premium-glass border-r border-white/[0.03] flex flex-col h-screen fixed left-0 top-0 z-40 bg-background/40 backdrop-blur-3xl">
      {/* Sidebar Logo */}
      <div className="p-10 pb-16 pt-12 overflow-visible">
        <Link href="/" className="logo text-[2.5rem] font-black tracking-[-0.08em] uppercase block text-premium-glow group leading-none">
          Get<span className="text-primary italic transition-all duration-700 group-hover:pl-2">Bulk</span>
        </Link>
        <div className="w-12 h-1 bg-primary/40 rounded-full mt-4 group-hover:w-20 transition-all duration-700" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar relative pb-10">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`group flex items-center gap-5 px-8 py-5 rounded-[1.5rem] transition-all duration-500 relative overflow-hidden ${
                isActive 
                  ? 'text-primary' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary/5 border border-primary/10 rounded-[1.5rem] z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(212,255,0,0.8)]"
                  transition={{ type: "spring", bounce: 0.1, duration: 0.7 }}
                />
              )}
              <div className={`relative z-10 transition-transform duration-500 group-hover:scale-110 ${isActive ? 'text-primary' : 'opacity-30 group-hover:opacity-100'}`}>
                {item.icon}
              </div>
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.25em]">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Developer Attribution & Logout Footer */}
      <div className="p-8 space-y-6 border-t border-white/[0.03] bg-white/[0.01]">
        <div className="px-8 space-y-2">
            <div className="text-[8px] font-black uppercase tracking-[0.3em] text-text-muted opacity-30">Engineered By</div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white hover:text-primary transition-colors cursor-default">GOURAV LAHAN</span>
              <span className="text-[8px] font-bold text-text-muted opacity-40 uppercase tracking-widest">Assam, IN</span>
              <a href="mailto:Gauravgetbulk@gmail.com" className="text-[8px] font-medium text-primary/60 hover:text-primary transition-colors mt-1 break-all">Gauravgetbulk@gmail.com</a>
            </div>
        </div>

        <button 
          onClick={() => signOut()}
          className="w-full group flex items-center gap-5 px-8 py-5 rounded-[1.5rem] text-text-muted hover:text-red-500 hover:bg-red-500/5 transition-all duration-500 border border-transparent hover:border-red-500/10"
        >
          <LogOut size={20} className="opacity-30 group-hover:opacity-100 transition-opacity" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em]">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
