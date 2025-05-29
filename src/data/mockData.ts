
import { Recipe, User, PantryItem } from '@/types/index';

export const mockUser: User = {
  id: '1',
  name: 'Ahmad Al-Rashid',
  email: 'ahmad@example.com',
  avatar: '/lovable-uploads/3478e6c6-66b6-44b8-9f16-0426e1989ab2.png',
  dietaryPreferences: ['Halal', 'No Pork'],
  cuisinePreferences: ['Middle Eastern', 'Mediterranean'],
  allergies: ['Nuts'],
  chefAvatar: '/lovable-uploads/9b05b1e3-4b54-4a1e-9961-e5d2a7da7672.png',
  nutritionalGoals: {
    calories: 2000,
    protein: 150
  }
};

export const categories = [
  'Appetizers',
  'Main Course',
  'Desserts',
  'Beverages',
  'Salads',
  'Soups'
];

export const cuisines = [
  'Italian',
  'Middle Eastern',
  'Asian',
  'Mexican',
  'Mediterranean',
  'Indian'
];

export const difficulties = ['Easy', 'Medium', 'Hard'];

export const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Halal',
  'Keto',
  'Low-Carb'
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    name: 'Mediterranean Quinoa Bowl',
    description: 'A healthy and delicious quinoa bowl with Mediterranean flavors',
    image: '/lovable-uploads/3478e6c6-66b6-44b8-9f16-0426e1989ab2.png',
    cookingTime: 25,
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.5,
    ratingCount: 123,
    ingredients: ['Quinoa', 'Cucumber', 'Tomatoes', 'Feta cheese', 'Olive oil'],
    instructions: ['Cook quinoa', 'Chop vegetables', 'Mix ingredients', 'Serve'],
    category: 'Main Course',
    cuisine: 'Mediterranean',
    featured: true,
    premium: false,
    isFavorite: false,
    tags: ['healthy', 'vegetarian'],
    calories: 350,
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
    title: 'Spicy Chicken Tacos',
    name: 'Spicy Chicken Tacos',
    description: 'Delicious spicy chicken tacos with fresh toppings',
    image: '/lovable-uploads/fe3b59a8-1853-4e9f-90d0-2c00d1a21d78.png',
    cookingTime: 30,
    prepTime: 10,
    cookTime: 20,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.7,
    ratingCount: 89,
    ingredients: ['Chicken breast', 'Tortillas', 'Lettuce', 'Tomatoes', 'Cheese'],
    instructions: ['Season chicken', 'Cook chicken', 'Warm tortillas', 'Assemble tacos'],
    category: 'Main Course',
    cuisine: 'Mexican',
    featured: false,
    premium: true,
    isFavorite: true,
    tags: ['spicy', 'protein'],
    calories: 420,
    protein: 25,
    carbs: 35,
    fat: 15,
    fiber: 4,
    nutritionalInfo: {
      protein: 25,
      carbs: 35,
      fat: 15,
      fiber: 4
    }
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Quinoa',
    quantity: 2,
    unit: 'cups',
    category: 'Grains',
    expiryDate: '2024-12-31',
    addedDate: '2024-01-15',
    ingredient: {
      id: 'ing-1',
      name: 'Quinoa',
      category: 'Grains'
    }
  },
  {
    id: '2',
    name: 'Olive Oil',
    quantity: 1,
    unit: 'bottle',
    category: 'Oils',
    expiryDate: '2025-06-01',
    addedDate: '2024-01-10',
    ingredient: {
      id: 'ing-2',
      name: 'Olive Oil',
      category: 'Oils'
    }
  }
];
