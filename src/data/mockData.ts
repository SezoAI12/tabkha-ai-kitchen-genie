
import { Recipe, PantryItem, ShoppingListItem } from '../types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
    ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper'],
    instructions: [
      'Cook spaghetti according to package instructions',
      'Fry pancetta until crispy',
      'Mix eggs with parmesan cheese',
      'Combine all ingredients and serve'
    ],
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Italian',
    imageUrl: '/placeholder.svg',
    tags: ['pasta', 'quick', 'dinner'],
    nutrition: {
      calories: 520,
      protein: 22,
      carbs: 45,
      fat: 28
    },
    rating: 4.8,
    reviews: 156,
    createdAt: '2024-01-15',
    authorId: '1',
    authorName: 'Chef Mario'
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Creamy and flavorful Indian chicken curry',
    ingredients: ['Chicken breast', 'Tomatoes', 'Cream', 'Spices', 'Onions'],
    instructions: [
      'Marinate chicken in spices',
      'Cook chicken until golden',
      'Prepare tomato-based sauce',
      'Combine chicken with sauce and cream'
    ],
    prepTime: 30,
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Indian',
    imageUrl: '/placeholder.svg',
    tags: ['curry', 'spicy', 'dinner'],
    nutrition: {
      calories: 450,
      protein: 35,
      carbs: 12,
      fat: 25
    },
    rating: 4.6,
    reviews: 203,
    createdAt: '2024-01-20',
    authorId: '2',
    authorName: 'Chef Priya'
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
  'Salads',
  'Soups',
  'Vegetarian',
  'Vegan',
  'Gluten-Free'
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: 1,
    unit: 'liter',
    category: 'Dairy',
    expiryDate: '2024-02-15',
    addedDate: '2024-02-01',
    location: 'Refrigerator'
  },
  {
    id: '2',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    category: 'Bakery',
    expiryDate: '2024-02-10',
    addedDate: '2024-02-05',
    location: 'Pantry'
  }
];

export const mockShoppingList: ShoppingListItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: 2,
    unit: 'kg',
    category: 'Vegetables',
    checked: false,
    priority: 'high'
  },
  {
    id: '2',
    name: 'Chicken breast',
    quantity: 500,
    unit: 'g',
    category: 'Meat',
    checked: false,
    priority: 'medium'
  }
];
