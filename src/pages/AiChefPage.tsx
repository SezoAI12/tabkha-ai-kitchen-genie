// src/pages/AiChefPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User, Utensils, Lightbulb, Target, Loader2 } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { Link } from 'react-router-dom'; // Assuming recipe links might be needed

// Define TypeScript interfaces for chat messages
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  type: 'text' | 'recipe-suggestion' | 'tip' | 'meal-plan' | 'nutritional-advice';
  data?: any; // Optional data for specific message types (e.g., recipe ID)
}

// Mock data for simulating AI responses (replace with actual AI calls later)
const mockRecipes = [
    { id: 'recipe-1', name: 'Spaghetti Bolognese', description: 'Classic Italian meat sauce.', link: '/recipes/recipe-1' },
    { id: 'recipe-2', name: 'Chicken Stir-Fry', description: 'Quick and healthy Asian dish.', link: '/recipes/recipe-2' },
    { id: 'recipe-3', name: 'Lentil Soup', description: 'Hearty and nutritious soup.', link: '/recipes/recipe-3' },
];

const mockTips = [
    'Always preheat your oven for even cooking.',
    'Resting meat after cooking keeps it juicy.',
    'Use fresh herbs for maximum flavor.',
    'Don\'t overcrowd the pan when searing.',
];

const mockNutritionalAdvice = [
    'Remember to include a source of lean protein in your meals.',
    'Eating a variety of colorful vegetables ensures you get different nutrients.',
    'Stay hydrated throughout the day, especially when cooking in a hot kitchen!',
];

const mockMealPlanAdvice = [
    'Start by planning your dinners for the week, then fill in breakfast and lunch.',
    'Consider batch cooking components like grains or proteins to save time.',
    'Look for recipes that use similar ingredients to minimize waste.',
];


