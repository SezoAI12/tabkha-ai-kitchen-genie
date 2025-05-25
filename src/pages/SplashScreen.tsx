import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Camera, ChefHat, Sparkles, Users, Heart, ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Enhanced splash screen content with more engaging features
const splashScreens = [
  {
    id: 'welcome',
    title: 'Welcome to Wasfah AI',
    subtitle: 'Your Personal AI Chef',
    description: 'Transform your cooking experience with intelligent recipe recommendations tailored to your taste and dietary needs.',
    image: '/lovable-uploads/d2f93f09-f195-4ab8-91bc-f9369a0fa2e8.png',
    icon: <Sparkles className="w-8 h-8" />,
    gradient: 'from-orange-400 to-pink-500',
    features: ['50,000+ Recipes', 'AI-Powered', 'Personalized'],
    animation: 'float'
  },
  {
    id: 'scan',
    title: 'Scan Any Dish',
    subtitle: 'Instant Recognition',
    description: 'Point your camera at any dish to discover ingredients, nutritional info, and cooking tips instantly!',
    image: '/lovable-uploads/fe3b59a8-1853-4e9f-90d0-2c00d1a21d78.png',
    icon: <Camera className="w-8 h-8" />,
    gradient: 'from-blue-400 to-cyan-500',
    features: ['Calorie Counter', 'Ingredient List', 'Allergen Detection'],
    animation: 'pulse'
  },
  {
    id: 'chef',
    title: 'Your AI Chef Assistant',
    subtitle: 'Cook Like a Pro',
    description: 'Get step-by-step guidance, cooking tips, and real-time assistance from our advanced AI chef.',
    image: '/lovable-uploads/9b05b1e3-4b54-4a1e-9961-e5d2a7da7672.png',
    icon: <ChefHat className="w-8 h-8" />,
    gradient: 'from-purple-400 to-indigo-500',
    features: ['Voice Commands', 'Timer Alerts', 'Skill Levels'],
    animation: 'bounce',
    position: 'center'
  },
  {
    id: 'community',
    title: 'Join the Community',
    subtitle: 'Share & Discover',
    description: 'Connect with food lovers worldwide. Share your creations and discover authentic recipes from every culture.',
    image: '/lovable-uploads/3d48f7fe-a194-4102-a10d-a942ddfb054c.png',
    icon: <Users className="w-8 h-8" />,
    gradient: 'from-green-400 to-teal-500',
    features: ['Recipe Sharing', 'Chef Ratings', 'Live Events'],
    animation: 'slide',
    position: 'center'
  }
];

