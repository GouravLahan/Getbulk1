'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  ChevronRight, 
  Globe,
  ArrowLeft,
  Activity,
  Zap,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { login, signup } from '../actions';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = isLogin ? await login(formData) : await signup(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      
      {/* Back to Home */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link 
          href="/" 
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="logo text-4xl font-black tracking-tighter uppercase inline-block">
            Get<span className="text-primary">Bulk</span>
          </Link>
          <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.3em] mt-4 opacity-60">
            {isLogin ? 'Welcome Back Elite' : 'Join The Transformation'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        name="fullName"
                        type="text" 
                        placeholder="Enter your name" 
                        required
                        className="w-full h-14 bg-white/[0.03] border border-white/[0.05] rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Age (Optional)</label>
                      <input 
                        name="age"
                        type="number" 
                        placeholder="24" 
                        className="w-full h-14 bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Goal</label>
                      <select 
                        name="goal"
                        title="Select Training Goal"
                        aria-label="Training Goal"
                        className="w-full h-14 bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 text-sm font-black uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-colors cursor-pointer appearance-none"
                      >
                        <option value="bulk" className="bg-[#0A0A0A]">Bulk</option>
                        <option value="cut" className="bg-[#0A0A0A]">Cut</option>
                        <option value="lean" className="bg-[#0A0A0A]">Lean</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    name="email"
                    type="email" 
                    placeholder="name@example.com" 
                    required
                    className="w-full h-14 bg-white/[0.03] border border-white/[0.05] rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Password</label>
                  {isLogin && (
                    <button type="button" className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    required
                    className="w-full h-14 bg-white/[0.03] border border-white/[0.05] rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-[11px] font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20"
                >
                  {error}
                </motion.p>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-primary text-background rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? (
                  <Zap className="animate-spin" size={18} />
                ) : (
                  <>
                    {isLogin ? 'ENTER DASHBOARD' : 'CREATE ACCOUNT'}
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Social Divider */}
          <div className="flex items-center gap-4 my-8 opacity-20">
            <div className="h-[1px] flex-1 bg-white" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em]">OR CONTINUE WITH</span>
            <div className="h-[1px] flex-1 bg-white" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="h-12 bg-white/[0.03] border border-white/[0.05] rounded-xl flex items-center justify-center gap-3 hover:bg-white/[0.08] transition-all group">
              <Globe size={18} className="text-text-muted group-hover:text-white transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest">Google</span>
            </button>
            <button className="h-12 bg-white/[0.03] border border-white/[0.05] rounded-xl flex items-center justify-center gap-3 hover:bg-white/[0.08] transition-all group">
              <Activity size={18} className="text-text-muted group-hover:text-white transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest">Apple</span>
            </button>
          </div>
        </div>

        {/* Footer Toggle */}
        <p className="text-center mt-10 text-text-muted text-[11px] font-medium opacity-60">
          {isLogin ? "Don't have an account?" : "Already a member?"}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-black uppercase text-[10px] tracking-widest ml-3 hover:underline"
          >
            {isLogin ? 'Sign Up Free' : 'Back to Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
