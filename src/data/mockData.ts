
import { Recipe, Ingredient } from '@/types/index'

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish',
    image: '/images/carbonara.jpg',
    cookTime: 20,
    difficulty: 'Medium',
    rating: 4.5,
    tags: ['Italian', 'Pasta', 'Quick']
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Creamy Indian curry',
    image: '/images/tikka.jpg',
    cookTime: 45,
    difficulty: 'Medium',
    rating: 4.7,
    tags: ['Indian', 'Curry', 'Spicy']
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
