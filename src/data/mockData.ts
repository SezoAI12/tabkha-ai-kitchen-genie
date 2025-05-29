
import { User, Recipe, PantryItem } from '@/types/index';

export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  avatar: '',
  preferences: {
    dietary: ['Vegetarian'],
    allergies: ['Nuts'],
    cuisine: ['Italian', 'Mediterranean']
  },
  dietaryPreferences: ['Vegetarian', 'Gluten-Free'],
  cuisinePreferences: ['Italian', 'Mediterranean', 'Asian'],
  allergies: ['Peanuts', 'Shellfish'],
  chefAvatar: 'The Grill Master',
  nutritionalGoals: {
    calories: 2000,
    dailyCalories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  }
};

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    description: 'A healthy and delicious quinoa bowl with Mediterranean flavors',
    image: '/placeholder.svg',
    cookTime: 25,
    cookingTime: 25,
    prepTime: 15,
    servings: 4,
    difficulty: 'Easy' as const,
    cuisine: 'Mediterranean',
    rating: 4.5,
    ratingCount: 128,
    ingredients: [
      { name: 'Quinoa', amount: '1', unit: 'cup' },
      { name: 'Cucumber', amount: '1', unit: 'large' },
      { name: 'Cherry tomatoes', amount: '200', unit: 'g' }
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Chop vegetables',
      'Mix everything together'
    ],
    nutrition: {
      calories: 350,
      protein: '12g',
      carbs: '45g',
      fat: '8g'
    },
    nutritionalInfo: {
      protein: '12g',
      carbs: '45g',
      fat: '8g'
    },
    calories: 350,
    tags: ['healthy', 'vegetarian', 'gluten-free'],
    featured: true,
    isFavorite: false,
    premium: false
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: 1,
    unit: 'liter',
    expiryDate: '2024-01-15',
    category: 'Dairy',
    image: '/placeholder.svg',
    addedDate: '2024-01-01',
    purchaseDate: '2024-01-01'
  }
];

// Add missing exports
export const categories = [
  'Breakfast',
  'Lunch', 
  'Dinner',
  'Snacks',
  'Desserts',
  'Appetizers',
  'Vegetarian',
  'Vegan',
  'Gluten-Free'
];

export const cuisines = [
  'Italian',
  'Mediterranean', 
  'Asian',
  'Mexican',
  'Indian',
  'French',
  'Middle Eastern',
  'American'
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
  'Dairy-Free',
  'Nut-Free',
  'Low-Carb',
  'Keto',
  'Paleo'
];