export default function AiChefPage() {
  const { t, direction } = useRTL();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: Date.now().toString(),
        sender: 'ai',
        text: t(
          "Hello! I'm your AI Chef Assistant. How can I help you in the kitchen today?",
          "مرحباً! أنا مساعد الشيف الذكي الخاص بك. كيف يمكنني مساعدتك في المطبخ اليوم؟",
          "Merhaba! Ben AI Şef Asistanınız. Bugün mutfakta size nasıl yardımcı olabilirim?"
        ),
        timestamp: Date.now(),
        type: 'text',
      }]);
    }
  }, [t, messages.length]); // Depend on t and messages.length

  const simulateAiResponse = async (userMessage: string): Promise<ChatMessage> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const lowerMessage = userMessage.toLowerCase();
    let responseText = t(
      "I'm still learning, but I can help with basic cooking questions!",
      "ما زلت أتعلم، ولكن يمكنني المساعدة في أسئلة الطبخ الأساسية!",
      "Hala öğreniyorum, ancak temel yemek pişirme sorularında yardımcı olabilirim!"
    );
    let responseType: ChatMessage['type'] = 'text';
    let responseData: any = undefined;

    if (lowerMessage.includes('recipe') || lowerMessage.includes('suggest')) {
        const recipe = mockRecipes[Math.floor(Math.random() * mockRecipes.length)];
        responseText = t(
            `How about trying ${recipe.name}?`,
            `ما رأيك في تجربة ${recipe.name}؟`,
            `${recipe.name} denemeye ne dersiniz?`
        );
        responseType = 'recipe-suggestion';
        responseData = recipe;
    } else if (lowerMessage.includes('tip') || lowerMessage.includes('technique')) {
        responseText = t(
            `Here's a cooking tip: ${mockTips[Math.floor(Math.random() * mockTips.length)]}`,
            `إليك نصيحة طبخ: ${mockTips[Math.floor(Math.random() * mockTips.length)]}`,
            `İşte bir yemek pişirme ipucu: ${mockTips[Math.floor(Math.random() * mockTips.length)]}`
        );
        responseType = 'tip';
    } else if (lowerMessage.includes('nutritional') || lowerMessage.includes('healthy')) {
        responseText = t(
            `Here's some nutritional advice: ${mockNutritionalAdvice[Math.floor(Math.random() * mockNutritionalAdvice.length)]}`,
            `إليك بعض النصائح الغذائية: ${mockNutritionalAdvice[Math.floor(Math.random() * mockNutritionalAdvice.length)]}`,
            `İşte bazı beslenme tavsiyeleri: ${mockNutritionalAdvice[Math.floor(Math.random() * mockNutritionalAdvice.length)]}`
        );
        responseType = 'nutritional-advice';
    } else if (lowerMessage.includes('meal plan') || lowerMessage.includes('planning')) {
         responseText = t(
            `Here's a tip for meal planning: ${mockMealPlanAdvice[Math.floor(Math.random() * mockMealPlanAdvice.length)]}`,
            `إليك نصيحة لتخطيط الوجبات: ${mockMealPlanAdvice[Math.floor(Math.random() * mockMealPlanAdvice.length)]}`,
            `İşte öğün planlama için bir ipucu: ${mockMealPlanAdvice[Math.floor(Math.random() * mockMealPlanAdvice.length)]}`
        );
        responseType = 'meal-plan';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
         responseText = t(
            "Hello there! How can I assist you?",
            "أهلاً بك! كيف يمكنني مساعدتك؟",
            "Merhaba! Size nasıl yardımcı olabilirim?"
        );
    } else if (lowerMessage.includes('thank')) {
         responseText = t(
            "You're welcome! Let me know if you need anything else.",
            "على الرحب والسعة! أخبرني إذا احتجت أي شيء آخر.",
            "Rica ederim! Başka bir şeye ihtiyacınız olursa haber verin."
        );
    }


    return {
      id: Date.now().toString(),
      sender: 'ai',
      text: responseText,
      timestamp: Date.now(),
      type: responseType,
      data: responseData,
    };
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: Date.now(),
      type: 'text', // User input is always text initially
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInput(''); // Clear input immediately
    setIsLoading(true);

    try {
      const aiResponse = await simulateAiResponse(messageText); // Simulate AI response
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error simulating AI response:", error);
      setMessages(prevMessages => [...prevMessages, {
        id: Date.now().toString(),
        sender: 'ai',
        text: t("Sorry, I couldn't process that request right now.", "عذراً، لم أتمكن من معالجة هذا الطلب الآن.", "Üzgünüm, şu anda bu isteği işleyemedim."),
        timestamp: Date.now(),
        type: 'text',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (actionText: string) => {
      handleSendMessage(actionText);
  };

  const quickActions = [
      { label: t('Suggest a Recipe', 'اقترح وصفة', 'Tarif Öner'), command: 'Suggest a recipe' },
      { label: t('Cooking Tip', 'نصيحة طبخ', 'Yemek İpucu'), command: 'Give me a cooking tip' },
      { label: t('Nutritional Advice', 'نصيحة غذائية', 'Beslenme Tavsiyesi'), command: 'Give me nutritional advice' },
      { label: t('Meal Planning Help', 'مساعدة في تخطيط الوجبات', 'Öğün Planlama Yardımı'), command: 'Help with meal planning' },
  ];


  return (
    <PageContainer header={{ title: t('AI Chef Assistant', 'مساعد الشيف الذكي', 'AI Şef Asistanı'), showBackButton: true }}>
      <div className="flex flex-col h-full p-4 pb-20" dir={direction}> {/* Added dir for RTL */}
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 p-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900"> {/* Added scrollbar styles */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-wasfah-bright-teal dark:bg-wasfah-deep-teal text-white flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0"> {/* Added RTL */}
                  <Bot size={18} />
                </div>
              )}
              <Card className={`max-w-[80%] ${msg.sender === 'user' ? 'bg-wasfah-bright-teal text-white dark:bg-wasfah-teal' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} shadow-md`}> {/* Added dark mode */}
                <CardContent className="p-3">
                  {/* Render different message types */}
                  {msg.type === 'recipe-suggestion' && msg.data ? (
                      <div>
                          <p className="mb-2">{msg.text}</p>
                          <Link to={msg.data.link} className="text-sm font-semibold underline hover:no-underline text-wasfah-deep-teal dark:text-wasfah-mint"> {/* Added dark mode */}
                              {t('View Recipe:', 'عرض الوصفة:', 'Tarifi Görüntüle:')} {msg.data.name}
                          </Link>
                      </div>
                  ) : (
                      <p>{msg.text}</p>
                  )}
                </CardContent>
              </Card>
              {msg.sender === 'user' && (
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 flex items-center justify-center ml-3 rtl:mr-3 rtl:ml-0"> {/* Added RTL, dark mode */}
                   <User size={18} />
                 </div>
               )}
            </div>
          ))}
          {/* Loading indicator */}
          {isLoading && (
              <div className="flex items-start justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-wasfah-bright-teal dark:bg-wasfah-deep-teal text-white flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0"> {/* Added RTL */}
                    <Bot size={18} />
                  </div>
                  <Card className="max-w-[80%] bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md"> {/* Added dark mode */}
                      <CardContent className="p-3 flex items-center">
                          <Loader2 className="h-4 w-4 animate-spin mr-2 rtl:ml-2 rtl:mr-0" /> {/* Added RTL */}
                          {t('AI is typing...', 'الذكاء الاصطناعي يكتب...', 'AI yazıyor...')}
                      </CardContent>
                  </Card>
              </div>
          )}
          <div ref={messagesEndRef} /> {/* Scroll anchor */}
        </div>

        {/* Quick Actions */}
        <div className="flex overflow-x-auto gap-2 p-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900"> {/* Added dark mode, scrollbar */}
            {quickActions.map((action, index) => (
                <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.command)}
                    disabled={isLoading}
                    className="flex-shrink-0 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700" // Added dark mode
                >
                    {/* Optional: Add icons based on action type */}
                    {action.command.includes('Recipe') && <Utensils size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />} {/* Added RTL */}
                    {action.command.includes('Tip') && <Lightbulb size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />} {/* Added RTL */}
                    {action.command.includes('Nutritional') && <Target size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />} {/* Added RTL */}
                     {action.command.includes('Planning') && <Utensils size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />} {/* Added RTL */}
                    {action.label}
                </Button>
            ))}
        </div>


        {/* Input Area */}
        <div className="flex items-center gap-2 p-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0"> {/* Added dark mode */}
          <Input
            className="flex-1 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600" // Added dark mode
            placeholder={t('Ask your AI Chef...', 'اسأل الشيف الذكي الخاص بك...', 'AI Şefinize sorun...')} // Translate placeholder
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(input);
              }
            }}
            disabled={isLoading}
          />
          <Button onClick={() => handleSendMessage(input)} disabled={!input.trim() || isLoading} className="bg-wasfah-bright-teal hover:bg-wasfah-teal dark:bg-wasfah-teal dark:hover:bg-wasfah-deep-teal text-white"> {/* Added dark mode */}
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={20} />}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
