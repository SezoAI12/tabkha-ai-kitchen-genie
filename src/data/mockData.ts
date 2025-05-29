
import { Recipe, User, PantryItem, MealPlan, Ingredient } from '@/types/index';

export const mockUser: User = {
  id: '1',
  email: 'john@example.com',
  name: 'John Doe',
  avatar: '/placeholder.svg',
  chefAvatar: '/placeholder.svg',
  preferences: {
    dietaryRestrictions: ['vegetarian'],
    allergies: ['nuts'],
    cuisine: ['italian', 'mexican'],
    difficulty: ['easy', 'medium'],
    favoritesCuisines: ['italian', 'mexican']
  },
  dietaryPreferences: ['vegetarian'],
  cuisinePreferences: ['italian', 'mexican'],
  allergies: ['nuts'],
  nutritionalGoals: {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    fiber: 25,
    sugar: 50,
    sodium: 2300
  }
};

export const mockIngredients: Ingredient[] = [
  { id: '1', name: 'Tomatoes', amount: '2', unit: 'cups', category: 'vegetables' },
  { id: '2', name: 'Onions', amount: '1', unit: 'medium', category: 'vegetables' },
  { id: '3', name: 'Garlic', amount: '3', unit: 'cloves', category: 'vegetables' },
  { id: '4', name: 'Olive Oil', amount: '2', unit: 'tbsp', category: 'oils' },
  { id: '5', name: 'Salt', amount: '1', unit: 'tsp', category: 'seasonings' }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    category: 'Vegetables',
    quantity: 5,
    unit: 'pieces',
    expiryDate: '2024-12-31',
    addedDate: '2024-12-01',
    purchaseDate: '2024-12-01',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Milk',
    category: 'Dairy',
    quantity: 1,
    unit: 'liter',
    expiryDate: '2024-12-25',
    addedDate: '2024-12-01',
    purchaseDate: '2024-12-01'
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta dish',
    image: '/placeholder.svg',
    prepTime: 15,
    cookTime: 30,
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    calories: 520,
    rating: 4.5,
    ratingCount: 120,
    ingredients: mockIngredients,
    instructions: ['Cook pasta', 'Make sauce', 'Combine'],
    categories: ['Italian', 'Pasta'],
    tags: ['dinner', 'comfort-food'],
    isFavorite: false,
    featured: true,
    cuisine: 'Italian',
    premium: false,
    nutritionalInfo: {
      calories: 520,
      protein: 25,
      carbs: 65,
      fat: 15,
      fiber: 8,
      sugar: 12,
      sodium: 890
    }
  }
];

export const mockMealPlans: MealPlan[] = [
  {
    id: '1',
    date: '2024-12-01',
    meals: [
      {
        id: '1',
        type: 'breakfast',
        recipe: mockRecipes[0],
        image: '/placeholder.svg',
        name: 'Spaghetti Bolognese',
        prepTime: 15,
        calories: 520
      }
    ]
  }
];

// Filter options
export const cuisines = ['Italian', 'Mexican', 'Asian', 'Mediterranean', 'American'];
export const difficulties = ['Easy', 'Medium', 'Hard'];
export const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo'];
