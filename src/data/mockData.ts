
import { Recipe, PantryItem } from '@/types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    description: 'A healthy and flavorful quinoa bowl with Mediterranean ingredients',
    image: '/placeholder.svg',
    cookingTime: 25,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.5,
    ingredients: [
      '1 cup quinoa',
      '2 cups vegetable broth',
      '1 cucumber, diced',
      '1 cup cherry tomatoes',
      '1/2 red onion, sliced',
      '1/4 cup olives',
      '1/4 cup feta cheese',
      '2 tbsp olive oil',
      '1 lemon, juiced'
    ],
    instructions: [
      'Cook quinoa in vegetable broth according to package instructions',
      'Dice cucumber and halve cherry tomatoes',
      'Slice red onion thinly',
      'Combine all ingredients in a bowl',
      'Drizzle with olive oil and lemon juice',
      'Serve chilled'
    ],
    category: 'Bowl',
    cuisine: 'Mediterranean',
    featured: true,
    calories: 420,
    protein: 15,
    carbs: 65,
    fat: 12,
    fiber: 8
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Creamy and spicy Indian curry with tender chicken',
    image: '/placeholder.svg',
    cookingTime: 45,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.8,
    ingredients: [
      '2 lbs chicken breast, cubed',
      '1 cup heavy cream',
      '1 can tomato sauce',
      '2 tbsp garam masala',
      '1 tbsp ginger-garlic paste',
      '1 onion, diced',
      '2 tbsp oil',
      'Salt to taste'
    ],
    instructions: [
      'Marinate chicken with spices for 30 minutes',
      'Cook chicken until golden brown',
      'Sauté onions until translucent',
      'Add tomato sauce and simmer',
      'Add cream and cooked chicken',
      'Simmer for 15 minutes and serve'
    ],
    category: 'Curry',
    cuisine: 'Indian',
    featured: true,
    calories: 520,
    protein: 35,
    carbs: 12,
    fat: 38,
    fiber: 3
  },
  {
    id: '3',
    title: 'Classic Caesar Salad',
    description: 'Traditional Caesar salad with homemade dressing',
    image: '/placeholder.svg',
    cookingTime: 15,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.2,
    ingredients: [
      '1 head romaine lettuce',
      '1/4 cup parmesan cheese',
      '1/2 cup croutons',
      '2 tbsp caesar dressing',
      '1 lemon, juiced',
      'Black pepper to taste'
    ],
    instructions: [
      'Wash and chop romaine lettuce',
      'Toss with caesar dressing',
      'Add croutons and parmesan',
      'Finish with lemon juice and pepper',
      'Serve immediately'
    ],
    category: 'Salad',
    cuisine: 'Italian',
    featured: false,
    calories: 280,
    protein: 8,
    carbs: 15,
    fat: 22,
    fiber: 4
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
    purchaseDate: '2024-01-15',
    location: 'Pantry'
  },
  {
    id: '2',
    name: 'Chicken Breast',
    quantity: 1.5,
    unit: 'lbs',
    category: 'Meat',
    expiryDate: '2024-06-02',
    purchaseDate: '2024-05-28',
    location: 'Refrigerator'
  },
  {
    id: '3',
    name: 'Heavy Cream',
    quantity: 1,
    unit: 'cup',
    category: 'Dairy',
    expiryDate: '2024-06-01',
    purchaseDate: '2024-05-25',
    location: 'Refrigerator'
  },
  {
    id: '4',
    name: 'Tomatoes',
    quantity: 6,
    unit: 'pieces',
    category: 'Vegetables',
    expiryDate: '2024-05-31',
    purchaseDate: '2024-05-27',
    location: 'Counter'
  },
  {
    id: '5',
    name: 'Lettuce',
    quantity: 1,
    unit: 'head',
    category: 'Vegetables',
    expiryDate: '2024-05-30',
    purchaseDate: '2024-05-26',
    location: 'Refrigerator'
  }
];
