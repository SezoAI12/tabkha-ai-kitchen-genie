
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockUser } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Settings, 
  Utensils,
  Globe,
  AlertTriangle,
  ChefHat,
  BarChart3,
  Bell,
  CreditCard,
  Lock,
  ExternalLink,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ProfilePage() {
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  };
  
  const handleEditProfile = () => {
    toast.success("Profile edit mode enabled");
  };
  
  const handleLogout = () => {
    toast.info("Logging out...");
    setTimeout(() => navigate('/auth'), 1500);
  };

  return (
    <PageContainer
      header={{
        title: 'Profile',
        actions: (
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="text-wasfah-deep-teal animate-fade-in">
              <Settings size={20} />
            </Button>
          </Link>
        ),
      }}
    >
      <div className="container px-4 py-4 space-y-6">
        <Card className="mb-6 animate-fade-in">
          <CardContent className="p-6 relative">
            <div className="absolute right-6 top-6">
              <Button 
                variant="outline" 
                size="sm"
                className="text-wasfah-bright-teal hover:bg-wasfah-light-gray"
                onClick={handleEditProfile}
              >
                Edit
              </Button>
            </div>
            
            <div className="flex flex-col items-center mb-4">
              <Avatar className="h-20 w-20 mb-4 animate-scale-in ring-2 ring-wasfah-bright-teal ring-offset-2">
                <AvatarImage src={mockUser.avatar || ''} alt={mockUser.name} />
                <AvatarFallback className="text-xl bg-wasfah-bright-teal text-white">
                  {getInitials(mockUser.name)}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-bold text-wasfah-deep-teal mb-1">{mockUser.name}</h2>
              <p className="text-sm text-wasfah-bright-teal font-medium flex items-center">
                {mockUser.isPremium ? (
                  <>
                    <span className="mr-1">Premium User</span>
                    <span className="inline-block w-2 h-2 bg-wasfah-bright-teal rounded-full"></span>
                  </>
                ) : 'Free User'}
              </p>
              
              <p className="text-sm text-gray-600 mt-2">{mockUser.email}</p>
              
              <div className="flex gap-4 mt-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-wasfah-deep-teal">{mockUser.recipesSaved || 0}</p>
                  <p className="text-xs text-gray-600">Saved</p>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <p className="text-lg font-bold text-wasfah-deep-teal">{mockUser.recipesCreated || 0}</p>
                  <p className="text-xs text-gray-600">Created</p>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <p className="text-lg font-bold text-wasfah-deep-teal">{mockUser.followersCount || 0}</p>
                  <p className="text-xs text-gray-600">Followers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '150ms' }}>
          <h3 className="text-md font-bold text-wasfah-deep-teal ml-1 mb-2">Food Preferences</h3>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4 flex items-center">
              <Utensils size={18} className="text-wasfah-bright-teal mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-wasfah-deep-teal">Dietary Preferences</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mockUser.dietaryPreferences?.map((pref, idx) => (
                    <span key={idx} className="text-xs bg-wasfah-light-gray text-wasfah-deep-teal rounded-full px-2 py-1">
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4 flex items-center">
              <Globe size={18} className="text-wasfah-bright-teal mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-wasfah-deep-teal">Cuisine Preferences</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mockUser.cuisinePreferences?.map((cuisine, idx) => (
                    <span key={idx} className="text-xs bg-wasfah-light-gray text-wasfah-deep-teal rounded-full px-2 py-1">
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4 flex items-center">
              <AlertTriangle size={18} className="text-wasfah-bright-teal mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-wasfah-deep-teal">Allergens</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mockUser.allergies?.map((allergen, idx) => (
                    <span key={idx} className="text-xs bg-wasfah-light-gray text-wasfah-deep-teal rounded-full px-2 py-1">
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4 flex items-center">
              <ChefHat size={18} className="text-wasfah-bright-teal mr-3" />
              <div>
                <h3 className="font-medium text-wasfah-deep-teal">Chef Personality</h3>
                <p className="text-sm text-gray-600">{mockUser.chefAvatar}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4 flex items-center">
              <BarChart3 size={18} className="text-wasfah-bright-teal mr-3" />
              <div>
                <h3 className="font-medium text-wasfah-deep-teal">Nutritional Goals</h3>
                <p className="text-sm text-gray-600">
                  {mockUser.nutritionalGoals ? (
                    <>
                      Protein: {mockUser.nutritionalGoals.protein}g, 
                      Calories: {mockUser.nutritionalGoals.calories}
                    </>
                  ) : (
                    "No goals set"
                  )}
                </p>
                <Link to="/nutrition-goals" className="inline-flex items-center text-xs text-wasfah-bright-teal mt-1">
                  View details <ExternalLink size={12} className="ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h3 className="text-md font-bold text-wasfah-deep-teal ml-1 mb-2">Account Settings</h3>
          
          <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start text-wasfah-deep-teal hover:bg-wasfah-light-gray">
              <Bell size={18} className="mr-3" />
              Notifications
            </Button>
          </Link>
          
          <Link to="/subscription">
            <Button variant="ghost" className="w-full justify-start text-wasfah-deep-teal hover:bg-wasfah-light-gray">
              <CreditCard size={18} className="mr-3" />
              Subscription
            </Button>
          </Link>
          
          <Link to="/settings/privacy">
            <Button variant="ghost" className="w-full justify-start text-wasfah-deep-teal hover:bg-wasfah-light-gray">
              <Lock size={18} className="mr-3" />
              Privacy & Data
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
