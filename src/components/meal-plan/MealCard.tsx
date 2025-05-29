
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Meal } from '@/types/index';
import { Clock, Star } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-md overflow-hidden">
            <img 
              src={meal.image || meal.recipe?.image || '/placeholder.svg'} 
              alt={meal.name} 
              className="object-cover w-full h-full" 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{meal.name}</h3>
            <div className="flex items-center text-gray-500 space-x-2">
              <Clock size={14} />
              <span>{meal.prepTime || meal.recipe?.prepTime || 0} mins</span>
              <span className="mx-1">•</span>
              <span>{meal.calories || meal.recipe?.calories || 0} cal</span>
            </div>
            <Button variant="secondary" size="sm" className="mt-2">
              View Recipe
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
