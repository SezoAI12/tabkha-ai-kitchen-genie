
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

// Import the DrinkOptions type
import { DrinkOptions } from '@/components/drinks/DrinkCustomizationForm';

interface SearchSummaryProps {
  selectedCategory: { name: string } | null;
  selectedSubcategory: string | null;
  ingredientCount: number;
  filterCount: number;
  customDrinkOptions?: DrinkOptions | null; // Add the optional customDrinkOptions prop
  onSearch: () => void;
}

export const SearchSummary: React.FC<SearchSummaryProps> = ({
  selectedCategory,
  selectedSubcategory,
  ingredientCount,
  filterCount,
  customDrinkOptions,
  onSearch
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-center mb-6 text-wasfah-deep-teal">Ready to Search</h2>
      
      {/* Search Summary */}
      <Card className="mb-6 bg-wasfah-mint/10 border-wasfah-mint/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-wasfah-deep-teal">Search Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-wasfah-teal">Category:</span>
            <span className="font-medium">{selectedCategory?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-wasfah-teal">Type:</span>
            <span className="font-medium">{selectedSubcategory}</span>
          </div>
          
          {/* Conditional rendering based on whether it's a custom drink search */}
          {customDrinkOptions ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-wasfah-teal">Base:</span>
                <span className="font-medium">{customDrinkOptions.base}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-wasfah-teal">Glass:</span>
                <span className="font-medium">{customDrinkOptions.glassType}</span>
              </div>
              {customDrinkOptions.themes.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-wasfah-teal">Themes:</span>
                  <span className="font-medium">{customDrinkOptions.themes.join(', ')}</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-between text-sm">
              <span className="text-wasfah-teal">Ingredients:</span>
              <span className="font-medium">{ingredientCount} items</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-wasfah-teal">Filters:</span>
            <span className="font-medium">{filterCount} applied</span>
          </div>
        </CardContent>
      </Card>

      {/* Search Button */}
      <Button
        onClick={onSearch}
        className="w-full h-14 bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg font-semibold text-white"
      >
        <Search className="mr-3 h-6 w-6" />
        {customDrinkOptions ? 'Generate My Drink' : 'Find My Recipes'}
      </Button>

      {/* Results Placeholder */}
      <Card className="mt-6 border-2 border-dashed border-gray-200">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600">
            {customDrinkOptions ? 'Custom drink will be generated here' : 'Recipe results will appear here after searching'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
