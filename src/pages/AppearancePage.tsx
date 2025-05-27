import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast'; // Assuming you have this hook

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  // State to manage the active color scheme. Initialize with 'wasfah-default'
  const [activeColorScheme, setActiveColorScheme] = useState('wasfah-default');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const colorSchemes = [
    {
      id: 'wasfah-default',
      name: 'Wasfah Default',
      colors: ['bg-wasfah-bright-teal', 'bg-wasfah-deep-teal', 'bg-wasfah-coral-red', 'bg-wasfah-mint'],
      description: 'The classic Wasfah color palette'
    },
    {
      id: 'ocean-blue',
      name: 'Ocean Blue',
      colors: ['bg-blue-500', 'bg-blue-600', 'bg-blue-400', 'bg-cyan-300'],
      description: 'Calming ocean-inspired blues'
    },
    {
      id: 'forest-green',
      name: 'Forest Green',
      colors: ['bg-green-500', 'bg-green-600', 'bg-emerald-400', 'bg-lime-300'],
      description: 'Fresh and natural greens'
    },
    {
      id: 'sunset-orange',
      name: 'Sunset Orange',
      colors: ['bg-orange-500', 'bg-red-500', 'bg-yellow-400', 'bg-pink-300'],
      description: 'Warm sunset colors'
    }
  ];

  // Function to apply a selected color scheme
  const applyColorScheme = (schemeId) => {
    setActiveColorScheme(schemeId);
    // In a real application, you would apply the actual CSS variables or classes here
    // For demonstration, we'll just show a toast notification.
    toast({
      title: "Color Scheme Applied!",
      description: `"${colorSchemes.find(s => s.id === schemeId)?.name}" color scheme has been set.`,
    });
  };

  return (
    <PageContainer
      header={{
        title: 'Appearance',
        showBackButton: true,
      }}
    >
      <div className="container px-4 py-6 space-y-6">
        {/* Theme Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-wasfah-deep-teal flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Theme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={setTheme}>
              <div className="flex items-center space-x-2 mb-2"> {/* Added margin-bottom */}
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center">
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2 mb-2"> {/* Added margin-bottom */}
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center">
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center">
                  <Monitor className="h-4 w-4 mr-2" />
                  System
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Color Scheme Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-wasfah-deep-teal">Color Scheme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {colorSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className={`p-4 border rounded-lg transition-colors ${
                  activeColorScheme === scheme.id ? 'border-wasfah-bright-teal ring-2 ring-wasfah-bright-teal' : 'hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{scheme.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{scheme.description}</p>
                  </div>
                  <Button
                    variant={activeColorScheme === scheme.id ? 'default' : 'outline'}
                    size="sm"
                    className={activeColorScheme === scheme.id ? 'bg-wasfah-bright-teal hover:bg-wasfah-teal' : ''}
                    onClick={() => applyColorScheme(scheme.id)}
                    disabled={activeColorScheme === scheme.id} // Disable if already active
                  >
                    {activeColorScheme === scheme.id ? 'Active' : 'Apply'}
                  </Button>
                </div>
                <div className="flex space-x-2">
                  {scheme.colors.map((color, index) => (
                    <div key={index} className={`w-8 h-8 rounded-full ${color}`} />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
