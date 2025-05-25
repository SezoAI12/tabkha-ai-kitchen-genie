
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Globe, Moon, Smartphone, Volume2, User, CreditCard, ShoppingCart, Award, Bell, Languages, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [language, setLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]);

  useEffect(() => {
    // Mock loading of settings
    const timer = setTimeout(() => {
      // Simulate getting connected devices
      setConnectedDevices(['Kitchen Smart Scale', 'Thermometer']); 
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language changed",
      description: value === 'english' ? "Language set to English" : "تم تغيير اللغة إلى العربية",
    });
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    // Apply dark mode to the document
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    toast({
      title: checked ? "Dark mode enabled" : "Light mode enabled",
    });
  };

  const handleSoundsToggle = (checked: boolean) => {
    setSoundsEnabled(checked);
    toast({
      title: checked ? "Sounds enabled" : "Sounds disabled",
    });
  };

  const handleHapticsToggle = (checked: boolean) => {
    setHapticsEnabled(checked);
    toast({
      title: checked ? "Haptic feedback enabled" : "Haptic feedback disabled",
    });
  };

  const handleNotificationsToggle = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: checked ? "Notifications enabled" : "Notifications disabled",
    });
  };

  const connectNewDevice = () => {
    toast({
      title: "Scanning for devices",
      description: "Please make sure your device is in pairing mode",
    });
  };

  const disconnectDevice = (device: string) => {
    setConnectedDevices(connectedDevices.filter(d => d !== device));
    toast({
      title: "Device disconnected",
      description: `${device} has been disconnected`,
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Delete account request",
      description: "A confirmation email has been sent to your email address",
      variant: "destructive"
    });
  };

  const settingsSections = [
    {
      id: 'profile',
      title: 'Profile & Account',
      icon: <User className="h-5 w-5 text-wasfah-bright-teal" />,
      link: '/profile',
      description: 'View and edit your profile'
    },
    {
      id: 'loyalty',
      title: 'Loyalty Program',
      icon: <Award className="h-5 w-5 text-amber-500" />,
      link: '/loyalty',
      description: 'View your rewards and points'
    },
    {
      id: 'shopping',
      title: 'Shopping List',
      icon: <ShoppingCart className="h-5 w-5 text-wasfah-deep-teal" />,
      link: '/shopping-list',
      description: 'Manage your shopping list'
    },
    {
      id: 'subscription',
      title: 'Subscription & Payment',
      icon: <CreditCard className="h-5 w-5 text-wasfah-bright-teal" />,
      link: '/subscription',
      description: 'Manage your subscription and payment methods'
    },
    {
      id: 'language',
      title: 'Language Settings',
      icon: <Languages className="h-5 w-5 text-wasfah-bright-teal" />,
      link: '/language-settings',
      description: 'Change app language'
    }
  ];

  return (
    <PageContainer
      header={{
        title: 'Settings',
        showBackButton: true,
      }}
    >
      <div className="space-y-5 pb-12">
        {/* Quick links to account sections */}
        <div className="grid grid-cols-1 gap-3">
          {settingsSections.map((section) => (
            <Link to={section.link} key={section.id}>
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="rounded-full p-2 bg-gray-50 flex items-center justify-center mr-3">
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{section.title}</h3>
                      <p className="text-xs text-gray-500">{section.description}</p>
                    </div>
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-gray-400"
                  >
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="appearance">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center">
                <Moon className="mr-2 h-5 w-5 text-wasfah-bright-teal" />
                <span>Appearance</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-1 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="dark-mode" className="text-sm font-medium">
                    Dark Mode
                  </label>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={handleDarkModeToggle}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="notifications">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-wasfah-bright-teal" />
                <span>Notifications</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-1 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="notifications" className="text-sm font-medium">
                    Enable Notifications
                  </label>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={handleNotificationsToggle}
                  />
                </div>
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={!notifications}
                  >
                    Notification Preferences
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sounds">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center">
                <Volume2 className="mr-2 h-5 w-5 text-wasfah-bright-teal" />
                <span>Sounds & Haptics</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-1 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="sounds" className="text-sm font-medium">
                    Sounds
                  </label>
                  <Switch
                    id="sounds"
                    checked={soundsEnabled}
                    onCheckedChange={handleSoundsToggle}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="haptics" className="text-sm font-medium">
                    Haptic Feedback
                  </label>
                  <Switch
                    id="haptics"
                    checked={hapticsEnabled}
                    onCheckedChange={handleHapticsToggle}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="devices">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5 text-wasfah-bright-teal" />
                <span>Connected Devices</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-1 space-y-3">
                {connectedDevices.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    {connectedDevices.map((device, index) => (
                      <div key={index} className="flex items-center justify-between bg-wasfah-light-gray p-3 rounded-md">
                        <div>
                          <p className="font-medium text-sm">{device}</p>
                          <p className="text-xs text-gray-500">Connected</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => disconnectDevice(device)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mb-4">No devices connected</p>
                )}
                <Button 
                  className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                  onClick={connectNewDevice}
                >
                  Connect a Device
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-4">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleDeleteAccount}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
