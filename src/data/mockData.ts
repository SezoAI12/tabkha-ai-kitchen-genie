
import { Recipe, Ingredient, PantryItem, User } from '@/types/index'

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish',
    image: '/images/carbonara.jpg',
    cookTime: 20,
    cookingTime: 20,
    prepTime: 10,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.5,
    ratingCount: 128,
    tags: ['Italian', 'Pasta', 'Quick'],
    cuisine: 'Italian',
    ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan cheese', 'Black pepper'],
    instructions: [
      'Boil pasta according to package directions',
      'Cook bacon until crispy',
      'Mix eggs and cheese in a bowl',
      'Combine hot pasta with egg mixture',
      'Add bacon and pepper, serve immediately'
    ],
    isFavorite: false,
    featured: true,
    premium: false,
    calories: 520,
    nutritionalInfo: {
      protein: 25,
      carbs: 60,
      fat: 18,
      fiber: 3
    }
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Creamy Indian curry',
    image: '/images/tikka.jpg',
    cookTime: 45,
    cookingTime: 45,
    prepTime: 15,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.7,
    ratingCount: 95,
    tags: ['Indian', 'Curry', 'Spicy'],
    cuisine: 'Indian',
    ingredients: ['Chicken breast', 'Yogurt', 'Tomato sauce', 'Heavy cream', 'Spices'],
    instructions: [
      'Marinate chicken in yogurt and spices',
      'Cook chicken until golden',
      'Prepare tomato-based sauce',
      'Simmer chicken in sauce',
      'Finish with cream and serve with rice'
    ],
    isFavorite: true,
    featured: false,
    premium: false,
    calories: 380,
    nutritionalInfo: {
      protein: 35,
      carbs: 12,
      fat: 22,
      fiber: 2
    }
  }
]

export const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Tomatoes',
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    quantity: 5,
    unit: 'pieces'
  },
  {
    id: '2',
    name: 'Milk',
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    quantity: 1,
    unit: 'liter'
  }
]

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Rice',
    quantity: 2,
    unit: 'kg',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    category: 'Grains'
  },
  {
    id: '2',
    name: 'Olive Oil',
    quantity: 1,
    unit: 'bottle',
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    category: 'Oils'
  }
]

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    dietary: ['Vegetarian'],
    allergies: ['Nuts']
  }
}

export const categories = [
  'Breakfast',
  'Lunch', 
  'Dinner',
  'Dessert',
  'Snacks',
  'Beverages'
]

export const cuisines = [
  'Italian',
  'Indian',
  'Chinese',
  'Mexican',
  'Mediterranean',
  'American',
  'Thai',
  'Japanese'
]

export const difficulties = [
  'Easy',
  'Medium',
  'Hard'
]

export const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Low-Carb',
  'Keto',
  'Paleo'
]
