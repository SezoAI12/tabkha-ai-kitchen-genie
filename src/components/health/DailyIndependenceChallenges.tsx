
import React from 'react';
import { DailyChallengesManager } from '@/components/challenges/DailyChallengesManager';

interface Challenge {
  name: string;
  description: string;
  completed: boolean;
}

interface DailyIndependenceChallengesProps {
  challenges?: Challenge[];
  onViewAllChallenges?: () => void;
}

export const DailyIndependenceChallenges: React.FC<DailyIndependenceChallengesProps> = () => {
  // Use the new DailyChallengesManager component
  return <DailyChallengesManager />;
};
