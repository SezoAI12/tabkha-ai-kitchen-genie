import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Utensils, Cake, Coffee, Search, Plus, List, Camera, Mic,
  ArrowLeft, ChevronRight, X, Settings, Trash2
} from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { HungerButton } from '@/components/ui/hunger-button';

export default function FindByIngredientsPage() {
  // ============================================================================
  // DATA CONSTANTS
  // ============================================================================

  const mainCategories = [
    {
      id: 'food',
      name: 'Food',
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
      subcategories: [
        { name: 'Main Dishes', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&crop=center' },
        { name: 'Appetizers', image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=300&h=200&fit=crop&crop=center' },
        { name: 'Pickles', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop&crop=center' },
        { name: 'Soups', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=200&fit=crop&crop=center' },
        { name: 'Sauces', image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=300&h=200&fit=crop&crop=center' },
        { name: 'Others', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop&crop=center' }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: Cake,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center',
      subcategories: [
        { name: 'Traditional', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop&crop=center' },
        { name: 'Western', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop&crop=center' },
        { name: 'Pastries', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop&crop=center' },
        { name: 'Ice Cream', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=200&fit=crop&crop=center' },
        { name: 'Others', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop&crop=center' }
      ]
    },
    {
      id: 'drinks',
      name: 'Drinks',
      icon: Coffee,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center',
      subcategories: [
        { name: 'Detox', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=300&h=200&fit=crop&crop=center' },
        { name: 'Cocktails', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=200&fit=crop&crop=center' },
        { name: 'Alcoholic', image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=300&h=200&fit=crop&crop=center' },
        { name: 'Hot Drinks', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop&crop=center' },
        { name: 'Others', image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=300&h=200&fit=crop&crop=center' }
      ]
    },
  ];

  const FILTER_OPTIONS = {
    dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free'],
    cookingTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
    difficulty: ['Beginner', 'Intermediate', 'Expert'],
    cuisine: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
  };

  const PANTRY_ITEMS = [
    { id: '1', name: 'Flour', quantity: '1', unit: 'kg' },
    { id: '2', name: 'Sugar', quantity: '500', unit: 'g' },
    { id: '3', name: 'Eggs', quantity: '6', unit: 'pcs' },
    { id: '4', name: 'Milk', quantity: '1', unit: 'liter' },
    { id: '5', name: 'Chicken Breast', quantity: '500', unit: 'g' },
    { id: '6', name: 'Spinach', quantity: '200', unit: 'g' },
  ];

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [currentStep, setCurrentStep] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filters, setFilters] = useState({
    dietary: '',
    cookingTime: '',
    difficulty: '',
    cuisine: '',
  });
  const [ingredientForm, setIngredientForm] = useState({
    name: '',
    quantity: '',
    unit: ''
  });
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [ingredientTab, setIngredientTab] = useState('manual');

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep(2);
  };

  const handleSubcategorySelect = (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);
    setCurrentStep(3);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleIngredientFormChange = (field, value) => {
    setIngredientForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddIngredient = () => {
    if (!ingredientForm.name.trim()) return;
    const newIngredient = {
      id: Date.now().toString(),
      name: ingredientForm.name.trim(),
      quantity: ingredientForm.quantity || '1',
      unit: ingredientForm.unit.trim(),
      source: 'manual',
    };

    setAddedIngredients(prev => [...prev, newIngredient]);
    setIngredientForm({ name: '', quantity: '', unit: '' });
  };

  const handleAddPantryItem = (item) => {
    const isAlreadyAdded = addedIngredients.some(ing => ing.name === item.name);
    if (isAlreadyAdded) return;
    setAddedIngredients(prev => [...prev, { ...item, source: 'pantry' }]);
  };

  const handleRemoveIngredient = (id) => {
    setAddedIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const handleSearchRecipes = () => {
    const searchData = {
      category: selectedCategory?.name,
      subcategory: selectedSubcategory,
      filters,
      ingredients: addedIngredients.map(ing => ({ name: ing.name, quantity: ing.quantity, unit: ing.unit })),
    };
    console.log('Searching recipes with:', searchData);
    alert("Search initiated! Check console for data.");
  };

  // ============================================================================
  // RENDER HELPERS (Internal Components)
  // ============================================================================

  return (
    <PageContainer
      header={{
        title: 'Find Recipe',
        showBackButton: true,
        actions: <HungerButton />
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white"
    >
      <div className="space-y-6">
        {/* Step Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step <= currentStep
                    ? 'bg-wasfah-bright-teal text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Preference Filters */}
        <Card className="border-wasfah-mint/20 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-wasfah-deep-teal">Preference Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-wasfah-bright-teal text-sm p-2"
              >
                <Settings className="h-4 w-4 mr-1" />
                {Object.values(filters).filter(v => v).length > 0 ?
                  `${Object.values(filters).filter(v => v).length} Applied` :
                  'Set Preferences'
                }
              </Button>
            </div>
            {Object.values(filters).filter(v => v).length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {Object.entries(filters).filter(([_, v]) => v).map(([key, value]) => (
                  <span key={key} className="bg-wasfah-mint/20 text-wasfah-deep-teal text-xs px-2 py-1 rounded-full">
                    {`${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-wasfah-deep-teal">Choose Category</h2>
            <div className="grid grid-cols-1 gap-4">
              {mainCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all hover:scale-102 ${
                      selectedCategory?.id === category.id
                        ? 'border-wasfah-bright-teal shadow-lg'
                        : 'border-gray-200 active:scale-98'
                    }`}
                  >
                    <div className="relative h-32 w-full">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm inline-block mb-2">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <p className="font-bold text-xl">{category.name}</p>
                          <p className="text-sm opacity-90">
                            {category.subcategories.length} subcategories
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep(1)}
                className="p-2 text-wasfah-deep-teal hover:bg-wasfah-light-gray"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h2 className="text-lg font-semibold text-wasfah-deep-teal">{selectedCategory?.name}</h2>
              <div className="w-10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {mainCategories.find(cat => cat.id === selectedCategory?.id)?.subcategories?.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => handleSubcategorySelect(sub.name)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all hover:scale-102 ${
                    selectedSubcategory === sub.name
                      ? 'border-wasfah-bright-teal shadow-lg'
                      : 'border-gray-200 active:scale-95'
                  }`}
                >
                  <div className="relative h-24 w-full">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-semibold text-white text-center text-sm px-2">
                        {sub.name}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-center text-wasfah-deep-teal mb-6">Add Ingredients</h2>
            <Tabs value={ingredientTab} onValueChange={setIngredientTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-2 bg-wasfah-light-gray p-1 rounded-lg">
                <TabsTrigger value="manual" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Manual Entry</TabsTrigger>
                <TabsTrigger value="pantry" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Smart Pantry</TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <Input
                    placeholder="Ingredient name (e.g., Chicken Breast)"
                    value={ingredientForm.name}
                    onChange={(e) => handleIngredientFormChange('name', e.target.value)}
                    className="h-12"
                  />

                  <div className="flex gap-2">
                    <Input
                      placeholder="Quantity"
                      value={ingredientForm.quantity}
                      onChange={(e) => handleIngredientFormChange('quantity', e.target.value)}
                      className="h-12 flex-1"
                      type="number"
                    />
                    <Input
                      placeholder="Unit (kg, pcs, etc)"
                      value={ingredientForm.unit}
                      onChange={(e) => handleIngredientFormChange('unit', e.target.value)}
                      className="h-12 flex-1"
                    />
                  </div>

                  <Button
                    onClick={handleAddIngredient}
                    className="w-full h-12 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
                    disabled={!ingredientForm.name.trim()}
                  >
                    <Plus className="mr-2 h-5 w-5" /> Add Ingredient
                  </Button>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1 h-12 border-wasfah-mint/30 text-wasfah-deep-teal hover:bg-wasfah-light-gray">
                    <Camera className="mr-2 h-4 w-4" /> Scan
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 border-wasfah-mint/30 text-wasfah-deep-teal hover:bg-wasfah-light-gray">
                    <Mic className="mr-2 h-4 w-4" /> Voice
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="pantry" className="mt-4">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {PANTRY_ITEMS.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-wasfah-mint/30 rounded-lg">
                      <div>
                        <p className="font-medium text-wasfah-deep-teal">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.quantity} {item.unit}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddPantryItem(item)}
                        disabled={addedIngredients.some(ing => ing.name === item.name)}
                        className="text-wasfah-bright-teal border-wasfah-bright-teal disabled:opacity-50 hover:bg-wasfah-light-gray"
                      >
                        {addedIngredients.some(ing => ing.name === item.name) ? 'Added' : 'Add'}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Added Ingredients List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center text-wasfah-deep-teal">
                  <List className="mr-2 h-5 w-5" />
                  Your Ingredients
                </h3>
                <span className="text-sm text-gray-500">({addedIngredients.length})</span>
              </div>

              {addedIngredients.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">No ingredients added yet</p>
                  <p className="text-sm text-gray-400 mt-1">Add ingredients to get started</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {addedIngredients.map(ingredient => (
                    <div key={ingredient.id} className="flex items-center justify-between p-3 bg-wasfah-light-gray rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-wasfah-deep-teal">{ingredient.name}</p>
                        <p className="text-sm text-gray-500">
                          {ingredient.quantity} {ingredient.unit} • From {ingredient.source}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveIngredient(ingredient.id)}
                        className="text-red-500 hover:bg-red-50 p-2"
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
              className="w-full h-12 mt-6 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white disabled:bg-gray-300"
            >
              Continue to Search
            </Button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-center mb-6 text-wasfah-deep-teal">Ready to Search</h2>
            {/* Search Summary */}
            <Card className="mb-6 bg-wasfah-mint/10 border-wasfah-mint/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-wasfah-deep-teal">Search Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-wasfah-teal">Category:</span>
                  <span className="font-medium">{selectedCategory?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-wasfah-teal">Type:</span>
                  <span className="font-medium">{selectedSubcategory}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-wasfah-teal">Ingredients:</span>
                  <span className="font-medium">{addedIngredients.length} items</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-wasfah-teal">Filters:</span>
                  <span className="font-medium">
                    {Object.values(filters).filter(v => v).length} applied
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Search Button */}
            <Button
              onClick={handleSearchRecipes}
              className="w-full h-14 bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg font-semibold text-white"
            >
              <Search className="mr-3 h-6 w-6" />
              Find My Recipes
            </Button>

            {/* Results Placeholder */}
            <Card className="mt-6 border-2 border-dashed border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">
                  Recipe results will appear here after searching
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters Panel */}
        <div className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ${ showFilters ? 'translate-x-0' : 'translate-x-full' }`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-wasfah-deep-teal">Filters</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4 space-y-6 overflow-y-auto">
            {Object.entries(FILTER_OPTIONS).map(([filterType, options]) => (
              <div key={filterType} className="space-y-2">
                <label className="block text-sm font-medium text-wasfah-deep-teal capitalize">
                  {filterType.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <select
                  value={filters[filterType]}
                  onChange={(e) => handleFilterChange(filterType, e.target.value)}
                  className="w-full p-3 border border-wasfah-mint/30 rounded-lg focus:border-wasfah-bright-teal focus:outline-none"
                >
                  <option value="">Any {filterType.replace(/([A-Z])/g, ' $1').trim()}</option>
                  {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-wasfah-light-gray">
            <Button
              onClick={() => setShowFilters(false)}
              className="w-full h-12 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
