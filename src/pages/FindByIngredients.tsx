import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { IngredientImage } from '@/types/recipe';

const FindByIngredients = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState<IngredientImage[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Mock ingredient images data with proper typing
    const mockIngredientImages: IngredientImage[] = [
      {
        id: '1',
        ingredient_name: 'Tomato',
        name: 'Tomato',
        image_url: 'https://images.unsplash.com/photo-1546470427-e-576x300?crop=1',
        alt_text: 'Fresh tomato',
        category: 'vegetables',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        ingredient_name: 'Chicken',
        name: 'Chicken',
        image_url: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=300&h=200&fit=crop',
        alt_text: 'Fresh chicken',
        category: 'meat',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    setAvailableIngredients(mockIngredientImages);
  }, []);

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const findRecipes = () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please select at least one ingredient to find recipes.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Finding recipes...",
      description: `Searching for recipes with ${selectedIngredients.join(', ')}`
    });
  };

  const filteredIngredients = availableIngredients.filter(ingredient =>
    ingredient.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Recipes by Ingredients
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredIngredients.map((ingredient) => (
              <Card 
                key={ingredient.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addIngredient(ingredient.ingredient_name)}
              >
                <CardContent className="p-4 text-center">
                  <img
                    src={ingredient.image_url}
                    alt={ingredient.alt_text}
                    className="w-full h-20 object-cover rounded-md mb-2"
                  />
                  <p className="text-sm font-medium">{ingredient.ingredient_name}</p>
                  <Button size="sm" className="mt-2 w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedIngredients.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Selected Ingredients:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map((ingredient) => (
                  <Badge key={ingredient} variant="secondary" className="flex items-center gap-1">
                    {ingredient}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeIngredient(ingredient)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button onClick={findRecipes} className="w-full" size="lg">
            Find Recipes ({selectedIngredients.length} ingredients)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FindByIngredients;
