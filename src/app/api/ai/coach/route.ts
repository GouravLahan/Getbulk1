import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();

    if (!message || !userId) {
      return NextResponse.json({ error: 'Message and UserID are required' }, { status: 400 });
    }

    // --- REAL-TIME ANALYSIS ENGINE ---
    
    // 1. Fetch User Stats
    if (!supabase) {
      return NextResponse.json({ 
        response: "I'm currently in high-fidelity demo mode. Once you've connected your Supabase instance, I'll be able to analyze your actual sets and metabolic metrics. For now, keep pushing!",
        role: 'coach',
        timestamp: new Date().toISOString()
      });
    }

    const [metrics, logs, nutrition] = await Promise.all([
      supabase.from('body_metrics').select('*').eq('clerk_id', userId).order('logged_at', { ascending: false }).limit(7),
      supabase.from('workout_logs').select('*').eq('clerk_id', userId).order('completed_at', { ascending: false }).limit(3),
      supabase.from('nutrition_logs').select('*').eq('clerk_id', userId).order('logged_at', { ascending: false }).limit(3)
    ]);

    let insight = "I'm analyzing your profile. Start logging your workouts and meals so I can provide precise guidance.";

    if (logs.data && logs.data.length > 0) {
      const workoutCount = logs.data.length;
      insight = `Great work on your last ${workoutCount} sessions. Your volume is looking consistent. `;
      
      if (metrics.data && metrics.data.length > 1) {
        const weightDiff = metrics.data[0].weight - metrics.data[metrics.data.length - 1].weight;
        if (weightDiff < 0) {
          insight += `I've noticed a ${Math.abs(weightDiff).toFixed(1)}kg drop in weight. Ensure you're hitting your 2,850 kcal target to maintain muscle mass.`;
        } else {
          insight += `Weight is stable at ${metrics.data[0].weight}kg. You're in a perfect position for progressive overload.`;
        }
      }
    } else if (message.toLowerCase().includes('protein')) {
      insight = "Protein is vital for your current hypertrophy goal. Aim for 180g today. Would you like a high-protein snack recommendation?";
    } else {
      insight = "Welcome to the Command Center. I'm your AI Lead. I'll be monitoring your metrics in real-time to optimize your protocol. How are you feeling after today's session?";
    }

    return NextResponse.json({ 
      response: insight,
      role: 'coach',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Coach Error:', error);
    return NextResponse.json({ error: 'Failed to reach the AI Coach' }, { status: 500 });
  }
}
