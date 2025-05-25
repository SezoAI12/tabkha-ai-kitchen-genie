
import React, { useState } from 'react';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { GlobalCuisine } from '@/components/GlobalCuisine';
import { MealPlanning } from '@/components/MealPlanning';
import { RecipeScanner } from '@/components/RecipeScanner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Navbar language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <Features language={language} />
      <GlobalCuisine language={language} />
      <MealPlanning language={language} />
      <RecipeScanner language={language} />
      <Footer language={language} />
    </div>
  );
};

export default Index;
