
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Plus, 
  X, 
  Clock, 
  Users, 
  ChefHat, 
  Sparkles, 
  Loader2,
  Globe,
  Utensils
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAIChef } from '@/hooks/useAIChef';
import { useRTL } from '@/contexts/RTLContext';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface Ingredient {
  id: string;
  name: string;
  category: string;
}

const mockIngredients: Ingredient[] = [
  { id: '1', name: 'Chicken Breast', category: 'Protein' },
  { id: '2', name: 'Rice', category: 'Grains' },
  { id: '3', name: 'Tomatoes', category: 'Vegetables' },
  { id: '4', name: 'Onions', category: 'Vegetables' },
  { id: '5', name: 'Garlic', category: 'Aromatics' },
  { id: '6', name: 'Olive Oil', category: 'Fats' },
  { id: '7', name: 'Spinach', category: 'Vegetables' },
  { id: '8', name: 'Salmon', category: 'Protein' },
  { id: '9', name: 'Pasta', category: 'Grains' },
  { id: '10', name: 'Bell Peppers', category: 'Vegetables' },
];

const fallbackRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Chicken Stir Fry',
    description: 'Quick and healthy chicken stir fry with vegetables',
    ingredients: ['Chicken Breast', 'Bell Peppers', 'Onions', 'Garlic', 'Olive Oil'],
    instructions: [
      'Cut chicken into strips',
      'Heat oil in wok',
      'Stir fry chicken until cooked',
      'Add vegetables and cook for 3-4 minutes',
      'Season and serve'
    ],
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Asian',
    nutrition: { calories: 320, protein: 28, carbs: 12, fat: 18 }
  },
  {
    id: '2',
    title: 'Salmon with Spinach',
    description: 'Pan-seared salmon with sautéed spinach',
    ingredients: ['Salmon', 'Spinach', 'Garlic', 'Olive Oil'],
    instructions: [
      'Season salmon fillets',
      'Heat oil in pan',
      'Cook salmon 4 minutes per side',
      'Sauté spinach with garlic',
      'Serve together'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: 'Medium',
    cuisine: 'Mediterranean',
    nutrition: { calories: 380, protein: 35, carbs: 8, fat: 24 }
  }
];

