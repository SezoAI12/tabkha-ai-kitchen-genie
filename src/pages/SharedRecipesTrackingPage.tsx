
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Recipe } from '@/types/index';
import { 
  Eye, Heart, Share2, ChefHat, BarChart2, Award, TrendingUp, 
  CalendarDays, Filter, Clock, ThumbsUp 
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock shared recipes data with complete Recipe interface
const mockSharedRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    description: 'A healthy and colorful quinoa bowl with Mediterranean flavors',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: 'Easy',
    calories: 420,
    cuisineType: 'Mediterranean',
    instructions: [],
    categories: ['Healthy', 'Vegetarian'],
    tags: ['quinoa', 'mediterranean'],
    rating: 4.5,
    ratingCount: 89,
    isFavorite: false,
    ingredients: [
      { id: '1', name: 'Quinoa', amount: '1', unit: 'cup', category: 'grains', inPantry: false },
      { id: '2', name: 'Cucumber', amount: '1', unit: 'piece', category: 'vegetables', inPantry: false }
    ],
    nutritionalInfo: {
      calories: 420,
      protein: 25,
      carbs: 45,
      fat: 15,
      fiber: 5
    }
  },
  {
    id: '2',
    title: 'Spicy Thai Green Curry',
    description: 'Authentic Thai green curry with coconut milk and fresh herbs',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=200&fit=crop',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    calories: 380,
    cuisineType: 'Thai',
    instructions: [],
    categories: ['Spicy', 'Asian'],
    tags: ['curry', 'thai', 'coconut'],
    rating: 4.3,
    ratingCount: 67,
    isFavorite: false,
    ingredients: [
      { id: '1', name: 'Green curry paste', amount: '2', unit: 'tbsp', category: 'condiments', inPantry: false },
      { id: '2', name: 'Coconut milk', amount: '400', unit: 'ml', category: 'dairy', inPantry: false }
    ],
    nutritionalInfo: {
      calories: 380,
      protein: 20,
      carbs: 30,
      fat: 25,
      fiber: 3
    }
  },
  {
    id: '3',
    title: 'Classic Italian Risotto',
    description: 'Creamy Arborio rice cooked to perfection with Italian herbs',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=200&fit=crop',
    prepTime: 10,
    cookTime: 35,
    servings: 6,
    difficulty: 'Hard',
    calories: 450,
    cuisineType: 'Italian',
    instructions: [],
    categories: ['Comfort Food', 'Italian'],
    tags: ['risotto', 'italian', 'rice'],
    rating: 4.7,
    ratingCount: 123,
    isFavorite: false,
    ingredients: [
      { id: '1', name: 'Arborio rice', amount: '300', unit: 'g', category: 'grains', inPantry: false },
      { id: '2', name: 'Parmesan cheese', amount: '100', unit: 'g', category: 'dairy', inPantry: false }
    ],
    nutritionalInfo: {
      calories: 450,
      protein: 15,
      carbs: 60,
      fat: 18,
      fiber: 2
    }
  }
];

// Mock statistics for shared recipes
const mockStatistics = [
  { id: 1, recipe: 'Homemade Pasta', views: 124, likes: 32, shares: 8, used: 15 },
  { id: 2, recipe: 'Spicy Chicken Curry', views: 86, likes: 18, shares: 5, used: 9 },
  { id: 3, recipe: 'Chocolate Lava Cake', views: 211, likes: 45, shares: 22, used: 18 }
];

// Time periods for filtering
const timePeriods = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'All time'];

