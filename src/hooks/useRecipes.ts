
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  cuisine_type: string;
  instructions: string[];
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'pending_review';
  author_id: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  ingredients?: RecipeIngredient[];
  rating?: number;
  ratingCount?: number;
  isFavorite?: boolean;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRecipes = async (filters?: { category?: string; difficulty?: string; search?: string }) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('recipes')
        .select(`
          *,
          recipe_ingredients (
            id,
            amount,
            unit,
            ingredients (
              name
            )
          )
        `)
        .eq('status', 'published');

      if (filters?.category) {
        query = query.contains('categories', [filters.category]);
      }

      if (filters?.difficulty && ['Easy', 'Medium', 'Hard'].includes(filters.difficulty)) {
        query = query.eq('difficulty', filters.difficulty as 'Easy' | 'Medium' | 'Hard');
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const formattedRecipes: Recipe[] = data?.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description || '',
        image_url: recipe.image_url || '',
        prep_time: recipe.prep_time || 0,
        cook_time: recipe.cook_time || 0,
        servings: recipe.servings || 1,
        difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard',
        calories: recipe.calories || 0,
        cuisine_type: recipe.cuisine_type || '',
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions as string[] : 
                     (recipe.instructions ? [recipe.instructions as string] : []),
        categories: recipe.categories || [],
        tags: recipe.tags || [],
        status: recipe.status as 'draft' | 'published' | 'pending_review',
        author_id: recipe.author_id || '',
        is_verified: recipe.is_verified || false,
        created_at: recipe.created_at || '',
        updated_at: recipe.updated_at || '',
        ingredients: recipe.recipe_ingredients?.map((ri: any) => ({
          id: ri.id,
          name: ri.ingredients.name,
          amount: ri.amount,
          unit: ri.unit
        })) || []
      })) || [];

      setRecipes(formattedRecipes);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error fetching recipes',
        description: err.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createRecipe = async (recipeData: Partial<Recipe>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      if (!recipeData.title) {
        throw new Error('Recipe title is required');
      }

      const { data, error } = await supabase
        .from('recipes')
        .insert([{
          title: recipeData.title,
          description: recipeData.description,
          image_url: recipeData.image_url,
          prep_time: recipeData.prep_time,
          cook_time: recipeData.cook_time,
          servings: recipeData.servings,
          difficulty: recipeData.difficulty,
          calories: recipeData.calories,
          cuisine_type: recipeData.cuisine_type,
          instructions: recipeData.instructions,
          categories: recipeData.categories,
          tags: recipeData.tags,
          author_id: user.id,
          status: 'draft'
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Recipe created successfully',
        description: 'Your recipe has been saved as a draft.'
      });

      return data;
    } catch (err: any) {
      toast({
        title: 'Error creating recipe',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const updateRecipe = async (id: string, updates: Partial<Recipe>) => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .update({
          title: updates.title,
          description: updates.description,
          image_url: updates.image_url,
          prep_time: updates.prep_time,
          cook_time: updates.cook_time,
          servings: updates.servings,
          difficulty: updates.difficulty,
          calories: updates.calories,
          cuisine_type: updates.cuisine_type,
          instructions: updates.instructions,
          categories: updates.categories,
          tags: updates.tags,
          status: updates.status
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Recipe updated successfully'
      });

      return data;
    } catch (err: any) {
      toast({
        title: 'Error updating recipe',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Recipe deleted successfully'
      });

      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
    } catch (err: any) {
      toast({
        title: 'Error deleting recipe',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const toggleFavorite = async (recipeId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Check if already favorited
      const { data: existing } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId)
        .single();

      if (existing) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('recipe_id', recipeId);

        if (error) throw error;
        
        toast({
          title: 'Removed from favorites'
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert([{
            user_id: user.id,
            recipe_id: recipeId
          }]);

        if (error) throw error;
        
        toast({
          title: 'Added to favorites'
        });
      }

      // Refresh recipes to update favorite status
      fetchRecipes();
    } catch (err: any) {
      toast({
        title: 'Error updating favorites',
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite
  };
};
