'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Bell, 
  Eye, 
  Shield, 
  Zap,
  Save,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import GlassCard from '../../../components/ui/GlassCard';
import PremiumButton from '../../../components/ui/PremiumButton';

const SettingsPage = () => {
  const { user } = useUser();
  const supabase = createClient();
  const [profile, setProfile] = useState({
    full_name: '',
    target_weight: 0,
    current_goal: ''
  });
  const [prefs, setPrefs] = useState({
    notifications: true,
    publicActivity: true,
    eliteMode: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, target_weight, current_goal')
      .eq('clerk_id', user?.id)
      .single();

    if (data) {
      setProfile(data);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('clerk_id', user?.id);

    if (error) console.error('Error saving:', error);
    setSaving(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <div>
         <div className="flex items-center gap-4 text-primary mb-2">
           <Settings size={18} />
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">SYSTEM COMMAND</span>
         </div>
         <h1 className="text-5xl font-black uppercase italic tracking-tighter">APP <span className="text-primary text-premium-glow">SETTINGS</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Left Side: Profile Information */}
         <div className="lg:col-span-2 space-y-12">
            <GlassCard className="!p-10 border-primary/20 shadow-3xl">
               <div className="flex items-center gap-6 mb-12">
                  <div className="w-20 h-20 rounded-full border-2 border-primary/20 p-2 overflow-hidden bg-bg-alt">
                     <img src={user?.imageUrl || 'https://i.pravatar.cc/100'} alt="User Avatar" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                     <div className="text-[12px] font-black uppercase tracking-[0.3em] text-primary mb-1 italic">ACTIVE OPERATOR</div>
                     <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">{user?.fullName || 'ATHLETE'}</h3>
                     <p className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-40">System Access: {user?.id.slice(-8).toUpperCase()}</p>
                  </div>
               </div>

               <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block">FULL NAME</label>
                        <input 
                          type="text" 
                          value={profile.full_name}
                          onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg font-bold text-white focus:outline-none focus:border-primary/40 transition-all uppercase italic tracking-tight"
                        />
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block">ATHLETIC GOAL</label>
                        <select 
                          value={profile.current_goal}
                          onChange={(e) => setProfile({...profile, current_goal: e.target.value})}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-4 text-lg font-bold text-white focus:outline-none focus:border-primary/40 transition-all uppercase italic tracking-tight"
                        >
                          <option value="muscle-gain">Muscle Gain</option>
                          <option value="fat-loss">Fat Loss</option>
                          <option value="strength">Strength Phase</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block">TARGET BIOMETRIC (WEIGHT KG)</label>
                     <input 
                       type="number" 
                       value={profile.target_weight}
                       onChange={(e) => setProfile({...profile, target_weight: Number(e.target.value)})}
                       className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg font-bold text-white focus:outline-none focus:border-primary/40 transition-all uppercase italic tracking-tight"
                     />
                  </div>
               </div>

               <div className="mt-12 pt-10 border-t border-white/5 flex justify-end">
                  <PremiumButton 
                    onClick={handleSave}
                    disabled={saving}
                    className="!py-4 !px-12 text-xs !shadow-lg"
                  >
                    {saving ? 'SYNCING...' : 'SAVE BIOMETRIC DATA'}
                    <Save size={14} className="ml-2" />
                  </PremiumButton>
               </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <GlassCard className="!p-8 group hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4 mb-8">
                     <Bell size={18} className="text-primary" />
                     <h3 className="text-[11px] font-black uppercase tracking-[0.4em]">SYSTEM BUZZ</h3>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[12px] font-black uppercase tracking-tight text-text-muted">ATHLETE NOTIFICATIONS</span>
                     <button 
                       onClick={() => setPrefs({...prefs, notifications: !prefs.notifications})}
                       className={`w-14 h-8 rounded-full border-2 transition-all relative ${prefs.notifications ? 'bg-primary border-primary' : 'bg-transparent border-white/20'}`}
                     >
                        <motion.div 
                          animate={{ x: prefs.notifications ? 24 : 0 }}
                          className={`w-6 h-6 rounded-full absolute top-0.5 left-0.5 ${prefs.notifications ? 'bg-black' : 'bg-text-muted'}`}
                        />
                     </button>
                  </div>
               </GlassCard>

               <GlassCard className="!p-8 group hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4 mb-8">
                     <Eye size={18} className="text-primary" />
                     <h3 className="text-[11px] font-black uppercase tracking-[0.4em]">GLOBAL VISIBILITY</h3>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[12px] font-black uppercase tracking-tight text-text-muted">PUBLIC ATHLETE PROFILE</span>
                     <button 
                       onClick={() => setPrefs({...prefs, publicActivity: !prefs.publicActivity})}
                       className={`w-14 h-8 rounded-full border-2 transition-all relative ${prefs.publicActivity ? 'bg-primary border-primary' : 'bg-transparent border-white/20'}`}
                     >
                        <motion.div 
                          animate={{ x: prefs.publicActivity ? 24 : 0 }}
                          className={`w-6 h-6 rounded-full absolute top-0.5 left-0.5 ${prefs.publicActivity ? 'bg-black' : 'bg-text-muted'}`}
                        />
                     </button>
                  </div>
               </GlassCard>
            </div>
         </div>

         {/* Right Side: Account Security & Appearance */}
         <div className="space-y-12">
            <GlassCard className="!p-8 border-primary/20">
               <div className="flex items-center gap-4 mb-10">
                  <Shield size={20} className="text-primary" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em]">ACCOUNT INTEGRITY</h3>
               </div>
               <div className="space-y-6">
                  <p className="text-[11px] font-bold text-text-muted leading-relaxed uppercase tracking-tight opacity-60">Security, emails, and passwords are managed via our elite identity provider.</p>
                  <a 
                    href="https://accounts.clerk.dev" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-primary/40 transition-all"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">ACCESS CLERK PRO</span>
                    <ExternalLink size={14} className="text-text-muted group-hover:text-primary transition-colors" />
                  </a>
               </div>
            </GlassCard>

            <div className="px-6 space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">OPERATIONAL STATUS</h4>
               <div className="space-y-4">
                  {[
                    { label: 'Database Link', status: 'Optimal', color: 'primary' },
                    { label: 'Cloud Persistence', status: 'Synced', color: 'primary' },
                    { label: 'Neural Engine', status: 'Ready', color: 'white' }
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                       <span className="text-text-muted opacity-40">{stat.label}</span>
                       <span className={stat.color === 'primary' ? 'text-primary animate-pulse' : 'text-white'}>{stat.status}</span>
                    </div>
                  ))}
               </div>
            </div>

            <GlassCard className="!p-1 justify-center relative overflow-hidden bg-primary/20 border-primary/40 p-10 flex flex-col items-center text-center">
                <Zap size={40} className="text-primary mb-6 animate-shimmer" />
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">ELITE STATUS ACTIVE</h3>
                <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-8">Access to Alpha Systems</p>
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/40" />
            </GlassCard>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;
