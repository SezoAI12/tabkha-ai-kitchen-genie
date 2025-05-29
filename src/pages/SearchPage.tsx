
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockRecipes, categories } from '@/data/mockData';
import { Recipe, IngredientItem } from '@/types/index';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');

  const handleAddIngredient = () => {
    if (ingredientInput && !selectedIngredients.includes(ingredientInput)) {
      setSelectedIngredients([...selectedIngredients, ingredientInput]);
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesIngredients = selectedIngredients.length === 0 || 
      recipe.ingredients.some(ingredient => {
        const ingredientName = typeof ingredient === 'string' 
          ? ingredient 
          : (ingredient as IngredientItem).name;
        
        return selectedIngredients.some(selected => 
          ingredientName.toLowerCase().includes(selected.toLowerCase())
        );
      });
    
    return matchesSearch && matchesCategory && matchesIngredients;
  });

  return (
    <PageContainer header={{ title: 'Search Recipes' }}>
      <div className="space-y-4 p-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search by recipe name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Add ingredient"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
          />
          <Button onClick={handleAddIngredient}>Add</Button>
        </div>

        <div className="flex space-x-2">
          {selectedIngredients.map(ingredient => (
            <Button key={ingredient} variant="secondary" onClick={() => handleRemoveIngredient(ingredient)}>
              {ingredient}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map(recipe => (
            <Card key={recipe.id}>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                <p className="text-sm text-gray-500">{recipe.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};
