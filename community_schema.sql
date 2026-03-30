-- Add this to your Supabase SQL Editor to enable the Community Feed

-- Community Posts: Global knowledge sharing
CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT NOT NULL,
  user_name TEXT,
  user_avatar TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Strategy', -- #Gains, #Fuel, #Strategy
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view community posts" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.community_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can edit/delete their own posts" ON public.community_posts FOR ALL USING (true);
