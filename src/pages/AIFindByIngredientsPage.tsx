
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Sparkles, 
  Clock, 
  Users, 
  ChefHat,
  Plus,
  X,
  Loader2
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useAIChef } from '@/hooks/useAIChef';
import { useToast } from '@/hooks/use-toast';

const AIFindByIngredientsPage = () => {
  const { t } = useRTL();
  const { askAIChef } = useAIChef();
  const { toast } = useToast();
  
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [preferences, setPreferences] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [discoveredRecipes, setDiscoveredRecipes] = useState<any[]>([]);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  const findRecipes = async () => {
    if (ingredients.length === 0) {
      toast({
        title: "Add ingredients",
        description: "Please add at least one ingredient to find recipes.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const prompt = `
        I have these ingredients available: ${ingredients.join(', ')}
        
        ${preferences ? `Additional preferences: ${preferences}` : ''}
        
        Please suggest 3-5 creative and delicious recipes I can make using primarily these ingredients. For each recipe, provide:
        1. Recipe name
        2. Brief description (1-2 sentences)
        3. Estimated cooking time
        4. Difficulty level (Easy/Medium/Hard)
        5. Number of servings
        6. Complete ingredient list (highlighting which ones I already have)
        7. Step-by-step instructions
        8. Any helpful cooking tips
        
        Focus on recipes that make the best use of the ingredients I have, and suggest alternatives if I'm missing something important.
      `;

      const response = await askAIChef(prompt);
      
      // Parse the response into recipe format
      const recipes = parseAIResponse(response.response);
      setDiscoveredRecipes(recipes);
      
      toast({
        title: "Recipes found!",
        description: `Found ${recipes.length} recipes using your ingredients.`
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const parseAIResponse = (response: string) => {
    // Simple parsing - in a real app, you'd want more sophisticated parsing
    const recipes = [];
    const sections = response.split(/\d+\./);
    
    sections.slice(1, 6).forEach((section, index) => {
      recipes.push({
        id: `ai-recipe-${index}`,
        title: `AI Recipe ${index + 1}`,
        description: section.substring(0, 150) + '...',
        time: Math.floor(Math.random() * 60) + 15,
        servings: Math.floor(Math.random() * 4) + 2,
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        fullContent: section,
        image: '/placeholder.svg'
      });
    });
    
    return recipes;
  };

  return (
    <PageContainer 
      header={{ 
        title: t('Find Recipe by Ingredients', 'البحث عن وصفة بالمكونات'), 
        showBackButton: true 
      }}
    >
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">
            {t('AI-Powered Recipe Discovery', 'اكتشاف الوصفات بالذكاء الاصطناعي')}
          </h1>
          <p className="opacity-90">
            {t('Tell us what ingredients you have, and our AI will create amazing recipes for you!', 'أخبرنا بالمكونات التي لديك، وسيقوم الذكاء الاصطناعي لدينا بإنشاء وصفات رائعة لك!')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-wasfah-bright-teal" />
              {t('Your Ingredients', 'مكوناتك')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add ingredient input */}
            <div className="flex gap-2">
              <Input
                placeholder={t('Add an ingredient...', 'أضف مكوناً...')}
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={addIngredient}
                disabled={!currentIngredient.trim()}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Ingredients list */}
            {ingredients.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                  {t('Available Ingredients', 'المكونات المتاحة')} ({ingredients.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="flex items-center gap-1 bg-wasfah-bright-teal/10 text-wasfah-deep-teal"
                    >
                      {ingredient}
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Preferences */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t('Additional Preferences (Optional)', 'تفضيلات إضافية (اختياري)')}
              </label>
              <Textarea
                placeholder={t('e.g., vegetarian, spicy, quick meals, comfort food...', 'مثل: نباتي، حار، وجبات سريعة، طعام مريح...')}
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={3}
              />
            </div>

            {/* Search button */}
            <Button 
              onClick={findRecipes}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-deep-teal"
              disabled={isSearching || ingredients.length === 0}
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('AI is creating recipes...', 'الذكاء الاصطناعي ينشئ الوصفات...')}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t('Find Recipes with AI', 'ابحث عن الوصفات بالذكاء الاصطناعي')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {discoveredRecipes.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-wasfah-deep-teal">
              {t('AI-Generated Recipes', 'الوصفات المُنشأة بالذكاء الاصطناعي')}
            </h3>
            <div className="grid gap-4">
              {discoveredRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
                  <div className="flex">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-24 h-24 object-cover"
                    />
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-lg text-wasfah-deep-teal">
                          {recipe.title}
                        </h4>
                        <Badge variant="outline" className="ml-2">
                          {recipe.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{recipe.time} {t('min', 'دقيقة')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{recipe.servings} {t('servings', 'حصص')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-wasfah-bright-teal" />
                          <span className="text-wasfah-bright-teal font-medium">AI Generated</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default AIFindByIngredientsPage;
