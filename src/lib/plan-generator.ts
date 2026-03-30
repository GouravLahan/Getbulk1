export interface AssessmentData {
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  goal: 'build-muscle' | 'lose-fat' | 'strength' | 'endurance' | 'general' | 'performance';
  experience: 'beginner' | 'intermediate' | 'advanced';
  environment: 'home' | 'gym' | 'hybrid';
  equipment: 'none' | 'basic' | 'moderate' | 'full';
  frequency: number;
  duration: number;
  sleep: number;
  activityLevel: 'sedentary' | 'moderate' | 'active';
  dietPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'none';
}

export interface WorkoutDay {
  day: string;
  muscleGroups: string[];
  exercises: string[];
}

export interface GeneratedPlan {
  programName: string;
  difficulty: string;
  frequency: string;
  timeline: string;
  weeklySchedule: WorkoutDay[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    mealStructure: string[];
  };
  recovery: string[];
  lifestyle: string[];
}

export function generateFitnessPlan(data: AssessmentData): GeneratedPlan {
  // 0. Sanitize inputs to prevent NaN
  const weight = data.weight || 70;
  const height = data.height || 175;
  const age = data.age || 25;

  // 1. Calculate Basal Metabolic Rate (BMR) - Mifflin-St Jeor Equation
  let bmr: number;
  if (data.gender === 'female') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  } else {
    // Default to male calculation for 'male' or 'other' to ensure safe BMR
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  }

  // 2. Calculate TDEE based on activity level
  const activityMultipliers = {
    sedentary: 1.2,
    moderate: 1.55,
    active: 1.75
  };
  const multiplier = activityMultipliers[data.activityLevel] || 1.2;
  let tdee = bmr * multiplier;

  // 3. Adjust for goal
  let targetCalories = tdee;
  let programName = "";
  let timeline = "Progress visible in 6-8 weeks";

  if (data.goal === 'build-muscle') {
    targetCalories += 300;
    programName = `${data.frequency}-Day Hypertrophy Peak`;
  } else if (data.goal === 'lose-fat') {
    targetCalories -= 500;
    programName = `${data.frequency}-Day Shred Protocol`;
    timeline = "Progress visible in 4-6 weeks";
  } else {
    programName = `${data.frequency}-Day Performance Blueprint`;
  }

  // 4. Macro Calculation (Using sanitized weight and targetCalories)
  // Protein: 2g per kg of bodyweight
  const protein = weight * 2;
  // Fats: 0.8g per kg of bodyweight
  const fats = weight * 0.8;
  // Carbs: Remaining calories (Ensuring no NaN)
  const safeTargetCalories = Math.max(targetCalories || 2000, 1200);
  const carbs = (safeTargetCalories - (protein * 4) - (fats * 9)) / 4;

  // 5. Generate Weekly Schedule
  const weeklySchedule: WorkoutDay[] = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Decide split logic
  let split: string[] = [];
  if (data.frequency <= 3) {
    split = Array(data.frequency).fill('Full Body');
  } else if (data.frequency === 4) {
    split = ['Upper Body', 'Lower Body', 'Upper Body', 'Lower Body'];
  } else {
    split = ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'];
  }

  let workoutIndex = 0;
  for (let i = 0; i < 7; i++) {
    if (workoutIndex < data.frequency && i % 2 === 0) {
      const muscleGroups = split[workoutIndex] === 'Full Body' ? ['Whole Body'] : [split[workoutIndex]];
      weeklySchedule.push({
        day: days[i],
        muscleGroups,
        exercises: getExercises(split[workoutIndex], data.equipment)
      });
      workoutIndex++;
    } else {
      weeklySchedule.push({
        day: days[i],
        muscleGroups: ['Rest & Recovery'],
        exercises: ['Light mobility work', 'Active recovery walk']
      });
    }
  }

  return {
    programName: `${data.experience.charAt(0).toUpperCase() + data.experience.slice(1)} ${programName}`,
    difficulty: data.experience,
    frequency: `${data.frequency} Sessions / Week`,
    timeline,
    weeklySchedule,
    nutrition: {
      calories: Math.round(targetCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
      mealStructure: [
        'High-protein breakfast to kickstart muscle synthesis',
        'Balanced lunch with complex carbs and lean protein',
        'Performance-focused pre-workout snack',
        'Nutrient-dense post-workout recovery dinner'
      ]
    },
    recovery: [
      `Aim for ${data.sleep} hours of quality sleep`,
      'Focus on dynamic warm-ups before every session',
      'Maintain consistent hydration (3L+ per day)'
    ],
    lifestyle: [
      'Daily 10k step target for non-exercise thermogenesis',
      'Consistent meal timing for metabolic stability',
      'Weekly progress tracking with photos and measurements'
    ]
  };
}

function getExercises(splitName: string, equipment: string): string[] {
  const exercises = {
    'Full Body': ['Squats', 'Pushups', 'Deadlifts', 'Plank'],
    'Upper Body': ['Bench Press', 'Pull-ups', 'Shoulder Press', 'Rows'],
    'Lower Body': ['Squats', 'Lunges', 'Deadlifts', 'Leg Press'],
    'Push': ['Bench Press', 'Shoulder Press', 'Tricep Extensions'],
    'Pull': ['Pull-ups', 'Barbell Rows', 'Bicep Curls'],
    'Legs': ['Squats', 'Leg Press', 'Calf Raises']
  };
  
  // Minimal equipment adjustments (simplified)
  if (equipment === 'none') {
    return (exercises[splitName as keyof typeof exercises] || []).map(ex => `Bodyweight ${ex}`);
  }
  
  return exercises[splitName as keyof typeof exercises] || ['Conditioning Work'];
}
