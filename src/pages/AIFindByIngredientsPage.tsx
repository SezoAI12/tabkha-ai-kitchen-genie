import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Recipe } from '@/types/recipe';
import { useRTL } from '@/contexts/RTLContext';

const AIFindByIngredientsPage = () => {
  const { t } = useRTL();
  const [ingredients, setIngredients] = useState('');
  const [recipePrompt, setRecipePrompt] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleIngredientsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIngredients(e.target.value);
  };

  const handleGenerateRecipe = async () => {
    setIsLoading(true);
    setError(null);

    // Basic prompt engineering
    const prompt = `Generate a recipe based on the following ingredients: ${ingredients}.
      The recipe should include:
      - A title
      - A brief description
      - A list of ingredients with amounts and units
      - Step-by-step instructions
      - Prep time and cook time
      - Cuisine type
      - Difficulty level (Easy, Medium, Hard)
      - Number of servings
      - Category and tags
    `;

    setRecipePrompt(prompt);

    // Mock recipe generation (replace with actual API call)
    setTimeout(() => {
      setIsLoading(false);
      // Mock recipe data
      const mockRecipe: Recipe = {
        id: '1',
        title: 'AI Suggested Recipe',
        description: 'A delicious recipe created by AI based on your ingredients',
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop',
        prepTime: 15,
        cookTime: 30,
        servings: 4,
        difficulty: 'Medium' as const,
        calories: 350,
        cuisineType: 'International',
        instructions: ['Step 1', 'Step 2', 'Step 3'],
        categories: ['Main Course'],
        tags: ['AI Generated'],
        status: 'published',
        author_id: 'ai',
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ingredients: [
          { id: '1', name: 'Sample ingredient', amount: 1, unit: 'cup' }
        ]
      };
      setGeneratedRecipe(mockRecipe);
    }, 2000);
  };

  return (
    <PageContainer
      header={{
        title: t("AI Recipe Generator", "مولد وصفات الذكاء الاصطناعي"),
        showBackButton: true
      }}
    >
      <div className="space-y-6 pb-24">
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{t("Enter Ingredients", "أدخل المكونات")}</h3>
              <Textarea
                placeholder={t("List your ingredients here...", "أدخل قائمة المكونات هنا...")}
                value={ingredients}
                onChange={handleIngredientsChange}
                className="resize-none"
              />
            </div>
            <Button onClick={handleGenerateRecipe} disabled={isLoading}>
              {isLoading ? t("Generating...", "جاري الإنشاء...") : t("Generate Recipe", "إنشاء وصفة")}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </CardContent>
        </Card>

        {generatedRecipe && (
          <Card>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">{generatedRecipe.title}</h3>
              <p>{generatedRecipe.description}</p>
              <img src={generatedRecipe.image} alt={generatedRecipe.title} className="rounded-md" />
              <div className="space-y-2">
                <h4 className="text-md font-semibold">{t("Ingredients", "المكونات")}</h4>
                <ul>
                  {generatedRecipe.ingredients?.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-md font-semibold">{t("Instructions", "التعليمات")}</h4>
                <ol className="list-decimal pl-5">
                  {generatedRecipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
              <div className="space-y-2">
                <h4 className="text-md font-semibold">{t("Recipe Prompt", "موجه الوصفة")}</h4>
                <p>{recipePrompt}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default AIFindByIngredientsPage;
