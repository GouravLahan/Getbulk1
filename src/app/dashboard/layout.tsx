import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

import { createClient } from '../../utils/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const user = await currentUser();
  const supabase = await createClient();

  // If Supabase is not configured, provide a mock user for demo purposes
  const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  if (!userId && !isMockMode) {
    redirect('/sign-in'); // Clerk sign-in route
  }

  // 1. Check if user has completed assessment
  if (!isMockMode) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('has_completed_assessment')
      .eq('clerk_id', userId)
      .single();

    if (!profile?.has_completed_assessment) {
      redirect('/start-training');
    }
  }

  const userData = {
    full_name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Athlete',
    email: user?.emailAddresses[0]?.emailAddress || 'athlete@getbulk.fit',
  };

  return (
    <div className="flex bg-[#050505] min-h-screen text-white">
      {/* Sidebar - Fixed width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        {isMockMode && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-6 py-2 text-xs text-yellow-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            Running in Mock Mode (Missing Supabase Credentials). Data will not persist.
          </div>
        )}
        {/* Header - Sticky */}
        <Header user={userData!} />

        {/* Dynamic Content */}
        <main className="flex-1 p-10 pb-20 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
