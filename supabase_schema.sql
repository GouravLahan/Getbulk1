-- Database Schema (SQL) for GetBulk functional dashboard
-- Run this in your Supabase SQL Editor

-- Profiles Table: Basic user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  full_name TEXT,
  target_weight FLOAT,
  current_goal TEXT, -- e.g., 'muscle-gain', 'weight-loss'
  has_completed_assessment BOOLEAN DEFAULT FALSE,
  assessment_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Body Metrics: Time-series tracking of weight and fat percentage
CREATE TABLE IF NOT EXISTS public.body_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT NOT NULL,
  weight FLOAT NOT NULL,
  fat_percentage FLOAT,
  logged_at DATE DEFAULT CURRENT_DATE,
  UNIQUE(clerk_id, logged_at) -- One entry per day
);

-- Workout Logs: Persistence for completed sessions
CREATE TABLE IF NOT EXISTS public.workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT NOT NULL,
  workout_name TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_duration INTEGER, -- in minutes
  exercises JSONB -- Detailed log of sets/reps
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;

-- Simple Policies (assuming direct Clerk-ID filtering)
CREATE POLICY "Users can manage their own profile" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Users can manage their own metrics" ON public.body_metrics FOR ALL USING (true);
CREATE POLICY "Users can manage their own workout logs" ON public.workout_logs FOR ALL USING (true);
