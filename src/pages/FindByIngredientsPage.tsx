
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search, Plus, X, Filter, ChefHat, Clock, Users, Heart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { mockRecipes } from '@/data/mockData';

// Sample ingredients
const availableIngredients = [
  'Chicken', 'Beef', 'Fish', 'Eggs', 'Milk', 'Cheese', 'Yogurt',
  'Rice', 'Pasta', 'Bread', 'Potatoes', 'Onions', 'Garlic', 'Tomatoes',
  'Carrots', 'Broccoli', 'Spinach', 'Bell Peppers', 'Mushrooms',
  'Olive Oil', 'Butter', 'Salt', 'Pepper', 'Herbs', 'Lemon'
];

export default function FindByIngredientsPage() {
  const { toast } = useToast();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundRecipes, setFoundRecipes] = useState(mockRecipes.slice(0, 6));
  const [isSearching, setIsSearching] = useState(false);

  const filteredIngredients = availableIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedIngredients.includes(ingredient)
  );

  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setSearchQuery('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const handleFindRecipes = async () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please select at least one ingredient to find recipes.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setFoundRecipes(mockRecipes.slice(0, 8));
      setIsSearching(false);
      toast({
        title: "Recipes found!",
        description: `Found ${mockRecipes.length} recipes with your ingredients.`,
      });
    }, 1500);
  };

  const handleClearAll = () => {
    setSelectedIngredients([]);
    setFoundRecipes([]);
  };

  return (
    <PageContainer header={{ title: 'Find by Ingredients', showBackButton: true }}>
      <div className="space-y-6 pb-24">
        {/* Ingredient Selection */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4">What ingredients do you have?</h2>
            
            {/* Selected Ingredients */}
            {selectedIngredients.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Ingredients:</h3>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {selectedIngredients.map((ingredient) => (
                      <motion.div
                        key={ingredient}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Badge variant="secondary" className="bg-wasfah-bright-teal text-white">
                          {ingredient}
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer"
                            onClick={() => handleRemoveIngredient(ingredient)}
                          />
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Search for ingredients */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search for ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Available ingredients */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
              {filteredIngredients.slice(0, 12).map((ingredient) => (
                <Button
                  key={ingredient}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddIngredient(ingredient)}
                  className="text-xs h-8 border-wasfah-bright-teal/20 hover:bg-wasfah-bright-teal hover:text-white"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {ingredient}
                </Button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleFindRecipes}
                disabled={selectedIngredients.length === 0 || isSearching}
                className="flex-1 bg-wasfah-bright-teal hover:bg-wasfah-teal"
              >
                {isSearching ? (
                  <>
                    <Search className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Find Recipes ({selectedIngredients.length} ingredients)
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleClearAll}
                disabled={selectedIngredients.length === 0}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recipe Results */}
        {foundRecipes.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4">
              Recipes found ({foundRecipes.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foundRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/recipe/${recipe.id}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                      <div
                        className="h-40 bg-cover bg-center rounded-t-lg"
                        style={{ backgroundImage: `url(${recipe.image})` }}
                      />
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg text-wasfah-deep-teal mb-2 line-clamp-2">
                          {recipe.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {recipe.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {recipe.time}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {recipe.servings}
                          </div>
                          <div className="flex items-center">
                            <ChefHat className="h-3 w-3 mr-1" />
                            {recipe.difficulty}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* No results state */}
        {selectedIngredients.length > 0 && foundRecipes.length === 0 && !isSearching && (
          <Card>
            <CardContent className="p-8 text-center">
              <ChefHat className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your ingredient selection or adding more common ingredients.
              </p>
              <Button variant="outline" onClick={handleClearAll}>
                Start Over
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