const SharedRecipesTrackingPage = () => {
  const [selectedTab, setSelectedTab] = useState('recipes');
  const [timePeriod, setTimePeriod] = useState('Last 30 days');
  const [sortBy, setSortBy] = useState('popularity');

  return (
    <PageContainer header={{ title: 'Shared Recipes', showBackButton: true }}>
      <div className="space-y-6 pb-24">
        <Card className="bg-gradient-to-r from-wasfah-deep-teal to-wasfah-bright-teal text-white overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <ChefHat size={120} />
          </div>
          <CardContent className="p-6">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">My Shared Recipes</h2>
              <p className="text-sm opacity-90 max-w-md">
                Track how your recipes are performing and see what's popular with the Wasfah community
              </p>
              <div className="flex mt-3">
                <div className="mr-4">
                  <p className="text-xs opacity-80">Total Views</p>
                  <p className="text-xl font-bold">{mockStatistics.reduce((sum, item) => sum + item.views, 0)}</p>
                </div>
                <div className="mr-4">
                  <p className="text-xs opacity-80">Total Likes</p>
                  <p className="text-xl font-bold">{mockStatistics.reduce((sum, item) => sum + item.likes, 0)}</p>
                </div>
                <div>
                  <p className="text-xs opacity-80">Recipe Uses</p>
                  <p className="text-xl font-bold">{mockStatistics.reduce((sum, item) => sum + item.used, 0)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="recipes" className="py-3">
              <ChefHat className="h-4 w-4 mr-2" />
              My Recipes
            </TabsTrigger>
            <TabsTrigger value="analytics" className="py-3">
              <BarChart2 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recipes" className="mt-4 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-wasfah-deep-teal">My Shared Recipes</h3>
              
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-500" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] h-8 text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="likes">Most Liked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mb-4">
              <RecipeGrid recipes={mockSharedRecipes} columns={1} cardSize="large" />
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button className="flex-1 bg-wasfah-bright-teal hover:bg-wasfah-teal">
                <Share2 className="mr-2 h-4 w-4" />
                Share New Recipe
              </Button>
              <Button variant="outline" className="flex-1 border-wasfah-bright-teal text-wasfah-bright-teal">
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-wasfah-deep-teal">Performance Analytics</h3>
              
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-[140px] h-8 text-sm">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  {timePeriods.map((period) => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="text-center">
                    <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-blue-100 mb-3">
                      <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-wasfah-deep-teal">
                      {mockStatistics.reduce((sum, item) => sum + item.views, 0)}
                    </h3>
                    <p className="text-sm text-gray-500">Total Views</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="text-center">
                    <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-red-100 mb-3">
                      <Heart className="h-6 w-6 text-red-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-wasfah-deep-teal">
                      {mockStatistics.reduce((sum, item) => sum + item.likes, 0)}
                    </h3>
                    <p className="text-sm text-gray-500">Total Likes</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="text-center">
                    <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-purple-100 mb-3">
                      <Share2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-wasfah-deep-teal">
                      {mockStatistics.reduce((sum, item) => sum + item.shares, 0)}
                    </h3>
                    <p className="text-sm text-gray-500">Total Shares</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="text-center">
                    <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-green-100 mb-3">
                      <ChefHat className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-wasfah-deep-teal">
                      {mockStatistics.reduce((sum, item) => sum + item.used, 0)}
                    </h3>
                    <p className="text-sm text-gray-500">Recipe Uses</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-wasfah-deep-teal flex items-center">
                  <Award className="h-5 w-5 mr-2 text-amber-500" />
                  Top Performing Recipes
                </CardTitle>
                <CardDescription>
                  See which of your recipes are most popular in the {timePeriod.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStatistics.map((stat) => (
                    <Card key={stat.id} className="border-wasfah-bright-teal/20 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-md mr-3 flex items-center justify-center text-wasfah-deep-teal font-bold">
                              {stat.id}
                            </div>
                            <div>
                              <h3 className="font-medium">{stat.recipe}</h3>
                              <div className="flex items-center text-xs text-gray-500">
                                <CalendarDays className="h-3 w-3 mr-1" />
                                <span>Added 2 weeks ago</span>
                                <Clock className="h-3 w-3 ml-2 mr-1" />
                                <span>25 min</span>
                              </div>
                            </div>
                          </div>
                          
                          {stat.id === 1 && (
                            <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              Top Recipe
                            </div>
                          )}
                          {stat.id === 3 && (
                            <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </div>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div className="bg-gray-50 p-2 rounded-md">
                            <div className="flex justify-center mb-1">
                              <Eye className="h-4 w-4 text-blue-500" />
                            </div>
                            <p className="font-medium">{stat.views}</p>
                            <p className="text-xs text-gray-500">Views</p>
                          </div>
                          
                          <div className="bg-gray-50 p-2 rounded-md">
                            <div className="flex justify-center mb-1">
                              <Heart className="h-4 w-4 text-red-500" />
                            </div>
                            <p className="font-medium">{stat.likes}</p>
                            <p className="text-xs text-gray-500">Likes</p>
                          </div>
                          
                          <div className="bg-gray-50 p-2 rounded-md">
                            <div className="flex justify-center mb-1">
                              <Share2 className="h-4 w-4 text-purple-500" />
                            </div>
                            <p className="font-medium">{stat.shares}</p>
                            <p className="text-xs text-gray-500">Shares</p>
                          </div>
                          
                          <div className="bg-gray-50 p-2 rounded-md">
                            <div className="flex justify-center mb-1">
                              <ChefHat className="h-4 w-4 text-green-500" />
                            </div>
                            <p className="font-medium">{stat.used}</p>
                            <p className="text-xs text-gray-500">Uses</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-3">
                          <Button variant="ghost" size="sm" className="text-wasfah-bright-teal">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Promote
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
              <BarChart2 className="mr-2 h-4 w-4" />
              Get Detailed Analytics Report
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default SharedRecipesTrackingPage;
