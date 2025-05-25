import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Utensils, Cake, Coffee, Search, Plus, List, Camera, Mic, Filter, Trash2,
  ArrowLeft, ChevronDown, X, Settings
} from 'lucide-react';

// Main Categories Data
const mainCategories = [
  { name: 'Food', icon: <Utensils className="h-6 w-6" />, subcategories: ['Main Dishes', 'Appetizers', 'Pickles', 'Soups', 'Sauces', 'Others'] },
  { name: 'Desserts', icon: <Cake className="h-6 w-6" />, subcategories: ['Traditional', 'Western', 'Pastries', 'Ice Cream', 'Others'] },
  { name: 'Drinks', icon: <Coffee className="h-6 w-6" />, subcategories: ['Detox', 'Cocktails', 'Alcoholic', 'Hot Drinks', 'Others'] },
];

// Filter Options Data
const filterOptions = {
  dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free'],
  cookingTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
  difficulty: ['Beginner', 'Intermediate', 'Expert'],
  cuisine: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
};

// Smart Pantry Items
const smartPantryItems = [
  { id: 'sp1', name: 'Flour', quantity: 1, unit: 'kg' },
  { id: 'sp2', name: 'Sugar', quantity: 500, unit: 'g' },
  { id: 'sp3', name: 'Eggs', quantity: 6, unit: '' },
  { id: 'sp4', name: 'Milk', quantity: 1, unit: 'liter' },
  { id: 'sp5', name: 'Chicken Breast', quantity: 500, unit: 'g' },
  { id: 'sp6', name: 'Spinach', quantity: 200, unit: 'g' },
];

