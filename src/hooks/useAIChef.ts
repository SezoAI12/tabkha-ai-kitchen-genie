
import { useState } from 'react';
import { trackAIChefInteraction } from '@/components/analytics/GoogleAnalytics';

interface AIChefResponse {
  response: string;
  type: 'recipe_suggestion' | 'cooking_advice' | 'ingredient_info' | 'error';
}

export const useAIChef = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askAIChef = async (query: string): Promise<AIChefResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // This would call your Supabase Edge Function
      const response = await fetch('/api/ai-chef', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      // Track the interaction
      trackAIChefInteraction(query, data.type);
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      return {
        response: 'Sorry, I\'m having trouble right now. Please try again later.',
        type: 'error'
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    askAIChef,
    isLoading,
    error,
  };
};
