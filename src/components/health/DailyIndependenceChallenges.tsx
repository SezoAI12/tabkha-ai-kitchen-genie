
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRTL } from '@/contexts/RTLContext';

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
  challenges = [
    { name: "Plan Tomorrow's Meals", description: "Create a meal plan for tomorrow without using AI recommendations", completed: false },
    { name: "Track Manually", description: "Record your meals and exercise without automated tracking for a day", completed: true },
    { name: "Set Personal Goals", description: "Define one health goal based on your own research and knowledge", completed: false }
  ],
  onViewAllChallenges = () => console.log('View all challenges clicked') 
}) => {
  const { t } = useRTL();
  
  return (
    <Card className="border-2 border-purple-300/30 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-50/10 dark:from-gray-800 dark:to-gray-800/80 pb-2">
        <CardTitle className="flex items-center text-purple-700 dark:text-purple-400">
          <Award className="h-5 w-5 mr-2" />
          {t('Daily Independence Challenges', 'تحديات الاستقلالية اليومية')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {t('Complete these challenges to become less dependent on AI guidance', 'أكمل هذه التحديات لتصبح أقل اعتمادًا على توجيهات الذكاء الاصطناعي')}
        </p>
        <div className="space-y-3">
          {challenges.map((challenge, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                challenge.completed ? "bg-purple-500 border-purple-500" : "border-gray-300"
              }`}>
                {challenge.completed && <Check className="h-3 w-3 text-white" />}
              </div>
              <div className="ml-3">
                <p className="font-medium text-sm">{t(challenge.name, '')}</p>
                <p className="text-xs text-gray-500">{t(challenge.description, '')}</p>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={onViewAllChallenges} className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white">
          {t('View All Challenges', 'عرض جميع التحديات')}
        </Button>
      </CardContent>
    </Card>
  );
};
