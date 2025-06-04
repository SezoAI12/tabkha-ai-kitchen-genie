
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, ChefHat, Star, Heart, Share2, Play } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  description?: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  rating: number;
  ratingCount: number;
  calories: number;
  ingredients: Array<{
    id: string;
    name: string;
    amount: number;
    unit: string;
  }>;
  instructions: string[];
  tags?: string[];
}

interface EnhancedRecipeDetailProps {
  recipe: Recipe;
  onStartCookingMode: () => void;
  onClose: () => void;
}

export const EnhancedRecipeDetail: React.FC<EnhancedRecipeDetailProps> = ({
  recipe,
  onStartCookingMode,
  onClose
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Recipe Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{recipe.title}</CardTitle>
            {recipe.description && (
              <p className="text-gray-600">{recipe.description}</p>
            )}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{recipe.rating} ({recipe.ratingCount})</span>
              </div>
              <Badge variant="secondary">{recipe.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-1 text-wasfah-bright-teal" />
                <p className="text-sm text-gray-600">Prep</p>
                <p className="font-semibold">{recipe.prepTime}m</p>
              </div>
              <div className="text-center">
                <ChefHat className="h-6 w-6 mx-auto mb-1 text-wasfah-bright-teal" />
                <p className="text-sm text-gray-600">Cook</p>
                <p className="font-semibold">{recipe.cookTime}m</p>
              </div>
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-1 text-wasfah-bright-teal" />
                <p className="text-sm text-gray-600">Serves</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <Button
              onClick={onStartCookingMode}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Cooking Mode
            </Button>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex justify-between items-center py-2">
                  <span>{ingredient.name}</span>
                  <span className="text-gray-600">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-wasfah-bright-teal text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" onClick={onClose} className="w-full">
          Back to Recipes
        </Button>
      </div>
    </div>
  );
};
