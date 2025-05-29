import React, { useState } from 'react';
import {
  Utensils, Cake, Coffee, Camera, Mic, Soup, Salad, Egg, Milk, Drumstick,
  LeafyGreen, Apple, Carrot, IceCream, Cookie, Wine, Beer, Pizza, ChefHat, // ChefHat for Food category
  Share2, Calendar, Users, Award, Sparkles, Circle, Wheat, Fish, GlassWater,
  Jar,
  Cheese,
  Shrimp,
  Fork,
  Candy,
  Bottle,
  MoreHorizontal
} from 'lucide-react'; // Import necessary icons

import { PageContainer } from '@/components/layout/PageContainer';
import { CategorySelector } from '@/components/ingredients/CategorySelector';
import { IngredientManager } from '@/components/ingredients/IngredientManager';
import { FilterPanel } from '@/components/ingredients/FilterPanel';
import { SearchSummary } from '@/components/ingredients/SearchSummary';
import { useToast } from '@/hooks/use-toast';

import { ElementType } from 'react';

// Updated Ingredient interface to include optional icon
interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  source: 'manual' | 'pantry';
  icon?: ElementType;
}

// Updated PantryItem interface to include optional icon
interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  icon?: ElementType;
}

interface Filters {
  dietary: string;
  cookingTime: string;
  difficulty: string;
  cuisine: string;
}

export default function FindByIngredientsPage() {
  const { toast } = useToast();

  // --- Data with Thematic Icons (Updated based on image for main 'Food' category) ---
  const mainCategories = [
    {
      id: 'food',
      name: 'Food',
      icon: ChefHat, // Changed to ChefHat as it's the "By Ingredients" icon in the attached image
      subcategories: [
        { name: 'Main Dishes', icon: ChefHat }, // Chef hat for main cooking (still relevant here)
        { name: 'Appetizers', icon: Salad }, // Salad for starters
        { name: 'Pickles', icon: Jar }, // Jar for preserved/pickled items
        { name: 'Soups', icon: Soup }, // Soup bowl
        { name: 'Sauces', icon: Fork }, // Fork/Utensil for sauces
        { name: 'Others', icon: Utensils } // Generic food icon
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: Cake, // Cake icon (retained)
      subcategories: [
        { name: 'Traditional', icon: Cookie }, // Cookie/Pastry icon (retained)
        { name: 'Western', icon: IceCream }, // Ice cream for cold/western desserts (retained)
        { name: 'Pastries', icon: Cake }, // Cake/Pastry icon (retained)
        { name: 'Ice Cream', icon: IceCream }, // Ice cream icon (retained)
        { name: 'Others', icon: Sparkles } // Sparkles for sweet/special (retained)
      ]
    },
    {
      id: 'drinks',
      name: 'Drinks',
      icon: Coffee, // Coffee/Drink icon (retained)
      subcategories: [
        { name: 'Detox', icon: GlassWater }, // Glass of water/drink (retained)
        { name: 'Cocktails', icon: Wine }, // Wine glass for cocktails (retained)
        { name: 'Alcoholic', icon: Beer }, // Beer mug for alcoholic drinks (retained)
        { name: 'Hot Drinks', icon: Coffee }, // Coffee cup for hot drinks (retained)
        { name: 'Others', icon: GlassWater } // Generic drink icon (retained)
      ]
    },
  ];

  const FILTER_OPTIONS = {
    dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free'],
    cookingTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
    difficulty: ['Beginner', 'Intermediate', 'Expert'],
    cuisine: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
  };

  // Mock Pantry Items - Using specific icons (retained)
  const PANTRY_ITEMS: PantryItem[] = [
    { id: 'p1', name: 'Flour', quantity: '1', unit: 'kg', icon: Wheat },
    { id: 'p2', name: 'Sugar', quantity: '500', unit: 'g', icon: Sparkles },
    { id: 'p3', name: 'Eggs', quantity: '6', unit: 'pcs', icon: Egg },
    { id: 'p4', name: 'Milk', quantity: '1', unit: 'liter', icon: Milk },
    { id: 'p5', name: 'Chicken Breast', quantity: '500', unit: 'g', icon: Drumstick },
    { id: 'p6', name: 'Spinach', quantity: '200', unit: 'g', icon: LeafyGreen },
    { id: 'p7', name: 'Cheese', quantity: '300', unit: 'g', icon: Cheese },
    { id: 'p8', name: 'Salmon', quantity: '400', unit: 'g', icon: Fish },
    { id: 'p9', name: 'Shrimp', quantity: '500', unit: 'g', icon: Shrimp },
    { id: 'p10', name: 'Carrots', quantity: '5', unit: 'pcs', icon: Carrot },
  ];

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
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

  // handleAddIngredient now expects an Ingredient object which might include an icon
  const handleAddIngredient = (ingredient: Ingredient) => {
      // Ensure the ingredient has a unique ID if it's manual and doesn't have one yet
      const ingredientWithId = ingredient.id ? ingredient : { ...ingredient, id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
      setAddedIngredients(prev => [...prev, ingredientWithId]);
  };

  const handleAddPantryItem = (item: PantryItem) => {
    const isAlreadyAdded = addedIngredients.some(ing => ing.name === item.name);
    if (isAlreadyAdded) {
        toast({
            title: "Already Added",
            description: `${item.name} is already in your list.`,
            variant: "default",
        });
        return;
    }
    // Add pantry item, ensuring it has an icon if available
    setAddedIngredients(prev => [...prev, {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        source: 'pantry',
        icon: item.icon
    }]);
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
      ingredients: addedIngredients.map(ing => ({
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
          // icon: ing.icon // Optional: pass icon if needed by results page
      })),
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
