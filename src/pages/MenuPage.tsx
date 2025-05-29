// src/pages/MenuPage.tsx
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Settings, User, Heart, Book, ShoppingCart, CreditCard,
  Bell, Languages, Moon, HelpCircle, Globe, Award, LogOut,
  Gift, Camera, Scale, Smartphone, SquareUser, Shield, ChevronRight // Import ChevronRight for list items
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

export default function MenuPage() {
  const { t } = useRTL();

  const menuItems = [
    {
      id: 'profile',
      icon: <User className="h-6 w-6 text-indigo-500" />,
      title: t('Profile'),
      link: '/profile',
    },
    {
      id: 'favorites',
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: t('Favorites'),
      link: '/favorites',
    },
    {
      id: 'recipes',
      icon: <Book className="h-6 w-6 text-wasfah-deep-teal" />,
      title: t('My Recipes'),
      link: '/recipes',
    },
    {
      id: 'shopping',
      icon: <ShoppingCart className="h-6 w-6 text-wasfah-bright-teal" />,
      title: t('Shopping List'),
      link: '/shopping-list',
    },
    {
      id: 'loyalty',
      icon: <Award className="h-6 w-6 text-amber-500" />,
      title: t('Loyalty Program'),
      link: '/loyalty',
    },
    {
      id: 'scan-dish',
      icon: <Camera className="h-6 w-6 text-green-500" />,
      title: t('Scan Dish'),
      link: '/scan-dish',
    },
    {
      id: 'body-information',
      icon: <Scale className="h-6 w-6 text-blue-500" />,
      title: t('Body Information'),
      link: '/body-information',
    },
    {
      id: 'subscription',
      icon: <CreditCard className="h-6 w-6 text-purple-500" />,
      title: t('Subscription'),
      link: '/subscription',
    },
     // Add Shared Recipes link here if needed in the main menu
     // {
     //   id: 'shared-recipes',
     //   icon: <Share2 className="h-6 w-6 text-teal-500" />, // Assuming Share2 icon
     //   title: t('Shared Recipes'),
     //   link: '/shared-recipes',
     // },
     // Add Community link here if needed in the main menu
     // {
     //   id: 'community',
     //   icon: <Users className="h-6 w-6 text-orange-500" />, // Assuming Users icon
     //   title: t('Community'),
     //   link: '/community',
     // },
  ];

  const settingsItems = [
    {
      id: 'general',
      icon: <Settings className="h-5 w-5 text-gray-500" />, // Slightly smaller icons for list
      title: t('General Settings'), // More descriptive title
      link: '/settings',
    },
    {
      id: 'notifications',
      icon: <Bell className="h-5 w-5 text-orange-500" />,
      title: t('Notifications'),
      link: '/notifications',
    },
    {
      id: 'language',
      icon: <Globe className="h-5 w-5 text-green-500" />,
      title: t('Language'),
      link: '/language-settings',
    },
    {
      id: 'appearance',
      icon: <Moon className="h-5 w-5 text-indigo-500" />,
      title: t('Appearance'),
      link: '/appearance',
    },
    {
      id: 'connected-devices',
      icon: <Smartphone className="h-5 w-5 text-blue-500" />,
      title: t('Connected Devices'),
      link: '/connected-devices',
    },
    {
      id: 'help',
      icon: <HelpCircle className="h-5 w-5 text-wasfah-deep-teal" />,
      title: t('Help & Support'),
      link: '/help',
    },
    {
      id: 'admin',
      icon: <Shield className="h-5 w-5 text-purple-600" />,
      title: t('Admin Panel'),
      link: '/admin/login', // Assuming this is correct
    },
  ];

  return (
    <PageContainer header={{ title: t('Menu') }}>
      <div className="space-y-6 pb-20">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4"> {/* Ensure TabsList is full width */}
            <TabsTrigger value="menu">{t('Menu')}</TabsTrigger>
            <TabsTrigger value="settings">{t('Settings')}</TabsTrigger>
          </TabsList>
          <TabsContent value="menu" className="mt-0">
            {/* Menu Items Grid (Keep as is, maybe slight style tweaks) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <Link to={item.link} key={item.id} className="block"> {/* Use block to make Link fill the grid item */}
                  <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.03] h-full">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-full mb-4">
                        {item.icon}
                      </div>
                      <span className="text-base font-medium text-gray-800 dark:text-gray-200">{item.title}</span> {/* Ensure text color is set */}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="settings" className="mt-0">
            {/* Settings Items List */}
            <div className="space-y-3"> {/* Use space-y for vertical list spacing */}
              {settingsItems.map((item) => (
                <Link to={item.link} key={item.id} className="block"> {/* Use block for full-width link */}
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse"> {/* Icon and Title */}
                      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                        {item.icon}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{item.title}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 rtl:rotate-180" /> {/* Arrow icon, rotate for RTL */}
                  </div>
                </Link>
              ))}

              {/* Log Out Button (Distinct) */}
              <Link to="/auth" className="block w-full mt-6"> {/* Add margin-top to separate from list */}
                <div className="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-sm hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors text-red-600 dark:text-red-400 font-medium">
                  <LogOut className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0" /> {/* Icon with spacing */}
                  {t('Log Out')}
                </div>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
