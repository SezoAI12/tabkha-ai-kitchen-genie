
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { 
  Mic, 
  Upload, 
  Heart, 
  History, 
  Globe, 
  Plus,
  Share2,
  ChefHat
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Link } from 'react-router-dom';

const NewHomePage = () => {
  // States for the form and filters
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState('Foods');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [pantryItems, setPantryItems] = useState([
    'Tomatoes', 'Onions', 'Chicken', 'Rice', 'Garlic'
  ]);

  // Main categories and their subcategories
  const categories = {
    'Foods': ['Main Dishes', 'Appetizers', 'Pickles', 'Soups', 'Sauces', 'Others'],
    'Desserts': ['Traditional', 'Western', 'Pastries', 'Ice Cream', 'Others'],
    'Drinks': ['Detox', 'Cocktails', 'Alcoholic', 'Hot Drinks', 'Others']
  };

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setPantryItems([...pantryItems, ingredient]);
      setIngredient('');
    }
  };

  return (
    <PageContainer 
      header={{
        showLogo: true,
        showSearch: true,
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Ingredient Section */}
        <Card className="p-4 card-3d">
          <h2 className="font-bold text-lg text-wasfah-deep-teal mb-3">Add Ingredients</h2>
          
          <Tabs defaultValue="manual">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="smart">Smart Pantry</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input 
                      placeholder="Enter ingredient" 
                      value={ingredient}
                      onChange={(e) => setIngredient(e.target.value)}
                    />
                  </div>
                  <Select value={quantity} onValueChange={setQuantity}>
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Qty" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {[0.25, 0.5, 0.75, 1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {['g', 'kg', 'ml', 'L', 'tsp', 'tbsp', 'cup', 'oz', 'lb', 'piece'].map(u => (
                        <SelectItem key={u} value={u}>{u}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-wasfah-bright-teal"
                  >
                    <Mic size={20} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-wasfah-bright-teal"
                  >
                    <Upload size={20} />
                  </Button>
                </div>
                <Button 
                  onClick={handleAddIngredient} 
                  className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                >
                  <Plus size={16} className="mr-2" /> Add Ingredient
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="smart">
              <div className="space-y-2">
                {pantryItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-2 border rounded-md"
                  >
                    <span>{item}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-wasfah-bright-teal"
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {pantryItems.length > 0 && pantryItems.slice(0, 3).map((item, index) => (
              <div 
                key={index} 
                className="px-3 py-1 bg-wasfah-light-gray rounded-md text-wasfah-deep-teal text-sm flex items-center"
              >
                {item}
              </div>
            ))}
            {pantryItems.length > 3 && (
              <div className="px-3 py-1 bg-wasfah-light-gray rounded-md text-wasfah-deep-teal text-sm">
                +{pantryItems.length - 3} more
              </div>
            )}
          </div>
          
          <Button 
            className="w-full mt-4 bg-wasfah-deep-teal hover:bg-wasfah-deep-teal/90"
          >
            Review & Accept Ingredients
          </Button>
        </Card>
        
        {/* Main Categories (Select) */}
        <div className="space-y-4">
          <h3 className="font-medium text-wasfah-deep-teal">Select Category</h3>
          <Select value={selectedMainCategory} onValueChange={setSelectedMainCategory}>
            <SelectTrigger className="w-full bg-white border shadow-sm">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg">
              {Object.keys(categories).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Subcategories (Select) */}
          <h3 className="font-medium text-wasfah-deep-teal">Select Subcategory</h3>
          <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
            <SelectTrigger className="w-full bg-white border shadow-sm">
              <SelectValue placeholder="Select a subcategory" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg">
              {categories[selectedMainCategory as keyof typeof categories].map((subcategory) => (
                <SelectItem key={subcategory} value={subcategory}>
                  {subcategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Advanced Filters */}
        <Collapsible 
          open={isAdvancedFilterOpen} 
          onOpenChange={setIsAdvancedFilterOpen}
          className="border rounded-lg p-4 card-3d"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-wasfah-deep-teal">Advanced Filters</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isAdvancedFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dietary</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg">
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Gluten Free</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Cooking Time</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg">
                    <SelectItem value="under15">Under 15 mins</SelectItem>
                    <SelectItem value="under30">Under 30 mins</SelectItem>
                    <SelectItem value="under60">Under 60 mins</SelectItem>
                    <SelectItem value="over60">Over 60 mins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg">
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Cuisine</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg">
                    <SelectItem value="levant">Levant</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Bottom CTA */}
        <Button 
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6 card-3d"
        >
          Find Recipe
        </Button>
        
        {/* Create & Share Recipe */}
        <Link to="/create-recipe">
          <Button 
            variant="outline" 
            className="w-full border-wasfah-deep-teal text-wasfah-deep-teal hover:bg-wasfah-deep-teal hover:text-white card-3d"
          >
            <ChefHat size={16} className="mr-2" /> Create & Share Recipe
          </Button>
        </Link>
      </div>
      
      {/* Quick Access Bar (sticky bottom) */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around card-3d">
        <Link to="/favorites">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <Heart size={20} className="text-wasfah-bright-teal" />
            <span className="text-xs mt-1">Favorites</span>
          </Button>
        </Link>
        
        <Link to="/history">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <History size={20} className="text-wasfah-bright-teal" />
            <span className="text-xs mt-1">History</span>
          </Button>
        </Link>
        
        <Link to="/global-cuisine">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <Globe size={20} className="text-wasfah-bright-teal" />
            <span className="text-xs mt-1">Global</span>
          </Button>
        </Link>
        
        <Link to="/share-recipe">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <Share2 size={20} className="text-wasfah-bright-teal" />
            <span className="text-xs mt-1">Share</span>
          </Button>
        </Link>
      </div>
    </PageContainer>
  );
};

export default NewHomePage;
