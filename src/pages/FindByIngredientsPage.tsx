
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { IngredientManager } from '@/components/ingredients/IngredientManager';
import { CategorySelector } from '@/components/ingredients/CategorySelector';
import { FilterPanel } from '@/components/ingredients/FilterPanel';
import { SearchSummary } from '@/components/ingredients/SearchSummary';
import { mockRecipes } from '@/data/mockData';
import { Search, Plus, X, ChefHat } from 'lucide-react';
import { MobileNavbar } from '@/components/layout/MobileNavbar';

export default function FindByIngredientsPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [cookingTimeFilter, setCookingTimeFilter] = useState('All');

  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesIngredients = selectedIngredients.length === 0 || 
      selectedIngredients.some(ingredient => 
        recipe.ingredients.some(recipeIngredient => 
          recipeIngredient.name.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    
    const matchesDietary = dietaryFilter === 'All' || recipe.categories.includes(dietaryFilter);
    const matchesDifficulty = difficultyFilter === 'All' || recipe.difficulty === difficultyFilter;
    const matchesTime = cookingTimeFilter === 'All' || 
      (cookingTimeFilter === 'Quick' && recipe.prepTime + recipe.cookTime <= 30) ||
      (cookingTimeFilter === 'Medium' && recipe.prepTime + recipe.cookTime > 30 && recipe.prepTime + recipe.cookTime <= 60) ||
      (cookingTimeFilter === 'Long' && recipe.prepTime + recipe.cookTime > 60);

    return matchesIngredients && matchesDietary && matchesDifficulty && matchesTime;
  });

  return (
    <>
      <PageContainer
        header={{
          title: 'Find by Ingredients',
          showBackButton: true,
        }}
        className="pb-20"
      >
        <div className="container px-4 py-4 space-y-6">
          {/* Ingredient Input */}
          <Card className="border-wasfah-mint/20">
            <CardContent className="p-4">
              <div className="flex space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Add ingredients you have..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        handleAddIngredient(searchQuery.trim());
                        setSearchQuery('');
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      handleAddIngredient(searchQuery.trim());
                      setSearchQuery('');
                    }
                  }}
                  className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                  disabled={!searchQuery.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Selected Ingredients */}
              {selectedIngredients.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Selected Ingredients:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedIngredients.map((ingredient) => (
                      <Badge
                        key={ingredient}
                        variant="secondary"
                        className="bg-wasfah-mint/20 text-wasfah-deep-teal hover:bg-wasfah-mint/30 cursor-pointer"
                        onClick={() => handleRemoveIngredient(ingredient)}
                      >
                        {ingredient}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category Selector */}
          <CategorySelector 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Filter Panel */}
          <FilterPanel
            dietaryFilter={dietaryFilter}
            difficultyFilter={difficultyFilter}
            cookingTimeFilter={cookingTimeFilter}
            onDietaryFilterChange={setDietaryFilter}
            onDifficultyFilterChange={setDifficultyFilter}
            onCookingTimeFilterChange={setCookingTimeFilter}
          />

          {/* Search Summary */}
          <SearchSummary
            selectedIngredients={selectedIngredients}
            recipeCount={filteredRecipes.length}
            filters={{
              dietary: dietaryFilter,
              difficulty: difficultyFilter,
              cookingTime: cookingTimeFilter
            }}
          />

          {/* Recipe Results */}
          {filteredRecipes.length > 0 ? (
            <RecipeGrid recipes={filteredRecipes} />
          ) : (
            <Card className="p-8 text-center">
              <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
              <p className="text-gray-600">
                Try adjusting your ingredients or filters to find more recipes.
              </p>
            </Card>
          )}
        </div>
      </PageContainer>
      
      {/* Mobile Bottom Navigation */}
      <MobileNavbar />
    </>
  );
}
