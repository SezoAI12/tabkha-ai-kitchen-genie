import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Timer, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Check,
  ChefHat
} from 'lucide-react';
import { Recipe } from '@/types/index';

interface CookingModeProps {
  recipe: Recipe;
}

export const CookingMode: React.FC<CookingModeProps> = ({ recipe }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0); // Time remaining in seconds
  const [stepTimer, setStepTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize timer for the first step if it has a time
    if (recipe.instructions && recipe.instructions[currentStep]) {
      const timeMatch = recipe.instructions[currentStep].match(/\[(\d+)m\]/);
      if (timeMatch) {
        setTimeRemaining(parseInt(timeMatch[1]) * 60);
      }
    }
    return () => {
      if (stepTimer) clearInterval(stepTimer);
    };
  }, [currentStep, recipe.instructions]);

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
      setStepTimer(timer);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && isTimerRunning) {
      // Timer reached zero
      setIsTimerRunning(false);
      if (stepTimer) clearInterval(stepTimer);
      alert("Time's up for this step!"); // Or use a more sophisticated notification
    } else {
      if (stepTimer) clearInterval(stepTimer);
    }
  }, [isTimerRunning, timeRemaining, stepTimer]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    if (recipe.instructions && recipe.instructions[currentStep]) {
      const timeMatch = recipe.instructions[currentStep].match(/\[(\d+)m\]/);
      if (timeMatch) {
        setTimeRemaining(parseInt(timeMatch[1]) * 60);
      }
    }
  };

  const goToNextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsTimerRunning(false);
      if (stepTimer) clearInterval(stepTimer);

      // Initialize timer for the next step if it has a time
      const nextStepIndex = currentStep + 1;
      if (recipe.instructions && recipe.instructions[nextStepIndex]) {
        const timeMatch = recipe.instructions[nextStepIndex].match(/\[(\d+)m\]/);
        if (timeMatch) {
          setTimeRemaining(parseInt(timeMatch[1]) * 60);
        } else {
          setTimeRemaining(0); // Reset timer if no time is specified
        }
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsTimerRunning(false);
      if (stepTimer) clearInterval(stepTimer);

       // Initialize timer for the previous step if it has a time
       const prevStepIndex = currentStep - 1;
       if (recipe.instructions && recipe.instructions[prevStepIndex]) {
         const timeMatch = recipe.instructions[prevStepIndex].match(/\[(\d+)m\]/);
         if (timeMatch) {
           setTimeRemaining(parseInt(timeMatch[1]) * 60);
         } else {
           setTimeRemaining(0); // Reset timer if no time is specified
         }
       }
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const stepPercentage = recipe.instructions ? ((currentStep + 1) / recipe.instructions.length) * 100 : 0;

  return (
    <Card className="lg:w-[800px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{recipe.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img src={recipe.image} alt={recipe.title} className="object-cover w-full h-full" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary"><ChefHat size={16} className="mr-1" /> {recipe.difficulty}</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">{recipe.description}</p>
          </div>
        </div>

        <Separator />

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside pl-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold">Instructions:</h3>
          <div className="space-y-2">
            <Progress value={stepPercentage} />
            <p className="text-sm text-gray-500">Step {currentStep + 1} of {recipe.instructions.length}</p>
          </div>
          <Card className="bg-gray-50 mt-2">
            <CardContent className="p-4">
              <p className="text-black">
                {recipe.instructions[currentStep].replace(/\[(\d+)m\]/, '')}
              </p>
              {recipe.instructions[currentStep].match(/\[(\d+)m\]/) && (
                <div className="flex items-center mt-4">
                  <Timer size={20} className="mr-2" />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={goToPreviousStep} 
              disabled={currentStep === 0}
            >
              <SkipBack size={16} className="mr-2" />
              Previous
            </Button>

            {recipe.instructions[currentStep].match(/\[(\d+)m\]/) ? (
              isTimerRunning ? (
                <Button onClick={pauseTimer} variant="secondary">
                  <Pause size={16} className="mr-2" />
                  Pause Timer
                </Button>
              ) : (
                <Button onClick={startTimer}>
                  <Play size={16} className="mr-2" />
                  Start Timer
                </Button>
              )
            ) : (
              <Button variant="secondary" disabled>
                <Check size={16} className="mr-2" />
                No Timer
              </Button>
            )}

            <Button 
              onClick={goToNextStep} 
              disabled={currentStep === recipe.instructions.length - 1}
            >
              Next
              <SkipForward size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
