
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, X, ChefHat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';
import { supabase } from '@/integrations/supabase/client';

interface IngredientImage {
  id: string;
  name: string;
  image_url: string;
  category: string;
}

interface SelectedIngredient {
  id: string;
  name: string;
}

export default function FindByIngredientsPage() {
  const { toast } = useToast();
  const { t } = useRTL();
  const [availableIngredients, setAvailableIngredients] = useState<IngredientImage[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const { data, error } = await supabase
        .from('ingredient_images')
        .select('*')
        .order('name');

      if (error) throw error;
      setAvailableIngredients(data || []);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      toast({
        title: "Error",
        description: "Failed to load ingredients",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = (ingredient: IngredientImage) => {
    if (!selectedIngredients.find(item => item.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, {
        id: ingredient.id,
        name: ingredient.name
      }]);
    }
  };

  const removeIngredient = (id: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item.id !== id));
  };

  const findRecipes = () => {
    toast({
      title: t("Searching Recipes", "البحث عن الوصفات"),
      description: t(
        `Found recipes using ${selectedIngredients.length} ingredients`, 
        `تم العثور على وصفات باستخدام ${selectedIngredients.length} مكونات`
      ),
    });
  };

  const filteredIngredients = availableIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedIngredients.find(selected => selected.id === ingredient.id)
  );

  const groupedIngredients = filteredIngredients.reduce((acc, ingredient) => {
    const category = ingredient.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ingredient);
    return acc;
  }, {} as Record<string, IngredientImage[]>);

  if (loading) {
    return (
      <PageContainer header={{ title: t('Find by Ingredients', 'البحث بالمكونات'), showBackButton: true }}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wasfah-bright-teal mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading ingredients...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer header={{ title: t('Find by Ingredients', 'البحث بالمكونات'), showBackButton: true }}>
      <div className="space-y-6 pb-6">
        <Card className="bg-gradient-to-r from-wasfah-light-mint to-wasfah-light-gray/30">
          <CardContent className="p-6 text-center">
            <ChefHat className="h-12 w-12 mx-auto mb-4 text-wasfah-bright-teal" />
            <h2 className="text-xl font-bold mb-2 text-wasfah-deep-teal">
              {t('Find by Ingredients', 'البحث بالمكونات')}
            </h2>
            <p className="text-gray-600">
              {t('Select ingredients to find recipes', 'اختر المكونات للعثور على الوصفات')}
            </p>
          </CardContent>
        </Card>

        {selectedIngredients.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-wasfah-deep-teal">
                {t('Selected Ingredients', 'المكونات المختارة')} ({selectedIngredients.length})
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedIngredients.map((ingredient) => (
                  <Badge
                    key={ingredient.id}
                    variant="secondary"
                    className="bg-wasfah-bright-teal text-white hover:bg-wasfah-teal cursor-pointer"
                    onClick={() => removeIngredient(ingredient.id)}
                  >
                    {ingredient.name}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
              <Button
                onClick={findRecipes}
                className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                disabled={selectedIngredients.length === 0}
              >
                <Search className="h-4 w-4 mr-2" />
                {t('Find Recipes', 'البحث عن الوصفات')}
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('Search ingredients...', 'البحث عن المكونات...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-wasfah-deep-teal">
            {t('Available Ingredients', 'المكونات المتاحة')}
          </h3>
          
          {Object.entries(groupedIngredients).map(([category, ingredients]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-700 mb-2 capitalize">{category}</h4>
              <div className="grid grid-cols-2 gap-3">
                {ingredients.map((ingredient) => (
                  <Card
                    key={ingredient.id}
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addIngredient(ingredient)}
                  >
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={ingredient.image_url}
                        alt={ingredient.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-2">
                      <p className="font-medium text-sm text-center">{ingredient.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredIngredients.length === 0 && !loading && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">
                {t('No ingredients found', 'لم يتم العثور على مكونات')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
