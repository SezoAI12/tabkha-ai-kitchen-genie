
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Recipe } from '@/types/index';
import { mockRecipes, categories } from '@/data/mockData';
import { Search, Filter, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('query') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);

  useEffect(() => {
    const results = mockRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <PageContainer
      header={{
        customContent: (
          <div className="flex items-center w-full">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search for recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button variant="ghost" size="icon" className="ml-2">
              <Filter size={20} />
            </Button>
          </div>
        ),
      }}
    >
      <div className="container px-4 py-6">
        {searchTerm ? (
          searchResults.length > 0 ? (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-wasfah-deep-teal">
                  Search Results for "{searchTerm}" ({searchResults.length} recipes found)
                </h2>
              </div>
              <RecipeGrid recipes={searchResults} columns={3} />
            </>
          ) : (
            <div className="text-center py-8">
              <Search size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No recipes found matching "{searchTerm}".</p>
            </div>
          )
        ) : (
          <div className="text-center py-8">
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Enter a search term to find recipes.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
