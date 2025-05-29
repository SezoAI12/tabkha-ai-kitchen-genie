import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Meal } from '@/types/index';
import { mockMeals } from '@/data/mockData';

export const TodayMealPlan: React.FC = () => {
  const todayMeals = mockMeals.slice(0, 3);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-wasfah-deep-teal">Today's Meal Plan</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {todayMeals.map(meal => (
            <div key={meal.id} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">{meal.name}</h4>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    {meal.prepTime}m
                  </div>
                  <div className="flex items-center">
                    <Users size={12} className="mr-1" />
                    {meal.calories} cal
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Badge variant="secondary" className="mr-2">{meal.type}</Badge>
                <Button size="sm" className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white">
                  <ChefHat size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
