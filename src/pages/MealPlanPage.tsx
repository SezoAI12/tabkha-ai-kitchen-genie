
import React, { useState, useEffect, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Plus, Trash2, Zap, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// --- Interfaces for Type Safety ---
interface Meal {
  id: string;
  recipeId?: string;
  customText?: string;
  type: 'recipe' | 'custom';
  servings?: number;
  date: string; // 'YYYY-MM-DD'
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  addedDate: string;
}

interface RecipeSummary {
  id: string;
  name: string;
  category: string;
}

// --- Helper Functions ---
const getWeekDays = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
};

const formatDateForDisplay = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const getMealTypeLabel = (type: string) => {
  switch (type) {
    case 'breakfast': return 'Breakfast';
    case 'lunch': return 'Lunch';
    case 'dinner': return 'Dinner';
    case 'snack': return 'Snack';
    default: return '';
  }
};

const MealPlanPage = () => {
  const { toast } = useToast();
  
  // --- State Management ---
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [mealPlan, setMealPlan] = useState<Meal[]>([]);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [newMealRecipeId, setNewMealRecipeId] = useState<string | null>(null);
  const [newMealCustomText, setNewMealCustomText] = useState('');
  const [newMealDate, setNewMealDate] = useState(getWeekDays(new Date())[0]);
  const [newMealType, setNewMealType] = useState('lunch');
  const [newMealServings, setNewMealServings] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RecipeSummary[]>([]);

  // Mock data for recipes
  const mockRecipes: RecipeSummary[] = [
    { id: 'rec1', name: 'Chicken Stir-fry', category: 'Dinner' },
    { id: 'rec2', name: 'Oatmeal', category: 'Breakfast' },
    { id: 'rec3', name: 'Quinoa Salad', category: 'Lunch' },
    { id: 'rec4', name: 'Fruit Smoothie', category: 'Snack' },
    { id: 'rec5', name: 'Lentil Soup', category: 'Dinner' },
  ];

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const weekDays = useMemo(() => getWeekDays(currentWeekStart), [currentWeekStart]);

  // --- Mock Data Loading ---
  useEffect(() => {
    setMealPlan([
      { id: 'm1', type: 'recipe', recipeId: 'rec1', servings: 2, date: weekDays[0], mealType: 'dinner', addedDate: new Date().toISOString() },
      { id: 'm2', type: 'custom', customText: 'Eating Out', date: weekDays[1], mealType: 'dinner', addedDate: new Date().toISOString() },
      { id: 'm3', type: 'recipe', recipeId: 'rec3', servings: 1, date: weekDays[2], mealType: 'lunch', addedDate: new Date().toISOString() },
    ]);
  }, [weekDays]);

  // --- Handlers ---
  const handlePreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const handleAddMeal = () => {
    if (newMealRecipeId === null && !newMealCustomText.trim()) {
      toast({ title: "Error", description: "Please select a recipe or enter custom text.", variant: "destructive" });
      return;
    }

    const newMeal: Meal = {
      id: Date.now().toString(),
      date: newMealDate,
      mealType: newMealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      type: newMealRecipeId ? 'recipe' : 'custom',
      addedDate: new Date().toISOString(),
      ...(newMealRecipeId && { recipeId: newMealRecipeId, servings: Number(newMealServings) || 1 }),
      ...(!newMealRecipeId && { customText: newMealCustomText.trim() }),
    };

    setMealPlan([...mealPlan, newMeal]);
    setIsAddingMeal(false);
    setNewMealRecipeId(null);
    setNewMealCustomText('');
    setNewMealServings('1');
    setSearchQuery('');
    toast({ title: "Success", description: "Meal added to plan!" });
  };

  const handleRemoveMeal = (id: string) => {
    setMealPlan(mealPlan.filter(meal => meal.id !== id));
    toast({ title: "Meal Removed", description: "Meal has been removed from your plan." });
  };

  const handleSearchRecipes = (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      const results = mockRecipes.filter(rec =>
        rec.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleAutoPlan = () => {
    const mockGeneratedPlan: Meal[] = [
      { id: 'ai1', type: 'recipe', recipeId: 'rec2', servings: 1, date: weekDays[0], mealType: 'breakfast', addedDate: new Date().toISOString() },
      { id: 'ai2', type: 'recipe', recipeId: 'rec3', servings: 2, date: weekDays[1], mealType: 'lunch', addedDate: new Date().toISOString() },
      { id: 'ai3', type: 'custom', customText: 'Leftovers', date: weekDays[2], mealType: 'dinner', addedDate: new Date().toISOString() },
    ];
    setMealPlan([...mealPlan, ...mockGeneratedPlan]);
    toast({ title: "AI Plan Generated", description: "A meal plan has been generated for you!" });
  };

  // --- Render Functions ---
  const renderMealItem = (item: Meal) => {
    const recipe = item.type === 'recipe' ? mockRecipes.find(r => r.id === item.recipeId) : null;

    return (
      <Card key={item.id} className="p-3 mb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium text-sm">
              {item.type === 'recipe' ? recipe?.name : item.customText || 'Unknown Meal'}
            </h4>
            {item.type === 'recipe' && (
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {item.servings} servings
                </Badge>
                <span className="text-xs text-gray-500">• {recipe?.category || 'N/A'}</span>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Added: {formatDateForDisplay(item.addedDate)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleRemoveMeal(item.id)}
            className="p-1 h-8 w-8"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </Card>
    );
  };

  const renderDayColumn = (dateString: string) => {
    const mealsForDay = mealPlan.filter(meal => meal.date === dateString);
    const dayLabel = formatDateForDisplay(dateString);

    return (
      <Card key={dateString} className="min-w-[280px] flex-shrink-0">
        <div className="p-4">
          <h3 className="font-semibold text-center mb-4 border-b pb-2">{dayLabel}</h3>
          <div className="space-y-4">
            {mealTypes.map(type => (
              <div key={`${dateString}-${type}`}>
                <h4 className="font-medium text-sm text-gray-600 mb-2">{getMealTypeLabel(type)}:</h4>
                {mealsForDay.filter(meal => meal.mealType === type).length === 0 ? (
                  <p className="text-xs text-gray-400 italic mb-2">No meals planned.</p>
                ) : (
                  <div className="space-y-1">
                    {mealsForDay.filter(meal => meal.mealType === type).map(renderMealItem)}
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setNewMealDate(dateString);
                    setNewMealType(type);
                    setIsAddingMeal(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <PageContainer
      header={{
        title: "Meal Planner",
        showBackButton: true,
      }}
    >
      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" onClick={handlePreviousWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="font-semibold">
          {formatDateForDisplay(weekDays[0])} - {formatDateForDisplay(weekDays[6])}
        </h2>
        <Button variant="outline" size="sm" onClick={handleNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Global Actions */}
      <div className="flex gap-2 mb-6">
        <Button onClick={handleAutoPlan} className="flex-1">
          <Zap className="h-4 w-4 mr-2" />
          AI Plan
        </Button>
        <Sheet open={isAddingMeal} onOpenChange={setIsAddingMeal}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Meal to Plan</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div>
                <Input
                  placeholder="Search for a recipe..."
                  value={searchQuery}
                  onChange={(e) => handleSearchRecipes(e.target.value)}
                />
                {searchResults.length > 0 && (
                  <div className="mt-2 border rounded-md max-h-32 overflow-y-auto">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => {
                          setNewMealRecipeId(item.id);
                          setNewMealCustomText('');
                          setSearchQuery(item.name);
                          setSearchResults([]);
                        }}
                      >
                        <span className="text-sm">{item.name} ({item.category})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-center text-sm text-gray-500">OR</div>

              <Input
                placeholder="Enter custom meal text (e.g., Leftovers)"
                value={newMealCustomText}
                onChange={(e) => {
                  setNewMealCustomText(e.target.value);
                  setNewMealRecipeId(null);
                  setSearchQuery('');
                }}
              />

              <div>
                <label className="block text-sm font-medium mb-2">Date:</label>
                <Select value={newMealDate} onValueChange={setNewMealDate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map(day => (
                      <SelectItem key={day} value={day}>
                        {formatDateForDisplay(day)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Meal Type:</label>
                <Select value={newMealType} onValueChange={setNewMealType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {getMealTypeLabel(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newMealRecipeId && (
                <Input
                  placeholder="Servings"
                  type="number"
                  value={newMealServings}
                  onChange={(e) => setNewMealServings(e.target.value)}
                />
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingMeal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddMeal} className="flex-1">
                  Add Meal
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Calendar Grid */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {weekDays.map(renderDayColumn)}
      </div>
    </PageContainer>
  );
};

export default MealPlanPage;
