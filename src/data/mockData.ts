
import { Recipe, PantryItem, User, Meal } from '@/types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Chicken Tikka Masala',
    title: 'Chicken Tikka Masala',
    description: 'Creamy and flavorful Indian curry',
    image: '/placeholder.svg',
    cookTime: '45 min',
    cookingTime: 45,
    prepTime: '15 min',
    difficulty: 'Medium',
    rating: 4.8,
    ratingCount: 120,
    cuisine: 'Indian',
    ingredients: [
      { id: '1', name: 'Chicken breast', quantity: '500g', unit: 'g', category: 'protein', amount: '500g' },
      { id: '2', name: 'Tomato sauce', quantity: '400ml', unit: 'ml', category: 'sauce', amount: '400ml' }
    ],
    instructions: ['Marinate chicken', 'Cook in pan', 'Add sauce', 'Simmer'],
    calories: 350,
    servings: 4,
    tags: ['dinner', 'curry', 'protein'],
    featured: true,
    isFavorite: false,
    premium: false,
    nutritionalInfo: {
      calories: 350,
      protein: 25,
      carbs: 15,
      fat: 20
    }
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Chicken breast',
    quantity: '500g',
    unit: 'g',
    expiryDate: '2024-01-15',
    category: 'protein',
    daysUntilExpiry: 3,
    addedDate: '2024-01-10'
  }
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/placeholder.svg',
  chefAvatar: '/placeholder.svg',
  preferences: {
    diet: ['vegetarian'],
    allergies: ['nuts'],
    cuisine: ['italian', 'indian']
  },
  dietaryPreferences: ['vegetarian'],
  cuisinePreferences: ['italian', 'indian'],
  allergies: ['nuts'],
  nutritionalGoals: {
    calories: 2000,
    protein: 150
  }
};

export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Breakfast Bowl',
    type: 'breakfast',
    recipe: mockRecipes[0],
    time: '08:00',
    image: '/placeholder.svg',
    prepTime: '10 min',
    calories: 300
  }
];
