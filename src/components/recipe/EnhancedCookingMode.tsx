
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';
import { VoiceRecipeAssistant } from '@/components/ai/VoiceRecipeAssistant';

interface Recipe {
  id: string;
  title: string;
  image: string;
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
}

interface EnhancedCookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

export const EnhancedCookingMode: React.FC<EnhancedCookingModeProps> = ({ recipe, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / recipe.instructions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Exit Cooking Mode
          </Button>
          <h1 className="text-xl font-bold text-center">{recipe.title}</h1>
          <div className="w-32" /> {/* Spacer */}
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep + 1} of {recipe.instructions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Voice Assistant */}
        <div className="mb-6">
          <VoiceRecipeAssistant 
            recipe={recipe}
            onStepChange={setCurrentStep}
          />
        </div>

        {/* Current Step */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Step {currentStep + 1}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStepComplete(currentStep)}
                disabled={completedSteps.includes(currentStep)}
              >
                {completedSteps.includes(currentStep) ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Completed
                  </>
                ) : (
                  'Mark Complete'
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              {recipe.instructions[currentStep]}
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentStep(0)}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart
          </Button>

          <Button
            onClick={nextStep}
            disabled={currentStep === recipe.instructions.length - 1}
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
