import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion'; // Ensure AnimatePresence is imported
import {
  Utensils, Cake, Coffee, Search, Plus, List, Camera, Mic, // Icons for new features
  Salad, Cookie, Beer, Timer, ChefHat, Globe, LeafyGreen, Soup, Droplet, Nut, Egg, Fish, Wheat
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast'; // Assuming you have this hook

// Design tokens (re-emphasized for clarity and consistency)
const primaryColor = 'hsl(var(--primary))'; // Assuming primary color from your CSS variables
const accentColor = 'hsl(var(--accent))';   // Assuming accent color from your CSS variables
const textColor = 'hsl(var(--foreground))'; // Assuming text color
const cardBackground = 'hsl(var(--card))';  // Assuming card background

// --- Main Categories Data ---
const mainCategories = [
  { name: 'Food', icon: <Utensils className="h-10 w-10 text-primary" />, subcategories: ['Main Dishes', 'Appetizers', 'Pickles', 'Soups', 'Sauces', 'Others'] },
  { name: 'Desserts', icon: <Cake className="h-10 w-10 text-primary" />, subcategories: ['Traditional', 'Western', 'Pastries', 'Ice Cream', 'Others'] },
  { name: 'Drinks', icon: <Coffee className="h-10 w-10 text-primary" />, subcategories: ['Detox', 'Cocktails', 'Alcoholic', 'Hot Drinks', 'Others'] },
];

// --- Filter Options Data ---
const filterOptions = {
  dietary: {
    label: 'Dietary',
    icon: <LeafyGreen className="h-4 w-4 mr-2" />,
    options: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb'],
  },
  cookingTime: {
    label: 'Cooking Time',
    icon: <Timer className="h-4 w-4 mr-2" />,
    options: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
  },
  difficultyLevel: {
    label: 'Difficulty Level',
    icon: <ChefHat className="h-4 w-4 mr-2" />,
    options: ['Beginner', 'Intermediate', 'Expert'],
  },
  cuisineType: {
    label: 'Cuisine Type',
    icon: <Globe className="h-4 w-4 mr-2" />,
    options: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'Thai', 'Turkish', 'Syrian', 'Iraqi', 'Yemeni', 'American', 'Moroccan', 'Lebanese', 'German'],
  },
  allergenFree: {
    label: 'Allergen-Free',
    icon: <Droplet className="h-4 w-4 mr-2" />, // More generic for allergens
    options: ['None', 'Dairy', 'Gluten', 'Tree Nuts', 'Shellfish', 'Soy', 'Eggs'],
  },
  mealType: {
    label: 'Meal Type',
    icon: <Soup className="h-4 w-4 mr-2" />, // Represents a meal
    options: ['Any Meal', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
  },
  religiousRestrictions: {
    label: 'Religious Restrictions',
    icon: <Salad className="h-4 w-4 mr-2" />, // Represents dietary restrictions
    options: ['None', 'Halal', 'Kosher'],
  },
  healthGoals: {
    label: 'Health Goals',
    icon: <Cookie className="h-4 w-4 mr-2" />, // Represents a healthy choice
    options: ['None', 'Low Calorie', 'Low Carb', 'High Protein', 'Low Fat'],
  },
};

// --- Smart Pantry Simulation (replace with actual integration) ---
const smartPantryItems = [
  { id: 'sp1', name: 'Flour', quantity: 1, unit: 'kg' },
  { id: 'sp2', name: 'Sugar', quantity: 500, unit: 'g' },
  { id: 'sp3', name: 'Eggs', quantity: 6, unit: '' },
  { id: 'sp4', name: 'Milk', quantity: 1, unit: 'liter' },
  { id: 'sp5', name: 'Chicken Breast', quantity: 500, unit: 'g' },
  { id: 'sp6', name: 'Spinach', quantity: 200, unit: 'g' },
  { id: 'sp7', name: 'Tomatoes', quantity: 4, unit: '' },
  { id: 'sp8', name: 'Onions', quantity: 2, unit: '' },
];

export default function FindRecipePage() {
  const { toast } = useToast();
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // --- Filter States ---
  const [filters, setFilters] = useState<Record<string, string>>({
    dietary: 'Normal',
    cookingTime: '',
    difficultyLevel: '',
    cuisineType: '',
    allergenFree: 'None',
    mealType: 'Any Meal',
    religiousRestrictions: 'None',
    healthGoals: 'None',
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  // --- Ingredient States ---
  const [currentIngredientName, setCurrentIngredientName] = useState('');
  const [currentIngredientQuantity, setCurrentIngredientQuantity] = useState<number | ''>('');
  const [currentIngredientUnit, setCurrentIngredientUnit] = useState('');
  const [addedIngredients, setAddedIngredients] = useState<Array<{ id: string; name: string; quantity: number; unit: string; source: 'manual' | 'pantry' }>>([]);
  const [ingredientInputTab, setIngredientInputTab] = useState('manual'); // 'manual' or 'pantry'

  const handleAddIngredient = () => {
    if (!currentIngredientName.trim()) {
      toast({ title: "Error", description: "Ingredient name cannot be empty.", variant: "destructive" });
      return;
    }

    const newIngredient = {
      id: Date.now().toString(),
      name: currentIngredientName.trim(),
      quantity: Number(currentIngredientQuantity) || 1,
      unit: currentIngredientUnit.trim(),
      source: 'manual' as 'manual',
    };
    setAddedIngredients(prev => [...prev, newIngredient]);
    setCurrentIngredientName('');
    setCurrentIngredientQuantity('');
    setCurrentIngredientUnit('');
    toast({ title: "Ingredient Added", description: `${newIngredient.name} added to your list.` });
  };

  const handleRemoveIngredient = (id: string) => {
    setAddedIngredients(prev => prev.filter(ing => ing.id !== id));
    toast({ title: "Ingredient Removed", description: "Ingredient removed from your list." });
  };

  const handleSelectPantryItem = (item: typeof smartPantryItems[0]) => {
    const isAlreadyAdded = addedIngredients.some(ing => ing.name === item.name); // Check by name regardless of source
    if (isAlreadyAdded) {
      toast({ title: "Already Added", description: `${item.name} is already in your ingredient list.` });
      return;
    }
    setAddedIngredients(prev => [...prev, { ...item, source: 'pantry' }]);
    toast({ title: "Pantry Item Added", description: `${item.name} added from your pantry.` });
  };


  const handleFindRecipes = () => {
    if (addedIngredients.length === 0) {
      toast({ title: "No Ingredients", description: "Please add some ingredients to find recipes.", variant: "destructive" });
      return;
    }
    // Here, you would send selectedMainCategory, selectedSubcategory, filters, and addedIngredients
    // to your AI backend for recipe generation.
    toast({ title: "Finding Recipes...", description: "Searching for recipes based on your criteria and ingredients!" });
    console.log("Searching with:", {
      selectedMainCategory,
      selectedSubcategory,
      filters,
      addedIngredients,
    });
    // Placeholder for navigation to results page
    // router.push('/recipe-results', { state: { ingredients: addedIngredients, filters: filters } });
  };

  const currentSubcategories = selectedMainCategory
    ? mainCategories.find(cat => cat.name === selectedMainCategory)?.subcategories || []
    : [];

  return (
    <PageContainer header={{ title: 'Find Recipe by Ingredients', showBackButton: true }}>
      <div className="space-y-8 pb-20"> {/* Increased spacing */}

        {/* --- 1. Main Categories --- */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">1. Select Main Category</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4"> {/* Increased gap and padding */}
            {mainCategories.map((category) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMainCategory(category.name)}
                className={`flex flex-col items-center justify-center p-8 border-2 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
                          ${selectedMainCategory === category.name ? 'border-accent bg-accent/10 shadow-xl' : 'border-gray-200 bg-card hover:border-primary/50'}`}
              >
                {category.icon}
                <p className="mt-4 font-semibold text-xl text-center text-foreground">{category.name}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* --- 2. Dynamic Subcategories --- */}
        <AnimatePresence>
          {selectedMainCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center text-primary">
                    2. Select Subcategory
                    {selectedMainCategory && <span className="text-xl text-gray-600 ml-2">({selectedMainCategory})</span>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Select value={selectedSubcategory || ''} onValueChange={setSelectedSubcategory}>
                    <SelectTrigger className="w-full text-lg h-12 border-2 border-gray-300 focus:border-accent transition-colors">
                      <SelectValue placeholder="Choose a subcategory that best fits" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentSubcategories.map(sub => (
                        <SelectItem key={sub} value={sub} className="text-base py-2">{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- 3. Integrated Advanced Filters --- */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary flex items-center justify-center">
              <Filter className="mr-3 h-7 w-7 text-primary" /> 3. Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"> {/* Increased gap */}
            {Object.entries(filterOptions).map(([key, { label, icon, options }]) => (
              <div key={key} className="space-y-2">
                <label className="flex items-center text-base font-medium text-foreground">
                  {icon} {label}
                </label>
                <Select value={filters[key]} onValueChange={(value) => handleFilterChange(key, value)}>
                  <SelectTrigger className="w-full h-10 border border-gray-300 focus:border-accent transition-colors text-base">
                    <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map(option => (
                      <SelectItem key={option} value={option} className="text-base py-2">{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* --- 4. Add Ingredients --- */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">4. Add Your Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Tabs value={ingredientInputTab} onValueChange={setIngredientInputTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1">
                <TabsTrigger value="manual" className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-colors">Manual Entry</TabsTrigger>
                <TabsTrigger value="pantry" className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-colors">Smart Pantry</TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="p-6 border border-gray-200 rounded-lg mt-4 bg-gray-50 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="e.g., Chicken Breast"
                    value={currentIngredientName}
                    onChange={(e) => setCurrentIngredientName(e.target.value)}
                    className="flex-grow h-11 text-base border-gray-300 focus:border-accent"
                  />
                  <Input
                    placeholder="Qty"
                    type="number"
                    value={currentIngredientQuantity}
                    onChange={(e) => setCurrentIngredientQuantity(Number(e.target.value))}
                    className="w-full sm:w-28 h-11 text-base border-gray-300 focus:border-accent"
                  />
                  <Input
                    placeholder="Unit (e.g., kg, pcs)"
                    value={currentIngredientUnit}
                    onChange={(e) => setCurrentIngredientUnit(e.target.value)}
                    className="w-full sm:w-36 h-11 text-base border-gray-300 focus:border-accent"
                  />
                  <Button
                    onClick={handleAddIngredient}
                    className="bg-accent hover:bg-accent/90 h-11 px-6 text-base font-semibold"
                  >
                    <Plus className="mr-2 h-5 w-5" /> Add
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
                  <Button variant="outline" className="flex-1 h-11 text-base border-gray-300 hover:bg-gray-100">
                    <Camera className="mr-2 h-5 w-5" /> Scan Ingredients
                  </Button>
                  <Button variant="outline" className="flex-1 h-11 text-base border-gray-300 hover:bg-gray-100">
                    <Mic className="mr-2 h-5 w-5" /> Voice Input
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="pantry" className="p-6 border border-gray-200 rounded-lg mt-4 bg-gray-50 space-y-4">
                <h4 className="font-bold text-lg text-foreground mb-3">Available in Smart Pantry:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar"> {/* Added scrollbar and grid */}
                  {smartPantryItems.length > 0 ? (
                    smartPantryItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-md bg-white shadow-sm">
                        <span className="text-base font-medium text-foreground">{item.name} <span className="text-sm text-gray-500">({item.quantity} {item.unit})</span></span>
                        <Button variant="outline" size="sm" onClick={() => handleSelectPantryItem(item)}
                          className="text-primary border-primary hover:bg-primary/10">
                          Add
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-full text-center py-4">Your Smart Pantry is empty. Time to stock up!</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <h3 className="font-bold text-xl mb-3 flex items-center text-primary">
              <List className="mr-2 h-6 w-6" /> Your Added Ingredients:
            </h3>
            {addedIngredients.length === 0 ? (
              <p className="text-gray-500 text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">
                Start by adding ingredients manually or from your Smart Pantry.
              </p>
            ) : (
              <ul className="space-y-3">
                <AnimatePresence>
                  {addedIngredients.map(ing => (
                    <motion.li
                      key={ing.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
                    >
                      <span className="text-lg font-medium text-foreground">
                        {ing.name} <span className="text-base text-gray-500">({ing.quantity} {ing.unit})</span>
                        <span className="ml-2 text-xs text-blue-500 capitalize">({ing.source})</span>
                      </span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveIngredient(ing.id)}
                        className="text-red-500 hover:bg-red-50 rounded-full">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </CardContent>
        </Card>

        {/* --- Find Recipes Button --- */}
        <Button
          onClick={handleFindRecipes}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xl py-4 rounded-lg shadow-lg font-bold transition-all duration-300 hover:scale-[1.01]"
          size="lg"
        >
          <Search className="mr-3 h-6 w-6" /> Find Recipes
        </Button>

        {/* --- Recipe Results Display (Conceptual) --- */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">Recipe Results</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 text-lg">
              Exciting recipes tailored to your choices will appear here after you tap "Find Recipes"!
            </p>
            <p className="text-gray-500 text-sm mt-2">
              This section will feature visual recipe cards, filtering options, and detailed views with nutritional information, instructions, and media.
            </p>
          </CardContent>
        </Card>

      </div>
    </PageContainer>
  );
}
