
export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  cookTime: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  rating: number
  tags: string[]
}

export interface Ingredient {
  id: string
  name: string
  expiryDate: Date
  quantity: number
  unit: string
}

export interface User {
  id: string
  name: string
  email: string
  preferences: {
    dietary: string[]
    allergies: string[]
  }
}
