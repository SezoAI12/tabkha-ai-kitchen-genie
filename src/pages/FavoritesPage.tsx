import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { CategoryFilters } from '@/components/recipe/CategoryFilters';
import { mockRecipes, categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Heart, Filter, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recipe } from '@/types';

export default function FavoritesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes.filter(recipe => recipe.isFavorite));

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredRecipes(mockRecipes.filter(recipe => recipe.isFavorite));
    } else {
      setFilteredRecipes(mockRecipes.filter(recipe => recipe.isFavorite && recipe.tags.includes(selectedCategory)));
    }
  }, [selectedCategory]);

  return (
    <PageContainer
      header={{
        title: 'My Favorites',
        showSearch: true,
        actions: (
          <Button variant="ghost" size="icon">
            <SlidersHorizontal size={20} />
          </Button>
        ),
      }}
    >
      <div className="container px-4 py-4">
        <CategoryFilters
          categories={['All', ...categories]}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            {filteredRecipes.length > 0 ? (
              <RecipeGrid recipes={filteredRecipes} columns={2} />
            ) : (
              <div className="text-center py-10">
                <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No favorite recipes yet.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="categories" className="mt-4">
            <p>Categories content</p>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
