
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VoiceRecipeAssistant } from '@/components/ai/VoiceRecipeAssistant';
import { SmartRecipeAdaptation } from '@/components/ai/SmartRecipeAdaptation';
import { MoodBasedRecipes } from '@/components/ai/MoodBasedRecipes';
import { MicronutrientTracker } from '@/components/ai/MicronutrientTracker';
import { Mic, Wand2, Heart, Activity, Sparkles } from 'lucide-react';

// Mock recipe data
const mockRecipe = {
  id: '1',
  title: 'Mediterranean Quinoa Bowl',
  ingredients: [
    { id: '1', name: 'Quinoa', amount: 1, unit: 'cup' },
    { id: '2', name: 'Cherry tomatoes', amount: 200, unit: 'g' },
    { id: '3', name: 'Cucumber', amount: 1, unit: 'medium' },
    { id: '4', name: 'Feta cheese', amount: 100, unit: 'g' },
    { id: '5', name: 'Olive oil', amount: 2, unit: 'tbsp' },
    { id: '6', name: 'Lemon juice', amount: 1, unit: 'tbsp' }
  ],
  instructions: [
    "Rinse the quinoa under cold water until the water runs clear.",
    "In a medium saucepan, bring 2 cups of water to a boil. Add quinoa, reduce heat to low, cover and simmer for 15 minutes.",
    "While quinoa cooks, dice the cucumber and halve the cherry tomatoes.",
    "Remove quinoa from heat and let it stand, covered, for 5 minutes. Fluff with a fork.",
    "In a large bowl, combine the cooked quinoa, diced cucumber, and cherry tomatoes.",
    "Crumble the feta cheese over the quinoa mixture.",
    "In a small bowl, whisk together olive oil and lemon juice. Season with salt and pepper.",
    "Pour the dressing over the quinoa bowl and toss gently to combine.",
    "Garnish with fresh herbs if desired and serve immediately."
  ],
  difficulty: 'Easy' as const,
  servings: 4,
  prep_time: 15,
  cook_time: 20
};

const mockPantryItems = [
  'Quinoa', 'Olive oil', 'Salt', 'Black pepper', 'Garlic', 'Onions'
];

const mockDietaryRestrictions = [
  'Vegetarian', 'Gluten-free'
];

export default function AIFeaturesPage() {
  const [activeFeature, setActiveFeature] = useState('voice');

  const features = [
    {
      id: 'voice',
      name: 'Voice Assistant',
      icon: Mic,
      description: 'Hands-free cooking with voice commands',
      badge: 'New'
    },
    {
      id: 'adaptation',
      name: 'Smart Adaptation',
      icon: Wand2,
      description: 'AI-powered recipe modifications',
      badge: 'Popular'
    },
    {
      id: 'mood',
      name: 'Mood Recipes',
      icon: Heart,
      description: 'Emotion-based recommendations',
      badge: 'Trending'
    },
    {
      id: 'nutrition',
      name: 'Nutrient Tracker',
      icon: Activity,
      description: 'Comprehensive micronutrient analysis',
      badge: 'Health'
    }
  ];

  return (
    <PageContainer
      header={{
        title: 'AI-Powered Features',
        showBackButton: true
      }}
      className="min-h-screen bg-gradient-to-br from-wasfah-bright-teal/5 to-wasfah-teal/5"
    >
      <div className="space-y-6 pb-24">
        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal text-white border-0">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/20 rounded-full">
                <Sparkles className="h-12 w-12" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-4">AI-Powered Cooking Experience</CardTitle>
            <p className="text-wasfah-light-gray/90 max-w-2xl mx-auto">
              Discover the future of cooking with our intelligent features designed to make your culinary journey 
              more personalized, efficient, and enjoyable.
            </p>
          </CardHeader>
        </Card>

        {/* Feature Navigation */}
        <Tabs value={activeFeature} onValueChange={setActiveFeature} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex flex-col items-center p-4 h-auto data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className="h-5 w-5" />
                    {feature.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="font-medium text-sm">{feature.name}</span>
                  <span className="text-xs opacity-70 text-center leading-tight mt-1">
                    {feature.description}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Feature Content */}
          <div className="mt-6">
            <TabsContent value="voice" className="mt-0">
              <VoiceRecipeAssistant 
                recipe={mockRecipe}
                onStepChange={(step) => console.log('Step changed to:', step)}
              />
            </TabsContent>

            <TabsContent value="adaptation" className="mt-0">
              <SmartRecipeAdaptation
                recipe={mockRecipe}
                pantryItems={mockPantryItems}
                dietaryRestrictions={mockDietaryRestrictions}
                onAdaptedRecipe={(adapted) => console.log('Recipe adapted:', adapted)}
              />
            </TabsContent>

            <TabsContent value="mood" className="mt-0">
              <MoodBasedRecipes />
            </TabsContent>

            <TabsContent value="nutrition" className="mt-0">
              <MicronutrientTracker />
            </TabsContent>
          </div>
        </Tabs>

        {/* Feature Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Why Use AI Features?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium mb-2">Personalized</h4>
                <p className="text-sm text-gray-600">
                  Recipes adapted to your taste, mood, and dietary needs
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wand2 className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium mb-2">Intelligent</h4>
                <p className="text-sm text-gray-600">
                  Smart adaptations based on available ingredients
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium mb-2">Wellness-Focused</h4>
                <p className="text-sm text-gray-600">
                  Nutrition tracking and mood-based recommendations
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mic className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-medium mb-2">Hands-Free</h4>
                <p className="text-sm text-gray-600">
                  Voice control for seamless cooking experience
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
