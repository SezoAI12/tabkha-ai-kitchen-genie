
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Trash2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export default function PaymentMethodsPage() {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    }
  ]);

  const handleAddPaymentMethod = () => {
    toast({
      title: "Add Payment Method",
      description: "Redirecting to secure payment setup...",
    });
    // In real implementation, this would open Stripe's payment method setup
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed successfully.",
    });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated.",
    });
  };

  return (
    <PageContainer header={{ title: 'Payment Methods', showBackButton: true }}>
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Payment Methods</h1>
            <p className="text-gray-600">Manage your payment methods for subscriptions</p>
          </div>
          <Button onClick={handleAddPaymentMethod} className="flex items-center gap-2">
            <Plus size={16} />
            Add Payment Method
          </Button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id} className={method.isDefault ? 'border-wasfah-bright-teal' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-8 w-8 text-gray-600" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">{method.brand} ending in {method.last4}</span>
                        {method.isDefault && (
                          <Badge className="bg-wasfah-bright-teal">Default</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {paymentMethods.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Payment Methods</h3>
              <p className="text-gray-600 mb-4">Add a payment method to manage your subscriptions</p>
              <Button onClick={handleAddPaymentMethod}>
                Add Your First Payment Method
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
