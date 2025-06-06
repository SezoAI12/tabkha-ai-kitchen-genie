
import { supabase } from '@/integrations/supabase/client';
import { Recipe } from '@/types/index';

export interface MealPlan {
  id: string;
  date: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snack?: Recipe;
  user_id: string;
  created_at: string;
  updated_at: string;
}

class MealPlanService {
  async getMealPlan(date: string, userId: string): Promise<MealPlan | null> {
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', userId)
        .eq('date', date)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) return null;

      const mealPlan: MealPlan = {
        id: data.id,
        date: data.date,
        user_id: data.user_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      return mealPlan;
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      return null;
    }
  }

  private async getRecipeById(recipeId: string): Promise<Recipe | undefined> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', recipeId)
        .single();

      if (error) throw error;

      const instructionsArray = Array.isArray(data.instructions) 
        ? data.instructions.map(instruction => String(instruction))
        : [];

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image_url,
        image_url: data.image_url,
        prepTime: data.prep_time || 0,
        prep_time: data.prep_time || 0,
        cookTime: data.cook_time || 0,
        cook_time: data.cook_time || 0,
        servings: data.servings,
        difficulty: data.difficulty as 'Easy' | 'Medium' | 'Hard',
        calories: data.calories,
        rating: 4.5,
        ratingCount: 89,
        cuisineType: data.cuisine_type,
        cuisine_type: data.cuisine_type,
        categories: [],
        tags: [],
        ingredients: [],
        instructions: instructionsArray,
        isFavorite: false,
        status: 'published' as const,
        author_id: data.author_id,
        is_verified: true,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error fetching recipe:', error);
      return undefined;
    }
  }

  async updateMealPlan(
    date: string,
    userId: string,
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    recipeId: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('meal_plan_meals')
        .upsert({
          meal_plan_id: `${userId}-${date}`,
          meal_type: mealType,
          recipe_id: recipeId,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating meal plan:', error);
      return false;
    }
  }
}

export const mealPlanService = new MealPlanService();
