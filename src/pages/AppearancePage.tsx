import React, { useState, useEffect, useCallback } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast'; // Ensure you have this hook setup

export default function AppearancePage() {
  const { theme, setTheme } = useTheme(); // 'light', 'dark', or 'system'
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  // --- Theme Definitions (Centralized HSL values for each scheme, with light/dark variants) ---
  const colorSchemeDefinitions = {
    'wasfah-default': {
      light: {
        '--background': '0 0% 100%', // White
        '--foreground': '222.2 47.4% 11.2%', // Nearly black
        '--card': '0 0% 100%',
        '--card-foreground': '222.2 47.4% 11.2%',
        '--popover': '0 0% 100%',
        '--popover-foreground': '222.2 47.4% 11.2%',
        '--primary': '200 80% 22%', // wasfah-deep-teal
        '--primary-foreground': '0 0% 100%',
        '--secondary': '170 90% 40%', // wasfah-bright-teal
        '--secondary-foreground': '222.2 47.4% 11.2%',
        '--muted': '210 40% 96.1%',
        '--muted-foreground': '215.4 16.3% 46.9%',
        '--accent': '0 100% 70%', // coral-red
        '--accent-foreground': '222.2 47.4% 11.2%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '214.3 31.8% 91.4%',
        '--input': '214.3 31.8% 91.4%',
        '--ring': '222.2 84% 4.9%',
        '--radius': '0.5rem',
        '--sidebar-background': '210 40% 96.1%',
        '--sidebar-foreground': '215.4 16.3% 46.9%',
        '--sidebar-primary': '200 80% 22%',
        '--sidebar-primary-foreground': '0 0% 100%',
        '--sidebar-accent': '170 90% 40%',
        '--sidebar-accent-foreground': '222.2 47.4% 11.2%',
        '--sidebar-border': '214.3 31.8% 91.4%',
        '--sidebar-ring': '222.2 84% 4.9%',
      },
      dark: {
        '--background': '222.2 47.4% 11.2%',
        '--foreground': '210 40% 98%',
        '--card': '217.2 32.6% 17.5%',
        '--card-foreground': '210 40% 98%',
        '--popover': '217.2 32.6% 17.5%',
        '--popover-foreground': '210 40% 98%',
        '--primary': '170 90% 40%', // wasfah-bright-teal for dark primary
        '--primary-foreground': '222.2 47.4% 11.2%',
        '--secondary': '200 80% 22%', // wasfah-deep-teal for dark secondary
        '--secondary-foreground': '210 40% 98%',
        '--muted': '217.2 32.6% 17.5%',
        '--muted-foreground': '215 20.2% 65.1%',
        '--accent': '0 100% 70%', // coral-red
        '--accent-foreground': '210 40% 98%',
        '--destructive': '0 62.8% 30.6%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '217.2 32.6% 17.5%',
        '--input': '217.2 32.6% 17.5%',
        '--ring': '212.7 26.8% 83.9%',
        '--radius': '0.5rem',
        '--sidebar-background': '217.2 32.6% 17.5%',
        '--sidebar-foreground': '215 20.2% 65.1%',
        '--sidebar-primary': '170 90% 40%',
        '--sidebar-primary-foreground': '222.2 47.4% 11.2%',
        '--sidebar-accent': '200 80% 22%',
        '--sidebar-accent-foreground': '210 40% 98%',
        '--sidebar-border': '217.2 32.6% 17.5%',
        '--sidebar-ring': '212.7 26.8% 83.9%',
      },
    },
    'ocean-blue': {
      light: {
        '--background': '210 20% 98%', // Light grey-blue background
        '--foreground': '220 30% 15%', // Dark text
        '--card': '210 20% 95%',
        '--card-foreground': '220 30% 15%',
        '--popover': '210 20% 95%',
        '--popover-foreground': '220 30% 15%',
        '--primary': '220 50% 20%', // Darker Blue
        '--primary-foreground': '0 0% 100%',
        '--secondary': '215 70% 55%', // Brighter Blue
        '--secondary-foreground': '220 30% 15%',
        '--muted': '210 15% 90%',
        '--muted-foreground': '210 10% 40%',
        '--accent': '200 90% 60%', // Cyan
        '--accent-foreground': '220 30% 15%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '210 15% 85%',
        '--input': '210 15% 85%',
        '--ring': '215 70% 55%',
        '--radius': '0.5rem',
        '--sidebar-background': '210 15% 90%',
        '--sidebar-foreground': '210 10% 40%',
        '--sidebar-primary': '220 50% 20%',
        '--sidebar-primary-foreground': '0 0% 100%',
        '--sidebar-accent': '215 70% 55%',
        '--sidebar-accent-foreground': '220 30% 15%',
        '--sidebar-border': '210 15% 85%',
        '--sidebar-ring': '215 70% 55%',
      },
      dark: {
        '--background': '220 20% 15%',
        '--foreground': '210 20% 90%',
        '--card': '220 20% 18%',
        '--card-foreground': '210 20% 90%',
        '--popover': '220 20% 18%',
        '--popover-foreground': '210 20% 90%',
        '--primary': '215 70% 55%',
        '--primary-foreground': '220 30% 15%',
        '--secondary': '220 50% 20%',
        '--secondary-foreground': '210 20% 90%',
        '--muted': '220 20% 25%',
        '--muted-foreground': '210 10% 60%',
        '--accent': '200 90% 60%',
        '--accent-foreground': '210 20% 90%',
        '--destructive': '0 62.8% 30.6%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '220 20% 25%',
        '--input': '220 20% 25%',
        '--ring': '200 90% 60%',
        '--radius': '0.5rem',
        '--sidebar-background': '220 20% 25%',
        '--sidebar-foreground': '210 10% 60%',
        '--sidebar-primary': '215 70% 55%',
        '--sidebar-primary-foreground': '220 30% 15%',
        '--sidebar-accent': '220 50% 20%',
        '--sidebar-accent-foreground': '210 20% 90%',
        '--sidebar-border': '220 20% 25%',
        '--sidebar-ring': '200 90% 60%',
      },
    },
    'forest-green': {
      light: {
        '--background': '120 10% 97%', // Very light green-grey background
        '--foreground': '160 30% 15%', // Dark text
        '--card': '120 10% 95%',
        '--card-foreground': '160 30% 15%',
        '--popover': '120 10% 95%',
        '--popover-foreground': '160 30% 15%',
        '--primary': '160 50% 20%', // Darker Green
        '--primary-foreground': '0 0% 100%',
        '--secondary': '150 70% 40%', // Brighter Green
        '--secondary-foreground': '160 30% 15%',
        '--muted': '140 10% 90%',
        '--muted-foreground': '140 5% 40%',
        '--accent': '140 80% 50%', // Lighter Green
        '--accent-foreground': '160 30% 15%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '140 10% 85%',
        '--input': '140 10% 85%',
        '--ring': '150 70% 40%',
        '--radius': '0.5rem',
        '--sidebar-background': '140 10% 90%',
        '--sidebar-foreground': '140 5% 40%',
        '--sidebar-primary': '160 50% 20%',
        '--sidebar-primary-foreground': '0 0% 100%',
        '--sidebar-accent': '150 70% 40%',
        '--sidebar-accent-foreground': '160 30% 15%',
        '--sidebar-border': '140 10% 85%',
        '--sidebar-ring': '150 70% 40%',
      },
      dark: {
        '--background': '160 20% 15%',
        '--foreground': '140 20% 90%',
        '--card': '160 20% 18%',
        '--card-foreground': '140 20% 90%',
        '--popover': '160 20% 18%',
        '--popover-foreground': '140 20% 90%',
        '--primary': '150 70% 40%',
        '--primary-foreground': '160 30% 15%',
        '--secondary': '160 50% 20%',
        '--secondary-foreground': '140 20% 90%',
        '--muted': '160 20% 25%',
        '--muted-foreground': '140 10% 60%',
        '--accent': '140 80% 50%',
        '--accent-foreground': '140 20% 90%',
        '--destructive': '0 62.8% 30.6%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '160 20% 25%',
        '--input': '160 20% 25%',
        '--ring': '140 80% 50%',
        '--radius': '0.5rem',
        '--sidebar-background': '160 20% 25%',
        '--sidebar-foreground': '140 10% 60%',
        '--sidebar-primary': '150 70% 40%',
        '--sidebar-primary-foreground': '160 30% 15%',
        '--sidebar-accent': '160 50% 20%',
        '--sidebar-accent-foreground': '140 20% 90%',
        '--sidebar-border': '160 20% 25%',
        '--sidebar-ring': '140 80% 50%',
      },
    },
    'sunset-orange': {
      light: {
        '--background': '30 40% 98%', // Light peach background
        '--foreground': '20 60% 20%', // Dark brown-orange text
        '--card': '30 40% 95%',
        '--card-foreground': '20 60% 20%',
        '--popover': '30 40% 95%',
        '--popover-foreground': '20 60% 20%',
        '--primary': '25 80% 40%', // Darker Orange
        '--primary-foreground': '0 0% 100%',
        '--secondary': '30 90% 55%', // Brighter Orange
        '--secondary-foreground': '20 60% 20%',
        '--muted': '30 30% 90%',
        '--muted-foreground': '30 20% 50%',
        '--accent': '40 95% 65%', // Yellow
        '--accent-foreground': '20 60% 20%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '30 30% 85%',
        '--input': '30 30% 85%',
        '--ring': '30 90% 55%',
        '--radius': '0.5rem',
        '--sidebar-background': '30 30% 90%',
        '--sidebar-foreground': '30 20% 50%',
        '--sidebar-primary': '25 80% 40%',
        '--sidebar-primary-foreground': '0 0% 100%',
        '--sidebar-accent': '30 90% 55%',
        '--sidebar-accent-foreground': '20 60% 20%',
        '--sidebar-border': '30 30% 85%',
        '--sidebar-ring': '30 90% 55%',
      },
      dark: {
        '--background': '25 30% 15%',
        '--foreground': '30 20% 90%',
        '--card': '25 30% 18%',
        '--card-foreground': '30 20% 90%',
        '--popover': '25 30% 18%',
        '--popover-foreground': '30 20% 90%',
        '--primary': '30 90% 55%',
        '--primary-foreground': '25 80% 40%',
        '--secondary': '25 80% 40%',
        '--secondary-foreground': '30 20% 90%',
        '--muted': '25 30% 25%',
        '--muted-foreground': '30 20% 60%',
        '--accent': '40 95% 65%',
        '--accent-foreground': '30 20% 90%',
        '--destructive': '0 62.8% 30.6%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '25 30% 25%',
        '--input': '25 30% 25%',
        '--ring': '40 95% 65%',
        '--radius': '0.5rem',
        '--sidebar-background': '25 30% 25%',
        '--sidebar-foreground': '30 20% 60%',
        '--sidebar-primary': '30 90% 55%',
        '--sidebar-primary-foreground': '25 80% 40%',
        '--sidebar-accent': '25 80% 40%',
        '--sidebar-accent-foreground': '30 20% 90%',
        '--sidebar-border': '25 30% 25%',
        '--sidebar-ring': '40 95% 65%',
      },
    },
  };

  // State to manage the active color scheme ID.
  const [activeColorSchemeId, setActiveColorSchemeId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedColorScheme') || 'wasfah-default';
    }
    return 'wasfah-default';
  });

  // Frontend representation of color schemes for display (for preview circles)
  const displayColorSchemes = [
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

  // Ensure component is mounted for safe DOM access
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to apply CSS variables to the <html> element
  // This is wrapped in useCallback to prevent unnecessary re-creations
  const applyColorSchemeVars = useCallback(() => {
    if (!mounted || !document.documentElement) return;

    // Determine the current effective theme (light or dark)
    const currentMode = (theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme) as 'light' | 'dark'; // Explicitly cast to 'light' or 'dark'

    const schemeVars = colorSchemeDefinitions[activeColorSchemeId]?.[currentMode];

    if (schemeVars) {
      for (const [prop, value] of Object.entries(schemeVars)) {
        document.documentElement.style.setProperty(prop, value);
      }
      localStorage.setItem('selectedColorScheme', activeColorSchemeId);
    }
  }, [activeColorSchemeId, mounted, theme]); // Dependencies for useCallback

  // Effect to apply colors on initial mount and when activeColorSchemeId or theme changes
  useEffect(() => {
    applyColorSchemeVars();
  }, [applyColorSchemeVars]); // Only re-run when applyColorSchemeVars changes

  if (!mounted) {
    return null;
  }

  // Function to handle clicking an "Apply" button for a color scheme
  const handleApplyColorScheme = (schemeId: string) => {
    setActiveColorSchemeId(schemeId); // This will trigger the effect to re-apply vars
    toast({
      title: "Color Scheme Applied!",
      description: `"${displayColorSchemes.find(s => s.id === schemeId)?.name}" color scheme has been set.`,
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
        {/* Theme Selection (Light/Dark/System) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Theme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={setTheme}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center">
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
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
            <CardTitle className="text-primary">Color Scheme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {displayColorSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className={`p-4 border rounded-lg transition-colors ${
                  activeColorSchemeId === scheme.id ? 'border-secondary ring-2 ring-secondary' : 'hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground">{scheme.name}</h3>
                    <p className="text-sm text-muted-foreground">{scheme.description}</p>
                  </div>
                  <Button
                    variant={activeColorSchemeId === scheme.id ? 'default' : 'outline'}
                    size="sm"
                    className={activeColorSchemeId === scheme.id ? 'bg-secondary hover:bg-primary text-secondary-foreground' : ''}
                    onClick={() => handleApplyColorScheme(scheme.id)}
                    disabled={activeColorSchemeId === scheme.id}
                  >
                    {activeColorSchemeId === scheme.id ? 'Active' : 'Apply'}
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
