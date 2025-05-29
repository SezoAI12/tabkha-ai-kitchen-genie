
import { Recipe, Ingredient } from '@/types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Pasta Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
    image: '/placeholder.svg',
    cookTime: 25,
    cookingTime: 25,
    prepTime: 15,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Italian',
    rating: 4.8,
    ratingCount: 124,
    ingredients: [
      { name: 'Spaghetti', amount: '400', unit: 'g' },
      { name: 'Eggs', amount: '4', unit: 'pieces' },
      { name: 'Parmesan cheese', amount: '100', unit: 'g' },
      { name: 'Pancetta', amount: '150', unit: 'g' },
      { name: 'Black pepper', amount: '1', unit: 'tsp' }
    ],
    instructions: [
      'Cook pasta according to package instructions',
      'Fry pancetta until crispy',
      'Mix eggs with cheese',
      'Combine everything while hot'
    ],
    nutrition: {
      calories: 520,
      protein: '22g',
      carbs: '45g',
      fat: '28g'
    },
    nutritionalInfo: {
      protein: '22g',
      carbs: '45g',
      fat: '28g'
    },
    calories: 520,
    tags: ['Italian', 'Pasta', 'Quick'],
    featured: true,
    isFavorite: false,
    premium: false
  },
  {
    id: '2',
    title: 'Chicken Stir Fry',
    description: 'Quick and healthy stir fry with fresh vegetables',
    image: '/placeholder.svg',
    cookTime: 15,
    cookingTime: 15,
    prepTime: 10,
    servings: 3,
    difficulty: 'Easy',
    cuisine: 'Asian',
    rating: 4.5,
    ratingCount: 89,
    ingredients: [
      { name: 'Chicken breast', amount: '300', unit: 'g' },
      { name: 'Bell peppers', amount: '2', unit: 'pieces' },
      { name: 'Broccoli', amount: '200', unit: 'g' },
      { name: 'Soy sauce', amount: '3', unit: 'tbsp' },
      { name: 'Garlic', amount: '3', unit: 'cloves' }
    ],
    instructions: [
      'Cut chicken into strips',
      'Heat oil in wok',
      'Stir fry chicken then vegetables',
      'Add sauce and serve'
    ],
    nutrition: {
      calories: 380,
      protein: '28g',
      carbs: '12g',
      fat: '15g'
    },
    nutritionalInfo: {
      protein: '28g',
      carbs: '12g',
      fat: '15g'
    },
    calories: 380,
    tags: ['Asian', 'Healthy', 'Quick'],
    featured: false,
    isFavorite: true,
    premium: false
  }
];

export const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: 3,
    unit: 'pieces',
    expiryDate: '2024-02-05',
    category: 'Vegetables',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Milk',
    quantity: 1,
    unit: 'liter',
    expiryDate: '2024-02-03',
    category: 'Dairy',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Chicken Breast',
    quantity: 500,
    unit: 'grams',
    expiryDate: '2024-02-04',
    category: 'Meat',
    image: '/placeholder.svg'
  }
];

export const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Desserts',
  'Beverages',
  'Appetizers',
  'Main Course',
  'Side Dishes'
];

export const cuisines = [
  'Italian',
  'Asian',
  'Mexican',
  'Mediterranean',
  'Indian',
  'French',
  'American',
  'Thai',
  'Chinese',
  'Japanese'
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
  'Keto',
  'Low-Carb',
  'High-Protein',
  'Paleo'
];

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: string;
  image?: string;
}

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: 3,
    unit: 'pieces',
    expiryDate: '2024-02-05',
    category: 'Vegetables',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Milk',
    quantity: 1,
    unit: 'liter',
    expiryDate: '2024-02-03',
    category: 'Dairy',
    image: '/placeholder.svg'
  }
];

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    dietary: string[];
    allergies: string[];
    cuisine: string[];
  };
  dietaryPreferences?: string[];
  cuisinePreferences?: string[];
  allergies?: string[];
  chefAvatar?: string;
}

export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  avatar: '/placeholder.svg',
  preferences: {
    dietary: ['Vegetarian'],
    allergies: ['Nuts'],
    cuisine: ['Italian', 'Mediterranean']
  },
  dietaryPreferences: ['Vegetarian'],
  cuisinePreferences: ['Italian', 'Mediterranean'],
  allergies: ['Nuts'],
  chefAvatar: 'The Grill Master'
};

export interface Meal {
  id: string;
  name: string;
  recipe: Recipe;
  scheduledFor: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}
