
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
import { Search, Plus, X, ChefHat, Beef, Fish, Salad, Coffee, Apple } from 'lucide-react';
import { MobileNavbar } from '@/components/layout/MobileNavbar';

// Define category data structure to match CategorySelector expectations
const categories = [
  {
    id: 'meat',
    name: 'Meat & Poultry',
    icon: Beef,
    image: '/placeholder.svg',
    subcategories: [
      { name: 'Chicken', image: '/placeholder.svg' },
      { name: 'Beef', image: '/placeholder.svg' },
      { name: 'Lamb', image: '/placeholder.svg' },
      { name: 'Turkey', image: '/placeholder.svg' }
    ]
  },
  {
    id: 'seafood',
    name: 'Seafood',
    icon: Fish,
    image: '/placeholder.svg',
    subcategories: [
      { name: 'Fish', image: '/placeholder.svg' },
      { name: 'Shrimp', image: '/placeholder.svg' },
      { name: 'Crab', image: '/placeholder.svg' },
      { name: 'Lobster', image: '/placeholder.svg' }
    ]
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: Salad,
    image: '/placeholder.svg',
    subcategories: [
      { name: 'Leafy Greens', image: '/placeholder.svg' },
      { name: 'Root Vegetables', image: '/placeholder.svg' },
      { name: 'Peppers', image: '/placeholder.svg' },
      { name: 'Onions', image: '/placeholder.svg' }
    ]
  }
];

const filterOptions = {
  dietary: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo'],
  cookingTime: ['Quick (under 30 min)', 'Medium (30-60 min)', 'Long (60+ min)'],
  difficulty: ['Easy', 'Medium', 'Hard'],
  cuisine: ['Italian', 'Chinese', 'Mexican', 'Indian', 'Mediterranean']
};

export default function FindByIngredientsPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    dietary: '',
    cookingTime: '',
    difficulty: '',
    cuisine: ''
  });

  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const handleCategorySelect = (category: typeof categories[0]) => {
    setSelectedCategory(category);
    setCurrentStep(2);
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedCategory(null);
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setSelectedSubcategory(null);
    } else {
      setCurrentStep(0);
    }
  };

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearch = () => {
    console.log('Searching with:', {
      ingredients: selectedIngredients,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      filters
    });
  };

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesIngredients = selectedIngredients.length === 0 || 
      selectedIngredients.some(ingredient => 
        recipe.ingredients.some(recipeIngredient => 
          recipeIngredient.name.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    
    const matchesDietary = filters.dietary === '' || recipe.categories.includes(filters.dietary);
    const matchesDifficulty = filters.difficulty === '' || recipe.difficulty === filters.difficulty;
    const matchesTime = filters.cookingTime === '' || 
      (filters.cookingTime === 'Quick (under 30 min)' && recipe.prepTime + recipe.cookTime <= 30) ||
      (filters.cookingTime === 'Medium (30-60 min)' && recipe.prepTime + recipe.cookTime > 30 && recipe.prepTime + recipe.cookTime <= 60) ||
      (filters.cookingTime === 'Long (60+ min)' && recipe.prepTime + recipe.cookTime > 60);

    return matchesIngredients && matchesDietary && matchesDifficulty && matchesTime;
  });

  const filterCount = Object.values(filters).filter(v => v !== '').length;

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
          {currentStep === 0 && (
            <>
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

                  <Button
                    onClick={() => setCurrentStep(1)}
                    className="w-full mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal"
                  >
                    Choose Category
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {/* Category Selection Steps */}
          {(currentStep === 1 || currentStep === 2) && (
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              currentStep={currentStep}
              onCategorySelect={handleCategorySelect}
              onSubcategorySelect={handleSubcategorySelect}
              onBack={handleBack}
            />
          )}

          {/* Final Step - Filters and Search */}
          {currentStep === 3 && (
            <>
              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                filterOptions={filterOptions}
                showFilters={showFilters}
                onFilterChange={handleFilterChange}
                onToggleFilters={() => setShowFilters(!showFilters)}
                onCloseFilters={() => setShowFilters(false)}
              />

              {/* Search Summary */}
              <SearchSummary
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                ingredientCount={selectedIngredients.length}
                filterCount={filterCount}
                onSearch={handleSearch}
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
            </>
          )}
        </div>
      </PageContainer>
      
      {/* Mobile Bottom Navigation */}
      <MobileNavbar />
    </>
  );
}
