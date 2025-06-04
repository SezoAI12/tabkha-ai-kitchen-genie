
import { Recipe } from '@/types/recipe';

const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

// Mock data for development
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish with eggs, cheese, and pancetta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    calories: 580,
    cuisineType: 'Italian',
    instructions: [
      'Boil pasta according to package directions',
      'Cook pancetta until crispy',
      'Mix eggs and cheese in a bowl',
      'Combine everything while pasta is hot'
    ],
    categories: ['Pasta', 'Italian'],
    tags: ['carbonara', 'pasta', 'italian'],
    status: 'published',
    author_id: 'chef1',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ingredients: [
      { id: '1', name: 'Spaghetti', amount: 400, unit: 'g' },
      { id: '2', name: 'Pancetta', amount: 150, unit: 'g' },
      { id: '3', name: 'Eggs', amount: 3, unit: 'pieces' },
      { id: '4', name: 'Parmesan cheese', amount: 100, unit: 'g' }
    ]
  }
];

export const recipeService = {
  async getAllRecipes(): Promise<Recipe[]> {
    // In production, this would be an actual API call
    return mockRecipes;
  },

  async getRecipeById(id: string): Promise<Recipe | null> {
    const recipe = mockRecipes.find(r => r.id === id);
    return recipe || null;
  },

  async searchRecipes(query: string): Promise<Recipe[]> {
    return mockRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  async createRecipe(recipe: Partial<Recipe>): Promise<Recipe> {
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title: recipe.title || '',
      description: recipe.description || '',
      image: recipe.image || '',
      prepTime: recipe.prepTime || 0,
      cookTime: recipe.cookTime || 0,
      servings: recipe.servings || 1,
      difficulty: recipe.difficulty || 'Easy',
      calories: recipe.calories || 0,
      cuisineType: recipe.cuisineType || '',
      instructions: recipe.instructions || [],
      categories: recipe.categories || [],
      tags: recipe.tags || [],
      status: 'draft',
      author_id: recipe.author_id || '',
      is_verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ingredients: recipe.ingredients || []
    };
    
    mockRecipes.push(newRecipe);
    return newRecipe;
  },

  async updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe | null> {
    const index = mockRecipes.findIndex(r => r.id === id);
    if (index === -1) return null;
    
    mockRecipes[index] = {
      ...mockRecipes[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    return mockRecipes[index];
  },

  async deleteRecipe(id: string): Promise<boolean> {
    const index = mockRecipes.findIndex(r => r.id === id);
    if (index === -1) return false;
    
    mockRecipes.splice(index, 1);
    return true;
  }
};