export default function SplashScreen() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Preload images
  useEffect(() => {
    const imagePromises = splashScreens.map(screen => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = screen.image;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(true)); // Still load even if some images fail
  }, []);

  // Auto-advance logic
  useEffect(() => {
    if (!autoAdvance || !isLoaded || isPaused) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    const duration = 5000; // 5 seconds per screen
    const increment = 100 / (duration / 16); // Update every ~16ms for smooth animation

    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          if (currentScreen < splashScreens.length - 1) {
            setCurrentScreen(current => current + 1);
            return 0;
          } else {
            handleComplete();
            return 100;
          }
        }
        return newProgress;
      });
    }, 16);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentScreen, autoAdvance, isLoaded, isPaused]);

  const handleComplete = () => {
    // Save onboarding completion
    localStorage.setItem('onboardingCompleted', 'true');
    window.location.href = '/auth';
  };

  const handleNext = () => {
    setAutoAdvance(false);
    if (currentScreen < splashScreens.length - 1) {
      setCurrentScreen(prev => prev + 1);
      setProgress(0);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentScreen > 0) {
      setAutoAdvance(false);
      setCurrentScreen(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleDotClick = (index: number) => {
    setAutoAdvance(false);
    setCurrentScreen(index);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
    setAutoAdvance(!isPaused);
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0 && currentScreen < splashScreens.length - 1) {
        handleNext();
      } else if (diff < 0 && currentScreen > 0) {
        handlePrevious();
      }
    }
  };

  const currentSplashScreen = splashScreens[currentScreen];

  // Loading screen
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-pink-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-pulse opacity-20"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-ping opacity-40"></div>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <ChefHat className="w-12 h-12 text-orange-500" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Wasfah AI</h2>
          <p className="text-gray-600">Preparing your culinary journey...</p>
          <div className="mt-4 w-48 mx-auto">
            <Progress value={33} className="h-1" />
          </div>
        </div>
      </div>
    );
  }

  // Animation classes based on screen type
  const getAnimationClass = (animation?: string) => {
    switch (animation) {
      case 'float':
        return 'animate-float';
      case 'pulse':
        return 'animate-pulse-slow';
      case 'bounce':
        return 'animate-bounce-slow';
      case 'slide':
        return 'animate-slide-up';
      default:
        return '';
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header controls */}
      <div className="w-full flex justify-between items-center p-4 z-10">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayPause}
            className="rounded-full"
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </Button>
        </div>
        <Button 
          variant="ghost" 
          className="font-medium"
          onClick={handleSkip}
        >
          Skip
          <ArrowRight size={16} className="ml-1" />
        </Button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        {/* Background decoration */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentSplashScreen.gradient} opacity-5`}></div>
        
        {/* Image container with animations */}
        <div className={`relative mb-8 ${getAnimationClass(currentSplashScreen.animation)}`}>
          <div className="relative w-full max-w-md">
            {/* Decorative background shape */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${currentSplashScreen.gradient} opacity-20 blur-2xl rounded-full`}></div>
            
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-105">
              <img 
                src={currentSplashScreen.image}
                alt={currentSplashScreen.title} 
                className={`w-full h-auto object-cover ${
                  currentSplashScreen.position === 'center' ? 'object-center' : 'object-top'
                }`}
                style={{ maxHeight: '400px' }}
              />
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${currentSplashScreen.gradient} opacity-20`}></div>
              
              {/* Icon badge */}
              <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-transparent bg-gradient-to-r ${currentSplashScreen.gradient} bg-clip-text`}>
                {currentSplashScreen.icon}
              </div>
            </div>
          </div>
        </div>
        
        {/* Text content */}
        <div className="text-center max-w-lg space-y-4">
          {/* Subtitle */}
          <p className={`text-sm font-medium bg-gradient-to-r ${currentSplashScreen.gradient} bg-clip-text text-transparent uppercase tracking-wider`}>
            {currentSplashScreen.subtitle}
          </p>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {currentSplashScreen.title}
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed">
            {currentSplashScreen.description}
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {currentSplashScreen.features.map((feature, index) => (
              <span 
                key={index}
                className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${currentSplashScreen.gradient} text-white rounded-full shadow-sm`}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Navigation and controls */}
      <div className="p-6 w-full max-w-md mx-auto">
        {/* Progress dots */}
        <div className="flex justify-center mb-4">
          {splashScreens.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full mx-1 transition-all duration-300 ${
                index === currentScreen 
                  ? `bg-gradient-to-r ${splashScreens[index].gradient} w-8` 
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="relative mb-6">
          <Progress value={progress} className="h-1" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-gray-500">{currentScreen + 1} of {splashScreens.length}</span>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex gap-3">
          {currentScreen > 0 && (
            <Button
              variant="outline"
              className="flex-1 rounded-full py-6"
              onClick={handlePrevious}
            >
              Previous
            </Button>
          )}
          <Button
            className={`flex-1 bg-gradient-to-r ${currentSplashScreen.gradient} text-white rounded-full py-6 flex items-center justify-center shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105`}
            onClick={handleNext}
          >
            {currentScreen < splashScreens.length - 1 ? (
              <>
                Next
                <ChevronRight size={20} className="ml-2" />
              </>
            ) : (
              <>
                Get Started
                <Heart size={20} className="ml-2" />
              </>
            )}
          </Button>
        </div>
        
        {/* Trust indicators */}
        {currentScreen === splashScreens.length - 1 && (
          <div className="mt-4 text-center text-xs text-gray-500">
            Join 50,000+ home chefs • 4.8★ rating • Free to start
          </div>
        )}
      </div>
      
      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
      `}</style>
    </div>
  );
}
