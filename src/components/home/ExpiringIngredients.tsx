
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle } from 'lucide-react';
import { PantryItem } from '@/types/index';
import { mockPantryItems } from '@/data/mockData';

export const ExpiringIngredients: React.FC = () => {
  const today = new Date();
  const expiringItems = mockPantryItems.filter(item => {
    if (!item.expiryDate) return false;
    const expiry = new Date(item.expiryDate);
    const daysLeft = Math.round((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 && daysLeft <= 3;
  });

  if (expiringItems.length === 0) {
    return null;
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle size={20} className="text-wasfah-coral-red" />
          <h3 className="font-bold text-wasfah-deep-teal">Expiring Soon</h3>
        </div>
        <div className="space-y-2">
          {expiringItems.slice(0, 3).map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">{item.quantity} {item.unit}</p>
              </div>
              <div className="flex items-center text-xs text-wasfah-coral-red">
                <Clock size={14} className="mr-1" />
                {item.expiryDate && 
                  Math.round((new Date(item.expiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} days
              </div>
            </div>
          ))}
        </div>
        {expiringItems.length > 3 && (
          <Button variant="outline" size="sm" className="w-full mt-3">
            View All ({expiringItems.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
