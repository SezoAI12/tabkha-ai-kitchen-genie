
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Clock, Users, ChefHat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

const AIFindByIngredientsPage = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedRecipes, setSuggestedRecipes] = useState<any[]>([]);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(ing => ing !== ingredient));
  };

  const findRecipes = async () => {
    if (ingredients.length === 0) {
      toast({
        title: t("No Ingredients", "لا توجد مكونات"),
        description: t("Please add at least one ingredient", "يرجى إضافة مكون واحد على الأقل"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI recipe generation
    setTimeout(() => {
      const mockRecipes = [
        {
          id: '1',
          title: 'AI-Generated Pasta Dish',
          description: 'A delicious pasta recipe created based on your available ingredients',
          prepTime: 30,
          servings: 4,
          difficulty: 'Medium',
          ingredients: ingredients.slice(0, 3),
          isAIGenerated: true
        },
        {
          id: '2', 
          title: 'Smart Ingredient Salad',
          description: 'Fresh salad optimized for your pantry items',
          prepTime: 15,
          servings: 2,
          difficulty: 'Easy',
          ingredients: ingredients.slice(0, 2),
          isAIGenerated: true
        }
      ];
      
      setSuggestedRecipes(mockRecipes);
      setIsLoading(false);
      
      toast({
        title: t("Recipes Found!", "تم العثور على وصفات!"),
        description: t("AI has generated personalized recipes for you", "قام الذكي الاصطناعي بإنشاء وصفات شخصية لك"),
      });
    }, 2000);
  };

  return (
    <PageContainer
      header={{
        title: t("AI Recipe Generator", "مولد الوصفات الذكي"),
        showBackButton: true,
      }}
    >
      <div className="p-4 pb-24 space-y-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg text-white text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">
            {t("AI Recipe Generator", "مولد الوصفات الذكي")}
          </h1>
          <p className="opacity-90">
            {t("Let AI create personalized recipes based on your ingredients", "دع الذكاء الاصطناعي ينشئ وصفات شخصية بناءً على مكوناتك")}
          </p>
        </div>

        {/* Ingredient Input */}
        <Card>
          <CardHeader>
            <CardTitle>{t("Add Your Ingredients", "أضف مكوناتك")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                placeholder={t("Enter ingredient...", "أدخل المكون...")}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
              />
              <Button onClick={addIngredient}>
                {t("Add", "إضافة")}
              </Button>
            </div>

            {/* Ingredients List */}
            {ingredients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    {ingredient} ×
                  </Badge>
                ))}
              </div>
            )}

            <Button
              onClick={findRecipes}
              disabled={isLoading || ingredients.length === 0}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  {t("Generating Recipes...", "جاري إنشاء الوصفات...")}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t("Generate AI Recipes", "إنشاء وصفات ذكية")}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Generated Recipes */}
        {suggestedRecipes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              {t("AI Generated Recipes", "الوصفات المولدة بالذكاء الاصطناعي")}
            </h2>
            
            {suggestedRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{recipe.title}</h3>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{recipe.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {recipe.prepTime} {t("min", "دقيقة")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {recipe.servings} {t("servings", "حصص")}
                        </div>
                        <div className="flex items-center gap-1">
                          <ChefHat className="w-4 h-4" />
                          {recipe.difficulty}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.map((ingredient: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      {t("View Recipe", "عرض الوصفة")}
                    </Button>
                    <Button variant="outline">
                      {t("Save", "حفظ")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default AIFindByIngredientsPage;
