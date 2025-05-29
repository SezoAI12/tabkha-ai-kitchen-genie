
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Clock, Star } from 'lucide-react';
import { Recipe } from '@/types/index';
import { mockRecipes } from '@/data/mockData';

export const RecommendedRecipes: React.FC = () => {
  const featuredRecipes = mockRecipes.filter(recipe => recipe.featured).slice(0, 3);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-wasfah-deep-teal">Recommended for You</h3>
        <Button variant="ghost" size="sm" className="text-wasfah-bright-teal">
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {featuredRecipes.map(recipe => (
          <Card key={recipe.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div 
                  className="w-20 h-20 bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="p-3 flex-grow">
                  <h4 className="font-medium text-sm mb-1 line-clamp-1">{recipe.title}</h4>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {recipe.cookingTime}m
                    </div>
                    <div className="flex items-center">
                      <Star size={12} className="mr-1 text-yellow-400" />
                      {recipe.rating}
                    </div>
                  </div>
                </div>
                <div className="p-3 flex items-center">
                  <Button size="sm" className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white">
                    <ChefHat size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
