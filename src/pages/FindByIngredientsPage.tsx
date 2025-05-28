// src/pages/FindByIngredientsPage.tsx

import React, { useState } from 'react';
import { Utensils, Cake, Coffee, Camera, Mic } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { CategorySelector } from '@/components/ingredients/CategorySelector';
import { IngredientManager } from '@/components/ingredients/IngredientManager';
import { FilterPanel } from '@/components/ingredients/FilterPanel';
import { SearchSummary } from '@/components/ingredients/SearchSummary';
import { useToast } from '@/hooks/use-toast';

// --- IMPORT YOUR IMAGES HERE ---
// Food Category
import mainFoodImg from '@/assets/images/food/main-food.jpg'; // Path to your downloaded general food image
import mainDishesImg from '@/assets/images/food/main-dishes.jpg';
import appetizersImg from '@/assets/images/food/appetizers.jpg';
import picklesImg from '@/assets/images/food/pickles.jpg';
import soupsImg from '@/assets/images/food/soups.jpg';
import saucesImg from '@/assets/images/food/sauces.jpg';
import otherFoodImg from '@/assets/images/food/other-food.jpg';

// Desserts Category
import mainDessertImg from '@/assets/images/desserts/main-dessert.jpg';
import traditionalDessertImg from '@/assets/images/desserts/traditional-dessert.jpg';
import westernDessertImg from '@/assets/images/desserts/western-dessert.jpg';
import pastriesImg from '@/assets/images/desserts/pastries.jpg';
import iceCreamImg from '@/assets/images/desserts/ice-cream.jpg';
import otherDessertsImg from '@/assets/images/desserts/other-desserts.jpg';

// Drinks Category
import mainDrinksImg from '@/assets/images/drinks/main-drinks.jpg';
import detoxImg from '@/assets/images/drinks/detox.jpg';
import cocktailsImg from '@/assets/images/drinks/cocktails.jpg';
import alcoholicDrinksImg from '@/assets/images/drinks/alcoholic-drinks.jpg';
import hotDrinksImg from '@/assets/images/drinks/hot-drinks.jpg';
import otherDrinksImg from '@/assets/images/drinks/other-drinks.jpg';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  source: 'manual' | 'pantry';
}

interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

interface Filters {
  dietary: string;
  cookingTime: string;
  difficulty: string;
  cuisine: string;
}

export default function FindByIngredientsPage() {
  const { toast } = useToast();

  const mainCategories = [
    {
      id: 'food',
      name: 'Food',
      icon: Utensils,
      image: mainFoodImg, // Use the imported image variable
      subcategories: [
        { name: 'Main Dishes', image: mainDishesImg },
        { name: 'Appetizers', image: appetizersImg },
        { name: 'Pickles', image: picklesImg },
        { name: 'Soups', image: soupsImg },
        { name: 'Sauces', image: saucesImg },
        { name: 'Others', image: otherFoodImg }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: Cake,
      image: mainDessertImg,
      subcategories: [
        { name: 'Traditional', image: traditionalDessertImg },
        { name: 'Western', image: westernDessertImg },
        { name: 'Pastries', image: pastriesImg },
        { name: 'Ice Cream', image: iceCreamImg },
        { name: 'Others', image: otherDessertsImg }
      ]
    },
    {
      id: 'drinks',
      name: 'Drinks',
      icon: Coffee,
      image: mainDrinksImg,
      subcategories: [
        { name: 'Detox', image: detoxImg },
        { name: 'Cocktails', image: cocktailsImg },
        { name: 'Alcoholic', image: alcoholicDrinksImg },
        { name: 'Hot Drinks', image: hotDrinksImg },
        { name: 'Others', image: otherDrinksImg }
      ]
    },
  ];

  const FILTER_OPTIONS = {
    dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free'],
    cookingTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
    difficulty: ['Beginner', 'Intermediate', 'Expert'],
    cuisine: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
  };

  const PANTRY_ITEMS: PantryItem[] = [
    { id: '1', name: 'Flour', quantity: '1', unit: 'kg' },
    { id: '2', name: 'Sugar', quantity: '500', unit: 'g' },
    { id: '3', name: 'Eggs', quantity: '6', unit: 'pcs' },
    { id: '4', name: 'Milk', quantity: '1', unit: 'liter' },
    { id: '5', name: 'Chicken Breast', quantity: '500', unit: 'g' },
    { id: '6', name: 'Spinach', quantity: '200', unit: 'g' },
  ];

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    dietary: '',
    cookingTime: '',
    difficulty: '',
    cuisine: '',
  });
  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);

  // Handlers
  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setCurrentStep(2);
  };

  const handleSubcategorySelect = (subcategoryName: string) => {
    setSelectedSubcategory(subcategoryName);
    setCurrentStep(3);
  };

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleAddIngredient = (ingredient: Ingredient) => {
    setAddedIngredients(prev => [...prev, ingredient]);
  };

  const handleAddPantryItem = (item: PantryItem) => {
    const isAlreadyAdded = addedIngredients.some(ing => ing.name === item.name);
    if (isAlreadyAdded) return;
    setAddedIngredients(prev => [...prev, { ...item, source: 'pantry' as const }]);
  };

  const handleRemoveIngredient = (id: string) => {
    setAddedIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const handleScanIngredients = () => {
    toast({
      title: "Scan Feature",
      description: "Camera scanning feature will be implemented soon!",
    });
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Feature",
      description: "Voice input feature will be implemented soon!",
    });
  };

  const handleSearchRecipes = () => {
    const searchData = {
      category: selectedCategory?.name,
      subcategory: selectedSubcategory,
      filters,
      ingredients: addedIngredients.map(ing => ({ name: ing.name, quantity: ing.quantity, unit: ing.unit })),
    };
    console.log('Searching recipes with:', searchData);
    toast({
      title: "Search Started",
      description: "Looking for recipes with your criteria...",
    });
  };

  const renderStepIndicator = () => (
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
  );

  return (
    <PageContainer
      header={{
        title: 'Find Recipe',
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        {renderStepIndicator()}

        <FilterPanel
          filters={filters}
          filterOptions={FILTER_OPTIONS}
          showFilters={showFilters}
          onFilterChange={handleFilterChange}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onCloseFilters={() => setShowFilters(false)}
        />

        {(currentStep === 1 || currentStep === 2) && (
          <CategorySelector
            categories={mainCategories}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            currentStep={currentStep}
            onCategorySelect={handleCategorySelect}
            onSubcategorySelect={handleSubcategorySelect}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <>
            <IngredientManager
              addedIngredients={addedIngredients}
              pantryItems={PANTRY_ITEMS}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              onAddPantryItem={handleAddPantryItem}
              onScanIngredients={handleScanIngredients}
              onVoiceInput={handleVoiceInput}
            />

            <div className="pt-4">
              <button
                onClick={() => setCurrentStep(4)}
                disabled={addedIngredients.length === 0}
                className="w-full h-12 mt-6 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white disabled:bg-gray-300 rounded-lg font-medium transition-colors"
              >
                Continue to Search
              </button>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <SearchSummary
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            ingredientCount={addedIngredients.length}
            filterCount={Object.values(filters).filter(v => v).length}
            onSearch={handleSearchRecipes}
          />
        )}
      </div>
    </PageContainer>
  );
}
