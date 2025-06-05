
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  User, 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Settings as SettingsIcon,
  UserX,
  Award,
  Smartphone,
  Heart,
  ChefHat,
  HelpCircle,
  Weight,
  SlidersHorizontal
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useAuth } from '@/hooks/useAuth';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { SignOut } from '@/components/auth/SignOut';

const SettingsPage = () => {
  const { t, direction } = useRTL();
  const { user } = useAuth();

  const settingGroups = [
    {
      title: t("Profile & Account", "الملف الشخصي والحساب", "Profil ve Hesap"),
      items: [
        { id: 'profile', icon: <User className="h-6 w-6 text-wasfah-deep-teal" />, label: t("Profile", "الملف الشخصي", "Profil"), path: "/profile" },
        { id: 'body-info', icon: <Weight className="h-6 w-6 text-green-600" />, label: t("Body Information", "معلومات الجسم", "Vücut Bilgileri"), path: "/body-information" },
        { id: 'preferences', icon: <SlidersHorizontal className="h-6 w-6 text-purple-600" />, label: t("Preferences", "التفضيلات", "Tercihler"), path: "/dietary-preferences" },
      ]
    },
    {
      title: t("My Content", "المحتوى الخاص بي", "İçeriğim"),
      items: [
        { id: 'favorites', icon: <Heart className="h-6 w-6 text-red-500" />, label: t("Favorites", "المفضلة", "Favoriler"), path: "/favorites" },
        { id: 'my-recipes', icon: <ChefHat className="h-6 w-6 text-orange-500" />, label: t("My Recipes", "وصفاتي", "Tariflerim"), path: "/create-recipe" },
      ]
    },
    {
      title: t("App Settings", "إعدادات التطبيق", "Uygulama Ayarları"),
      items: [
        { id: 'language', icon: <Globe className="h-6 w-6 text-blue-600" />, label: t("Language", "اللغة", "Dil"), component: <LanguageSelector /> },
        { id: 'notifications', icon: <Bell className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Notifications", "الإشعارات", "Bildirimler"), path: "/notifications" },
        { id: 'appearance', icon: <Moon className="h-6 w-6 text-purple-600" />, label: t("Appearance", "المظهر", "Görünüm"), path: "/appearance" },
        { id: 'connected-devices', icon: <Smartphone className="h-6 w-6 text-green-600" />, label: t("Connected Devices", "الأجهزة المتصلة", "Bağlı Cihazlar"), path: "/connected-devices" },
      ]
    },
    {
      title: t("Services & Subscriptions", "الخدمات والاشتراكات", "Hizmetler ve Abonelikler"),
      items: [
        { id: 'loyalty-program', icon: <Award className="h-6 w-6 text-amber-500" />, label: t("Loyalty Program", "برنامج الولاء", "Sadakat Programı"), path: "/loyalty-program" },
        { id: 'subscription', icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Subscription", "الاشتراك", "Abonelik"), path: "/subscription" },
        { id: 'payment-methods', icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: t("Payment Methods", "طرق الدفع", "Ödeme Yöntemleri"), path: "/payment-methods" },
      ]
    },
    {
      title: t("Privacy & Security", "الخصوصية والأمان", "Gizlilik ve Güvenlik"),
      items: [
        { id: 'privacy', icon: <Shield className="h-6 w-6 text-green-600" />, label: t("Privacy & Data", "الخصوصية والبيانات", "Gizlilik ve Veri"), path: "/privacy" },
      ]
    },
    {
      title: t("Support & Help", "الدعم والمساعدة", "Destek ve Yardım"),
      items: [
        { id: 'help', icon: <HelpCircle className="h-6 w-6 text-orange-500" />, label: t("Help & Support", "المساعدة والدعم", "Yardım ve Destek"), path: "/help" },
      ]
    }
  ];

  // Add admin panel if user is admin
  if (user?.user_metadata?.isAdmin) {
    settingGroups.unshift({
      title: t("Administration", "الإدارة", "Yönetim"),
      items: [
        { id: 'admin-panel', icon: <SettingsIcon className="h-6 w-6 text-purple-600" />, label: t("Admin Panel", "لوحة الإدارة", "Yönetici Paneli"), path: "/admin" },
      ]
    });
  }

  // Add account management section at the end
  settingGroups.push({
    title: t("Account Management", "إدارة الحساب", "Hesap Yönetimi"),
    items: [
      { id: 'delete-account', icon: <UserX className="h-6 w-6 text-red-500" />, label: t("Delete Account", "حذف الحساب", "Hesabı Sil"), path: "/delete-account" },
    ]
  });

  return (
    <PageContainer
      header={{
        title: t("Settings", "الإعدادات", "Ayarlar"),
        showBackButton: true
      }}
      className="pb-24"
    >
      <div className={`space-y-6 p-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`} dir={direction}>
        {/* Header */}
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center">
          <h1 className="text-2xl font-bold mb-2">{t("All Settings", "جميع الإعدادات", "Tüm Ayarlar")}</h1>
          <p className="opacity-90">{t("Manage all your app preferences and account settings", "إدارة جميع تفضيلات التطبيق وإعدادات الحساب", "Tüm uygulama tercihlerinizi ve hesap ayarlarınızı yönetin")}</p>
        </div>

        {/* Render setting groups */}
        {settingGroups.map((group, groupIndex) => (
          <div className="space-y-3" key={groupIndex}>
            <h2 className="text-lg font-bold text-wasfah-deep-teal">{group.title}</h2>
            <div className="grid grid-cols-1 gap-3">
              {group.items.map((item) => (
                <div key={item.id}>
                  {item.path ? (
                    <Link to={item.path}>
                      <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="rounded-full p-2 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </CardContent>
                      </Card>
                    </Link>
                  ) : (
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="rounded-full p-2 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                            {item.icon}
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.component}
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign Out Button */}
        <div className="pt-4">
          <Card className="border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="rounded-full p-2 bg-red-50 flex items-center justify-center">
                    <LogOut className="h-6 w-6 text-red-500" />
                  </div>
                  <span className="font-medium text-red-500">{t("Sign Out", "تسجيل الخروج", "Çıkış Yap")}</span>
                </div>
                <SignOut />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