export default function MobileRecipeFinder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dietary: 'Normal',
    cookingTime: '',
    difficulty: '',
    cuisine: '',
  });

  // Ingredient States
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('');
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [ingredientTab, setIngredientTab] = useState('manual');

  const handleAddIngredient = () => {
    if (!ingredientName.trim()) return;
    
    const newIngredient = {
      id: Date.now().toString(),
      name: ingredientName.trim(),
      quantity: ingredientQuantity || '1',
      unit: ingredientUnit.trim(),
      source: 'manual',
    };
    setAddedIngredients(prev => [...prev, newIngredient]);
    setIngredientName('');
    setIngredientQuantity('');
    setIngredientUnit('');
  };

  const handleRemoveIngredient = (id) => {
    setAddedIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const handleSelectPantryItem = (item) => {
    const isAlreadyAdded = addedIngredients.some(ing => ing.name === item.name);
    if (isAlreadyAdded) return;
    
    setAddedIngredients(prev => [...prev, { ...item, source: 'pantry' }]);
  };

  const handleFindRecipes = () => {
    console.log("Searching with:", {
      selectedCategory,
      selectedSubcategory,
      filters,
      addedIngredients,
    });
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6">
      <div className="flex space-x-2">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step <= currentStep 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );

  const renderHeader = () => (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="sm" className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Find Recipe</h1>
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const renderCategorySelection = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold text-center">Choose Category</h2>
      <div className="grid grid-cols-1 gap-3">
        {mainCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => {
              setSelectedCategory(category.name);
              setCurrentStep(2);
            }}
            className={`flex items-center p-4 rounded-xl border-2 transition-all ${
              selectedCategory === category.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white active:bg-gray-50'
            }`}
          >
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              {category.icon}
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-lg">{category.name}</p>
              <p className="text-sm text-gray-500">
                {category.subcategories.length} subcategories
              </p>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-400 rotate-[-90deg]" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderSubcategorySelection = () => {
    const currentSubcategories = selectedCategory
      ? mainCategories.find(cat => cat.name === selectedCategory)?.subcategories || []
      : [];

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep(1)}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-lg font-semibold">{selectedCategory}</h2>
          <div className="w-10" />
        </div>
        
        <div className="space-y-2">
          {currentSubcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubcategory(sub);
                setCurrentStep(3);
              }}
              className={`w-full p-4 text-left rounded-lg border transition-all ${
                selectedSubcategory === sub
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white active:bg-gray-50'
              }`}
            >
              <p className="font-medium">{sub}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderFiltersPanel = () => (
    <div className={`fixed inset-0 z-50 bg-white transition-transform ${
      showFilters ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(false)}
          className="p-2"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4 space-y-6">
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium capitalize text-gray-700">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <select
              value={filters[key]}
              onChange={(e) => setFilters(prev => ({ ...prev, [key]: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select {key}</option>
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t bg-gray-50">
        <Button
          onClick={() => setShowFilters(false)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  const renderIngredientInput = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentStep(2)}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2 className="text-lg font-semibold">Add Ingredients</h2>
        <div className="w-10" />
      </div>

      <Tabs value={ingredientTab} onValueChange={setIngredientTab}>
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="manual" className="rounded-md">Manual</TabsTrigger>
          <TabsTrigger value="pantry" className="rounded-md">Pantry</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4 mt-4">
          <div className="space-y-3">
            <Input
              placeholder="Ingredient name"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              className="h-12 text-base"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Qty"
                value={ingredientQuantity}
                onChange={(e) => setIngredientQuantity(e.target.value)}
                className="h-12 flex-1"
              />
              <Input
                placeholder="Unit"
                value={ingredientUnit}
                onChange={(e) => setIngredientUnit(e.target.value)}
                className="h-12 flex-1"
              />
            </div>
            <Button
              onClick={handleAddIngredient}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Plus className="mr-2 h-5 w-5" /> Add Ingredient
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 h-12">
              <Camera className="mr-2 h-4 w-4" /> Scan
            </Button>
            <Button variant="outline" className="flex-1 h-12">
              <Mic className="mr-2 h-4 w-4" /> Voice
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="pantry" className="space-y-4 mt-4">
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {smartPantryItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.quantity} {item.unit}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSelectPantryItem(item)}
                  className="text-blue-500 border-blue-500"
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Added Ingredients List */}
      <div className="space-y-3">
        <h3 className="font-semibold flex items-center">
          <List className="mr-2 h-5 w-5" />
          Added Ingredients ({addedIngredients.length})
        </h3>
        
        {addedIngredients.length === 0 ? (
          <p className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            No ingredients added yet
          </p>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {addedIngredients.map(ing => (
              <div key={ing.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{ing.name}</p>
                  <p className="text-sm text-gray-500">
                    {ing.quantity} {ing.unit} • {ing.source}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveIngredient(ing.id)}
                  className="text-red-500 p-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={() => setCurrentStep(4)}
        disabled={addedIngredients.length === 0}
        className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300"
      >
        Continue to Results
      </Button>
    </div>
  );

  const renderResults = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentStep(3)}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2 className="text-lg font-semibold">Recipe Results</h2>
        <div className="w-10" />
      </div>

      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Search className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Ready to Find Recipes!</h3>
            <p className="text-gray-600 mb-4">
              We'll search for recipes based on your selected category, ingredients, and preferences.
            </p>
            <Button
              onClick={handleFindRecipes}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              <Search className="mr-2 h-5 w-5" /> Find My Recipes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="bg-gray-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Search Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm"><strong>Category:</strong> {selectedCategory || 'Not selected'}</p>
          <p className="text-sm"><strong>Subcategory:</strong> {selectedSubcategory || 'Not selected'}</p>
          <p className="text-sm"><strong>Ingredients:</strong> {addedIngredients.length} items</p>
          <p className="text-sm"><strong>Filters:</strong> {Object.values(filters).filter(v => v).length} applied</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      {renderStepIndicator()}
      
      <div className="pb-20">
        {currentStep === 1 && renderCategorySelection()}
        {currentStep === 2 && renderSubcategorySelection()}
        {currentStep === 3 && renderIngredientInput()}
        {currentStep === 4 && renderResults()}
      </div>
      
      {renderFiltersPanel()}
    </div>
  );
}
