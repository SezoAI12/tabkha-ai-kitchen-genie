
import { Recipe, PantryItem, User, MealPlan } from '../types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Chicken Tikka Masala',
    description: 'Classic Indian dish with tender chicken in a creamy, spiced tomato sauce.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2371&auto=format&fit=crop',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'Medium',
    calories: 550,
    rating: 4.7,
    ratingCount: 243,
    cuisineType: 'Indian',
    ingredients: [
      { id: '1-1', name: 'chicken breast', quantity: 500, unit: 'g', inPantry: true },
      { id: '1-2', name: 'tikka masala paste', quantity: 2, unit: 'tbsp', inPantry: false },
      { id: '1-3', name: 'onion', quantity: 1, unit: '', inPantry: true },
      { id: '1-4', name: 'garlic cloves', quantity: 2, unit: '', inPantry: true },
      { id: '1-5', name: 'canned tomatoes', quantity: 1, unit: 'can', inPantry: false },
      { id: '1-6', name: 'coconut milk', quantity: 200, unit: 'ml', inPantry: false },
    ],
    instructions: [
      'Dice the chicken breast into bite-sized cubes.',
      'Heat oil in a large pan over medium heat.',
      'Add onions and cook until soft and translucent, about 5 minutes.',
      'Add garlic and cook for another minute.',
      'Add tikka masala paste and cook for 2 minutes.',
      'Add chicken and cook until no longer pink, about 5-7 minutes.',
      'Pour in the canned tomatoes and coconut milk, stir well.',
      'Simmer for 15-20 minutes until the sauce thickens.',
    ],
    categories: ['Main Course', 'Indian Cuisine'],
    tags: ['Indian', 'Curry', 'Spicy', 'Main Course'],
    isFavorite: true,
    tips: [
      'For best results, marinate the chicken in yogurt and spices for 2 hours before cooking.',
      'Use a sharp knife and cut the chicken into equal-sized pieces for even cooking.',
      'Keep stirring to prevent onions from browning too quickly.',
      'Freshly minced garlic provides more flavor than pre-minced.',
      'Authentic tikka masala paste will give the best flavor profile.',
      'Use chicken thighs instead of breast for more flavor and moisture.',
      'For a thicker sauce, let it simmer uncovered.',
      'Garnish with fresh cilantro and serve with naan bread.'
    ]
  },
  {
    id: '2',
    title: 'Homemade Falafel',
    description: 'Crispy on the outside, fluffy on the inside, these traditional Middle Eastern falafel are made with chickpeas and herbs.',
    image: 'https://images.unsplash.com/photo-1593001872095-7d5b3868e420?q=80&w=2487&auto=format&fit=crop',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    calories: 320,
    rating: 4.5,
    ratingCount: 187,
    cuisineType: 'Middle Eastern',
    ingredients: [
      { id: '2-1', name: 'dried chickpeas', quantity: 250, unit: 'g', inPantry: true },
      { id: '2-2', name: 'onion', quantity: 1, unit: '', inPantry: true },
      { id: '2-3', name: 'garlic cloves', quantity: 3, unit: '', inPantry: true },
      { id: '2-4', name: 'fresh parsley', quantity: 1, unit: 'bunch', inPantry: false },
      { id: '2-5', name: 'ground cumin', quantity: 1, unit: 'tsp', inPantry: true },
      { id: '2-6', name: 'ground coriander', quantity: 1, unit: 'tsp', inPantry: true },
    ],
    instructions: [
      'Soak dried chickpeas overnight or for at least 12 hours.',
      'Drain the chickpeas and pat them dry.',
      'In a food processor, combine chickpeas, onion, garlic, and herbs.',
      'Pulse until the mixture is finely ground but not pureed.',
      'Add spices, salt, and pepper. Pulse to combine.',
      'Form the mixture into small patties.',
      'Heat oil in a deep fryer or pan to 350°F (180°C).',
      'Fry the falafel until golden brown and crispy, about 3-4 minutes.',
    ],
    categories: ['Appetizer', 'Middle Eastern Cuisine'],
    tags: ['Middle Eastern', 'Vegetarian', 'Appetizer'],
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Greek Yogurt with Berries',
    description: 'A simple, healthy breakfast with creamy yogurt and fresh berries.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=2487&auto=format&fit=crop',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    calories: 180,
    rating: 4.2,
    ratingCount: 98,
    cuisineType: 'Mediterranean',
    ingredients: [
      { id: '3-1', name: 'Greek yogurt', quantity: 200, unit: 'g', inPantry: true },
      { id: '3-2', name: 'mixed berries', quantity: 100, unit: 'g', inPantry: false },
      { id: '3-3', name: 'honey', quantity: 1, unit: 'tbsp', inPantry: true },
    ],
    instructions: [
      'Pour Greek yogurt into a bowl.',
      'Top with mixed berries.',
      'Drizzle with honey.',
    ],
    categories: ['Breakfast', 'Quick Meal'],
    tags: ['Breakfast', 'Quick', 'Healthy', 'Vegetarian'],
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Pasta Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2487&auto=format&fit=crop',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    difficulty: 'Medium',
    calories: 480,
    rating: 4.8,
    ratingCount: 312,
    cuisineType: 'Italian',
    ingredients: [
      { id: '4-1', name: 'spaghetti', quantity: 200, unit: 'g', inPantry: true },
      { id: '4-2', name: 'eggs', quantity: 2, unit: '', inPantry: true },
      { id: '4-3', name: 'pancetta', quantity: 100, unit: 'g', inPantry: false },
      { id: '4-4', name: 'Parmesan cheese', quantity: 50, unit: 'g', inPantry: true },
      { id: '4-5', name: 'black pepper', quantity: 1, unit: 'tsp', inPantry: true },
    ],
    instructions: [
      'Cook pasta in salted water according to package instructions.',
      'While pasta is cooking, fry pancetta until crispy.',
      'In a bowl, whisk eggs and grated Parmesan cheese.',
      'Drain pasta, reserving some cooking water.',
      'Immediately add hot pasta to the pancetta.',
      'Remove from heat and quickly stir in the egg mixture.',
      'Add cooking water as needed to create a creamy sauce.',
      'Season generously with black pepper.',
    ],
    categories: ['Main Course', 'Italian Cuisine'],
    tags: ['Italian', 'Pasta', 'Quick', 'Main Course'],
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Avocado Toast',
    description: 'Simple and nutritious breakfast with creamy avocado on toasted bread.',
    image: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aec1?q=80&w=2486&auto=format&fit=crop',
    prepTime: 5,
    cookTime: 3,
    servings: 1,
    difficulty: 'Easy',
    calories: 220,
    rating: 4.0,
    ratingCount: 156,
    cuisineType: 'International',
    ingredients: [
      { id: '5-1', name: 'bread', quantity: 2, unit: 'slices', inPantry: true },
      { id: '5-2', name: 'avocado', quantity: 1, unit: '', inPantry: true },
      { id: '5-3', name: 'lemon juice', quantity: 1, unit: 'tsp', inPantry: true },
      { id: '5-4', name: 'salt', quantity: 1, unit: 'pinch', inPantry: true },
      { id: '5-5', name: 'red pepper flakes', quantity: 1, unit: 'pinch', inPantry: true },
    ],
    instructions: [
      'Toast bread until golden and crispy.',
      'Cut avocado in half, remove pit, and scoop out flesh.',
      'In a small bowl, mash avocado with lemon juice and salt.',
      'Spread mashed avocado on toast.',
      'Sprinkle with red pepper flakes if desired.',
    ],
    categories: ['Breakfast', 'Quick Meal'],
    tags: ['Breakfast', 'Vegetarian', 'Quick', 'Healthy'],
    isFavorite: true,
  },
  {
    id: '6',
    title: 'Beef Stir Fry',
    description: 'Quick and flavorful beef stir fry with vegetables in a savory sauce.',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=2487&auto=format&fit=crop',
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: 'Easy',
    calories: 380,
    rating: 4.4,
    ratingCount: 203,
    cuisineType: 'Asian',
    ingredients: [
      { id: '6-1', name: 'beef strips', quantity: 400, unit: 'g', inPantry: false },
      { id: '6-2', name: 'bell peppers', quantity: 2, unit: '', inPantry: false },
      { id: '6-3', name: 'broccoli', quantity: 1, unit: 'head', inPantry: false },
      { id: '6-4', name: 'soy sauce', quantity: 3, unit: 'tbsp', inPantry: true },
      { id: '6-5', name: 'garlic', quantity: 2, unit: 'cloves', inPantry: true },
      { id: '6-6', name: 'ginger', quantity: 1, unit: 'inch', inPantry: false },
    ],
    instructions: [
      'Slice beef into thin strips.',
      'Cut vegetables into bite-sized pieces.',
      'Heat oil in a wok or large frying pan over high heat.',
      'Add beef and cook until browned, about 2-3 minutes.',
      'Remove beef and set aside.',
      'In the same pan, stir-fry garlic and ginger for 30 seconds.',
      'Add vegetables and stir-fry for 3-4 minutes.',
      'Return beef to the pan, add soy sauce, and toss to combine.',
      'Serve hot over rice or noodles.',
    ],
    categories: ['Main Course', 'Asian Cuisine'],
    tags: ['Asian', 'Quick', 'Main Course'],
    isFavorite: false,
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: 500,
    unit: 'ml',
    category: 'Dairy & Eggs',
    expiryDate: '2025-05-19', // 3 days from now
    location: 'Refrigerator'
  },
  {
    id: '2',
    name: 'Eggs',
    quantity: 6,
    unit: 'pcs',
    category: 'Dairy & Eggs',
    expiryDate: '2025-05-26', // 10 days from now
    location: 'Refrigerator'
  },
  {
    id: '3',
    name: 'Onions',
    quantity: 3,
    unit: 'pcs',
    category: 'Vegetables',
    expiryDate: '', // No expiry
    location: 'Pantry'
  },
  {
    id: '4',
    name: 'Tomatoes',
    quantity: 4,
    unit: 'pcs',
    category: 'Vegetables',
    expiryDate: '2025-05-17', // Tomorrow
    location: 'Refrigerator'
  },
  {
    id: '5',
    name: 'Chicken Breast',
    quantity: 500,
    unit: 'g',
    category: 'Meat & Poultry',
    expiryDate: '2025-05-20',
    location: 'Freezer'
  },
  {
    id: '6',
    name: 'Rice',
    quantity: 1000,
    unit: 'g',
    category: 'Grains & Pasta',
    expiryDate: '2025-12-31',
    location: 'Pantry'
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  avatar: 'https://i.pravatar.cc/300?u=sarah',
  isPremium: true,
  dietaryPreferences: ['Vegetarian', 'Low-Carb'],
  cuisinePreferences: ['Italian', 'Thai', 'Mexican'],
  allergens: ['Peanuts', 'Shellfish'],
  chefAvatar: 'Chef Marco (Italian)',
  nutritionalGoals: {
    calories: 1800,
    protein: 100,
    carbs: 200,
    fat: 60
  },
  recipesSaved: 24,
  recipesCreated: 7,
  followersCount: 18
};

