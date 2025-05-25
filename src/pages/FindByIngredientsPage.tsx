
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Camera, Mic, FileText, Heart, Clock, Star, Filter, Users, Award, ShoppingCart } from 'lucide-react';

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

  const handleAddIngredient = () => {
    if (ingredientInput && ingredientQuantity && ingredientUnit) {
      setIngredients([...ingredients, { name: ingredientInput, quantity: ingredientQuantity, unit: ingredientUnit }]);
      setIngredientInput('');
      setIngredientQuantity('');
      setIngredientUnit('');
    }
  };

  const handleFindRecipes = () => {
    // Logic to find recipes based on selected criteria
    console.log('Finding recipes...', { selectedCategory, selectedSubcategory, ingredients, selectedFilters });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-teal-700">Find by Ingredients</h1>

      {/* Main Categories */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {categories.map((category) => (
          <Card key={category.id} className="transition-transform transform hover:scale-105 bg-gradient-to-br from-teal-50 to-teal-100">
            <CardContent className="p-4 text-center">
              <h2 className="text-lg font-bold mb-2 text-teal-700">{category.name}</h2>
              <Select onValueChange={(value) => {
                setSelectedCategory(category.name);
                setSelectedSubcategory(value);
              }}>
                <SelectTrigger className="w-full bg-white">
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
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-teal-700">Advanced Filters</h2>
        <div className="grid grid-cols-1 gap-4">
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
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-teal-700">Add Ingredients</h2>
        <Tabs defaultValue="manual">
          <TabsList>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="pantry">Smart Pantry</TabsTrigger>
            <TabsTrigger value="image">Image Recognition</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <div className="flex flex-col gap-4 mb-4">
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
              <Button onClick={handleAddIngredient} className="bg-teal-500 hover:bg-teal-600 text-white">
                <Plus size={16} className="mr-2" />
                Add Ingredient
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="pantry">
            <p>Smart Pantry Content</p>
          </TabsContent>
          <TabsContent value="image">
            <p>Image Recognition Content</p>
          </TabsContent>
        </Tabs>

        <div className="mb-4">
          <h3 className="text-base font-bold mb-2 text-teal-700">Selected Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index} className="mb-2 bg-teal-50 p-2 rounded">
                {ingredient.quantity} {ingredient.unit} of {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Find Recipes Button */}
      <Button onClick={handleFindRecipes} className="w-full bg-teal-500 hover:bg-teal-600 text-white">
        <Search size={16} className="mr-2" />
        Find Recipes
      </Button>

      {/* Recipe Results */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4 text-teal-700">Recipe Results</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Mock Recipe Cards */}
          <Card className="bg-gradient-to-br from-teal-50 to-teal-100">
            <CardContent className="p-4">
              <h3 className="font-bold mb-2 text-teal-700">Recipe 1</h3>
              <p className="text-gray-600">Description of Recipe 1</p>
              <Button variant="outline" className="mt-4 bg-white text-teal-700 hover:bg-teal-50">
                <Heart size={16} className="mr-2" />
                Save
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-teal-50 to-teal-100">
            <CardContent className="p-4">
              <h3 className="font-bold mb-2 text-teal-700">Recipe 2</h3>
              <p className="text-gray-600">Description of Recipe 2</p>
              <Button variant="outline" className="mt-4 bg-white text-teal-700 hover:bg-teal-50">
                <Heart size={16} className="mr-2" />
                Save
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-teal-50 to-teal-100">
            <CardContent className="p-4">
              <h3 className="font-bold mb-2 text-teal-700">Recipe 3</h3>
              <p className="text-gray-600">Description of Recipe 3</p>
              <Button variant="outline" className="mt-4 bg-white text-teal-700 hover:bg-teal-50">
                <Heart size={16} className="mr-2" />
                Save
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FindRecipeByIngredientsPage;
