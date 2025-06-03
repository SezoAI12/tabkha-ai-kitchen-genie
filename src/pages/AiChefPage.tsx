
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import AIChefAssistant from '@/components/ai/AIChefAssistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function AiChefPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <PageContainer
        header={{
          title: 'AI Chef Assistant',
          showBackButton: true
        }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Sign In Required Card */}
          <Card className="border-wasfah-mint/20 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-wasfah-light-gray rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-wasfah-bright-teal" />
              </div>
              <CardTitle className="text-2xl text-wasfah-deep-teal">Sign in to access AI Chef</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-gray-600 text-lg">
                Get personalized cooking advice, recipe suggestions, and culinary tips from our AI Chef Assistant.
              </p>
              
              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="flex items-start space-x-3 p-4 bg-wasfah-light-gray rounded-lg">
                  <ChefHat className="h-6 w-6 text-wasfah-bright-teal mt-1" />
                  <div className="text-left">
                    <h4 className="font-semibold text-wasfah-deep-teal">Recipe Suggestions</h4>
                    <p className="text-sm text-gray-600">Get personalized recipe recommendations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-wasfah-light-gray rounded-lg">
                  <Sparkles className="h-6 w-6 text-wasfah-bright-teal mt-1" />
                  <div className="text-left">
                    <h4 className="font-semibold text-wasfah-deep-teal">Cooking Tips</h4>
                    <p className="text-sm text-gray-600">Learn professional cooking techniques</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/auth">
                  <Button className="w-full h-12 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white text-lg">
                    Sign In to Get Started
                  </Button>
                </Link>
                <p className="text-sm text-gray-500">
                  New to WasfahAI? Signing up is quick and free!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={{
        title: 'AI Chef Assistant',
        showBackButton: true
      }}
    >
      <div className="max-w-4xl mx-auto">
        <AIChefAssistant />
      </div>
    </PageContainer>
  );
}
