import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PantryItem } from '@/types/index';
import { Calendar, Package } from 'lucide-react';

export const PantryItemCard: React.FC<{ item: PantryItem }> = ({ item }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center text-gray-600">
            <Package size={16} className="mr-1" />
            <span>{item.quantity} {item.unit}</span>
          </div>
          {item.expiryDate && (
            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm">
                {new Date(item.expiryDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
        {item.expiryDate && (
          <Badge className="mt-3">
            Expires in {Math.round((new Date(item.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
