'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Send, 
  Search, 
  TrendingUp, 
  Zap, 
  Heart, 
  MessageSquare,
  Hash,
  Filter
} from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import GlassCard from '../../../components/ui/GlassCard';
import PremiumButton from '../../../components/ui/PremiumButton';

interface Post {
  id: string;
  clerk_id: string;
  user_name: string;
  user_avatar: string;
  content: string;
  category: string;
  likes_count: number;
  created_at: string;
}

const CommunityPage = () => {
  const { user } = useUser();
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Gains', 'Strategy', 'Fuel', 'Recovery'];

  useEffect(() => {
    fetchPosts();
  }, [activeCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (activeCategory !== 'All') {
      query = query.eq('category', activeCategory);
    }

    const { data, error } = await query;
    if (data) setPosts(data);
    setLoading(false);
  };

  const handlePost = async () => {
    if (!newPost.trim() || !user) return;

    const postData = {
      clerk_id: user.id,
      user_name: user.fullName || 'Athlete',
      user_avatar: user.imageUrl,
      content: newPost,
      category: activeCategory === 'All' ? 'Strategy' : activeCategory,
    };

    // Optimistic UI Update
    const tempId = Math.random().toString();
    const optimisticPost = { ...postData, id: tempId, likes_count: 0, created_at: new Date().toISOString() };
    setPosts([optimisticPost, ...posts]);
    setNewPost('');

    const { error } = await supabase.from('community_posts').insert(postData);
    if (error) {
      console.error('Error posting:', error);
      fetchPosts(); // Rollback if error
    } else {
      fetchPosts(); // Refresh for real data
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div>
           <div className="flex items-center gap-4 text-primary mb-2">
             <Users size={18} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">ATHLETE NETWORK</span>
           </div>
           <h1 className="text-5xl font-black uppercase italic tracking-tighter">GLOBAL <span className="text-primary text-premium-glow">BUZZ</span></h1>
        </div>
        
        <div className="flex gap-10">
           <div className="text-center group">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted opacity-30 mb-1 group-hover:opacity-100 transition-opacity">Active Athletes</div>
              <div className="text-2xl font-black italic">12,842</div>
           </div>
           <div className="text-center group">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted opacity-30 mb-1 group-hover:opacity-100 transition-opacity">Daily Insights</div>
              <div className="text-2xl font-black italic text-primary">842</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
         {/* Main Feed */}
         <div className="xl:col-span-2 space-y-10">
            {/* Post Composer */}
            <GlassCard className="!p-8 border-primary/20 shadow-xl group">
               <div className="flex gap-6 mb-6">
                 <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-all">
                   <img src={user?.imageUrl || 'https://i.pravatar.cc/100'} alt="User" />
                 </div>
                 <textarea 
                   placeholder="SHARE YOUR ELITE STRATEGY..."
                   value={newPost}
                   onChange={(e) => setNewPost(e.target.value)}
                   className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-white/10 font-bold italic uppercase text-lg min-h-[80px] resize-none"
                 />
               </div>
               <div className="flex justify-between items-center pt-6 border-t border-white/5">
                 <div className="flex gap-4">
                    {categories.slice(1).map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-[8px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-all ${
                          activeCategory === cat ? 'bg-primary text-black border-primary' : 'bg-white/5 border-white/10 text-text-muted hover:border-primary/40'
                        }`}
                      >
                        #{cat}
                      </button>
                    ))}
                 </div>
                 <PremiumButton 
                    onClick={handlePost}
                    className="!py-4 !px-8 text-xs !shadow-lg"
                 >
                    DEPLOY INSIGHT
                 </PremiumButton>
               </div>
            </GlassCard>

            {/* Category Filter Desktop */}
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar lg:justify-start">
               {categories.map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all ${
                     activeCategory === cat ? 'bg-primary text-black shadow-[0_0_20px_rgba(212,255,0,0.4)]' : 'bg-[#0a0a0a] border border-white/5 text-text-muted hover:text-white hover:border-primary/20'
                   }`}
                 >
                   {cat === 'All' ? <Zap size={14} /> : <Hash size={14} />}
                   {cat}
                 </button>
               ))}
            </div>

            {/* Feed */}
            <div className="space-y-8 min-h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center p-20 opacity-20">
                  <Zap size={40} className="animate-spin text-primary" />
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {posts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                    >
                      <GlassCard className="!p-8 group hover:border-primary/30 transition-all border-white/5">
                        <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/10 group-hover:border-primary transition-all duration-700">
                               <img src={post.user_avatar || 'https://i.pravatar.cc/100'} alt={post.user_name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                             </div>
                             <div>
                               <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white">{post.user_name}</div>
                               <div className="text-[9px] font-bold text-primary/60 uppercase tracking-widest flex items-center gap-2">
                                 <Zap size={10} /> PRO ATHLETE
                               </div>
                             </div>
                          </div>
                          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="pl-16 relative">
                           <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-primary/10 group-hover:bg-primary/40 transition-colors" />
                           <p className="text-xl font-bold text-white/90 leading-relaxed mb-8 italic uppercase tracking-tight">
                             {post.content}
                           </p>
                           <div className="inline-flex px-4 py-2 bg-primary/10 rounded-lg text-[9px] font-black text-primary uppercase tracking-[0.2em] border border-primary/20">
                             #{post.category}
                           </div>
                        </div>

                        <div className="flex gap-10 mt-10 pt-8 border-t border-white/5 pl-16">
                           <button className="flex items-center gap-3 text-text-muted hover:text-red-500 transition-colors group/btn">
                              <Heart size={16} className="group-hover/btn:fill-red-500 transition-all" />
                              <span className="text-[10px] font-black uppercase tracking-[0.1em]">{post.likes_count || 0} Likes</span>
                           </button>
                           <button className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors group/btn">
                              <MessageSquare size={16} className="group-hover/btn:fill-primary transition-all" />
                              <span className="text-[10px] font-black uppercase tracking-[0.1em]">Share Insight</span>
                           </button>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
         </div>

         {/* Sidebar Stats & Contributors */}
         <div className="space-y-12">
            <GlassCard className="!p-8 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-4 mb-10">
                   <TrendingUp size={20} className="text-primary" />
                   <h3 className="text-[12px] font-black uppercase tracking-[0.4em]">TRENDING STRATEGY</h3>
                </div>
                <div className="space-y-8">
                   {[
                     { tag: 'HighFrequency', count: 1242, color: 'primary' },
                     { tag: 'CleanFuel', count: 852, color: 'white' },
                     { tag: 'BioHacking', count: 432, color: 'white' },
                     { tag: 'Zone5', count: 215, color: 'white' }
                   ].map(trend => (
                     <div key={trend.tag} className="flex justify-between items-center group cursor-pointer">
                        <span className={`text-[11px] font-black uppercase tracking-widest ${trend.color === 'primary' ? 'text-primary' : 'text-text-muted group-hover:text-white transition-colors'}`}>#{trend.tag}</span>
                        <span className="text-[9px] font-bold text-white/20 tracking-widest group-hover:text-primary/40 transition-colors">{trend.count} BUZZ</span>
                     </div>
                   ))}
                </div>
            </GlassCard>

            <div className="px-4 space-y-8">
               <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">ELITE CONTRIBUTORS</h3>
               <div className="space-y-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full border-2 border-primary/20 group-hover:border-primary transition-all overflow-hidden bg-bg-alt">
                             <img src={`https://i.pravatar.cc/100?img=${i+40}`} alt="Top Athlete" className="grayscale group-hover:grayscale-0 transition-all duration-700" />
                          </div>
                          <div>
                             <div className="text-[10px] font-black uppercase tracking-wider text-white">Athlete_Zero_{i}</div>
                             <div className="text-[8px] font-bold text-primary/40 uppercase tracking-widest italic">Legendary Status</div>
                          </div>
                       </div>
                       <PremiumButton className="!py-2 !px-4 !text-[8px] !shadow-none opacity-0 group-hover:opacity-100 transition-all">FOLLOW</PremiumButton>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CommunityPage;
