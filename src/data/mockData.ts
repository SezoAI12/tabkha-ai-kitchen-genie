
import { Recipe, PantryItem, User } from '@/types/index';

export const categories = ['Italian', 'Asian', 'Mexican', 'American', 'Mediterranean', 'Indian'];
export const cuisines = ['Italian', 'Asian', 'Mexican', 'American', 'Mediterranean', 'Indian', 'French', 'Chinese'];
export const difficulties = ['Easy', 'Medium', 'Hard'];
export const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb'];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Pasta Carbonara',
    title: 'Pasta Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
    image: '/placeholder.svg',
    cookTime: '25 min',
    cookingTime: 25,
    prepTime: '10 min',
    difficulty: 'Medium',
    rating: 4.8,
    ratingCount: 123,
    cuisine: 'Italian',
    ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper'],
    instructions: ['Cook pasta', 'Prepare sauce', 'Combine and serve'],
    calories: 520,
    servings: 4,
    tags: ['Italian', 'Pasta'],
    featured: true,
    isFavorite: false,
    premium: false,
    nutritionalInfo: {
      calories: 520,
      protein: 25,
      carbs: 65,
      fat: 18
    }
  },
  {
    id: '2',
    name: 'Chicken Stir Fry',
    title: 'Chicken Stir Fry',
    description: 'Quick and healthy stir fry with vegetables',
    image: '/placeholder.svg',
    cookTime: '15 min',
    cookingTime: 15,
    prepTime: '5 min',
    difficulty: 'Easy',
    rating: 4.5,
    ratingCount: 89,
    cuisine: 'Asian',
    ingredients: ['Chicken breast', 'Mixed vegetables', 'Soy sauce', 'Garlic', 'Ginger'],
    instructions: ['Cut chicken', 'Stir fry vegetables', 'Add sauce and serve'],
    calories: 380,
    servings: 2,
    tags: ['Asian', 'Healthy'],
    featured: true,
    isFavorite: true,
    premium: false,
    nutritionalInfo: {
      calories: 380,
      protein: 35,
      carbs: 20,
      fat: 15
    }
  },
  {
    id: '3',
    name: 'Avocado Toast',
    title: 'Avocado Toast',
    description: 'Simple and nutritious breakfast option',
    image: '/placeholder.svg',
    cookTime: '5 min',
    cookingTime: 5,
    prepTime: '3 min',
    difficulty: 'Easy',
    rating: 4.2,
    ratingCount: 45,
    cuisine: 'Modern',
    ingredients: ['Bread', 'Avocado', 'Salt', 'Lemon juice', 'Red pepper flakes'],
    instructions: ['Toast bread', 'Mash avocado', 'Spread and season'],
    calories: 250,
    servings: 1,
    tags: ['Modern', 'Healthy', 'Breakfast'],
    featured: false,
    isFavorite: false,
    premium: false,
    nutritionalInfo: {
      calories: 250,
      protein: 8,
      carbs: 30,
      fat: 12
    }
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: '1',
    unit: 'liter',
    expiryDate: '2024-02-15',
    category: 'Dairy',
    daysUntilExpiry: 2,
    addedDate: '2024-02-10'
  },
  {
    id: '2',
    name: 'Eggs',
    quantity: '12',
    unit: 'pieces',
    expiryDate: '2024-02-20',
    category: 'Dairy',
    daysUntilExpiry: 7,
    addedDate: '2024-02-08'
  },
  {
    id: '3',
    name: 'Bread',
    quantity: '1',
    unit: 'loaf',
    expiryDate: '2024-02-18',
    category: 'Bakery',
    daysUntilExpiry: 5,
    addedDate: '2024-02-12'
  },
  {
    id: '4',
    name: 'Bananas',
    quantity: '6',
    unit: 'pieces',
    expiryDate: '2024-02-16',
    category: 'Fruits',
    daysUntilExpiry: 3,
    addedDate: '2024-02-11'
  }
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/placeholder.svg',
  preferences: {
    diet: ['Vegetarian'],
    allergies: ['Nuts'],
    cuisine: ['Italian', 'Mediterranean']
  }
};

export const mockExpiringIngredients = mockPantryItems.filter(item => item.daysUntilExpiry <= 3);

export const mockRecommendedRecipes = mockRecipes.slice(0, 3);
