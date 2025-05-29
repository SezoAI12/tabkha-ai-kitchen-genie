
import { Recipe, PantryItem, User } from '@/types/index';

export const mockUser: User = {
  id: '1',
  name: 'Ahmed Hassan',
  email: 'ahmed.hassan@example.com',
  avatar: '/avatars/ahmed.jpg',
  chefAvatar: 'The Grill Master',
  preferences: {
    diet: ['Mediterranean'],
    allergies: ['Nuts'],
    cuisine: ['Middle Eastern', 'Italian']
  },
  dietaryPreferences: ['Mediterranean'],
  cuisinePreferences: ['Middle Eastern', 'Italian'],
  allergies: ['Nuts'],
  nutritionalGoals: {
    calories: 2000,
    protein: 150
  }
};

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Mediterranean Grilled Chicken',
    title: 'Mediterranean Grilled Chicken',
    description: 'Juicy grilled chicken with Mediterranean herbs and spices',
    image: '/recipes/mediterranean-chicken.jpg',
    cookTime: '25 min',
    cookingTime: 25,
    prepTime: '15 min',
    difficulty: 'Medium',
    rating: 4.8,
    ratingCount: 124,
    cuisine: 'Mediterranean',
    ingredients: [
      {
        id: '1',
        name: 'Chicken breast',
        quantity: '4',
        unit: 'pieces',
        category: 'Protein',
        amount: '4 pieces'
      },
      {
        id: '2',
        name: 'Olive oil',
        quantity: '3',
        unit: 'tbsp',
        category: 'Oil',
        amount: '3 tbsp'
      }
    ],
    instructions: [
      'Marinate chicken with olive oil and herbs',
      'Preheat grill to medium-high heat',
      'Grill chicken for 6-7 minutes per side',
      'Let rest for 5 minutes before serving'
    ],
    calories: 320,
    servings: 4,
    tags: ['Healthy', 'Protein', 'Mediterranean'],
    featured: true,
    isFavorite: false,
    premium: false,
    nutritionalInfo: {
      calories: 320,
      protein: 35,
      carbs: 2,
      fat: 18
    }
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: '1',
    unit: 'liter',
    expiryDate: '2024-02-01',
    category: 'Dairy',
    daysUntilExpiry: 2,
    addedDate: '2024-01-25'
  },
  {
    id: '2',
    name: 'Bread',
    quantity: '1',
    unit: 'loaf',
    expiryDate: '2024-01-31',
    category: 'Grains',
    daysUntilExpiry: 1,
    addedDate: '2024-01-28'
  }
];
