
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Recipe } from '@/types/index';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw, 
  X,
  Clock,
  Users,
  ChefHat
} from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

export const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(recipe.instructions.length).fill(false)
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleStepCompletion = (stepIndex: number) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[stepIndex] = !newCompletedSteps[stepIndex];
    setCompletedSteps(newCompletedSteps);
  };

  const progress = ((currentStep + 1) / recipe.instructions.length) * 100;

  return (
    <PageContainer
      header={{
        title: 'Cooking Mode',
        showBackButton: false,
        actions: (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        ),
      }}
      fullWidth
      noPadding
    >
      <div className="min-h-screen bg-gray-50">
        {/* Progress Bar */}
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep + 1} of {recipe.instructions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Recipe Info */}
        <div className="bg-white p-4 border-b">
          <h1 className="text-xl font-bold mb-2">{recipe.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{recipe.cookingTime} mins</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center">
              <ChefHat size={16} className="mr-1" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Timer Section */}
        <div className="bg-white p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Timer</h3>
              <div className="text-2xl font-mono font-bold text-wasfah-bright-teal">
                {formatTime(timer)}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => startTimer(5)}
                disabled={isTimerRunning}
              >
                5m
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => startTimer(10)}
                disabled={isTimerRunning}
              >
                10m
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTimer}
                disabled={timer === 0}
              >
                {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={resetTimer}
              >
                <RotateCcw size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Current Step */}
        <div className="p-4 flex-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-wasfah-bright-teal text-white rounded-full flex items-center justify-center font-bold">
                  {currentStep + 1}
                </div>
                <div className="flex-1">
                  <p className="text-lg leading-relaxed">
                    {recipe.instructions[currentStep]}
                  </p>
                  <div className="mt-4">
                    <Button
                      variant={completedSteps[currentStep] ? "default" : "outline"}
                      onClick={() => toggleStepCompletion(currentStep)}
                      className={completedSteps[currentStep] ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {completedSteps[currentStep] ? "Step Completed ✓" : "Mark as Complete"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="bg-white p-4 border-t flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft size={18} className="mr-2" />
            Previous
          </Button>
          
          {currentStep === recipe.instructions.length - 1 ? (
            <Button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700"
            >
              Finish Cooking
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Next
              <ArrowRight size={18} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </PageContainer>
  );
};
