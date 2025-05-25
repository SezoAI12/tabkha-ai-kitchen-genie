
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { CategoryFilters } from '@/components/recipe/CategoryFilters';
import { Recipe } from '@/types';

interface RecommendedRecipesProps {
  recipes: Recipe[];
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const RecommendedRecipes: React.FC<RecommendedRecipesProps> = ({
  recipes,
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-wasfah-deep-teal">Recommended for you</h2>
        <Link to="/recipes">
          <Button variant="link" className="text-wasfah-bright-teal p-0">
            View All
          </Button>
        </Link>
      </div>
      
      <CategoryFilters
        categories={['All', ...categories]}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      
      <div className="mt-4 transition-all duration-500 ease-in-out">
        <RecipeGrid recipes={recipes} columns={2} cardSize="medium" />
      </div>
    </div>
  );
};
