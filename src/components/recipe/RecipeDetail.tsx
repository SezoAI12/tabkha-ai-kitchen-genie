

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types/index';
import { Clock, Users, ChefHat, Star, Heart, Bookmark, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface RecipeDetailProps {
  recipe: Recipe;
  onAddToShoppingList: () => void;
  onStartCookingMode: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onAddToShoppingList,
  onStartCookingMode,
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false)
  );

  const toggleIngredient = (index: number) => {
    const newChecked = [...checkedIngredients];
    newChecked[index] = !newChecked[index];
    setCheckedIngredients(newChecked);
  };

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <div className="relative h-80">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Recipe Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-wasfah-bright-teal/90 text-white">
              {recipe.cuisine}
            </Badge>
            {recipe.premium && (
              <Badge className="bg-yellow-500/90 text-white">Premium</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
          <p className="text-lg text-gray-200 mb-4">{recipe.description}</p>
          
          {/* Quick Stats */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{recipe.cookingTime} mins</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-2" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center">
              <Star size={16} className="mr-2 text-yellow-400" />
              <span>{recipe.rating} ({recipe.ratingCount} reviews)</span>
            </div>
            <div className="flex items-center">
              <span className="text-wasfah-mint font-medium">{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <Button
              onClick={onStartCookingMode}
              className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
            >
              <ChefHat size={18} className="mr-2" />
              Start Cooking
            </Button>
            <Button
              onClick={onAddToShoppingList}
              variant="outline"
              className="border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
            >
              <Plus size={18} className="mr-2" />
              Add to Shopping List
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Heart size={20} className={recipe.isFavorite ? 'fill-red-500 text-red-500' : ''} />
            </Button>
            <Button variant="ghost" size="icon">
              <Bookmark size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={checkedIngredients[index]}
                        onChange={() => toggleIngredient(index)}
                        className="w-4 h-4 text-wasfah-bright-teal"
                      />
                      <span className={checkedIngredients[index] ? 'line-through text-gray-500' : ''}>
                        {ingredient}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-wasfah-bright-teal text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Nutrition Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-wasfah-deep-teal">{recipe.calories}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-wasfah-deep-teal">{recipe.nutritionalInfo.protein}g</div>
                    <div className="text-sm text-gray-600">Protein</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-wasfah-deep-teal">{recipe.nutritionalInfo.carbs}g</div>
                    <div className="text-sm text-gray-600">Carbs</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-wasfah-deep-teal">{recipe.nutritionalInfo.fat}g</div>
                    <div className="text-sm text-gray-600">Fat</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

