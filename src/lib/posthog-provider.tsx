'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode, useEffect, useState } from 'react';

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function PHProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (posthogKey && typeof window !== 'undefined') {
      posthog.init(posthogKey, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
        loaded: () => setIsInitialized(true),
      });
    }
  }, []);

  if (!posthogKey) {
    return <>{children}</>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