export const AIRecipeDiscovery: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([]);
  const [discoveredRecipes, setDiscoveredRecipes] = useState<Recipe[]>([]);
  const [difficulty, setDifficulty] = useState<string>('all');
  const [maxTime, setMaxTime] = useState<string>('all');
  const [cuisine, setCuisine] = useState<string>('all');
  const [isDiscovering, setIsDiscovering] = useState(false);
  
  const { askAIChef } = useAIChef();
  const { toast } = useToast();
  const { t } = useRTL();

  useEffect(() => {
    if (searchQuery) {
      const filtered = mockIngredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredIngredients(filtered);
    } else {
      setFilteredIngredients([]);
    }
  }, [searchQuery]);

  const addIngredient = (ingredient: Ingredient) => {
    if (!selectedIngredients.find(item => item.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setSearchQuery('');
    }
  };

  const removeIngredient = (ingredientId: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item.id !== ingredientId));
  };

  const discoverRecipes = async () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: t("Please select at least one ingredient", "يرجى اختيار مكون واحد على الأقل"),
        variant: "destructive"
      });
      return;
    }

    setIsDiscovering(true);

    try {
      const ingredientList = selectedIngredients.map(ing => ing.name).join(', ');
      const filters = [];
      if (difficulty !== 'all') filters.push(`difficulty: ${difficulty}`);
      if (maxTime !== 'all') filters.push(`max cooking time: ${maxTime} minutes`);
      if (cuisine !== 'all') filters.push(`cuisine: ${cuisine}`);
      
      const filterText = filters.length > 0 ? ` with filters: ${filters.join(', ')}` : '';
      
      const query = `Create 3 detailed recipes using these ingredients: ${ingredientList}${filterText}. 
      For each recipe, provide: title, description, complete ingredients list, step-by-step instructions, 
      prep time, cook time, servings, difficulty level, cuisine type, and estimated nutrition (calories, protein, carbs, fat).
      Format as JSON array.`;

      const response = await askAIChef(query);
      
      // Try to parse AI response, fallback to predefined recipes
      let recipes: Recipe[] = [];
      try {
        const aiRecipes = JSON.parse(response.response);
        if (Array.isArray(aiRecipes)) {
          recipes = aiRecipes.map((recipe: any, index: number) => ({
            id: `ai-${index}`,
            title: recipe.title || `Recipe ${index + 1}`,
            description: recipe.description || '',
            ingredients: recipe.ingredients || [],
            instructions: recipe.instructions || [],
            prepTime: recipe.prepTime || 15,
            cookTime: recipe.cookTime || 30,
            servings: recipe.servings || 4,
            difficulty: recipe.difficulty || 'Medium',
            cuisine: recipe.cuisine || 'International',
            nutrition: recipe.nutrition || { calories: 300, protein: 20, carbs: 30, fat: 15 }
          }));
        }
      } catch (error) {
        console.log('AI response parsing failed, using fallback recipes');
      }

      // If AI parsing failed or returned empty, use fallback recipes
      if (recipes.length === 0) {
        recipes = fallbackRecipes.filter(recipe => 
          selectedIngredients.some(ingredient => 
            recipe.ingredients.some(recipeIng => 
              recipeIng.toLowerCase().includes(ingredient.name.toLowerCase())
            )
          )
        );
      }

      setDiscoveredRecipes(recipes);
      
      toast({
        title: t("Recipes discovered!", "تم اكتشاف الوصفات!"),
        description: t(`Found ${recipes.length} recipes`, `تم العثور على ${recipes.length} وصفة`)
      });
    } catch (error) {
      console.error('Recipe discovery error:', error);
      // Use fallback recipes on error
      const recipes = fallbackRecipes.filter(recipe => 
        selectedIngredients.some(ingredient => 
          recipe.ingredients.some(recipeIng => 
            recipeIng.toLowerCase().includes(ingredient.name.toLowerCase())
          )
        )
      );
      setDiscoveredRecipes(recipes);
    } finally {
      setIsDiscovering(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-wasfah-bright-teal" />
            {t("AI Recipe Discovery", "اكتشاف الوصفات بالذكاء الاصطناعي")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ingredient Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("Select Ingredients", "اختر المكونات")}</h3>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("Search ingredients...", "البحث عن المكونات...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              
              {filteredIngredients.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {filteredIngredients.map((ingredient) => (
                    <button
                      key={ingredient.id}
                      onClick={() => addIngredient(ingredient)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span>{ingredient.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {ingredient.category}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Ingredients */}
            {selectedIngredients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map((ingredient) => (
                  <Badge key={ingredient.id} variant="default" className="flex items-center gap-1">
                    {ingredient.name}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeIngredient(ingredient.id)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Difficulty", "الصعوبة")}</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Levels", "جميع المستويات")}</SelectItem>
                  <SelectItem value="Easy">{t("Easy", "سهل")}</SelectItem>
                  <SelectItem value="Medium">{t("Medium", "متوسط")}</SelectItem>
                  <SelectItem value="Hard">{t("Hard", "صعب")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Max Time", "الحد الأقصى للوقت")}</label>
              <Select value={maxTime} onValueChange={setMaxTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("Any Time", "أي وقت")}</SelectItem>
                  <SelectItem value="15">{t("15 minutes", "15 دقيقة")}</SelectItem>
                  <SelectItem value="30">{t("30 minutes", "30 دقيقة")}</SelectItem>
                  <SelectItem value="60">{t("1 hour", "ساعة واحدة")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Cuisine", "المطبخ")}</label>
              <Select value={cuisine} onValueChange={setCuisine}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Cuisines", "جميع المطابخ")}</SelectItem>
                  <SelectItem value="Mediterranean">{t("Mediterranean", "متوسطي")}</SelectItem>
                  <SelectItem value="Asian">{t("Asian", "آسيوي")}</SelectItem>
                  <SelectItem value="Middle Eastern">{t("Middle Eastern", "شرق أوسطي")}</SelectItem>
                  <SelectItem value="Italian">{t("Italian", "إيطالي")}</SelectItem>
                  <SelectItem value="American">{t("American", "أمريكي")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Discover Button */}
          <Button 
            onClick={discoverRecipes} 
            disabled={isDiscovering || selectedIngredients.length === 0}
            className="w-full bg-wasfah-bright-teal hover:bg-wasfah-deep-teal"
          >
            {isDiscovering ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("Discovering...", "جاري الاكتشاف...")}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {t("Discover Recipes", "اكتشف الوصفات")}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Discovered Recipes */}
      {discoveredRecipes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">{t("Discovered Recipes", "الوصفات المكتشفة")}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {discoveredRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{recipe.title}</CardTitle>
                      <p className="text-sm text-gray-600">{recipe.description}</p>
                    </div>
                    <Badge className={getDifficultyColor(recipe.difficulty)}>
                      {t(recipe.difficulty, recipe.difficulty === 'Easy' ? 'سهل' : recipe.difficulty === 'Medium' ? 'متوسط' : 'صعب')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Recipe Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.prepTime + recipe.cookTime} {t("min", "دقيقة")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{recipe.servings} {t("servings", "حصص")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <span>{recipe.cuisine}</span>
                    </div>
                  </div>

                  {/* Nutrition */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">{t("Nutrition (per serving)", "القيم الغذائية (لكل حصة)")}</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span>{t("Calories", "السعرات")}: {recipe.nutrition.calories}</span>
                      <span>{t("Protein", "البروتين")}: {recipe.nutrition.protein}g</span>
                      <span>{t("Carbs", "الكربوهيدرات")}: {recipe.nutrition.carbs}g</span>
                      <span>{t("Fat", "الدهون")}: {recipe.nutrition.fat}g</span>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">{t("Ingredients", "المكونات")}</h4>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{recipe.ingredients.length - 3} {t("more", "المزيد")}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <ChefHat className="mr-2 h-4 w-4" />
                    {t("View Full Recipe", "عرض الوصفة كاملة")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
