// Mock data for the application
import { Recipe, PantryItem, Meal, User, Comment, Ticket, Notification, Advertisement } from '@/types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
    image: '/carbonara.jpg',
    cookingTime: 20,
    difficulty: 'Easy',
    rating: 4.5,
    cuisine: 'Italian',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Pecorino Romano cheese', 'Black pepper'],
    instructions: ['Boil spaghetti until al dente.', 'In a bowl, whisk eggs, cheese, and pepper.', 'Cook pancetta until crispy.', 'Combine all ingredients and serve.'],
    featured: true,
    premium: false,
    createdBy: 'Chef Luigi',
    createdAt: '2024-01-20T12:00:00Z',
    status: 'approved',
    cuisineType: 'Italian',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    calories: 600,
    tags: ['Italian', 'Pasta', 'Classic'],
    ratingCount: 120,
    isFavorite: true,
    nutritionalInfo: {
      protein: 25,
      carbs: 50,
      fat: 40,
      fiber: 5,
      sugar: 3
    }
  },
  {
    id: '2',
    title: 'Chicken Stir-Fry',
    description: 'Quick and easy chicken stir-fry with colorful vegetables and a savory sauce.',
    image: '/chicken-stir-fry.jpg',
    cookingTime: 25,
    difficulty: 'Medium',
    rating: 4.2,
    cuisine: 'Asian',
    ingredients: ['Chicken breast', 'Broccoli', 'Carrots', 'Bell peppers', 'Soy sauce', 'Ginger', 'Garlic'],
    instructions: ['Cut chicken and vegetables into bite-sized pieces.', 'Stir-fry chicken until cooked through.', 'Add vegetables and stir-fry until tender.', 'Add soy sauce, ginger, and garlic. Serve over rice.'],
    featured: false,
    premium: false,
    createdBy: 'Mei Lee',
    createdAt: '2024-02-15T15:30:00Z',
    status: 'approved',
    cuisineType: 'Chinese',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    calories: 450,
    tags: ['Asian', 'Chicken', 'Healthy'],
    ratingCount: 95,
    isFavorite: false,
    nutritionalInfo: {
      protein: 30,
      carbs: 35,
      fat: 20,
      fiber: 7,
      sugar: 8
    }
  },
  {
    id: '3',
    title: 'Chocolate Lava Cake',
    description: 'Decadent chocolate cake with a molten chocolate center. Perfect for dessert!',
    image: '/chocolate-lava-cake.jpg',
    cookingTime: 30,
    difficulty: 'Hard',
    rating: 4.8,
    cuisine: 'French',
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour'],
    instructions: ['Melt chocolate and butter.', 'Whisk eggs and sugar.', 'Combine all ingredients and bake until edges are set but center is still molten.'],
    featured: true,
    premium: true,
    createdBy: 'Pierre Dubois',
    createdAt: '2024-03-01T18:45:00Z',
    status: 'approved',
    cuisineType: 'French',
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    calories: 800,
    tags: ['Dessert', 'Chocolate', 'Indulgent'],
    ratingCount: 150,
    isFavorite: true,
    nutritionalInfo: {
      protein: 10,
      carbs: 60,
      fat: 55,
      fiber: 3,
      sugar: 45
    }
  },
  {
    id: '4',
    title: 'Vegan Lentil Soup',
    description: 'Hearty and nutritious vegan lentil soup, packed with vegetables and flavor.',
    image: '/lentil-soup.jpg',
    cookingTime: 40,
    difficulty: 'Easy',
    rating: 4.0,
    cuisine: 'Mediterranean',
    ingredients: ['Lentils', 'Carrots', 'Celery', 'Onion', 'Vegetable broth', 'Tomato paste'],
    instructions: ['Sauté vegetables until softened.', 'Add lentils, broth, and tomato paste.', 'Simmer until lentils are tender.'],
    featured: false,
    premium: false,
    createdBy: 'Aisha Khan',
    createdAt: '2024-03-10T09:15:00Z',
    status: 'approved',
    cuisineType: 'Indian',
    prepTime: 15,
    cookTime: 35,
    servings: 6,
    calories: 350,
    tags: ['Vegan', 'Soup', 'Healthy'],
    ratingCount: 80,
    isFavorite: false,
    nutritionalInfo: {
      protein: 18,
      carbs: 40,
      fat: 5,
      fiber: 15,
      sugar: 6
    }
  },
  {
    id: '5',
    title: 'Beef Tacos',
    description: 'Classic beef tacos with seasoned ground beef and your favorite toppings.',
    image: '/beef-tacos.jpg',
    cookingTime: 35,
    difficulty: 'Medium',
    rating: 4.6,
    cuisine: 'Mexican',
    ingredients: ['Ground beef', 'Taco seasoning', 'Tortillas', 'Lettuce', 'Tomato', 'Cheese', 'Sour cream'],
    instructions: ['Cook ground beef and drain excess fat.', 'Add taco seasoning.', 'Warm tortillas and fill with beef and toppings.'],
    featured: false,
    premium: false,
    createdBy: 'Carlos Rodriguez',
    createdAt: '2024-03-18T14:00:00Z',
    status: 'approved',
    cuisineType: 'Mexican',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    calories: 500,
    tags: ['Mexican', 'Beef', 'Tacos'],
    ratingCount: 110,
    isFavorite: true,
    nutritionalInfo: {
      protein: 28,
      carbs: 30,
      fat: 30,
      fiber: 4,
      sugar: 5
    }
  },
  {
    id: '6',
    title: 'Mushroom Risotto',
    description: 'Creamy and flavorful mushroom risotto, perfect as a main course or side dish.',
    image: '/mushroom-risotto.jpg',
    cookingTime: 45,
    difficulty: 'Medium',
    rating: 4.3,
    cuisine: 'Italian',
    ingredients: ['Arborio rice', 'Mushrooms', 'Onion', 'Garlic', 'Vegetable broth', 'Parmesan cheese', 'White wine'],
    instructions: ['Sauté onion and garlic.', 'Add rice and toast lightly.', 'Add wine and let it evaporate.', 'Gradually add warm broth, stirring constantly, until rice is creamy.', 'Stir in mushrooms and Parmesan cheese.'],
    featured: false,
    premium: false,
    createdBy: 'Chef Isabella',
    createdAt: '2024-03-25T11:30:00Z',
    status: 'approved',
    cuisineType: 'Italian',
    prepTime: 20,
    cookTime: 40,
    servings: 4,
    calories: 550,
    tags: ['Italian', 'Vegetarian', 'Risotto'],
    ratingCount: 100,
    isFavorite: false,
    nutritionalInfo: {
      protein: 15,
      carbs: 65,
      fat: 25,
      fiber: 6,
      sugar: 4
    }
  },
  {
    id: '7',
    title: 'Lemon Herb Roasted Chicken',
    description: 'Juicy and flavorful roasted chicken with lemon and herbs.',
    image: '/lemon-herb-chicken.jpg',
    cookingTime: 75,
    difficulty: 'Easy',
    rating: 4.7,
    cuisine: 'American',
    ingredients: ['Whole chicken', 'Lemon', 'Rosemary', 'Thyme', 'Garlic', 'Olive oil'],
    instructions: ['Preheat oven.', 'Rub chicken with olive oil, lemon juice, garlic, rosemary, and thyme.', 'Roast until chicken is cooked through.'],
    featured: true,
    premium: false,
    createdBy: 'Chef Emily',
    createdAt: '2024-04-01T16:00:00Z',
    status: 'approved',
    cuisineType: 'American',
    prepTime: 15,
    cookTime: 70,
    servings: 6,
    calories: 400,
    tags: ['American', 'Chicken', 'Roasted'],
    ratingCount: 130,
    isFavorite: true,
    nutritionalInfo: {
      protein: 40,
      carbs: 5,
      fat: 25,
      fiber: 1,
      sugar: 2
    }
  },
  {
    id: '8',
    title: 'Shrimp Scampi',
    description: 'Classic shrimp scampi with garlic, butter, white wine, and lemon juice.',
    image: '/shrimp-scampi.jpg',
    cookingTime: 20,
    difficulty: 'Easy',
    rating: 4.4,
    cuisine: 'Italian',
    ingredients: ['Shrimp', 'Garlic', 'Butter', 'White wine', 'Lemon juice', 'Parsley', 'Linguine'],
    instructions: ['Cook linguine until al dente.', 'Sauté garlic in butter.', 'Add shrimp and cook until pink.', 'Add white wine and lemon juice.', 'Toss with linguine and parsley.'],
    featured: false,
    premium: false,
    createdBy: 'Chef Marco',
    createdAt: '2024-04-08T10:45:00Z',
    status: 'approved',
    cuisineType: 'Italian',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    calories: 480,
    tags: ['Italian', 'Seafood', 'Pasta'],
    ratingCount: 90,
    isFavorite: false,
    nutritionalInfo: {
      protein: 35,
      carbs: 30,
      fat: 20,
      fiber: 3,
      sugar: 3
    }
  },
  {
    id: '9',
    title: 'Vegetable Curry',
    description: 'Flavorful vegetable curry with a variety of fresh vegetables and aromatic spices.',
    image: '/vegetable-curry.jpg',
    cookingTime: 35,
    difficulty: 'Medium',
    rating: 4.5,
    cuisine: 'Indian',
    ingredients: ['Mixed vegetables', 'Coconut milk', 'Curry powder', 'Turmeric', 'Ginger', 'Garlic', 'Onion'],
    instructions: ['Sauté onion, garlic, and ginger.', 'Add curry powder and turmeric.', 'Add vegetables and coconut milk.', 'Simmer until vegetables are tender.'],
    featured: false,
    premium: false,
    createdBy: 'Priya Patel',
    createdAt: '2024-04-15T13:30:00Z',
    status: 'approved',
    cuisineType: 'Indian',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    calories: 420,
    tags: ['Indian', 'Vegetarian', 'Curry'],
    ratingCount: 105,
    isFavorite: true,
    nutritionalInfo: {
      protein: 12,
      carbs: 50,
      fat: 20,
      fiber: 8,
      sugar: 7
    }
  },
  {
    id: '10',
    title: 'Apple Crumble',
    description: 'Warm and comforting apple crumble with a crispy oat topping.',
    image: '/apple-crumble.jpg',
    cookingTime: 50,
    difficulty: 'Easy',
    rating: 4.6,
    cuisine: 'British',
    ingredients: ['Apples', 'Flour', 'Oats', 'Butter', 'Sugar', 'Cinnamon'],
    instructions: ['Peel and slice apples.', 'Mix flour, oats, butter, sugar, and cinnamon.', 'Layer apples in a baking dish and top with crumble mixture.', 'Bake until golden brown.'],
    featured: false,
    premium: false,
    createdBy: 'Chef Thomas',
    createdAt: '2024-04-22T17:15:00Z',
    status: 'approved',
    cuisineType: 'British',
    prepTime: 20,
    cookTime: 45,
    servings: 6,
    calories: 380,
    tags: ['Dessert', 'Apple', 'Crumble'],
    ratingCount: 115,
    isFavorite: false,
    nutritionalInfo: {
      protein: 4,
      carbs: 55,
      fat: 15,
      fiber: 5,
      sugar: 25
    }
  },
  {
    id: '11',
    title: 'Chicken and Vegetable Skewers',
    description: 'Grilled chicken and vegetable skewers marinated in a tangy sauce.',
    image: '/chicken-skewers.jpg',
    cookingTime: 30,
    difficulty: 'Easy',
    rating: 4.3,
    cuisine: 'Mediterranean',
    ingredients: ['Chicken breast', 'Bell peppers', 'Zucchini', 'Red onion', 'Olive oil', 'Lemon juice', 'Garlic', 'Oregano'],
    instructions: ['Cut chicken and vegetables into bite-sized pieces.', 'Marinate chicken and vegetables in olive oil, lemon juice, garlic, and oregano.', 'Thread onto skewers and grill until cooked through.'],
    featured: false,
    premium: false,
    createdBy: 'Chef Sofia',
    createdAt: '2024-04-29T09:00:00Z',
    status: 'approved',
    cuisineType: 'Greek',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    calories: 350,
    tags: ['Mediterranean', 'Chicken', 'Grilled'],
    ratingCount: 85,
    isFavorite: false,
    nutritionalInfo: {
      protein: 30,
      carbs: 15,
      fat: 18,
      fiber: 3,
      sugar: 4
    }
  },
  {
    id: '12',
    title: 'Salmon with Roasted Asparagus',
    description: 'Healthy and delicious salmon with roasted asparagus and a lemon-dill sauce.',
    image: '/salmon-asparagus.jpg',
    cookingTime: 25,
    difficulty: 'Easy',
    rating: 4.7,
    cuisine: 'Scandinavian',
    ingredients: ['Salmon fillets', 'Asparagus', 'Olive oil', 'Lemon', 'Dill', 'Garlic'],
    instructions: ['Preheat oven.', 'Toss asparagus with olive oil, garlic, salt, and pepper.', 'Roast asparagus until tender.', 'Pan-sear salmon until cooked through.', 'Serve with lemon-dill sauce.'],
    featured: true,
    premium: false,
    createdBy: 'Chef Lars',
    createdAt: '2024-05-06T14:45:00Z',
    status: 'approved',
    cuisineType: 'Scandinavian',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    calories: 420,
    tags: ['Scandinavian', 'Seafood', 'Healthy'],
    ratingCount: 125,
    isFavorite: true,
    nutritionalInfo: {
      protein: 35,
      carbs: 8,
      fat: 28,
      fiber: 4,
      sugar: 2
    }
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: '6',
    unit: 'pcs',
    expiryDate: new Date(Date.now() + 3 * 86400000).toISOString(), // Expires in 3 days
    category: 'Vegetables'
  },
  {
    id: '2',
    name: 'Chicken Breast',
    quantity: '1.5',
    unit: 'kg',
    expiryDate: new Date(Date.now() + 2 * 86400000).toISOString(), // Expires in 2 days
    category: 'Meat & Poultry'
  },
  {
    id: '3',
    name: 'Milk',
    quantity: '2',
    unit: 'L',
    expiryDate: new Date(Date.now() + 5 * 86400000).toISOString(), // Expires in 5 days
    category: 'Dairy & Eggs'
  },
  {
    id: '4',
    name: 'Pasta',
    quantity: '1',
    unit: 'kg',
    expiryDate: new Date(Date.now() + 30 * 86400000).toISOString(), // Expires in 30 days
    category: 'Grains & Pasta'
  },
  {
    id: '5',
    name: 'Apples',
    quantity: '5',
    unit: 'pcs',
    expiryDate: new Date(Date.now() + 7 * 86400000).toISOString(), // Expires in 7 days
    category: 'Fruits'
  },
  {
    id: '6',
    name: 'Canned Tuna',
    quantity: '3',
    unit: 'pcs',
    expiryDate: new Date(Date.now() + 365 * 86400000).toISOString(), // Expires in 365 days
    category: 'Canned Goods'
  },
  {
    id: '7',
    name: 'Rice',
    quantity: '2',
    unit: 'kg',
    expiryDate: new Date(Date.now() + 180 * 86400000).toISOString(), // Expires in 180 days
    category: 'Grains & Pasta'
  },
  {
    id: '8',
    name: 'Eggs',
    quantity: '12',
    unit: 'pcs',
    expiryDate: new Date(Date.now() + 14 * 86400000).toISOString(), // Expires in 14 days
    category: 'Dairy & Eggs'
  },
  {
    id: '9',
    name: 'Onions',
    quantity: '3',
    unit: 'pcs',
    expiryDate: new Date(Date.now() + 21 * 86400000).toISOString(), // Expires in 21 days
    category: 'Vegetables'
  },
  {
    id: '10',
    name: 'Olive Oil',
    quantity: '1',
    unit: 'L',
    expiryDate: new Date(Date.now() + 90 * 86400000).toISOString(), // Expires in 90 days
    category: 'Spices & Herbs'
  }
];

