import React, { useState, ElementType } from 'react'; // ElementType for icons
import {
  Utensils, Cake, Coffee, Camera, Mic, Soup, Salad, Egg, Milk, Drumstick,
  LeafyGreen, Apple, Carrot, IceCream, Cookie, Wine, Beer, Pizza, ChefHat,
  Share2, Calendar, Users, Award, Sparkles, Circle, Wheat, Fish, GlassWater,
  Jar, Cheese, Shrimp, Fork, Candy, Bottle, MoreHorizontal,
  // New icons potentially for drink customization if needed in SearchSummary or elsewhere
  Cocktail, Droplet, Sun, Snow, Chili, Citrus, Leaf, Diamond, Cherry,
  // Ensure all necessary lucide-react icons are imported if used in DrinkCustomizationForm
  // For the purpose of this file, the primary dependency is on the component itself.
} from 'lucide-react';

import { PageContainer } from '@/components/layout/PageContainer';
import { CategorySelector } from '@/components/ingredients/CategorySelector';
import { IngredientManager } from '@/components/ingredients/IngredientManager';
import { FilterPanel } from '@/components/ingredients/FilterPanel';
import { SearchSummary } from '@/components/ingredients/SearchSummary';
import { useToast } from '@/hooks/use-toast';
import { DrinkCustomizationForm, DrinkOptions } from '@/components/drinks/DrinkCustomizationForm'; // Import the new component and its type

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

  const mainCategories = [
    {
      id: 'food',
      name: 'Food',
      icon: ChefHat,
      subcategories: [
        { name: 'Main Dishes', icon: ChefHat },
        { name: 'Appetizers', icon: Salad },
        { name: 'Pickles', icon: Jar },
        { name: 'Soups', icon: Soup },
        { name: 'Sauces', icon: Fork },
        { name: 'Others', icon: Utensils }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: Cake,
      subcategories: [
        { name: 'Traditional', icon: Cookie },
        { name: 'Western', icon: IceCream },
        { name: 'Pastries', icon: Cake },
        { name: 'Ice Cream', icon: IceCream },
        { name: 'Others', icon: Sparkles }
      ]
    },
    {
      id: 'drinks',
      name: 'Drinks',
      icon: Coffee, // Keep Coffee icon for main 'Drinks' category selection
      isCustomizable: true, // NEW: Flag to indicate custom form for drinks
      subcategories: [] // No traditional subcategories for drinks in this flow
    },
  ];

  const FILTER_OPTIONS = {
    dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free'],
    cookingTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
    difficulty: ['Beginner', 'Intermediate', 'Expert'],
    cuisine: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
  };

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
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string; icon: ElementType; isCustomizable?: boolean; subcategories: any[] } | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null); // Still used for non-drink categories
  const [filters, setFilters] = useState<Filters>({
    dietary: '',
    cookingTime: '',
    difficulty: '',
    cuisine: '',
  });
  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);
  // NEW: State for custom drink options
  const [customDrinkOptions, setCustomDrinkOptions] = useState<DrinkOptions | null>(null);

  // Handlers
  const handleCategorySelect = (category: typeof mainCategories[0]) => {
    setSelectedCategory(category);
    if (category.isCustomizable) {
      setCurrentStep(2); // Go to step 2, but will render custom form
    } else {
      setCurrentStep(2); // For food/desserts, still go to subcategory selection
    }
  };

  const handleSubcategorySelect = (subcategoryName: string) => {
    setSelectedSubcategory(subcategoryName);
    setCurrentStep(3); // Proceed to Ingredient Manager for non-drink items
  };

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleAddIngredient = (ingredient: Ingredient) => {
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

  // NEW: Handle generation of custom drink
  const handleGenerateCustomDrink = (options: DrinkOptions) => {
    setCustomDrinkOptions(options);
    setCurrentStep(4); // Skip ingredient manager, go straight to search summary
  };

  const handleSearchRecipes = () => {
    let searchData: any; // Use 'any' for flexibility, or define a more complex type
    if (selectedCategory?.id === 'drinks' && customDrinkOptions) {
      searchData = {
        category: selectedCategory.name,
        drinkOptions: customDrinkOptions,
        filters,
      };
    } else {
      searchData = {
        category: selectedCategory?.name,
        subcategory: selectedSubcategory,
        filters,
        ingredients: addedIngredients.map(ing => ({
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit,
        })),
      };
    }

    console.log('Searching recipes with:', searchData);
    toast({
      title: "Search Started",
      description: "Looking for recipes with your criteria...",
    });
    // In a real app, this would trigger an API call and navigate to results page
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

        {/* Step 1: Category Selection */}
        {currentStep === 1 && (
          <CategorySelector
            categories={mainCategories}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            currentStep={currentStep}
            onCategorySelect={handleCategorySelect}
            onSubcategorySelect={handleSubcategorySelect} // This won't be called for drinks category
            onBack={() => setCurrentStep(1)} // Back from subcategory or drink form to main category
          />
        )}

        {/* Step 2: Conditional Rendering for Drink Customization vs. Subcategories */}
        {currentStep === 2 && selectedCategory && (
          selectedCategory.isCustomizable ? (
            // If 'Drinks' category is selected, show the custom form
            <DrinkCustomizationForm
              onGenerateDrink={handleGenerateCustomDrink}
              onBack={() => setCurrentStep(1)} // Back to main categories
            />
          ) : (
            // For Food/Desserts, show subcategory selection
            <CategorySelector
              categories={mainCategories} // Pass all categories to allow CategorySelector to find subcategories
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              currentStep={currentStep}
              onCategorySelect={handleCategorySelect} // This won't be used here but kept for prop structure
              onSubcategorySelect={handleSubcategorySelect}
              onBack={() => setCurrentStep(1)} // Back to main categories
            />
          )
        )}

        {/* Step 3: Ingredient Manager (Skipped for custom drinks, only for food/desserts) */}
        {currentStep === 3 && selectedCategory?.id !== 'drinks' && (
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

        {/* Step 4: Search Summary */}
        {currentStep === 4 && (
          <SearchSummary
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory} // Will be null for drinks
            ingredientCount={selectedCategory?.id === 'drinks' ? 0 : addedIngredients.length} // 0 for drinks
            filterCount={Object.values(filters).filter(v => v).length}
            customDrinkOptions={customDrinkOptions} // Pass new options to SearchSummary
            onSearch={handleSearchRecipes}
          />
        )}
      </div>
    </PageContainer>
  );
}
