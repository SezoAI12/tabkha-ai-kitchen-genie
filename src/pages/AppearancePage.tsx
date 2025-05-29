// ... (imports)

const mockMealPlan = {
  id: 'today-plan',
  date: new Date().toISOString().split('T')[0],
  meals: [
    {
      id: 'breakfast-1',
      type: 'breakfast' as const,
      recipe: {
        // --- CHANGE THE ID HERE ---
        id: 'avocado-toast-basic', // Use a real, valid recipe ID
        title: 'Avocado Toast',
        description: 'Healthy and delicious avocado toast',
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=300&q=80',
        prepTime: 10,
        cookTime: 5,
        servings: 1,
        difficulty: 'Easy' as const,
        calories: 320,
        rating: 4.5,
        ratingCount: 120,
        ingredients: [],
        instructions: [],
        categories: ['Breakfast'],
        tags: ['healthy', 'quick'],
        isFavorite: false
      }
    },
    {
      id: 'lunch-1',
      type: 'lunch' as const,
      recipe: {
        // --- CHANGE THE ID HERE ---
        id: 'quinoa-veggie-salad', // Use a real, valid recipe ID
        title: 'Quinoa Salad',
        description: 'Fresh quinoa salad with vegetables',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80',
        prepTime: 15,
        cookTime: 20,
        servings: 2,
        difficulty: 'Easy' as const,
        calories: 450,
        rating: 4.3,
        ratingCount: 89,
        ingredients: [],
        instructions: [],
        categories: ['Lunch', 'Salad'],
        tags: ['healthy', 'vegetarian'],
        isFavorite: false
      }
    },
    {
      id: 'dinner-1',
      type: 'dinner' as const,
      recipe: {
        // --- CHANGE THE ID HERE ---
        id: 'salmon-dill', // Use a real, valid recipe ID
        title: 'Grilled Salmon',
        description: 'Perfectly grilled salmon with herbs',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80',
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        difficulty: 'Medium' as const,
        calories: 520,
        rating: 4.7,
        ratingCount: 156,
        ingredients: [],
        instructions: [],
        categories: ['Dinner', 'Seafood'],
        tags: ['protein', 'healthy'],
        isFavorite: true
      }
    }
  ]
};

// ... (rest of the component)
