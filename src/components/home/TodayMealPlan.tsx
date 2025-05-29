
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MealPlanProps {
  mealPlan: {
    id: string;
    date: string;
    meals: Array<{
      id: string;
      type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
      recipe: {
        id: string;
        title: string;
        description: string;
        image: string;
        prepTime: number;
        cookTime: number;
        servings: number;
        difficulty: 'Easy' | 'Medium' | 'Hard';
        calories: number;
        rating: number;
        ratingCount: number;
        ingredients: string[];
        instructions: string[];
        categories: string[];
        tags: string[];
        isFavorite: boolean;
      };
    }>;
  };
}

export const TodayMealPlan: React.FC<MealPlanProps> = ({ mealPlan }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Today's Meal Plan</h3>
          <Link to="/meal-plan">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="space-y-3">
          {mealPlan.meals.map((meal) => (
            <div key={meal.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <img
                src={meal.recipe.image}
                alt={meal.recipe.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{meal.recipe.title}</h4>
                  <span className="text-xs text-gray-500 capitalize">{meal.type}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    <span>{meal.recipe.prepTime + meal.recipe.cookTime}m</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={12} className="mr-1" />
                    <span>{meal.recipe.servings}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={12} className="mr-1 text-yellow-400" />
                    <span>{meal.recipe.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
