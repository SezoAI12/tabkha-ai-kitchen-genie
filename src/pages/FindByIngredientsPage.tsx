
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Camera, Heart, X } from 'lucide-react';

// Mock data for categories and subcategories
const categories = [
  { id: 1, name: 'Food', subcategories: ['Main Dishes', 'Appetizers', 'Pickles', 'Soups', 'Sauces', 'Others'] },
  { id: 2, name: 'Desserts', subcategories: ['Traditional', 'Western', 'Pastries', 'Ice Cream', 'Others'] },
  { id: 3, name: 'Drinks', subcategories: ['Detox', 'Cocktails', 'Alcoholic', 'Hot Drinks', 'Others'] }
];

// Mock data for filters
const dietaryOptions = ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb'];
const cookingTimeOptions = ['Under 30 mins', '1 hour', '2 hours', '3+ hours'];
const difficultyLevelOptions = ['Beginner', 'Intermediate', 'Expert'];
const cuisineTypeOptions = ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'Thai', 'Turkish', 'Syrian', 'Iraqi', 'Yemeni', 'American', 'Moroccan', 'Lebanese', 'German'];
const allergenFreeOptions = ['Dairy', 'Gluten', 'Tree Nuts', 'Shellfish', 'Soy', 'Eggs'];
const mealTypeOptions = ['Any Meal', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];
const religiousDietaryOptions = ['Halal', 'Kosher'];
const healthGoalsOptions = ['Low Calorie', 'Low Carb', 'High Protein', 'Low Fat'];

// Mock recipe data
const mockRecipes = [
  {
    id: 1,
    name: 'Mediterranean Pasta',
    image: '🍝',
    prepTime: 15,
    cookTime: 20,
    difficulty: 'Easy',
    rating: 4.5,
    description: 'A delicious pasta with fresh Mediterranean ingredients',
    ingredients: ['pasta', 'tomatoes', 'olive oil', 'basil']
  },
  {
    id: 2,
    name: 'Chicken Stir Fry',
    image: '🥘',
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Medium',
    rating: 4.3,
    description: 'Quick and healthy chicken stir fry with vegetables',
    ingredients: ['chicken', 'vegetables', 'soy sauce', 'garlic']
  },
  {
    id: 3,
    name: 'Chocolate Cake',
    image: '🍰',
    prepTime: 30,
    cookTime: 45,
    difficulty: 'Hard',
    rating: 4.8,
    description: 'Rich and moist chocolate cake perfect for celebrations',
    ingredients: ['flour', 'chocolate', 'eggs', 'butter']
  }
];

const FindRecipeByIngredientsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [ingredients, setIngredients] = useState<Array<{name: string, quantity: string, unit: string}>>([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    dietary: '',
    cookingTime: '',
    difficultyLevel: '',
    cuisineType: '',
    allergenFree: '',
    mealType: '',
    religiousDietary: '',
    healthGoals: ''
  });
  const [showResults, setShowResults] = useState(false);

  const handleAddIngredient = () => {
    if (ingredientInput && ingredientQuantity && ingredientUnit) {
      setIngredients([...ingredients, { name: ingredientInput, quantity: ingredientQuantity, unit: ingredientUnit }]);
      setIngredientInput('');
      setIngredientQuantity('');
      setIngredientUnit('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleFindRecipes = () => {
    console.log('Finding recipes...', { selectedCategory, selectedSubcategory, ingredients, selectedFilters });
    setShowResults(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Find Recipe by Ingredients</h1>

      {/* Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {categories.map((category) => (
          <Card key={category.id} className="transition-transform transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-bold mb-2">{category.name}</h2>
              <Select onValueChange={(value) => {
                setSelectedCategory(category.name);
                setSelectedSubcategory(value);
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {category.subcategories.map((subcategory) => (
                    <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Advanced Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select onValueChange={(value) => setSelectedFilters({ ...selectedFilters, dietary: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Dietary" />
            </SelectTrigger>
            <SelectContent>
              {dietaryOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedFilters({ ...selectedFilters, cookingTime: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Cooking Time" />
            </SelectTrigger>
            <SelectContent>
              {cookingTimeOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedFilters({ ...selectedFilters, difficultyLevel: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty Level" />
            </SelectTrigger>
            <SelectContent>
              {difficultyLevelOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedFilters({ ...selectedFilters, cuisineType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Cuisine Type" />
            </SelectTrigger>
            <SelectContent>
              {cuisineTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedFilters({ ...selectedFilters, allergenFree: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Allergen-Free" />
            </SelectTrigger>
            <SelectContent>
              {allergenFreeOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedFilters({ ...selectedFilters, mealType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Meal Type" />
            </SelectTrigger>
            <SelectContent>
              {mealTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedFilters({ ...selectedFilters, religiousDietary: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Religious Dietary" />
            </SelectTrigger>
            <SelectContent>
              {religiousDietaryOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedFilters({ ...selectedFilters, healthGoals: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Health Goals" />
            </SelectTrigger>
            <SelectContent>
              {healthGoalsOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Ingredient Input */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Add Ingredients</h2>
        <Tabs defaultValue="manual">
          <TabsList>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="pantry">Smart Pantry</TabsTrigger>
            <TabsTrigger value="image">Image Recognition</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <Input
                placeholder="Ingredient"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
              />
              <Input
                placeholder="Quantity"
                value={ingredientQuantity}
                onChange={(e) => setIngredientQuantity(e.target.value)}
              />
              <Select onValueChange={(value) => setIngredientUnit(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">grams</SelectItem>
                  <SelectItem value="kg">kilograms</SelectItem>
                  <SelectItem value="ml">milliliters</SelectItem>
                  <SelectItem value="L">liters</SelectItem>
                  <SelectItem value="pcs">pieces</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddIngredient}>
                <Plus size={16} className="mr-2" />
                Add Ingredient
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="pantry">
            <div className="text-center py-8 text-gray-500">
              <p>Smart Pantry integration coming soon!</p>
            </div>
          </TabsContent>
          <TabsContent value="image">
            <div className="text-center py-8 text-gray-500">
              <Camera className="mx-auto h-12 w-12 mb-4" />
              <p>Image Recognition feature coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>

        {ingredients.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Selected Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full flex items-center gap-2">
                  <span>{ingredient.quantity} {ingredient.unit} of {ingredient.name}</span>
                  <button
                    onClick={() => handleRemoveIngredient(index)}
                    className="text-teal-600 hover:text-teal-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Find Recipes Button */}
      <Button onClick={handleFindRecipes} className="w-full bg-teal-500 hover:bg-teal-600 text-white mb-6">
        <Search size={16} className="mr-2" />
        Find Recipes
      </Button>

      {/* Recipe Results */}
      {showResults && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Recipe Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="text-4xl text-center mb-2">{recipe.image}</div>
                  <h3 className="font-bold mb-2">{recipe.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>⏱️ {recipe.prepTime + recipe.cookTime} mins</span>
                    <span>📈 {recipe.difficulty}</span>
                    <span>⭐ {recipe.rating}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Heart size={16} className="mr-2" />
                    Save Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindRecipeByIngredientsPage;
