
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wine, GlassWater } from 'lucide-react';

export interface DrinkOptions {
  base: string;
  sournessSweetness: number[];
  dryRefreshing: number[];
  glassType: string;
  themes: string[];
}

interface DrinkCustomizationFormProps {
  onGenerateDrink: (options: DrinkOptions) => void;
  onBack: () => void;
}

const baseOptions = [
  'No Alcohol', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Brandy', 'Liqueur', 'Sake', 'Other', 'Any Alcohol'
];

const glassOptions = [
  'Martini glass', 'Highball glass', 'Collins glass', 'Old Fashioned glass', 'Coupe glass',
  'Margarita glass', 'Shot glass', 'Wine glass', 'Champagne flute', 'Mug', 'Any Glass'
];

const themeOptions = [
  'Tropical', 'Holiday', 'Spicy', 'Citrusy', 'Herbal', 'Classic', 'Fruity', 'Minty',
  'Chocolatey', 'Sweet', 'Sour', 'Bitter', 'Savory', 'Refreshing', 'Warm', 'Cold', 'Any Theme'
];

export const DrinkCustomizationForm: React.FC<DrinkCustomizationFormProps> = ({ onGenerateDrink, onBack }) => {
  const [base, setBase] = useState<string>('');
  const [sournessSweetness, setSournessSweetness] = useState<number[]>([50]);
  const [dryRefreshing, setDryRefreshing] = useState<number[]>([50]);
  const [glassType, setGlassType] = useState<string>('');
  const [themes, setThemes] = useState<string[]>([]);

  const handleThemeChange = (theme: string, isChecked: boolean | string) => {
    const checked = typeof isChecked === 'boolean' ? isChecked : isChecked === 'true';
    if (checked) {
      setThemes(prev => [...prev, theme]);
    } else {
      setThemes(prev => prev.filter(t => t !== theme));
    }
  };

  const handleSubmit = () => {
    if (!base || !glassType) {
      console.error("Please select a Base and Glass Type.");
      return;
    }
    const options: DrinkOptions = {
      base,
      sournessSweetness,
      dryRefreshing,
      glassType,
      themes,
    };
    onGenerateDrink(options);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wine className="h-5 w-5 text-purple-600" />
            Custom Alcoholic Drink
          </CardTitle>
          <p className="text-gray-600">Create your perfect drink by customizing the options below</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div variants={itemVariants}>
            <Label htmlFor="base-select" className="text-lg font-medium">1. Select Base</Label>
            <Select onValueChange={setBase} value={base}>
              <SelectTrigger id="base-select" className="w-full mt-2">
                <SelectValue placeholder="Choose an alcohol base or 'No Alcohol'" />
              </SelectTrigger>
              <SelectContent>
                {baseOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label htmlFor="sourness-sweetness-slider" className="text-lg font-medium">2. Sourness / Sweetness</Label>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sour</span>
              <Slider
                id="sourness-sweetness-slider"
                value={sournessSweetness}
                onValueChange={setSournessSweetness}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Sweet</span>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Current: {sournessSweetness[0] < 40 ? 'More Sour' : sournessSweetness[0] > 60 ? 'More Sweet' : 'Balanced'}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label htmlFor="dry-refreshing-slider" className="text-lg font-medium">3. Dry / Refreshing</Label>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Dry</span>
              <Slider
                id="dry-refreshing-slider"
                value={dryRefreshing}
                onValueChange={setDryRefreshing}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Refreshing</span>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Current: {dryRefreshing[0] < 40 ? 'More Dry' : dryRefreshing[0] > 60 ? 'More Refreshing' : 'Balanced'}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label htmlFor="glass-select" className="text-lg font-medium">4. Select Glass Type</Label>
            <Select onValueChange={setGlassType} value={glassType}>
              <SelectTrigger id="glass-select" className="w-full mt-2">
                <SelectValue placeholder="Choose a glass type" />
              </SelectTrigger>
              <SelectContent>
                {glassOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label className="text-lg font-medium">5. Select Themes (Optional)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {themeOptions.map(theme => (
                <div key={theme} className="flex items-center space-x-2">
                  <Checkbox
                    id={`theme-${theme}`}
                    checked={themes.includes(theme)}
                    onCheckedChange={(checked) => handleThemeChange(theme, checked as boolean)}
                  />
                  <Label htmlFor={`theme-${theme}`} className="text-sm">{theme}</Label>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-purple-600 hover:bg-purple-700">
              <GlassWater className="h-4 w-4 mr-2" />
              Generate My Drink
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
