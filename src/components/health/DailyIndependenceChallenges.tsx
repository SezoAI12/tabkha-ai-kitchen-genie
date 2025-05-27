
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRTL } from '@/contexts/RTLContext';
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

export const DailyIndependenceChallenges: React.FC<DailyIndependenceChallengesProps> = ({ 
  challenges,
  onViewAllChallenges = () => console.log('View all challenges clicked') 
}) => {
  const { t } = useRTL();
  
  // Use the new DailyChallengesManager component instead of static data
  return <DailyChallengesManager />;
};
