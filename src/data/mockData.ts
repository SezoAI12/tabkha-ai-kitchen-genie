
import { Recipe, Ingredient, PantryItem } from '@/types';

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Pasta Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
    ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper'],
    instructions: [
      'Cook pasta according to package directions',
      'Fry pancetta until crispy',
      'Whisk eggs and cheese together',
      'Combine all ingredients while pasta is hot'
    ],
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Italian',
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop',
    calories: 520,
    rating: 4.5,
    featured: true,
    isFavorite: false,
    tags: ['pasta', 'italian', 'main-course']
  },
  {
    id: '2',
    name: 'Chicken Tikka Masala',
    description: 'Creamy tomato-based curry with tender chicken pieces',
    ingredients: ['Chicken breast', 'Tomato sauce', 'Cream', 'Spices', 'Onion', 'Garlic'],
    instructions: [
      'Marinate chicken in spices',
      'Cook chicken until golden',
      'Prepare sauce with tomatoes and cream',
      'Simmer chicken in sauce'
    ],
    prepTime: 30,
    cookTime: 25,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Indian',
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    calories: 380,
    rating: 4.7,
    featured: false,
    isFavorite: true,
    tags: ['curry', 'indian', 'main-course']
  }
];

// Export with both names for compatibility
export const mockRecipes = recipes;

export const ingredients: Ingredient[] = [
  {
    id: '1',
    name: 'Tomato',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&h=100&fit=crop',
    nutrition: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2
    }
  },
  {
    id: '2',
    name: 'Chicken Breast',
    category: 'meat',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&h=100&fit=crop',
    nutrition: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6
    }
  }
];

export const pantryItems: PantryItem[] = [
  {
    id: '1',
    ingredient: ingredients[0],
    quantity: 5,
    unit: 'pieces',
    expiryDate: '2024-02-15',
    addedDate: '2024-01-20'
  },
  {
    id: '2',
    ingredient: ingredients[1],
    quantity: 1,
    unit: 'kg',
    expiryDate: '2024-02-10',
    addedDate: '2024-01-25'
  }
];

// Export with both names for compatibility
export const mockPantryItems = pantryItems;

export const categories = [
  'appetizers',
  'main-course',
  'desserts',
  'beverages',
  'salads',
  'soups',
  'breakfast',
  'snacks'
];

export const cuisines = [
  'Italian',
  'Indian',
  'Chinese',
  'Mexican',
  'French',
  'Thai',
  'Japanese',
  'Mediterranean',
  'American',
  'Middle Eastern'
];

export const difficulties = ['easy', 'medium', 'hard'];

export const dietaryOptions = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'dairy-free',
  'keto',
  'paleo',
  'low-carb',
  'high-protein'
];

export const expiringIngredients = [
  {
    id: '1',
    name: 'Milk',
    expiryDate: '2024-02-08',
    daysLeft: 2,
    category: 'dairy'
  },
  {
    id: '2',
    name: 'Bananas',
    expiryDate: '2024-02-10',
    daysLeft: 4,
    category: 'fruits'
  },
  {
    id: '3',
    name: 'Bread',
    expiryDate: '2024-02-09',
    daysLeft: 3,
    category: 'grains'
  }
];
