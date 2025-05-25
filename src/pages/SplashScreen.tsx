
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Camera, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

// Define splash screen content with high-resolution images
const splashScreens = [
  {
    title: 'Welcome to Wasfah AI',
    description: 'Your personal AI chef that helps you discover amazing recipes tailored to your preferences and dietary needs.',
    image: '/lovable-uploads/d2f93f09-f195-4ab8-91bc-f9369a0fa2e8.png',
    isGif: false
  },
  {
    title: 'Scan Any Dish',
    description: 'Take a photo of any dish to instantly identify ingredients and get nutritional information. Perfect for tracking your diet goals!',
    image: '/lovable-uploads/fe3b59a8-1853-4e9f-90d0-2c00d1a21d78.png',
    isGif: false
  },
  {
    title: 'Cook with AI Chef',
    description: 'Get personalized cooking advice and recipe recommendations from our AI chef assistants.',
    image: '/lovable-uploads/9b05b1e3-4b54-4a1e-9961-e5d2a7da7672.png',
    isGif: false,
    position: 'center'
  },
  {
    title: 'Create & Share Recipes',
    description: 'Create your own recipes and share them with a vibrant community of food enthusiasts around the world.',
    image: '/lovable-uploads/3d48f7fe-a194-4102-a10d-a942ddfb054c.png',
    isGif: false,
    position: 'center'
  }
];

export default function SplashScreen() {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading high-resolution resources
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (autoAdvance && isLoaded) {
      // Start progress animation
      const startTime = Date.now();
      const duration = 4000; // 4 seconds per screen to give users more time to read
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(100, (elapsed / duration) * 100);
        setProgress(newProgress);
        
        if (newProgress < 100) {
          timer = setTimeout(() => {
            requestAnimationFrame(updateProgress);
          }, 16); // ~60fps
        } else {
          // Move to next screen or navigate to auth
          if (currentScreen < splashScreens.length - 1) {
            setCurrentScreen(prev => prev + 1);
            setProgress(0);
          } else {
            navigate('/auth');
          }
        }
      };
      
      requestAnimationFrame(updateProgress);
      
      return () => {
        cancelAnimationFrame(requestAnimationFrame(updateProgress));
        if (timer) clearTimeout(timer);
      };
    }
  }, [currentScreen, navigate, autoAdvance, isLoaded]);

  const handleNext = () => {
    if (currentScreen < splashScreens.length - 1) {
      setCurrentScreen(prev => prev + 1);
      setProgress(0);
    } else {
      navigate('/auth');
    }
    setAutoAdvance(false);
  };

  const handleSkip = () => {
    navigate('/auth');
  };

  // Safeguard against out-of-bounds index access
  const safeIndex = Math.min(Math.max(0, currentScreen), splashScreens.length - 1);
  const currentSplashScreen = splashScreens[safeIndex];

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-wasfah-light-gray to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-wasfah-bright-teal/10 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-t-wasfah-bright-teal border-r-wasfah-bright-teal/40 border-b-wasfah-bright-teal/10 border-l-wasfah-bright-teal/30 animate-spin"></div>
          </div>
          <p className="text-wasfah-deep-teal dark:text-wasfah-bright-teal font-medium">Loading Wasfah AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-wasfah-light-gray to-white dark:from-gray-900 dark:to-gray-800">
      {/* Skip button */}
      <div className="w-full flex justify-end p-4">
        <Button 
          variant="ghost" 
          className="text-wasfah-deep-teal hover:bg-wasfah-light-gray dark:text-wasfah-bright-teal dark:hover:bg-gray-800"
          onClick={handleSkip}
        >
          Skip
        </Button>
      </div>
      
      {/* Image section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div 
          key={currentScreen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md overflow-hidden rounded-3xl shadow-xl mb-8 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl"
        >
          <div className="relative bg-gradient-to-b from-black/5 to-transparent dark:from-white/5 rounded-3xl overflow-hidden">
            {currentSplashScreen?.image && (
              <img 
                src={currentSplashScreen.image}
                alt={currentSplashScreen.title || 'Splash screen'} 
                className={`w-full h-auto object-cover ${
                  currentSplashScreen.position === 'center' ? 'object-center' : 'object-top'
                }`}
                style={{ maxHeight: '350px' }}
              />
            )}
            
            {(currentScreen === 2 || currentScreen === 3) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-wasfah-bright-teal/70 to-transparent h-16"></div>
            )}

            {currentScreen === 0 && (
              <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-black/20 to-transparent"></div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          key={`text-${currentScreen}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-md"
        >
          <div className="mb-2">
            {currentScreen === 2 && (
              <div className="inline-block bg-wasfah-bright-teal/20 dark:bg-wasfah-bright-teal/30 p-2 rounded-full mb-3">
                <ChefHat className="h-6 w-6 text-wasfah-bright-teal" />
              </div>
            )}
            {currentScreen === 1 && (
              <div className="inline-block bg-wasfah-bright-teal/20 dark:bg-wasfah-bright-teal/30 p-2 rounded-full mb-3">
                <Camera className="h-6 w-6 text-wasfah-bright-teal" />
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-wasfah-deep-teal mb-2 dark:text-wasfah-bright-teal">
            {currentSplashScreen?.title || 'Welcome to Wasfah'}
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 dark:text-gray-300">
            {currentSplashScreen?.description || 'Discover amazing recipes with our app'}
          </p>
        </motion.div>
      </div>
      
      {/* Navigation and controls */}
      <div className="p-6 w-full max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          {splashScreens.map((_, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full mx-1 transition-all duration-300 ${
                index === currentScreen ? 'bg-wasfah-bright-teal w-6' : 'bg-gray-300 dark:bg-gray-600 w-2'
              }`}
            />
          ))}
        </div>
        
        <Progress 
          value={progress} 
          className="h-1 mb-6"
        />
        
        <Button
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white rounded-full py-6 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 dark:bg-wasfah-bright-teal/90 dark:hover:bg-wasfah-bright-teal"
          onClick={handleNext}
        >
          {currentScreen < splashScreens.length - 1 ? (
            <>Next <ChevronRight size={20} className="ml-2" /></>
          ) : (
            'Get Started'
          )}
        </Button>
      </div>
    </div>
  );
}
