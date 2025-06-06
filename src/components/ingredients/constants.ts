
import {
  ChefHat, Salad, Soup, Package2, Utensils,
  Cookie, IceCream, Cake, Sparkles, GlassWater,
  Wine, Beer, Coffee, Wheat, Egg, Milk, Drumstick,
  LeafyGreen, Fish, Carrot, Martini, Flame, Calendar,
  Wrench, Crown, Grape, Zap, FlameKindling
} from 'lucide-react';
import { MainCategory, PantryItem, FilterOptions } from './types';

export const mainCategories: MainCategory[] = [
  {
    id: 'food',
    name: 'Food',
    icon: ChefHat,
    subcategories: [
      { name: 'Main Dishes', icon: ChefHat },
      { name: 'Appetizers', icon: Salad },
      { name: 'Pickles', icon: Package2 },
      { name: 'Soups', icon: Soup },
      { name: 'Sauces', icon: Utensils },
      { name: 'Others', icon: Utensils }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: Cake,
    subcategories: [
      { name: 'Traditional', icon: Cookie },
      { name: 'Western', icon: IceCream },
      { name: 'Pastries', icon: Cake },
      { name: 'Ice Cream', icon: IceCream },
      { name: 'Others', icon: Sparkles }
    ]
  },
  {
    id: 'drinks',
    name: 'Non-Alcoholic Drinks',
    icon: Coffee,
    subcategories: [
      { name: 'Detox', icon: GlassWater },
      { name: 'Hot Drinks', icon: Coffee },
      { name: 'Smoothies', icon: Sparkles },
      { name: 'Juices', icon: GlassWater },
      { name: 'Others', icon: GlassWater }
    ]
  },
  {
    id: 'alcohol',
    name: 'Alcohol Drinks',
    icon: Wine,
    subcategories: [
      { name: 'Fermented Beverages', icon: Beer, requiresCustomForm: true },
      { name: 'Distilled Spirits', icon: Flame, requiresCustomForm: true },
      { name: 'Mixed Drinks & Cocktails', icon: Martini, requiresCustomForm: true }
    ]
  }
];

export const alcoholSubcategories = {
  'Fermented Beverages': [
    {
      name: 'Beer',
      icon: Beer,
      types: [
        'Lager (Pilsner, American Lager, Bock)',
        'Ale (IPA, Pale Ale, Stout, Porter, Wheat Beer, Brown Ale, Belgian Ale)',
        'Sour (Lambic, Gose, Berliner Weisse)',
        'Hybrid (Cream Ale, Kölsch)',
        'Other (Cider, Perry)'
      ],
      characteristics: ['ABV', 'IBU', 'Color', 'Country of Origin', 'Brewery']
    },
    {
      name: 'Wine',
      icon: Grape,
      types: [
        'Red Wine (Cabernet Sauvignon, Merlot, Pinot Noir, Syrah/Shiraz)',
        'White Wine (Chardonnay, Sauvignon Blanc, Pinot Grigio, Riesling)',
        'Rosé Wine',
        'Sparkling Wine (Champagne, Prosecco, Cava)',
        'Dessert Wine (Port, Sherry, Sauternes, Ice Wine)',
        'Fortified Wine (Port, Sherry, Madeira, Vermouth)'
      ],
      characteristics: ['Grape Varietal', 'Sweetness Level', 'Region/Country', 'Vintage', 'Food Pairing']
    },
    {
      name: 'Other Fermented',
      icon: Sparkles,
      types: [
        'Mead',
        'Sake',
        'Hard Seltzer',
        'Hard Kombucha',
        'Cider'
      ],
      characteristics: ['Base Ingredient', 'ABV', 'Origin']
    }
  ],
  'Distilled Spirits': [
    {
      name: 'Whiskey/Whisky',
      icon: FlameKindling,
      types: [
        'Scotch Whisky (Single Malt, Blended)',
        'Irish Whiskey',
        'Bourbon Whiskey',
        'Rye Whiskey',
        'Canadian Whisky',
        'Japanese Whisky',
        'Tennessee Whiskey',
        'Other World Whiskies'
      ],
      characteristics: ['Age Statement', 'Region', 'Mash Bill', 'Flavor Profile']
    },
    {
      name: 'Vodka',
      icon: Zap,
      types: [
        'Unflavored/Neutral',
        'Flavored (Citrus, Berry, Vanilla, Herbal, Spicy)'
      ],
      characteristics: ['Base Ingredient', 'Origin']
    },
    {
      name: 'Rum',
      icon: Crown,
      types: [
        'White/Light Rum',
        'Gold Rum',
        'Dark Rum',
        'Spiced Rum',
        'Aged/Premium Rum',
        'Cachaca'
      ],
      characteristics: ['Origin', 'Production Method', 'Sweetness']
    },
    {
      name: 'Gin',
      icon: LeafyGreen,
      types: [
        'London Dry Gin',
        'Plymouth Gin',
        'Old Tom Gin',
        'New American/Contemporary Gin',
        'Navy Strength Gin'
      ],
      characteristics: ['Botanical Profile', 'Origin']
    },
    {
      name: 'Tequila & Mezcal',
      icon: Flame,
      types: [
        'Blanco/Silver (Unaged)',
        'Reposado (Aged 2 months - 1 year)',
        'Añejo (Aged 1-3 years)',
        'Extra Añejo (Aged 3+ years)',
        'Cristalino',
        'Mezcal (by agave type and region)'
      ],
      characteristics: ['Agave Type', 'Production Method', 'Origin']
    },
    {
      name: 'Brandy',
      icon: Grape,
      types: [
        'Cognac',
        'Armagnac',
        'Pisco',
        'Apple Brandy (Calvados, Applejack)',
        'Grappa',
        'Other Fruit Brandies (Kirsch, Slivovitz)'
      ],
      characteristics: ['Region', 'Age Classification']
    },
    {
      name: 'Liqueurs & Cordials',
      icon: Sparkles,
      types: [
        'Fruit Liqueurs (Triple Sec, Peach Schnapps, Limoncello)',
        'Herbal/Spice Liqueurs (Jägermeister, Chartreuse, Amaro, Absinthe)',
        'Cream Liqueurs (Baileys)',
        'Nut/Bean Liqueurs (Amaretto, Kahlúa, Frangelico)',
        'Anise Liqueurs (Sambuca, Pastis, Ouzo)'
      ],
      characteristics: ['Sweetness', 'Primary Flavor', 'Origin']
    }
  ],
  'Mixed Drinks & Cocktails': [
    {
      name: 'Classic Cocktails',
      icon: Martini,
      types: [
        'Martini',
        'Old Fashioned',
        'Manhattan',
        'Margarita',
        'Daiquiri',
        'Mojito',
        'Negroni',
        'Whiskey Sour',
        'Gin and Tonic',
        'Bloody Mary',
        'Moscow Mule'
      ],
      characteristics: ['Base Spirit', 'Flavor Profile', 'Serving Glass']
    },
    {
      name: 'Contemporary Cocktails',
      icon: Sparkles,
      types: [
        'Espresso Martini',
        'Aperol Spritz',
        'Paloma',
        'Pisco Sour'
      ],
      characteristics: ['Base Spirit', 'Flavor Profile', 'Serving Glass']
    },
    {
      name: 'Shots & Shooters',
      icon: Zap,
      types: [
        'Jägerbomb',
        'Lemon Drop',
        'B-52',
        'Kamikaze'
      ],
      characteristics: ['Base Spirit', 'Serving Style']
    },
    {
      name: 'Punches & Batched Drinks',
      icon: GlassWater,
      types: [
        'Sangria',
        'Bowl Punches',
        'Party Drinks'
      ],
      characteristics: ['Serving Size', 'Base Spirits', 'Occasion']
    }
  ]
};

export const AI_FILTER_OPTIONS: FilterOptions = {
  dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free'],
  cookTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
  difficulty: ['Beginner', 'Intermediate', 'Expert'],
  cuisine: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
};

export const PANTRY_ITEMS: PantryItem[] = [
  { id: 'p1', name: 'Flour', quantity: '1', unit: 'kg', icon: Wheat },
  { id: 'p2', name: 'Sugar', quantity: '500', unit: 'g', icon: Sparkles },
  { id: 'p3', name: 'Eggs', quantity: '6', unit: 'pcs', icon: Egg },
  { id: 'p4', name: 'Milk', quantity: '1', unit: 'liter', icon: Milk },
  { id: 'p5', name: 'Chicken Breast', quantity: '500', unit: 'g', icon: Drumstick },
  { id: 'p6', name: 'Spinach', quantity: '200', unit: 'g', icon: LeafyGreen },
  { id: 'p7', name: 'Cheese', quantity: '300', unit: 'g', icon: Package2 },
  { id: 'p8', name: 'Salmon', quantity: '400', unit: 'g', icon: Fish },
  { id: 'p9', name: 'Shrimp', quantity: '500', unit: 'g', icon: Fish },
  { id: 'p10', name: 'Carrots', quantity: '5', unit: 'pcs', icon: Carrot },
];
