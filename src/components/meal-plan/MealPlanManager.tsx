
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, Plus, Clock, Utensils } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Recipe } from '@/types/index';

interface MealPlanManagerProps {
  recipe: Recipe;
  onAddToMealPlan?: (recipeId: string, mealType: string, date: string) => void;
}

export const MealPlanManager: React.FC<MealPlanManagerProps> = ({ 
  recipe, 
  onAddToMealPlan 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { value: 'lunch', label: 'Lunch', icon: '☀️' },
    { value: 'dinner', label: 'Dinner', icon: '🌙' },
    { value: 'snack', label: 'Snack', icon: '🍎' }
  ];

  const handleAddToMealPlan = () => {
    if (!selectedMealType) {
      toast({
        title: "Please select a meal type",
        description: "Choose when you'd like to have this recipe.",
        variant: "destructive",
      });
      return;
    }

    // Call the callback if provided
    if (onAddToMealPlan) {
      onAddToMealPlan(recipe.id, selectedMealType, selectedDate);
    }

    toast({
      title: "Recipe added to meal plan!",
      description: `${recipe.title} has been scheduled for ${selectedMealType} on ${new Date(selectedDate).toLocaleDateString()}.`,
    });

    setIsOpen(false);
    setSelectedMealType('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Calendar className="h-4 w-4 mr-2" />
          Add to Meal Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Add to Meal Plan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Recipe Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div>
                  <h4 className="font-medium">{recipe.title}</h4>
                  <p className="text-sm text-gray-600">
                    {recipe.prepTime + recipe.cookTime} min • {recipe.servings} servings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <div>
            <Label htmlFor="meal-date">Date</Label>
            <input
              id="meal-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wasfah-bright-teal focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Meal Type Selection */}
          <div>
            <Label htmlFor="meal-type">Meal Type</Label>
            <Select value={selectedMealType} onValueChange={setSelectedMealType}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((meal) => (
                  <SelectItem key={meal.value} value={meal.value}>
                    <div className="flex items-center gap-2">
                      <span>{meal.icon}</span>
                      <span>{meal.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Suggestion */}
          {selectedMealType && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  Suggested time: {
                    selectedMealType === 'breakfast' ? '8:00 AM' :
                    selectedMealType === 'lunch' ? '12:30 PM' :
                    selectedMealType === 'dinner' ? '7:00 PM' :
                    'Anytime'
                  }
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddToMealPlan}
              className="flex-1"
              disabled={!selectedMealType}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Recipe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
