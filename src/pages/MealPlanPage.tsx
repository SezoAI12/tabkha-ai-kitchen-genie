
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, ChevronLeft, ChevronRight, Trash2, Zap, ShoppingCart, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// --- Helper Functions ---
const getWeekDays = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date.toISOString().split('T')[0]); // YYYY-MM-DD
  }
  return days;
};

const formatDateForDisplay = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
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

interface Recipe {
  id: string;
  name: string;
  category: string;
}

interface Meal {
  id: string;
  type: 'recipe' | 'custom';
  recipeId?: string;
  customText?: string;
  servings?: number;
  date: string;
  mealType: string;
  addedDate: string;
}

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
  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [editingFieldName, setEditingFieldName] = useState<string | null>(null);
  const editingInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for recipes
  const mockRecipes: Recipe[] = [
    { id: 'rec1', name: 'Chicken Stir-fry', category: 'Dinner' },
    { id: 'rec2', name: 'Oatmeal', category: 'Breakfast' },
    { id: 'rec3', name: 'Quinoa Salad', category: 'Lunch' },
    { id: 'rec4', name: 'Fruit Smoothie', category: 'Snack' },
    { id: 'rec5', name: 'Lentil Soup', category: 'Dinner' }
  ];

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const weekDays = useMemo(() => getWeekDays(currentWeekStart), [currentWeekStart]);

  // Filter recipes based on search
  const filteredRecipes = mockRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Mock Data Loading ---
  useEffect(() => {
    setMealPlan([
      {
        id: 'm1',
        type: 'recipe',
        recipeId: 'rec1',
        servings: 2,
        date: weekDays[0],
        mealType: 'dinner',
        addedDate: new Date().toISOString()
      },
      {
        id: 'm2',
        type: 'custom',
        customText: 'Eating Out',
        date: weekDays[1],
        mealType: 'dinner',
        addedDate: new Date().toISOString()
      },
      {
        id: 'm3',
        type: 'recipe',
        recipeId: 'rec3',
        servings: 1,
        date: weekDays[2],
        mealType: 'lunch',
        addedDate: new Date().toISOString()
      }
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
      toast({
        title: "Error",
        description: "Please select a recipe or enter custom text.",
        variant: "destructive"
      });
      return;
    }

    const newMeal: Meal = {
      id: Date.now().toString(),
      date: newMealDate,
      mealType: newMealType,
      type: newMealRecipeId ? 'recipe' : 'custom',
      addedDate: new Date().toISOString(),
      ...(newMealRecipeId && {
        recipeId: newMealRecipeId,
        servings: Number(newMealServings) || 1
      }),
      ...(!newMealRecipeId && {
        customText: newMealCustomText.trim()
      })
    };

    setMealPlan([...mealPlan, newMeal]);
    setIsAddingMeal(false);
    setNewMealRecipeId(null);
    setNewMealCustomText('');
    setNewMealServings('1');
    setSearchQuery('');

    toast({
      title: "Success",
      description: "Meal added to plan!"
    });
  };

  const handleRemoveMeal = (id: string) => {
    setMealPlan(mealPlan.filter(meal => meal.id !== id));
    toast({
      title: "Meal removed",
      description: "The meal has been removed from your plan."
    });
  };

  const handleEditMealField = (mealId: string, field: string, value: any) => {
    setMealPlan(mealPlan.map(meal =>
      meal.id === mealId ? { ...meal, [field]: value } : meal
    ));
  };

  const startEditing = (mealId: string, field: string) => {
    setEditingMealId(mealId);
    setEditingFieldName(field);
    setTimeout(() => {
      editingInputRef.current?.focus();
    }, 50);
  };

  const stopEditing = () => {
    setEditingMealId(null);
    setEditingFieldName(null);
  };

  const selectRecipe = (recipe: Recipe) => {
    setNewMealRecipeId(recipe.id);
    setNewMealCustomText('');
    setSearchQuery(recipe.name);
  };

  // --- Render Functions ---
  const renderMealItem = (item: Meal) => {
    const recipe = item.type === 'recipe' ? mockRecipes.find(r => r.id === item.recipeId) : null;

    return (
      <Card key={item.id} className="p-3 mb-2 bg-blue-50 border-blue-200">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {editingMealId === item.id && editingFieldName === 'customText' && item.type === 'custom' ? (
              <Input
                ref={editingInputRef}
                value={item.customText}
                onChange={(e) => handleEditMealField(item.id, 'customText', e.target.value)}
                onBlur={stopEditing}
                onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                className="text-sm"
              />
            ) : (
              <div 
                onClick={() => item.type === 'custom' && startEditing(item.id, 'customText')}
                className={item.type === 'custom' ? 'cursor-pointer' : ''}
              >
                <h4 className="font-medium text-sm">
                  {item.type === 'recipe' ? recipe?.name : item.customText || 'Unknown Meal'}
                </h4>
              </div>
            )}

            {item.type === 'recipe' && (
              <div className="flex items-center gap-2 mt-1">
                {editingMealId === item.id && editingFieldName === 'servings' ? (
                  <Input
                    ref={editingInputRef}
                    type="number"
                    value={String(item.servings)}
                    onChange={(e) => handleEditMealField(item.id, 'servings', Number(e.target.value))}
                    onBlur={stopEditing}
                    onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                    className="w-16 text-xs"
                  />
                ) : (
                  <span 
                    onClick={() => startEditing(item.id, 'servings')}
                    className="text-xs text-gray-600 cursor-pointer"
                  >
                    {item.servings} servings
                  </span>
                )}
                <span className="text-xs text-gray-500">•</span>
                <Badge variant="secondary" className="text-xs">{recipe?.category || 'N/A'}</Badge>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-1">
              Added: {formatDateForDisplay(item.addedDate)}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleRemoveMeal(item.id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  };

  const renderDayColumn = (dateString: string) => {
    return (
      <div key={dateString} className="min-w-[200px] mr-4">
        <Card className="h-full">
          <div className="p-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold">{formatDateForDisplay(dateString).split(',')[0]}</h3>
              <p className="text-sm text-gray-600">{formatDateForDisplay(dateString).split(',')[1]}</p>
            </div>

            <div className="space-y-4">
              {mealTypes.map(mealType => (
                <div key={`${dateString}-${mealType}`}>
                  <h4 className="font-medium text-sm border-b pb-1 mb-2">
                    {getMealTypeLabel(mealType)}
                  </h4>
                  
                  <div className="min-h-[60px]">
                    {mealPlan
                      .filter(meal => meal.date === dateString && meal.mealType === mealType)
                      .map(renderMealItem)}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 text-blue-600 border-blue-300 hover:bg-blue-50"
                    onClick={() => {
                      setNewMealDate(dateString);
                      setNewMealType(mealType);
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
      </div>
    );
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Meal Planner</h1>
        </div>

        {/* Week Navigation */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg border">
          <Button variant="outline" onClick={handlePreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold">
            {formatDateForDisplay(weekDays[0])} - {formatDateForDisplay(weekDays[6])}
          </h2>
          <Button variant="outline" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Global Actions */}
        <div className="flex justify-center gap-2 bg-purple-600 p-4 rounded-lg">
          <Button variant="secondary" size="sm">
            <Zap className="h-4 w-4 mr-1" />
            AI Plan
          </Button>
          <Button variant="secondary" size="sm">
            <ShoppingCart className="h-4 w-4 mr-1" />
            List
          </Button>
          <Button variant="secondary" size="sm">
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setIsAddingMeal(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add Meal
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="flex pb-4">
            {weekDays.map(renderDayColumn)}
          </div>
        </div>

        {/* Add Meal Dialog */}
        <Dialog open={isAddingMeal} onOpenChange={setIsAddingMeal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Meal</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Recipe Search */}
              <div>
                <Input
                  placeholder="Search recipe by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery.length > 1 && (
                  <div className="mt-2 max-h-32 overflow-y-auto border rounded-md">
                    {filteredRecipes.map(recipe => (
                      <div
                        key={recipe.id}
                        className="p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => selectRecipe(recipe)}
                      >
                        <span className="text-sm">{recipe.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({recipe.category})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-center text-gray-500 font-medium">— OR —</div>

              {/* Custom Text */}
              <Input
                placeholder="Enter custom meal text (e.g., Leftovers)"
                value={newMealCustomText}
                onChange={(e) => {
                  setNewMealCustomText(e.target.value);
                  setNewMealRecipeId(null);
                  setSearchQuery('');
                }}
              />

              {/* Date Picker */}
              <div>
                <label className="text-sm font-medium">Date:</label>
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

              {/* Meal Type Picker */}
              <div>
                <label className="text-sm font-medium">Meal Type:</label>
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

              {/* Servings for recipes */}
              {newMealRecipeId && (
                <Input
                  type="number"
                  placeholder="Servings (e.g., 2, 4)"
                  value={newMealServings}
                  onChange={(e) => setNewMealServings(e.target.value)}
                />
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddingMeal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMeal}>
                  Add Meal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default MealPlanPage;
