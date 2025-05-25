import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Utensils, Cake, Coffee, Search, Plus, List, Camera, Mic, Filter, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// --- Main Categories Data ---
const mainCategories = [
  { name: 'Food', icon: <Utensils className="h-10 w-10 text-token-accent" />, subcategories: ['Main Dishes', 'Appetizers', 'Pickles', 'Soups', 'Sauces', 'Others'] },
  { name: 'Desserts', icon: <Cake className="h-10 w-10 text-token-accent" />, subcategories: ['Traditional', 'Western', 'Pastries', 'Ice Cream', 'Others'] },
  { name: 'Drinks', icon: <Coffee className="h-10 w-10 text-token-accent" />, subcategories: ['Detox', 'Cocktails', 'Alcoholic', 'Hot Drinks', 'Others'] },
];

// --- Filter Options Data ---
const filterOptions = {
  dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb'],
  cookingTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
  difficultyLevel: ['Beginner', 'Intermediate', 'Expert'],
  cuisineType: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'Thai', 'Turkish', 'Syrian', 'Iraqi', 'Yemeni', 'American', 'Moroccan', 'Lebanese', 'German'],
  allergenFree: ['None', 'Dairy', 'Gluten', 'Tree Nuts', 'Shellfish', 'Soy', 'Eggs'],
  mealType: ['Any Meal', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
  religiousRestrictions: ['None', 'Halal', 'Kosher'],
  healthGoals: ['None', 'Low Calorie', 'Low Carb', 'High Protein', 'Low Fat'],
};

// --- Smart Pantry Simulation (replace with actual integration) ---
const smartPantryItems = [
  { id: 'sp1', name: 'Flour', quantity: 1, unit: 'kg' },
  { id: 'sp2', name: 'Sugar', quantity: 500, unit: 'g' },
  { id: 'sp3', name: 'Eggs', quantity: 6, unit: '' },
  { id: 'sp4', name: 'Milk', quantity: 1, unit: 'liter' },
];

export default function FindRecipePage() {
  const { toast } = useToast();
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // --- Filter States ---
  const [filters, setFilters] = useState({
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
  const [currentIngredientQuantity, setCurrentIngredientQuantity] = useState('');
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
    const isAlreadyAdded = addedIngredients.some(ing => ing.name === item.name && ing.source === 'pantry');
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
    <PageContainer header={{ title: 'Find by Ingredients', showBackButton: true }}>
      <div className="space-y-6 pb-20">

        {/* --- 1. Main Categories --- */}
        <Card>
          <CardHeader><CardTitle>1. Select Main Category</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mainCategories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMainCategory(category.name)}
                className={`flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer transition-all duration-200
                          ${selectedMainCategory === category.name ? 'border-token-accent bg-token-accent/10 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                {category.icon}
                <p className="mt-2 font-medium text-lg">{category.name}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* --- 2. Dynamic Subcategories --- */}
        {selectedMainCategory && (
          <Card>
            <CardHeader><CardTitle>2. Select Subcategory ({selectedMainCategory})</CardTitle></CardHeader>
            <CardContent>
              <Select value={selectedSubcategory || ''} onValueChange={setSelectedSubcategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {currentSubcategories.map(sub => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* --- 3. Integrated Advanced Filters --- */}
        <Card>
          <CardHeader><CardTitle className="flex items-center"><Filter className="mr-2" /> 3. Advanced Filters</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(filterOptions).map(([key, options]) => (
              <div key={key}>
                <label className="block text-sm font-medium capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                <Select value={(filters as any)[key]} onValueChange={(value) => handleFilterChange(key, value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* --- 4. Add Ingredients --- */}
        <Card>
          <CardHeader><CardTitle>4. Add Your Ingredients</CardTitle></CardHeader>
          <CardContent>
            <Tabs value={ingredientInputTab} onValueChange={setIngredientInputTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                <TabsTrigger value="pantry">Smart Pantry</TabsTrigger>
                {/* Advanced input methods would be here, e.g., <TabsTrigger value="voice">Voice</TabsTrigger> */}
              </TabsList>
              <TabsContent value="manual" className="p-4 border rounded-md mt-2 bg-gray-50">
                <div className="flex space-x-2 mb-3">
                  <Input
                    placeholder="Ingredient name"
                    value={currentIngredientName}
                    onChange={(e) => setCurrentIngredientName(e.target.value)}
                    className="flex-grow"
                  />
                  <Input
                    placeholder="Qty"
                    type="number"
                    value={currentIngredientQuantity}
                    onChange={(e) => setCurrentIngredientQuantity(e.target.value)}
                    className="w-20"
                  />
                  <Input
                    placeholder="Unit (e.g., g, ml)"
                    value={currentIngredientUnit}
                    onChange={(e) => setCurrentIngredientUnit(e.target.value)}
                    className="w-28"
                  />
                  <Button onClick={handleAddIngredient} className="bg-token-accent hover:bg-token-accent-dark"><Plus /></Button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Button variant="outline" className="flex-1 mr-2"><Camera className="mr-2"/> Scan Ingredients</Button>
                  <Button variant="outline" className="flex-1 ml-2"><Mic className="mr-2"/> Voice Input</Button>
                </div>
              </TabsContent>
              <TabsContent value="pantry" className="p-4 border rounded-md mt-2 bg-gray-50">
                <h4 className="font-semibold mb-3">Available in Smart Pantry:</h4>
                <div className="space-y-2">
                  {smartPantryItems.length > 0 ? (
                    smartPantryItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-2 border rounded-md bg-white">
                        <span>{item.name} ({item.quantity} {item.unit})</span>
                        <Button variant="outline" size="sm" onClick={() => handleSelectPantryItem(item)}>Add</Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Your Smart Pantry is empty. Add items from your pantry or manually.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <h3 className="font-semibold text-lg mb-2 flex items-center"><List className="mr-2"/> Your Added Ingredients:</h3>
            {addedIngredients.length === 0 ? (
              <p className="text-gray-500">No ingredients added yet.</p>
            ) : (
              <ul className="space-y-2">
                {addedIngredients.map(ing => (
                  <li key={ing.id} className="flex items-center justify-between p-2 border rounded-md bg-white shadow-sm">
                    <span>{ing.name} ({ing.quantity} {ing.unit}) <span className="text-xs text-gray-500">({ing.source})</span></span>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveIngredient(ing.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* --- Find Recipes Button --- */}
        <Button
          onClick={handleFindRecipes}
          className="w-full bg-token-accent hover:bg-token-accent-dark text-lg py-3 rounded-lg"
          size="lg"
        >
          <Search className="mr-2 h-5 w-5" /> Find Recipes
        </Button>

        {/* --- Recipe Results Display (Conceptual) --- */}
        <Card>
          <CardHeader><CardTitle>Recipe Results</CardTitle></CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Recipe results will appear here after you tap "Find Recipes".
              This section would involve fetching data from an AI recipe API and displaying it.
            </p>
            {/* This would contain:
              - A recipe results display with visual cards and filtering options
              - Detailed recipe view on click
              - Sorting Options: Most Popular, Highest Rated, Latest, Quickest.
            */}
          </CardContent>
        </Card>

      </div>
    </PageContainer>
  );
}
