'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import DynamicBackground from '../../components/ui/DynamicBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import GlassCard from '../../components/ui/GlassCard';
import { MessageSquare, Heart, Share2, PlusCircle, ShieldCheck } from 'lucide-react';
import { useAuth, useUser } from '@clerk/nextjs';

const CommunityPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [newPost, setNewPost] = useState('');

  const fetchPosts = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim() || !supabase || !user) return;

    const { error } = await supabase.from('community_posts').insert({
      clerk_id: user.id,
      user_name: user.fullName || user.username || 'Anonymous Athlete',
      user_avatar: user.imageUrl,
      content: newPost,
      category: 'Strategy'
    });

    if (!error) {
      setNewPost('');
      fetchPosts();
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-white">
      <DynamicBackground />
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-2 rounded-full text-primary mb-6 border border-primary/20">
              <ShieldCheck size={16} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">VERIFIED FEED</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4">COMMUNITY <span className="text-primary italic">FUEL</span></h1>
            <p className="text-text-muted text-lg max-w-xl mx-auto">Share your strategies, celebrate your gains, and see what the global collective is building.</p>
          </motion.div>

          {/* New Post Area */}
          {isSignedIn && (
             <GlassCard className="!p-8 mb-12 border-primary/20 shadow-primary-glow/10">
                <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                      <img src={user?.imageUrl} alt="User Avatar" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 space-y-4">
                      <textarea 
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="What's the strategy today?"
                        className="w-full h-24 bg-white/5 rounded-2xl border border-white/10 p-6 text-white text-lg font-bold placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all resize-none"
                      />
                      <div className="flex justify-between items-center">
                         <div className="flex gap-4 text-white/30 text-xs font-black uppercase tracking-widest">
                            <span className="hover:text-primary cursor-pointer transition-colors">#Gains</span>
                            <span className="hover:text-primary cursor-pointer transition-colors">#Fuel</span>
                            <span className="hover:text-primary cursor-pointer transition-colors">#Strategy</span>
                         </div>
                         <button 
                           onClick={handlePost}
                           className="bg-primary hover:bg-white text-background px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] transition-all shadow-primary-glow flex items-center gap-2 group"
                         >
                            POST FEEDBACK
                            <PlusCircle size={16} className="group-hover:rotate-90 transition-transform" />
                         </button>
                      </div>
                   </div>
                </div>
             </GlassCard>
          )}

          {/* Live Feed */}
          <div className="space-y-8">
            <AnimatePresence>
               {posts.map((post, i) => (
                 <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                 >
                    <GlassCard className="!p-8 border-white/5 hover:border-white/10 transition-colors">
                       <div className="flex justify-between items-start mb-6">
                          <div className="flex gap-4 items-center">
                             <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                                <img src={post.user_avatar} alt={post.user_name} className="w-full h-full object-cover grayscale opacity-80" />
                             </div>
                             <div>
                                <div className="text-[12px] font-black uppercase tracking-[0.2em] text-white underline decoration-primary decoration-1 underline-offset-4">{post.user_name}</div>
                                <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 mt-1">{new Date(post.created_at).toLocaleDateString()}</div>
                             </div>
                          </div>
                          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                             {post.category}
                          </div>
                       </div>

                       <p className="text-xl font-bold italic uppercase tracking-tight text-white leading-relaxed mb-8">
                          "{post.content}"
                       </p>

                       <div className="flex gap-8 pt-6 border-t border-white/5">
                          <button className="flex items-center gap-3 text-white/30 hover:text-primary transition-colors group">
                             <Heart size={18} className="group-hover:scale-125 transition-transform" />
                             <span className="text-[10px] font-black uppercase tracking-widest">{post.likes_count} Likes</span>
                          </button>
                          <button className="flex items-center gap-3 text-white/30 hover:text-white transition-colors group">
                             <MessageSquare size={18} className="group-hover:scale-125 transition-transform" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Discuss</span>
                          </button>
                          <button aria-label="Share post" className="flex items-center gap-3 text-white/30 hover:text-white transition-colors group ml-auto">
                             <Share2 size={18} />
                          </button>
                       </div>
                    </GlassCard>
                 </motion.div>
               ))}
            </AnimatePresence>
            
            {loading && (
               <div className="flex flex-col items-center justify-center pt-20">
                  <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Syncing Knowledge...</p>
               </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CommunityPage;
