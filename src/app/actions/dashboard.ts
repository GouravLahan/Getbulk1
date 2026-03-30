'use server';

import { auth } from '@clerk/nextjs/server';
import { supabase } from '../../lib/supabase';
import { revalidatePath } from 'next/cache';

export async function logWeight(weight: number, fatPercentage?: number) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  if (!supabase) {
    console.warn('Supabase not configured. Weight log ignored in Mock Mode.');
    return { success: true };
  }

  const { data, error } = await supabase
    .from('body_metrics')
    .upsert({
      clerk_id: userId,
      weight,
      fat_percentage: fatPercentage,
      logged_at: new Date().toISOString().split('T')[0]
    });

  if (error) {
    console.error('Error logging weight:', error);
    throw error;
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function completeWorkout(workoutName: string, exercises: any, sessionDuration?: number) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  if (!supabase) {
    console.warn('Supabase not configured. Workout completion ignored in Mock Mode.');
    return { success: true };
  }

  const { data, error } = await supabase
    .from('workout_logs')
    .insert({
      clerk_id: userId,
      workout_name: workoutName,
      exercises,
      session_duration: sessionDuration, // Captured from timer
      completed_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error completing workout:', error);
    throw error;
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function logMeal(calories: number, protein?: number, carbs?: number, fats?: number) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  if (!supabase) {
    console.warn('Supabase not configured. Meal log ignored in Mock Mode.');
    return { success: true };
  }

  const { data, error } = await supabase
    .from('nutrition_logs')
    .insert({
      clerk_id: userId,
      calories,
      protein,
      carbs,
      fats,
      logged_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error logging meal:', error);
    throw error;
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function saveAssessment(assessment_data: any) {
  const { userId } = await auth();
  
  // Allow unauthenticated users to complete the assessment flow
  // The plan is generated client-side; we only persist it if the user is logged in
  if (!userId) {
    console.info('Assessment completed by unauthenticated user. Skipping persistence.');
    return { success: true, persisted: false };
  }

  if (!supabase) {
    console.warn('Supabase not configured. Assessment ignored in Mock Mode.');
    return { success: true, persisted: false };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .upsert({
      clerk_id: userId,
      has_completed_assessment: true,
      assessment_data: assessment_data,
      updated_at: new Date().toISOString()
    }, { onConflict: 'clerk_id' });

  if (profileError) {
    console.error('Error saving assessment:', profileError);
    throw profileError;
  }

  revalidatePath('/dashboard');
  return { success: true, persisted: true };
}

export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) return null;

  // Handle Mock Mode if Supabase is not configured
  if (!supabase) {
    console.warn('Supabase not configured. Using Mock Dashboard Data.');
    return {
      profile: {
        has_completed_assessment: true,
        assessment_data: {
          programName: 'Beginner Hypertrophy Peak',
          timeline: 'Progress visible in 6-8 weeks',
          difficulty: 'beginner',
          nutrition: {
            calories: 2850,
            protein: 180,
            carbs: 380,
            fats: 65
          },
          weeklySchedule: [
             { day: 'Monday', muscleGroups: ['Chest', 'Triceps'], exercises: ['Bench Press', 'Tricep Pushdown'] },
             { day: 'Tuesday', muscleGroups: ['Rest'], exercises: ['Recovery Walk'] },
             { day: 'Wednesday', muscleGroups: ['Back', 'Biceps'], exercises: ['Pull-ups', 'Bicep Curls'] },
             { day: 'Thursday', muscleGroups: ['Rest'], exercises: ['Recovery Walk'] },
             { day: 'Friday', muscleGroups: ['Legs', 'Shoulders'], exercises: ['Squats', 'Shoulder Press'] },
             { day: 'Saturday', muscleGroups: ['Rest'], exercises: ['Recovery Walk'] },
             { day: 'Sunday', muscleGroups: ['Rest'], exercises: ['Recovery Walk'] }
          ]
        }
      },
      metrics: [],
      logs: [],
      nutrition: []
    };
  }

  // Parallel fetch profile, metrics, logs, and nutrition
  const [profileResponse, metricsResponse, logsResponse, nutritionResponse] = await Promise.all([
    supabase
      .from('profiles')
      .select('*')
      .eq('clerk_id', userId)
      .single(),
    supabase
      .from('body_metrics')
      .select('*')
      .eq('clerk_id', userId)
      .order('logged_at', { ascending: true }),
    supabase
      .from('workout_logs')
      .select('*')
      .eq('clerk_id', userId)
      .order('completed_at', { ascending: false }),
    supabase
      .from('nutrition_logs')
      .select('*')
      .eq('clerk_id', userId)
      .order('logged_at', { ascending: false })
  ]);

  return {
    profile: profileResponse?.data || null,
    metrics: metricsResponse?.data || [],
    logs: logsResponse?.data || [],
    nutrition: nutritionResponse?.data || []
  };
}
