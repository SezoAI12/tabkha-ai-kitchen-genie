import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Heart, Users, Award, Calendar, Box, PlusCircle, Camera, Share2, Bot, CreditCard } from 'lucide-react';

const cookingPlanningActions = [
  {
    icon: <ChefHat className="h-6 w-6 text-wasfah-bright-teal" />,
    label: "By Ingredients",
    path: "/find-by-ingredients"
  },
  {
    icon: <Calendar className="h-6 w-6 text-wasfah-bright-teal" />,
    label: "Meal Plan",
    path: "/meal-plan"
  },
  {
    icon: <Box className="h-6 w-6 text-wasfah-bright-teal" />,
    label: "Pantry",
    path: "/pantry"
  },
  {
    icon: <PlusCircle className="h-6 w-6 text-wasfah-bright-teal" />,
    label: "Create Recipe",
    path: "/create-recipe"
  },
  {
    icon: <Camera className="h-6 w-6 text-wasfah-bright-teal" />,
    label: "Scan Dish",
    path: "/scan-dish"
  },
  {
    icon: <Users className="h-6 w-6 text-wasfah-bright-teal" />,
    label: "Global Cuisine",
    path: "/global-cuisine"
  },
];

const communityRewardsActions = [
  {
    icon: <Heart className="h-6 w-6 text-wasfah-coral-red" />,
    label: "Health Tracking",
    path: "/health-tracking-home"
  },
  {
    icon: <Award className="h-6 w-6 text-wasfah-coral-red" />,
    label: "Rewards",
    path: "/loyalty-program"
  },
  {
    icon: <Share2 className="h-6 w-6 text-wasfah-coral-red" />,
    label: "Shared Recipes",
    path: "/shared-recipes"
  },
  {
    icon: <Users className="h-6 w-6 text-wasfah-coral-red" />,
    label: "Community",
    path: "/community"
  },
  {
    icon: <Bot className="h-6 w-6 text-wasfah-coral-red" />,
    label: "AI Chef",
    path: "/ai-chef"
  },
  {
    icon: <CreditCard className="h-6 w-6 text-wasfah-coral-red" />,
    label: "Subscription",
    path: "/subscription"
  },
];

// In your component's return:
<div className="px-4">
  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
  
  <h3 className="text-md font-medium text-wasfah-bright-teal mb-2 mt-2">Cooking & Planning</h3>
  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
    {cookingPlanningActions.map((action, index) => (
      <Link
        key={index}
        to={action.path}
        className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-center"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-wasfah-bright-teal/10 rounded-full flex items-center justify-center mb-2">
          {action.icon}
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">
          {action.label}
        </span>
      </Link>
    ))}
  </div>

  <h3 className="text-md font-medium text-wasfah-coral-red mb-2 mt-2">Community & Rewards</h3>
  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
    {communityRewardsActions.map((action, index) => (
      <Link
        key={index}
        to={action.path}
        className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-center"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-wasfah-coral-red/10 rounded-full flex items-center justify-center mb-2">
          {action.icon}
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">
          {action.label}
        </span>
      </Link>
    ))}
  </div>
</div>