export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Breakfast Burrito',
    type: 'breakfast',
    image: '/breakfast-burrito.jpg',
    calories: 500,
    prepTime: 15,
    recipe: {
      id: '101',
      title: 'Hearty Breakfast Burrito',
      description: 'A filling breakfast burrito with eggs, cheese, and your choice of fillings.',
      image: '/breakfast-burrito.jpg',
      cookingTime: 20,
      difficulty: 'Easy',
      rating: 4.3,
      cuisine: 'Mexican',
      ingredients: ['Eggs', 'Cheese', 'Sausage', 'Potatoes', 'Tortilla'],
      instructions: ['Scramble eggs.', 'Cook sausage and potatoes.', 'Warm tortilla and fill with eggs, sausage, potatoes, and cheese.'],
      featured: false,
      premium: false,
      createdBy: 'Chef Maria',
      createdAt: '2024-05-01T08:00:00Z',
      status: 'approved',
      cuisineType: 'Mexican',
      prepTime: 15,
      cookTime: 20,
      servings: 1,
      calories: 500,
      tags: ['Breakfast', 'Mexican', 'Burrito'],
      ratingCount: 75,
      isFavorite: false,
      nutritionalInfo: {
        protein: 25,
        carbs: 40,
        fat: 30,
        fiber: 5,
        sugar: 3
      }
    }
  },
  {
    id: '2',
    name: 'Chicken Salad Sandwich',
    type: 'lunch',
    image: '/chicken-salad-sandwich.jpg',
    calories: 400,
    prepTime: 10,
    recipe: {
      id: '102',
      title: 'Classic Chicken Salad Sandwich',
      description: 'A simple and satisfying chicken salad sandwich on your favorite bread.',
      image: '/chicken-salad-sandwich.jpg',
      cookingTime: 5,
      difficulty: 'Easy',
      rating: 4.1,
      cuisine: 'American',
      ingredients: ['Chicken', 'Mayonnaise', 'Celery', 'Onion', 'Bread'],
      instructions: ['Cook and shred chicken.', 'Mix chicken with mayonnaise, celery, and onion.', 'Spread on bread and serve.'],
      featured: false,
      premium: false,
      createdBy: 'Chef John',
      createdAt: '2024-05-01T12:00:00Z',
      status: 'approved',
      cuisineType: 'American',
      prepTime: 10,
      cookTime: 5,
      servings: 1,
      calories: 400,
      tags: ['Lunch', 'American', 'Sandwich'],
      ratingCount: 60,
      isFavorite: false,
      nutritionalInfo: {
        protein: 20,
        carbs: 30,
        fat: 25,
        fiber: 3,
        sugar: 4
      }
    }
  },
  {
    id: '3',
    name: 'Salmon with Quinoa',
    type: 'dinner',
    image: '/salmon-quinoa.jpg',
    calories: 600,
    prepTime: 15,
    recipe: {
      id: '103',
      title: 'Healthy Salmon with Quinoa',
      description: 'A nutritious and delicious dinner with salmon and quinoa.',
      image: '/salmon-quinoa.jpg',
      cookingTime: 25,
      difficulty: 'Easy',
      rating: 4.5,
      cuisine: 'Mediterranean',
      ingredients: ['Salmon', 'Quinoa', 'Broccoli', 'Lemon', 'Olive oil'],
      instructions: ['Cook quinoa.', 'Roast broccoli.', 'Pan-sear salmon.', 'Serve with lemon and olive oil.'],
      featured: false,
      premium: false,
      createdBy: 'Chef Sarah',
      createdAt: '2024-05-01T18:00:00Z',
      status: 'approved',
      cuisineType: 'Mediterranean',
      prepTime: 15,
      cookTime: 25,
      servings: 1,
      calories: 600,
      tags: ['Dinner', 'Mediterranean', 'Healthy'],
      ratingCount: 80,
      isFavorite: false,
      nutritionalInfo: {
        protein: 40,
        carbs: 40,
        fat: 30,
        fiber: 8,
        sugar: 5
      }
    }
  },
  {
    id: '4',
    name: 'Fruit and Yogurt Parfait',
    type: 'snack',
    image: '/fruit-yogurt-parfait.jpg',
    calories: 250,
    prepTime: 5,
    recipe: {
      id: '104',
      title: 'Refreshing Fruit and Yogurt Parfait',
      description: 'A light and refreshing snack with fruit and yogurt.',
      image: '/fruit-yogurt-parfait.jpg',
      cookingTime: 0,
      difficulty: 'Easy',
      rating: 4.2,
      cuisine: 'American',
      ingredients: ['Yogurt', 'Berries', 'Granola', 'Honey'],
      instructions: ['Layer yogurt, berries, and granola in a glass.', 'Drizzle with honey.'],
      featured: false,
      premium: false,
      createdBy: 'Chef Emily',
      createdAt: '2024-05-01T15:00:00Z',
      status: 'approved',
      cuisineType: 'American',
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      calories: 250,
      tags: ['Snack', 'American', 'Healthy'],
      ratingCount: 50,
      isFavorite: false,
      nutritionalInfo: {
        protein: 10,
        carbs: 30,
        fat: 10,
        fiber: 3,
        sugar: 15
      }
    }
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/avatar1.jpg',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: '/avatar2.jpg',
    role: 'admin',
    status: 'active',
    createdAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    avatar: '/avatar3.jpg',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-03-01T00:00:00Z'
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    content: 'This recipe is amazing!',
    userId: '1',
    userName: 'John Doe',
    createdAt: '2024-05-01T10:00:00Z',
    status: 'approved',
    reportCount: 0
  },
  {
    id: '2',
    content: 'I made this for dinner last night and it was a hit!',
    userId: '2',
    userName: 'Jane Smith',
    createdAt: '2024-05-01T12:00:00Z',
    status: 'approved',
    reportCount: 0
  },
  {
    id: '3',
    content: 'Could you provide more details on the ingredients?',
    userId: '3',
    userName: 'Alice Johnson',
    createdAt: '2024-05-01T14:00:00Z',
    status: 'pending',
    reportCount: 0
  }
];

