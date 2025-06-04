
import { Recipe } from '@/types/recipe';

export interface CuisineType {
  id: string;
  name: string;
  description: string;
  image: string;
  popularDishes: string[];
  region: string;
}

export interface SearchParams {
  query?: string;
  cuisine?: string;
  difficulty?: string;
  diet?: string;
  type?: string;
  number?: number;
  offset?: number;
}

const mockCuisines: CuisineType[] = [
  {
    id: '1',
    name: 'Italian',
    description: 'Rich flavors from the Mediterranean',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    popularDishes: ['Pizza', 'Pasta', 'Risotto'],
    region: 'Europe'
  },
  {
    id: '2',
    name: 'Japanese',
    description: 'Fresh and delicate flavors',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop',
    popularDishes: ['Sushi', 'Ramen', 'Tempura'],
    region: 'Asia'
  }
];

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Italian Pasta',
    description: 'Delicious Italian pasta',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    calories: 400,
    cuisineType: 'Italian',
    instructions: [],
    categories: ['Italian'],
    tags: ['pasta'],
    status: 'published',
    author_id: 'chef1',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const globalCuisineService = {
  async getAllCuisines(): Promise<CuisineType[]> {
    return mockCuisines;
  },

  async getCuisineById(id: string): Promise<CuisineType | null> {
    return mockCuisines.find(c => c.id === id) || null;
  },

  async searchRecipes(params: SearchParams): Promise<{ results: Recipe[] }> {
    let results = mockRecipes;
    
    if (params.query) {
      results = results.filter(recipe =>
        recipe.title.toLowerCase().includes(params.query!.toLowerCase())
      );
    }
    
    if (params.cuisine) {
      results = results.filter(recipe =>
        recipe.cuisineType?.toLowerCase() === params.cuisine!.toLowerCase()
      );
    }
    
    return { results };
  },

  async getRandomRecipes(count: number = 6): Promise<{ recipes: Recipe[] }> {
    const shuffled = [...mockRecipes].sort(() => 0.5 - Math.random());
    return { recipes: shuffled.slice(0, count) };
  }
};
