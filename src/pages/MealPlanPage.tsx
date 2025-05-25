import React, { useState } from 'react';
import { Search, Activity, Heart, Globe, Calendar, ShoppingCart, Users, Camera, ArrowRight, Sparkles, Share2, Layout, Grid, List } from 'lucide-react';

// Sample shared recipes data
const sharedRecipes = [
  { id: 1, name: 'Spaghetti Carbonara', sharedBy: 'Chef Mario', likes: 45, imaged: 2, name: 'Chicken Tikka Masala', sharedBy: 'Chef Priya', likes: 32, image: '{ id: 3, name: 'Vegetable Stir Fry', sharedBy: 'Chef Li', likes: 28, image: '4, name: 'Chocolate Lava Cake', sharedBy: 'Chef Anna', likes: 56

const mainFeatures = [
  {
    icon: <Search className="h-6 w-6 text-white" />,
    label: "Find by Ingredients",
    path: "/find-by-ingredients",
    color: "bg-teal-500",
    description: "Search recipes using ingredients you have"
  },
  {
    icon: <Globe className="h-6 w-6 text-white" />,
    label: "Global Cuisine",
    path: "/global-cuisine",
    color: "bg-teal-600",
    description: "Explore recipes from around the world"
  },
  {
    icon: <Calendar className="h-6 w-6 text-white" />,
    label: "Meal Plan",
    path: "/meal-plan",
    color: "bg-green-500",
    description: "Plan your weekly meals"
  },
  {
    icon: <Activity className="h-6 w-6 text-white" />,
    label: "Health Tracking",
    path: "/health-tracking-home",
    color: "bg-red-500",
    description: "Track your nutrition and health goals"
  },
  {
    icon: <ShoppingCart className="h-6 w-6 text-white" />,
    label: "Pantry",
    path: "/pantry",
    color: "bg-purple-500",
    description: "Manage your ingredients and pantry"
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    label: "Community",
    path: "/community",
    color: "bg-blue-500",
    description: "Connect with other food enthusiasts"
  },
  {
    icon: <Heart className="h-6 w-6 text-white" />,
    label: "Favorites",
    path: "/favorites",
    color: "bg-pink-500",
    description: "Your saved favorite recipes"
  },
];

const SharedRecipeCard = ({ recipe, layout }) => (
  <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${layout === 'list' ? 'flex items-center space-x-4' : ''}`}>
    <div className={`text-4xl ${layout === 'list' ? 'flex-shrink-0' : 'text-center mb-2'}`}>
      {recipe.image}
    </div>
    <div className={layout === 'list' ? 'flex-1' : ''}>
      <h3 className="font-bold text-lg text-gray-800 dark:text-white">{recipe.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Shared by: {recipe.sharedBy}</p>
      <div className="flex items-center mt-2">
        <Heart className="h-4 w-4 text-red-500 mr-1" />
        <span className="text-sm text-gray-600 dark:text-gray-300">{recipe.likes} Likes</span>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const [layoutOption, setLayoutOption] = useState('option1'); // 'option1' or 'option2'
  const [recipesLayout, setRecipesLayout] = useState('grid');

  // Option 1: Compact Grid Layout (Original)
  const Option1Layout = () => (
    <div className="space-y-6 pb-24">
      {/* AI Scan Card */}
      <div className="relative overflow-hidden border-2 border-teal-300 dark:border-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 opacity-50"></div>
        <div className="p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <Sparkles className="h-5 w-5 text-teal-600 mr-2" />
                <span className="text-sm font-medium text-teal-600">NEW AI FEATURE</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Scan Any Dish</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Instantly get nutrition info and ingredients from any food photo.</p>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                <Camera className="mr-2 h-4 w-4" />
                Scan Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="hidden md:block ml-4">
              <div className="w-20 h-20 bg-teal-200 dark:bg-teal-700 border-2 border-teal-400 rounded-full flex items-center justify-center">
                <Camera className="h-10 w-10 text-teal-600 dark:text-teal-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access - Compact Grid */}
      <div>
        <h2 className="font-bold text-lg text-teal-700 dark:text-teal-300 mb-4">Quick Access</h2>
        <div className="grid grid-cols-4 gap-4">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex flex-col items-center">
                <div className={`${feature.color} rounded-full w-16 h-16 mb-2 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110`}>
                  {feature.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{feature.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Recipes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-teal-700 dark:text-teal-300 flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-teal-500" />
            Shared Recipes
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setRecipesLayout('grid')}
              className={`p-2 rounded ${recipesLayout === 'grid' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setRecipesLayout('list')}
              className={`p-2 rounded ${recipesLayout === 'list' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className={recipesLayout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
          {sharedRecipes.map((recipe) => (
            <SharedRecipeCard key={recipe.id} recipe={recipe} layout={recipesLayout} />
          ))}
        </div>
      </div>
    </div>
  );

  // Option 2: Card-Based Layout with Descriptions
  const Option2Layout = () => (
    <div className="space-y-6 pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-8 rounded-xl shadow-xl">
        <div className="text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl font-bold mb-2">Welcome to Wasfah</h1>
          <p className="text-lg opacity-90 mb-6">Your AI-powered cooking companion</p>
          <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center mx-auto">
            <Camera className="mr-2 h-5 w-5" />
            Start Scanning
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Features - Card Layout */}
      <div>
        <h2 className="font-bold text-2xl text-teal-700 dark:text-teal-300 mb-6">Discover Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`${feature.color} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                {React.cloneElement(feature.icon, { className: "h-6 w-6 text-white" })}
              </div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">{feature.label}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Highlights */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
        <h2 className="font-bold text-xl text-teal-700 dark:text-teal-300 mb-4 flex items-center">
          <Users className="h-6 w-6 mr-2 text-teal-500" />
          Community Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sharedRecipes.slice(0, 4).map((recipe) => (
            <div key={recipe.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{recipe.image}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{recipe.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">by {recipe.sharedBy}</p>
                  <div className="flex items-center mt-1">
                    <Heart className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{recipe.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-teal-600">Wasfah</h1>
            <div className="hidden md:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setLayoutOption('option1')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  layoutOption === 'option1' 
                    ? 'bg-teal-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-teal-600'
                }`}
              >
                Compact Layout
              </button>
              <button
                onClick={() => setLayoutOption('option2')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  layoutOption === 'option2' 
                    ? 'bg-teal-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-teal-600'
                }`}
              >
                Card Layout
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipes..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout Selector */}
      <div className="md:hidden bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700">
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setLayoutOption('option1')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              layoutOption === 'option1' 
                ? 'bg-teal-500 text-white' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Compact
          </button>
          <button
            onClick={() => setLayoutOption('option2')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              layoutOption === 'option2' 
                ? 'bg-teal-500 text-white' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {layoutOption === 'option1' ? <Option1Layout /> : <Option2Layout />}
      </div>
    </div>
  );
};

export default HomePage;