export const mockTickets: Ticket[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    subject: 'Issue with recipe instructions',
    description: 'The instructions for step 3 are unclear.',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-05-01T09:00:00Z',
    updatedAt: '2024-05-01T09:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    subject: 'Suggestion for new feature',
    description: 'I would like to suggest a feature to save favorite recipes.',
    status: 'in-progress',
    priority: 'low',
    createdAt: '2024-05-01T11:00:00Z',
    updatedAt: '2024-05-01T11:00:00Z',
    assignedTo: 'Admin'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Alice Johnson',
    subject: 'Account access issue',
    description: 'I am unable to access my account.',
    status: 'resolved',
    priority: 'high',
    createdAt: '2024-05-01T13:00:00Z',
    updatedAt: '2024-05-01T13:00:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Recipe Alert',
    message: 'A new spaghetti carbonara recipe has been added!',
    type: 'info',
    targetUsers: 'all',
    createdAt: '2024-05-01T08:00:00Z',
    status: 'sent',
    scheduled: false
  },
  {
    id: '2',
    title: 'Premium Discount',
    message: 'Premium members get 20% off all recipes this week!',
    type: 'success',
    targetUsers: 'premium',
    createdAt: '2024-05-01T10:00:00Z',
    status: 'sent',
    scheduled: false
  },
  {
    id: '3',
    title: 'Scheduled Maintenance',
    message: 'The site will be under maintenance on May 5th from 12:00 AM to 2:00 AM.',
    type: 'warning',
    targetUsers: 'all',
    createdAt: '2024-05-01T12:00:00Z',
    status: 'scheduled',
    scheduled: true,
    scheduledDate: '2024-05-05T00:00:00Z'
  }
];

