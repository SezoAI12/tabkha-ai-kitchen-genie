
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockMealPlans } from '@/data/mockData';
import { MealCard } from '@/components/meal-plan/MealCard';
import { Button } from '@/components/ui/button';
import { Plus, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { format, addDays, startOfWeek, parseISO } from 'date-fns';

export default function MealPlanPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Get the start of the week (Sunday)
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  
  // Generate array of dates for the week
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  
  // Get meal plan for selected date
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const mealPlan = mockMealPlans.find(mp => mp.date === selectedDateStr) || mockMealPlans[0];
  
  const handlePreviousWeek = () => {
    setSelectedDate(addDays(weekStart, -7));
  };
  
  const handleNextWeek = () => {
    setSelectedDate(addDays(weekStart, 7));
  };
  
  return (
    <PageContainer
      header={{
        title: 'Meal Planning',
        actions: (
          <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
            <Plus size={20} />
          </Button>
        ),
      }}
    >
      <div className="container px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="icon" onClick={handlePreviousWeek}>
            <ChevronLeft size={20} />
          </Button>
          <h2 className="text-wasfah-deep-teal font-medium">
            {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
          </h2>
          <Button variant="ghost" size="icon" onClick={handleNextWeek}>
            <ChevronRight size={20} />
          </Button>
        </div>
        
        <div className="flex justify-between mb-6 overflow-x-auto pb-2">
          {weekDays.map((date, i) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const isSelected = dateStr === format(selectedDate, 'yyyy-MM-dd');
            
            return (
              <Button
                key={i}
                variant="ghost"
                className={`flex-shrink-0 flex flex-col items-center px-3 rounded-full ${
                  isSelected ? 
                  'bg-wasfah-bright-teal text-white' : 
                  'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <span className="text-xs">{format(date, 'EEE')}</span>
                <span className="font-bold">{format(date, 'd')}</span>
              </Button>
            );
          })}
        </div>
        
        {mealPlan ? (
          <>
            <div className="space-y-6">
              {['breakfast', 'lunch', 'dinner', 'snack'].map(mealType => {
                const meal = mealPlan.meals.find(m => m.type === mealType);
                
                return (
                  <div key={mealType}>
                    <h3 className="font-bold mb-2 text-wasfah-deep-teal">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
                    {meal ? (
                      <MealCard meal={meal} />
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full py-6 border-dashed border-gray-300 text-gray-500"
                      >
                        <Plus size={16} className="mr-2" />
                        Add {mealType}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
            
            {mealPlan.nutritionSummary && (
              <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-wasfah-deep-teal mb-3">Daily Nutrition</h3>
                
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center p-2 bg-wasfah-light-gray rounded-md">
                    <p className="font-bold text-wasfah-deep-teal">
                      {mealPlan.nutritionSummary.calories}
                    </p>
                    <p className="text-xs text-gray-500">Calories</p>
                  </div>
                  
                  <div className="text-center p-2 bg-wasfah-light-gray rounded-md">
                    <p className="font-bold text-wasfah-deep-teal">
                      {mealPlan.nutritionSummary.protein}g
                    </p>
                    <p className="text-xs text-gray-500">Protein</p>
                  </div>
                  
                  <div className="text-center p-2 bg-wasfah-light-gray rounded-md">
                    <p className="font-bold text-wasfah-deep-teal">
                      {mealPlan.nutritionSummary.carbs}g
                    </p>
                    <p className="text-xs text-gray-500">Carbs</p>
                  </div>
                  
                  <div className="text-center p-2 bg-wasfah-light-gray rounded-md">
                    <p className="font-bold text-wasfah-deep-teal">
                      {mealPlan.nutritionSummary.fat}g
                    </p>
                    <p className="text-xs text-gray-500">Fat</p>
                  </div>
                </div>
              </div>
            )}
            
            <Button className="w-full mt-6 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white">
              <ShoppingCart size={16} className="mr-2" />
              Generate Shopping List
            </Button>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No meal plan for this day</p>
            <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
              <Plus size={16} className="mr-2" />
              Create Meal Plan
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
