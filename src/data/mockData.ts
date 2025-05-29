
import { Recipe, PantryItem } from '@/types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    name: 'Mediterranean Quinoa Bowl',
    description: 'A healthy and delicious quinoa bowl with fresh vegetables',
    image: '/lovable-uploads/3478e6c6-66b6-44b8-9f16-0426e1989ab2.png',
    cookingTime: 30,
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.5,
    ratingCount: 120,
    ingredients: ['Quinoa', 'Cucumber', 'Tomatoes', 'Feta cheese', 'Olive oil'],
    instructions: ['Cook quinoa', 'Chop vegetables', 'Mix everything together'],
    category: 'Healthy',
    cuisine: 'Mediterranean',
    featured: true,
    premium: false,
    isFavorite: false,
    tags: ['healthy', 'vegetarian', 'quick'],
    calories: 320,
    protein: 12,
    carbs: 45,
    fat: 8,
    fiber: 6,
    nutritionalInfo: {
      protein: 12,
      carbs: 45,
      fat: 8,
      fiber: 6
    }
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    name: 'Grilled Chicken Salad',
    description: 'Fresh grilled chicken with mixed greens',
    image: '/lovable-uploads/3d48f7fe-a194-4102-a10d-a942ddfb054c.png',
    cookingTime: 25,
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    difficulty: 'Medium',
    rating: 4.2,
    ratingCount: 85,
    ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Balsamic vinegar'],
    instructions: ['Season and grill chicken', 'Prepare salad', 'Combine and serve'],
    category: 'Protein',
    cuisine: 'American',
    featured: false,
    premium: false,
    isFavorite: true,
    tags: ['protein', 'low-carb', 'gluten-free'],
    calories: 280,
    protein: 35,
    carbs: 8,
    fat: 12,
    fiber: 3,
    nutritionalInfo: {
      protein: 35,
      carbs: 8,
      fat: 12,
      fiber: 3
    }
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: 5,
    unit: 'pcs',
    category: 'Vegetables',
    expiryDate: '2024-02-15',
    addedDate: '2024-02-01',
    ingredient: {
      id: 'ing-1',
      name: 'Tomatoes',
      category: 'Vegetables'
    }
  },
  {
    id: '2',
    name: 'Chicken Breast',
    quantity: 2,
    unit: 'kg',
    category: 'Meat & Poultry',
    expiryDate: '2024-02-10',
    addedDate: '2024-02-05',
    ingredient: {
      id: 'ing-2',
      name: 'Chicken Breast',
      category: 'Meat & Poultry'
    }
  }
];

export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  dietaryPreferences: ['Vegetarian', 'Gluten-Free'],
  cuisinePreferences: ['Mediterranean', 'Italian'],
  allergies: ['Nuts', 'Dairy'],
  chefAvatar: 'The Grill Master',
  nutritionalGoals: {
    calories: 2000,
    protein: 150
  }
};

export const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Desserts',
  'Healthy',
  'Quick & Easy',
  'Vegetarian',
  'Protein'
];

export const cuisines = [
  'Mediterranean',
  'Italian',
  'Mexican',
  'Asian',
  'American',
  'French',
  'Indian',
  'Middle Eastern'
];

export const difficulties = [
  'Easy',
  'Medium',
  'Hard'
];

export const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Keto',
  'Low-Carb',
  'Dairy-Free',
  'Nut-Free'
];
