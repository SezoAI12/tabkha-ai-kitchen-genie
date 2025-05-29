
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Wine, GlassWater, Citrus, Droplet } from 'lucide-react';

export interface DrinkOptions {
  baseAlcohol: string;
  strength: number;
  flavorProfile: string[];
  mixers: string[];
  garnish: string;
  temperature: string;
  sweetness: number;
  specialty: string;
}

interface DrinkCustomizationFormProps {
  onGenerateDrink: (options: DrinkOptions) => void;
  onBack: () => void;
}

export const DrinkCustomizationForm: React.FC<DrinkCustomizationFormProps> = ({
  onGenerateDrink,
  onBack
}) => {
  const [drinkOptions, setDrinkOptions] = useState<DrinkOptions>({
    baseAlcohol: '',
    strength: 40,
    flavorProfile: [],
    mixers: [],
    garnish: '',
    temperature: '',
    sweetness: 50,
    specialty: ''
  });

  const baseAlcohols = [
    'Vodka', 'Gin', 'Rum', 'Whiskey', 'Tequila', 'Brandy', 'Wine', 'Beer'
  ];

  const flavorProfiles = [
    'Citrusy', 'Sweet', 'Bitter', 'Spicy', 'Herbal', 'Fruity', 'Smoky', 'Creamy'
  ];

  const mixers = [
    'Tonic Water', 'Soda Water', 'Ginger Beer', 'Fruit Juice', 'Simple Syrup', 
    'Bitters', 'Vermouth', 'Liqueur', 'Cola', 'Cranberry Juice'
  ];

  const garnishes = [
    'Lemon Twist', 'Lime Wheel', 'Orange Peel', 'Cherry', 'Olive', 
    'Mint Leaves', 'Salt Rim', 'Sugar Rim', 'None'
  ];

  const temperatures = ['On the Rocks', 'Neat', 'Chilled', 'Hot', 'Frozen'];

  const specialties = [
    'Classic Cocktail', 'Signature Mix', 'Low Alcohol', 'Mocktail Version', 
    'Regional Specialty', 'Seasonal Special'
  ];

  const handleFlavorProfileChange = (flavor: string, checked: boolean) => {
    setDrinkOptions(prev => ({
      ...prev,
      flavorProfile: checked 
        ? [...prev.flavorProfile, flavor]
        : prev.flavorProfile.filter(f => f !== flavor)
    }));
  };

  const handleMixerChange = (mixer: string, checked: boolean) => {
    setDrinkOptions(prev => ({
      ...prev,
      mixers: checked 
        ? [...prev.mixers, mixer]
        : prev.mixers.filter(m => m !== mixer)
    }));
  };

  const handleGenerate = () => {
    if (!drinkOptions.baseAlcohol || !drinkOptions.temperature) {
      alert('Please select at least a base alcohol and temperature preference');
      return;
    }
    onGenerateDrink(drinkOptions);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wine className="h-5 w-5 text-purple-600" />
          Custom Alcoholic Drink
        </CardTitle>
        <p className="text-gray-600">Create your perfect drink by customizing the options below</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Base Alcohol */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Base Alcohol</Label>
          <Select 
            value={drinkOptions.baseAlcohol} 
            onValueChange={(value) => setDrinkOptions(prev => ({ ...prev, baseAlcohol: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose your base alcohol" />
            </SelectTrigger>
            <SelectContent>
              {baseAlcohols.map((alcohol) => (
                <SelectItem key={alcohol} value={alcohol}>{alcohol}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Alcohol Strength */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Alcohol Strength: {drinkOptions.strength}%</Label>
          <Slider
            value={[drinkOptions.strength]}
            onValueChange={(value) => setDrinkOptions(prev => ({ ...prev, strength: value[0] }))}
            max={80}
            min={10}
            step={5}
            className="w-full"
          />
        </div>

        {/* Flavor Profile */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Flavor Profile (select multiple)</Label>
          <div className="grid grid-cols-2 gap-2">
            {flavorProfiles.map((flavor) => (
              <div key={flavor} className="flex items-center space-x-2">
                <Checkbox
                  id={`flavor-${flavor}`}
                  checked={drinkOptions.flavorProfile.includes(flavor)}
                  onCheckedChange={(checked) => handleFlavorProfileChange(flavor, checked as boolean)}
                />
                <Label htmlFor={`flavor-${flavor}`} className="text-sm">{flavor}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Mixers */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Mixers & Ingredients</Label>
          <div className="grid grid-cols-2 gap-2">
            {mixers.map((mixer) => (
              <div key={mixer} className="flex items-center space-x-2">
                <Checkbox
                  id={`mixer-${mixer}`}
                  checked={drinkOptions.mixers.includes(mixer)}
                  onCheckedChange={(checked) => handleMixerChange(mixer, checked as boolean)}
                />
                <Label htmlFor={`mixer-${mixer}`} className="text-sm">{mixer}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Sweetness Level */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Sweetness Level: {drinkOptions.sweetness}%</Label>
          <Slider
            value={[drinkOptions.sweetness]}
            onValueChange={(value) => setDrinkOptions(prev => ({ ...prev, sweetness: value[0] }))}
            max={100}
            min={0}
            step={10}
            className="w-full"
          />
        </div>

        {/* Garnish */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Garnish</Label>
          <Select 
            value={drinkOptions.garnish} 
            onValueChange={(value) => setDrinkOptions(prev => ({ ...prev, garnish: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a garnish" />
            </SelectTrigger>
            <SelectContent>
              {garnishes.map((garnish) => (
                <SelectItem key={garnish} value={garnish}>{garnish}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Temperature */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Temperature & Serving Style</Label>
          <Select 
            value={drinkOptions.temperature} 
            onValueChange={(value) => setDrinkOptions(prev => ({ ...prev, temperature: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="How would you like it served?" />
            </SelectTrigger>
            <SelectContent>
              {temperatures.map((temp) => (
                <SelectItem key={temp} value={temp}>{temp}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Specialty */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Drink Category</Label>
          <Select 
            value={drinkOptions.specialty} 
            onValueChange={(value) => setDrinkOptions(prev => ({ ...prev, specialty: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a specialty style" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={handleGenerate} className="flex-1 bg-purple-600 hover:bg-purple-700">
            <GlassWater className="h-4 w-4 mr-2" />
            Generate My Drink
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
