// src/components/drinks/DrinkCustomizationForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Assuming Shadcn/UI Button
import { Label } from '@/components/ui/label'; // Assuming Shadcn/UI Label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming Shadcn/UI Select
import { Slider } from '@/components/ui/slider'; // Assuming Shadcn/UI Slider
import { Checkbox } from '@/components/ui/checkbox'; // Assuming Shadcn/UI Checkbox
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming Shadcn/UI Card

// Define the type for the options the form will return
// This type definition seems correct based on the form fields you requested
export interface DrinkOptions {
  base: string;
  sournessSweetness: number[]; // Slider returns an array [value]
  dryRefreshing: number[]; // Slider returns an array [value]
  glassType: string;
  themes: string[]; // Array of selected themes
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
  const [sournessSweetness, setSournessSweetness] = useState<number[]>([50]); // Default to balanced
  const [dryRefreshing, setDryRefreshing] = useState<number[]>([50]); // Default to balanced
  const [glassType, setGlassType] = useState<string>('');
  const [themes, setThemes] = useState<string[]>([]);

  const handleThemeChange = (theme: string, isChecked: boolean) => {
    if (isChecked) {
      setThemes(prev => [...prev, theme]);
    } else {
      setThemes(prev => prev.filter(t => t !== theme));
    }
  };

  const handleSubmit = () => {
    if (!base || !glassType) {
        // Basic validation
        // Using toast for better UI feedback than alert
        // Ensure you have useToast imported and configured
        // If not, you can use a simple alert or console.error for now
        console.error("Please select a Base and Glass Type.");
        // alert("Please select a Base and Glass Type.");
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

  // Framer Motion variants for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08 // Slightly faster stagger
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
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800 dark:text-white">Customize Your Drink</motion.h2>

      {/* Base Selection */}
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

      {/* Sourness/Sweetness Slider */}
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
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Current: {sournessSweetness[0] < 40 ? 'More Sour' : sournessSweetness[0] > 60 ? 'More Sweet' : 'Balanced'}</p>
      </motion.div>

      {/* Dry/Refreshing Slider */}
      <motion.div variants={itemVariants}>
        <