export const mockMealPlans: MealPlan[] = [
  {
    id: '1',
    date: '2025-05-17',
    meals: [
      {
        id: '1-1',
        type: 'breakfast',
        recipe: mockRecipes.find(r => r.id === '3')!
      },
      {
        id: '1-2',
        type: 'lunch',
        recipe: {
          id: '7',
          title: 'Chicken Caesar Salad',
          description: 'Fresh salad with grilled chicken, romaine lettuce, and Caesar dressing.',
          image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2340&auto=format&fit=crop',
          prepTime: 15,
          cookTime: 10,
          servings: 1,
          difficulty: 'Easy',
          calories: 450,
          rating: 4.3,
          ratingCount: 128,
          cuisineType: 'International',
          ingredients: [],
          instructions: [],
          categories: ['Lunch', 'Salad'],
          tags: ['Salad', 'Lunch', 'Protein'],
          isFavorite: false
        }
      },
      {
        id: '1-3',
        type: 'dinner',
        recipe: {
          id: '8',
          title: 'Salmon with Roasted Vegetables',
          description: 'Oven-baked salmon fillet with seasonal vegetables.',
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2340&auto=format&fit=crop',
          prepTime: 15,
          cookTime: 25,
          servings: 1,
          difficulty: 'Medium',
          calories: 520,
          rating: 4.6,
          ratingCount: 156,
          cuisineType: 'International',
          ingredients: [],
          instructions: [],
          categories: ['Dinner', 'Fish'],
          tags: ['Fish', 'Dinner', 'Healthy'],
          isFavorite: false
        }
      }
    ],
    nutritionSummary: {
      calories: 1320,
      protein: 95,
      carbs: 150,
      fat: 45
    }
  }
];

export const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
  'Appetizer',
  'Dessert',
  'Drink'
];

export const cuisines = [
  'Italian',
  'Indian',
  'Mexican',
  'Thai',
  'Chinese',
  'Japanese',
  'Middle Eastern',
  'Mediterranean',
  'American',
  'French'
];

export const difficulties = ['Easy', 'Medium', 'Hard'];

export const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Low-Carb',
  'Keto',
  'Paleo'
];
