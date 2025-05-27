import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast'; // Ensure you have this hook setup

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  // --- Theme Definitions (Centralized HSL values for each scheme) ---
  // In a larger project, these would ideally be in a global CSS file,
  // but for a single-file solution, we define them here.
  const themeDefinitions = {
    'wasfah-default': {
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
      // Define sidebar vars if they need to change per scheme
      '--sidebar-background': '210 40% 96.1%',
      '--sidebar-foreground': '215.4 16.3% 46.9%',
      '--sidebar-primary': '200 80% 22%',
      '--sidebar-primary-foreground': '0 0% 100%',
      '--sidebar-accent': '170 90% 40%',
      '--sidebar-accent-foreground': '222.2 47.4% 11.2%',
      '--sidebar-border': '214.3 31.8% 91.4%',
      '--sidebar-ring': '222.2 84% 4.9%',
    },
    'ocean-blue': {
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
      '--ring': '215 70% 55%', // Ring color matches secondary
      // Define sidebar vars for this scheme
      '--sidebar-background': '210 15% 90%',
      '--sidebar-foreground': '210 10% 40%',
      '--sidebar-primary': '220 50% 20%',
      '--sidebar-primary-foreground': '0 0% 100%',
      '--sidebar-accent': '215 70% 55%',
      '--sidebar-accent-foreground': '220 30% 15%',
      '--sidebar-border': '210 15% 85%',
      '--sidebar-ring': '215 70% 55%',
    },
    'forest-green': {
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
      '--ring': '150 70% 40%', // Ring color matches secondary
      // Define sidebar vars for this scheme
      '--sidebar-background': '140 10% 90%',
      '--sidebar-foreground': '140 5% 40%',
      '--sidebar-primary': '160 50% 20%',
      '--sidebar-primary-foreground': '0 0% 100%',
      '--sidebar-accent': '150 70% 40%',
      '--sidebar-accent-foreground': '160 30% 15%',
      '--sidebar-border': '140 10% 85%',
      '--sidebar-ring': '150 70% 40%',
    },
    'sunset-orange': {
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
      '--ring': '30 90% 55%', // Ring color matches secondary
      // Define sidebar vars for this scheme
      '--sidebar-background': '30 30% 90%',
      '--sidebar-foreground': '30 20% 50%',
      '--sidebar-primary': '25 80% 40%',
      '--sidebar-primary-foreground': '0 0% 100%',
      '--sidebar-accent': '30 90% 55%',
      '--sidebar-accent-foreground': '20 60% 20%',
      '--sidebar-border': '30 30% 85%',
      '--sidebar-ring': '30 90% 55%',
    },
  };

  // State to manage the active color scheme ID.
  // Initialize from localStorage or a default.
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

  // Ensure component is mounted for safe DOM access (for next-themes and localStorage)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect to apply the selected color scheme's CSS variables to the <html> tag
  useEffect(() => {
    if (!mounted) return;

    // Apply the CSS variables for the active color scheme
    const currentSchemeVars = themeDefinitions[activeColorSchemeId];
    if (currentSchemeVars) {
      for (const [prop, value] of Object.entries(currentSchemeVars)) {
        document.documentElement.style.setProperty(prop, value);
      }
      localStorage.setItem('selectedColorScheme', activeColorSchemeId);
    }

    // Handle light/dark mode interaction for specific variables if needed
    // The next-themes library will add/remove the 'dark' class on <html>.
    // If you have different HSL values for --primary, --secondary etc. within
    // your global CSS's .dark selector, those will take precedence.
    // If your theme definitions above are comprehensive (like these are),
    // they will override the light/dark values for the common variables.
    // Ensure your base globals.css still contains the :root and .dark definitions
    // for all HSL variables as a fallback/initial state.
    // This example relies on the 'themeDefinitions' directly setting the variables
    // so it implicitly handles the combination.
  }, [activeColorSchemeId, mounted]);

  // Handle the light/dark mode changes from next-themes
  useEffect(() => {
    if (!mounted) return;
    // When theme changes (light/dark/system), re-apply the current color scheme
    // to ensure its variables are the dominant ones after next-themes might
    // change the base HSL values on the <html> tag.
    // This makes sure our selected color scheme is always applied correctly
    // after a theme switch.
    const currentSchemeVars = themeDefinitions[activeColorSchemeId];
    if (currentSchemeVars) {
      for (const [prop, value] of Object.entries(currentSchemeVars)) {
        document.documentElement.style.setProperty(prop, value);
      }
    }
  }, [theme, mounted, activeColorSchemeId]); // Depend on 'theme' here

  if (!mounted) {
    return null;
  }

  // Function to apply a selected color scheme
  const applyColorScheme = (schemeId: string) => {
    setActiveColorSchemeId(schemeId); // This will trigger the useEffect to apply styles
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
            {/* These should now use your semantic colors defined in tailwind.config.js */}
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
                    {/* Using semantic text colors that adapt with light/dark mode */}
                    <h3 className="font-medium text-foreground">{scheme.name}</h3>
                    <p className="text-sm text-muted-foreground">{scheme.description}</p>
                  </div>
                  <Button
                    variant={activeColorSchemeId === scheme.id ? 'default' : 'outline'}
                    size="sm"
                    className={activeColorSchemeId === scheme.id ? 'bg-secondary hover:bg-primary text-secondary-foreground' : ''}
                    onClick={() => applyColorScheme(scheme.id)}
                    disabled={activeColorSchemeId === scheme.id}
                  >
                    {activeColorSchemeId === scheme.id ? 'Active' : 'Apply'}
                  </Button>
                </div>
                <div className="flex space-x-2">
                  {scheme.colors.map((color, index) => (
                    // These preview circles use the direct Tailwind classes defined with hex codes
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
