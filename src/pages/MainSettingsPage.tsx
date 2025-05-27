
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { User, CreditCard, Bell, Moon, Settings, Languages, 
  ShoppingCart, Heart, Camera, Activity, UserCog, Shield, Globe } from 'lucide-react';
import { SignOut } from '@/components/auth/SignOut';
import { useRTL } from '@/contexts/RTLContext';
import { LanguageSelector } from '@/components/language/LanguageSelector';

const MainSettingsPage = () => {
  const { isRTL, language } = useRTL();
  
  const settingGroups = [
    {
      title: "User Settings",
      items: [
        { icon: <User className="h-6 w-6 text-wasfah-deep-teal" />, label: "Profile", path: "/profile" },
        { icon: <UserCog className="h-6 w-6 text-gray-600" />, label: "Preferences", path: "/dietary-preferences" },
        { icon: <Heart className="h-6 w-6 text-pink-500" />, label: "Favorites", path: "/favorites" },
      ]
    },
    {
      title: "App Settings",
      items: [
        { icon: <Bell className="h-6 w-6 text-wasfah-bright-teal" />, label: "Notifications", path: "/settings" },
        { icon: <Languages className="h-6 w-6 text-blue-500" />, label: "Language", path: "/language-settings" },
        { icon: <Moon className="h-6 w-6 text-purple-600" />, label: "Appearance", path: "/settings" },
      ]
    },
    {
      title: "Features",
      items: [
        { icon: <ShoppingCart className="h-6 w-6 text-wasfah-deep-teal" />, label: "Shopping List", path: "/shopping-list" },
        { icon: <Camera className="h-6 w-6 text-amber-500" />, label: "Scan Dish", path: "/scan-ingredients" },
        { icon: <Activity className="h-6 w-6 text-red-500" />, label: "Health Tracking", path: "/health-tracking-home" },
      ]
    },
    {
      title: "Account & Payment",
      items: [
        { icon: <Shield className="h-6 w-6 text-green-600" />, label: "Privacy & Data", path: "/privacy" },
        { icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: "Payment Methods", path: "/subscription" },
      ]
    }
  ];

  return (
    <PageContainer header={{ title: "Settings", showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="opacity-90">Customize your WasfahAI experience</p>
        </div>
        
        {/* Active Language */}
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-6 w-6 text-wasfah-bright-teal mr-3" />
                <div>
                  <h3 className="font-medium">{isRTL ? "اللغة" : "Language"}</h3>
                  <p className="text-xs text-gray-500">
                    {language === 'ar' ? 'العربية' : language === 'en' ? 'English' : language}
                  </p>
                </div>
              </div>
              <LanguageSelector />
            </div>
          </CardContent>
        </Card>

        {settingGroups.map((group, groupIndex) => (
          <div className="space-y-3" key={groupIndex}>
            <h2 className="text-lg font-bold text-wasfah-deep-teal">{group.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((item, itemIndex) => (
                <Link to={item.path} key={itemIndex}>
                  <Card className="hover:shadow-md transition-all duration-300 card-3d">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <div className="rounded-full p-2 bg-gray-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Admin Panel Link */}
        <div className="pt-4">
          <Link to="/admin/login">
            <Card className="bg-gray-50 hover:bg-gray-100 transition-colors card-3d">
              <CardContent className="p-4 flex items-center justify-center space-x-2">
                <Settings className="h-5 w-5 text-gray-700" />
                <span className="font-medium text-gray-700">Admin Panel</span>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        {/* Sign Out Button */}
        <div className="pt-4">
          <SignOut />
        </div>
      </div>
    </PageContainer>
  );
};

export default MainSettingsPage;
