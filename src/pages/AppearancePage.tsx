
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, Palette, Type, Eye, Monitor } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AppearancePage() {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState([16]);
  const [colorScheme, setColorScheme] = useState('default');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Apply theme changes to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    if (value === 'dark') {
      setDarkMode(true);
    } else if (value === 'light') {
      setDarkMode(false);
    } else {
      // System theme
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemDark);
    }
    toast({
      title: "Theme Updated",
      description: `Theme changed to ${value}`,
    });
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value[0]}px`;
    toast({
      title: "Font Size Updated",
      description: `Font size set to ${value[0]}px`,
    });
  };

  const colorSchemes = [
    { id: 'default', name: 'Default', primary: '#0EA5E9', secondary: '#10B981' },
    { id: 'warm', name: 'Warm', primary: '#F59E0B', secondary: '#EF4444' },
    { id: 'cool', name: 'Cool', primary: '#8B5CF6', secondary: '#06B6D4' },
    { id: 'nature', name: 'Nature', primary: '#059669', secondary: '#84CC16' }
  ];

  const previewText = "The quick brown fox jumps over the lazy dog. This is a preview of how your text will look with the current settings.";

  return (
    <PageContainer header={{ title: 'Appearance', showBackButton: true }}>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Appearance</h1>
          <p className="text-gray-600">Customize how WasfahAI looks and feels</p>
        </div>

        {/* Theme Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette size={20} />
              Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('light')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Sun size={24} />
                <span>Light</span>
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('dark')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Moon size={24} />
                <span>Dark</span>
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('system')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Monitor size={24} />
                <span>System</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Color Scheme */}
        <Card>
          <CardHeader>
            <CardTitle>Color Scheme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {colorSchemes.map((scheme) => (
                <Button
                  key={scheme.id}
                  variant={colorScheme === scheme.id ? 'default' : 'outline'}
                  onClick={() => setColorScheme(scheme.id)}
                  className="flex items-center justify-between p-4 h-auto"
                >
                  <span>{scheme.name}</span>
                  <div className="flex gap-1">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: scheme.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: scheme.secondary }}
                    />
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type size={20} />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Font Size: {fontSize[0]}px
              </label>
              <Slider
                value={fontSize}
                onValueChange={handleFontSizeChange}
                max={24}
                min={12}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <p style={{ fontSize: `${fontSize[0]}px` }}>{previewText}</p>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye size={20} />
              Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Reduce Motion</label>
                <p className="text-sm text-gray-600">Minimize animations and transitions</p>
              </div>
              <Switch
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">High Contrast</label>
                <p className="text-sm text-gray-600">Increase contrast for better visibility</p>
              </div>
              <Switch
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Sample Recipe Card</h3>
                <Badge>New</Badge>
              </div>
              <p className="text-gray-600">This is how content will appear with your current settings.</p>
              <div className="flex gap-2">
                <Button size="sm">Primary Action</Button>
                <Button variant="outline" size="sm">Secondary</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
