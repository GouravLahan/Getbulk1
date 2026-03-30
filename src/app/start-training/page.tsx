'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssessmentData, generateFitnessPlan, GeneratedPlan } from '../../lib/plan-generator';
import AssessmentFlow from '../../components/assessment/AssessmentFlow';
import ResultDashboard from '../../components/assessment/ResultDashboard';
import Navbar from '../../components/layout/Navbar';

import { saveAssessment } from '../actions/dashboard';
import { useRouter } from 'next/navigation';

const StartTrainingPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0); // 0 is Welcome Screen
  const [isSaving, setIsSaving] = useState(false);
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({
    experience: 'beginner',
    goal: 'build-muscle',
    environment: 'gym',
    equipment: 'full',
    frequency: 3,
    duration: 60,
    sleep: 8,
    activityLevel: 'moderate',
    dietPreference: 'none'
  });
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);

  const handleUpdateData = (newData: Partial<AssessmentData>) => {
    setAssessmentData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => setCurrentStep((prev: number) => prev + 1);
  const handleBack = () => setCurrentStep((prev: number) => prev - 1);

  const handleGenerate = async () => {
    setIsSaving(true);
    try {
      const plan = generateFitnessPlan(assessmentData as AssessmentData);
      
      // Persist the plan to Supabase
      await saveAssessment(plan);
      
      setGeneratedPlan(plan);
      setCurrentStep(10); // Result Step
    } catch (error) {
      console.error('Failed to save assessment:', error);
      alert('There was an error saving your plan. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-white pt-32 pb-20 overflow-hidden flex flex-col items-center relative">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/5 blur-[180px] rounded-full animate-mesh" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full animate-mesh" style={{ animationDelay: '-10s' }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col min-h-[75vh]">
        <AnimatePresence mode="wait">
          {!generatedPlan ? (
            <motion.div
              key="flow"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="w-full flex flex-col flex-grow"
            >
              <AssessmentFlow 
                step={currentStep} 
                data={assessmentData} 
                onUpdate={handleUpdateData}
                onNext={handleNext}
                onBack={handleBack}
                onGenerate={handleGenerate}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="w-full"
            >
              <ResultDashboard plan={generatedPlan} onReset={() => {
                setGeneratedPlan(null);
                setCurrentStep(0);
              }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default StartTrainingPage;
