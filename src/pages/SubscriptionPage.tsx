
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample subscription plans
const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'monthly',
    features: [
      'Browse recipes',
      'Basic meal planning',
      'Create and save up to 5 recipes',
      'Access to community recipes',
    ],
    limitations: [
      'Limited meal planning options',
      'No AI-powered features',
      'No premium recipes',
      'Ads shown',
    ],
    isPopular: false,
    buttonText: 'Current Plan',
    buttonDisabled: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4.99,
    interval: 'monthly',
    features: [
      'All Free features',
      'Advanced meal planning',
      'AI recipe recommendations',
      'Ad-free experience',
      'Unlimited recipe creation',
      'Ingredient swap suggestions',
      'Nutrition tracking',
    ],
    limitations: [],
    isPopular: true,
    buttonText: 'Subscribe Now',
    buttonDisabled: false,
  },
  {
    id: 'premium-annual',
    name: 'Premium Annual',
    price: 49.99,
    interval: 'yearly',
    features: [
      'All Premium features',
      'Save 15% compared to monthly',
      'Priority customer support',
      'Early access to new features',
      'Exclusive seasonal recipe collections',
      'Advanced nutrition analytics',
    ],
    limitations: [],
    isPopular: false,
    buttonText: 'Subscribe Now',
    buttonDisabled: false,
  },
];

export default function SubscriptionPage() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    
    // In a real app, this would redirect to payment
    toast({
      title: "Subscription Selected",
      description: "This would redirect to payment in a real app",
    });
  };
  
  return (
    <PageContainer header={{ title: 'Premium Subscription', showBackButton: true }}>
      <div className="space-y-6 pb-6">
        <section>
          <div className="bg-wasfah-deep-teal text-white p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">Unlock the Full Power of WasfahAI</h2>
            <p className="opacity-90">Get personalized meal plans, AI recipe recommendations, and more</p>
          </div>
        </section>
        
        <section>
          <div className="grid gap-4">
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`overflow-hidden ${
                  plan.isPopular ? 'border-wasfah-bright-teal border-2' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-wasfah-bright-teal text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{plan.name}</span>
                    <div>
                      <span className="text-2xl font-bold">${plan.price}</span>
                      <span className="text-gray-500 text-sm">/{plan.interval}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start">
                              <XCircle className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.price === 0 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-wasfah-bright-teal hover:bg-wasfah-teal'
                    }`}
                    disabled={plan.buttonDisabled}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">100% Satisfaction Guarantee</h3>
            <p className="text-sm text-gray-600">
              If you're not completely satisfied with your WasfahAI Premium subscription, 
              contact us within the first 14 days for a full refund.
            </p>
          </div>
        </section>
        
        <section>
          <div className="bg-wasfah-light-gray p-4 rounded-lg">
            <h3 className="text-md font-semibold mb-2">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Can I cancel my subscription anytime?</h4>
                <p className="text-sm text-gray-600">
                  Yes, you can cancel your subscription at any time. Your benefits will continue until the end of your billing period.
                </p>
              </div>
              <div>
                <h4 className="font-medium">How do I get a refund?</h4>
                <p className="text-sm text-gray-600">
                  Contact our customer support within 14 days of subscribing to request a refund.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Can I switch between plans?</h4>
                <p className="text-sm text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the next billing cycle.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