export const mockAdvertisements: Advertisement[] = [
  {
    id: '1',
    title: 'Summer Recipe Collection',
    content: 'Check out our new summer recipe collection!',
    imageUrl: '/summer-recipes.jpg',
    targetUrl: '/recipes/summer',
    isActive: true,
    displayDuration: 30,
    targetUsers: 'all',
    createdAt: '2024-05-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Premium Membership Offer',
    content: 'Upgrade to premium and get access to exclusive recipes!',
    imageUrl: '/premium-offer.jpg',
    targetUrl: '/premium',
    isActive: true,
    displayDuration: 60,
    targetUsers: 'free',
    createdAt: '2024-05-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Sponsored Ad',
    content: 'Try our new line of organic spices!',
    imageUrl: '/organic-spices.jpg',
    targetUrl: '/sponsored',
    isActive: false,
    displayDuration: 15,
    targetUsers: 'all',
    createdAt: '2024-05-01T00:00:00Z'
  }
];

export const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snacks',
  'Appetizers',
  'Salads',
  'Soups',
  'Breads',
  'Drinks'
];

export const cuisines = [
  'Italian',
  'Mexican',
  'Chinese',
  'Indian',
  'Japanese',
  'French',
  'American',
  'Mediterranean',
  'Thai',
  'Korean'
];

export const difficulties = [
  'Easy',
  'Medium',
  'Hard'
];

export const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free'
];

// Add a single mock user for profile pages
export const mockUser: User & {
  dietaryPreferences?: string[];
  cuisinePreferences?: string[];
  allergies?: string[];
  chefAvatar?: string;
  nutritionalGoals?: {
    calories: number;
    protein: number;
  };
} = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/avatar1.jpg',
  role: 'user',
  status: 'active',
  createdAt: '2024-01-01T00:00:00Z',
  dietaryPreferences: ['Vegetarian', 'Gluten-Free'],
  cuisinePreferences: ['Italian', 'Mediterranean', 'Asian'],
  allergies: ['Nuts', 'Shellfish'],
  chefAvatar: 'The Culinary Explorer',
  nutritionalGoals: {
    calories: 2000,
    protein: 150
  }
};
