
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RefreshCw,
  Volume2,
  VolumeX,
  Mic,
  MicOff
} from 'lucide-react';
import { Recipe } from '@/types/index';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

export const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose }) => {
  const { t, language, direction } = useRTL();
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);
  
  const totalSteps = recipe.instructions.length;
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      
      // Set language based on app language
      switch (language) {
        case 'ar':
          recognitionRef.current.lang = 'ar-SA';
          break;
        case 'tr':
          recognitionRef.current.lang = 'tr-TR';
          break;
        default:
          recognitionRef.current.lang = 'en-US';
      }

      recognitionRef.current.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        handleVoiceCommand(command);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: t("Voice recognition error", "خطأ في التعرف على الصوت"),
          description: t("Please try again", "يرجى المحاولة مرة أخرى"),
          variant: "destructive"
        });
      };
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    
    // Commands in different languages
    const nextCommands = ['next', 'forward', 'التالي', 'sonraki'];
    const prevCommands = ['previous', 'back', 'السابق', 'önceki'];
    const repeatCommands = ['repeat', 'again', 'إعادة', 'tekrar'];
    const startCommands = ['start', 'begin', 'ابدأ', 'başla'];
    const pauseCommands = ['stop', 'pause', 'توقف', 'dur'];
    
    if (nextCommands.some(cmd => command.includes(cmd))) {
      nextStep();
    } else if (prevCommands.some(cmd => command.includes(cmd))) {
      prevStep();
    } else if (repeatCommands.some(cmd => command.includes(cmd))) {
      speakCurrentStep();
    } else if (startCommands.some(cmd => command.includes(cmd))) {
      setCurrentStep(0);
      speakCurrentStep();
    } else if (pauseCommands.some(cmd => command.includes(cmd))) {
      stopSpeaking();
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: t("Voice recognition not supported", "التعرف على الصوت غير مدعوم"),
        description: t("Your browser doesn't support voice recognition", "متصفحك لا يدعم التعرف على الصوت"),
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: t("Voice assistant activated", "تم تفعيل المساعد الصوتي"),
        description: language === 'ar' 
          ? "قل 'التالي'، 'السابق'، 'إعادة'، أو 'ابدأ'"
          : language === 'tr'
          ? "Söyle 'sonraki', 'önceki', 'tekrar', veya 'başla'"
          : "Say 'next', 'previous', 'repeat', or 'start'"
      });
    }
  };

  const speakCurrentStep = () => {
    if (!synthRef.current || !isVoiceEnabled) return;

    synthRef.current.cancel();
    
    const stepText = language === 'ar' 
      ? `الخطوة ${currentStep + 1}: ${recipe.instructions[currentStep]}`
      : language === 'tr'
      ? `Adım ${currentStep + 1}: ${recipe.instructions[currentStep]}`
      : `Step ${currentStep + 1}: ${recipe.instructions[currentStep]}`;
    
    const utterance = new SpeechSynthesisUtterance(stepText);
    
    // Set voice language
    const voices = synthRef.current.getVoices();
    let voice = null;
    
    switch (language) {
      case 'ar':
        voice = voices.find(v => v.lang.includes('ar')) || null;
        utterance.lang = 'ar-SA';
        break;
      case 'tr':
        voice = voices.find(v => v.lang.includes('tr')) || null;
        utterance.lang = 'tr-TR';
        break;
      default:
        voice = voices.find(v => v.lang.includes('en')) || null;
        utterance.lang = 'en-US';
    }
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      if (isVoiceEnabled) {
        setTimeout(() => speakCurrentStep(), 500);
      }
    } else {
      toast({
        title: t("Cooking Complete!", "اكتمل الطبخ!"),
        description: t("You've completed all the steps. Enjoy your meal!", "لقد أكملت جميع الخطوات. استمتع بوجبتك!"),
      });
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (isVoiceEnabled) {
        setTimeout(() => speakCurrentStep(), 500);
      }
    }
  };
  
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  
  const resetTimer = () => {
    setTimer(300);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      toast({
        title: t("Timer Complete", "انتهى المؤقت"),
        description: t("Your timer has finished!", "انتهى مؤقتك!"),
      });
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, toast, t]);
  
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className={`sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft size={24} className={direction === 'rtl' ? 'rotate-180' : ''} />
          </Button>
          <h2 className="text-xl font-bold text-wasfah-deep-teal">
            {t("Cooking Mode", "وضع الطبخ")}
          </h2>
          <div className={`flex items-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Button
              variant={isVoiceEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button
              variant={isListening ? "destructive" : "default"}
              size="sm"
              onClick={toggleListening}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-4">
        <div className="mb-4">
          <div className={`flex justify-between items-center mb-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm font-medium">
              {t(`Step ${currentStep + 1} of ${totalSteps}`, `الخطوة ${currentStep + 1} من ${totalSteps}`)}
            </span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {recipe.image && (
          <div 
            className="w-full h-48 mb-4 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${recipe.image})` }}
          />
        )}
        
        <div className={`mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <p className="text-lg leading-relaxed">{recipe.instructions[currentStep]}</p>
        </div>
        
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className={`flex items-center justify-center space-x-4 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Button variant="outline" size="icon" onClick={resetTimer}>
              <RefreshCw size={18} />
            </Button>
            <div className="text-2xl font-bold">{formatTime(timer)}</div>
            <Button variant="outline" size="icon" onClick={toggleTimer}>
              {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
            </Button>
          </div>
        </div>

        {/* Voice status indicator */}
        {(isListening || isSpeaking) && (
          <div className={`mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse text-right' : 'text-left'}`}>
            {isListening && (
              <>
                <Mic className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-sm text-blue-600">
                  {t("Listening for commands...", "أستمع للأوامر...")}
                </span>
              </>
            )}
            {isSpeaking && (
              <>
                <Volume2 className="h-4 w-4 text-green-600 animate-pulse" />
                <span className="text-sm text-green-600">
                  {t("Speaking instructions...", "أتحدث بالتعليمات...")}
                </span>
              </>
            )}
          </div>
        )}
        
        {recipe.tips && recipe.tips[currentStep] && (
          <div className={`mb-6 p-4 bg-wasfah-light-gray dark:bg-gray-800 rounded-lg border-l-4 border-wasfah-bright-teal ${direction === 'rtl' ? 'border-r-4 border-l-0 text-right' : 'text-left'}`}>
            <p className="chef-notes text-wasfah-deep-teal">
              <span className="font-bold">{t("Chef Tip:", "نصيحة الشيف:")}</span> {recipe.tips[currentStep]}
            </p>
          </div>
        )}
      </div>
      
      <div className={`sticky bottom-0 z-10 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className={`flex justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="w-28"
          >
            <ChevronLeft size={16} className={`${direction === 'rtl' ? 'rotate-180 ml-1' : 'mr-1'}`} />
            {t("Previous", "السابق")}
          </Button>
          
          <div className={`flex items-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Button
              variant="outline"
              size="sm"
              onClick={speakCurrentStep}
              disabled={!isVoiceEnabled || isSpeaking}
            >
              {isSpeaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          
          <Button
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className="w-28 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
          >
            {t("Next", "التالي")}
            <ChevronRight size={16} className={`${direction === 'rtl' ? 'rotate-180 mr-1' : 'ml-1'}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};
