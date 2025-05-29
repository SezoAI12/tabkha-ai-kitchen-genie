
import { Recipe, PantryItem, User } from '@/types/index';

export const categories = [
  'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts', 'Appetizers', 'Salads', 'Soups'
];

export const cuisines = [
  'Italian', 'Chinese', 'Mexican', 'Indian', 'French', 'Japanese', 'Thai', 'Mediterranean', 'American'
];

export const difficulties = [
  'Easy', 'Medium', 'Hard'
];

export const dietaryOptions = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Low-Carb', 'High-Protein'
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  chefAvatar: 'Master Chef',
  dietaryPreferences: ['Vegetarian', 'Low-Carb'],
  cuisinePreferences: ['Italian', 'Mediterranean', 'Asian'],
  allergies: ['Nuts', 'Shellfish'],
  nutritionalGoals: {
    calories: 2000,
    protein: 150
  }
};

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish with eggs, cheese, and pancetta',
    image: '/placeholder.svg',
    cookingTime: 30,
    prepTime: 10,
    cookTime: 20,
    difficulty: 'Medium',
    rating: 4.8,
    ratingCount: 156,
    category: 'Italian',
    cuisine: 'Italian',
    servings: 4,
    calories: 520,
    featured: true,
    premium: false,
    isFavorite: false,
    tags: ['Italian', 'Pasta', 'Quick'],
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Black Pepper'],
    instructions: [
      'Cook spaghetti in salted water',
      'Fry pancetta until crispy',
      'Mix eggs with cheese',
      'Combine all ingredients'
    ],
    nutritionalInfo: {
      protein: 25,
      carbs: 45,
      fat: 28
    },
    nutrition: {
      calories: 520,
      protein: 25,
      carbs: 45,
      fat: 28
    }
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Creamy Indian curry with tender chicken pieces',
    image: '/placeholder.svg',
    cookingTime: 45,
    prepTime: 15,
    cookTime: 30,
    difficulty: 'Medium',
    rating: 4.7,
    ratingCount: 203,
    category: 'Indian',
    cuisine: 'Indian',
    servings: 6,
    calories: 420,
    featured: false,
    premium: true,
    isFavorite: true,
    tags: ['Indian', 'Curry', 'Spicy'],
    ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Spices', 'Onion'],
    instructions: [
      'Marinate chicken in yogurt and spices',
      'Cook chicken until tender',
      'Make tomato-cream sauce',
      'Combine and simmer'
    ],
    nutritionalInfo: {
      protein: 35,
      carbs: 15,
      fat: 22
    },
    nutrition: {
      calories: 420,
      protein: 35,
      carbs: 15,
      fat: 22
    }
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Eggs',
    quantity: 12,
    unit: 'pieces',
    category: 'Dairy',
    expiryDate: '2024-01-15',
    addedDate: '2024-01-01',
    location: 'Refrigerator'
  },
  {
    id: '2',
    name: 'Milk',
    quantity: 1,
    unit: 'liter',
    category: 'Dairy',
    expiryDate: '2024-01-10',
    addedDate: '2024-01-05',
    location: 'Refrigerator'
  },
  {
    id: '3',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    category: 'Bakery',
    expiryDate: '2024-01-08',
    addedDate: '2024-01-06',
    location: 'Pantry'
  }
];

export const expiringIngredients = mockPantryItems.filter(item => {
  const expiryDate = new Date(item.expiryDate);
  const today = new Date();
  const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
  return expiryDate <= threeDaysFromNow;
});
