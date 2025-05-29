import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PantryItem } from '@/types/index';
import { mockPantryItems } from '@/data/mockData';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Package, 
  AlertTriangle, 
  Check,
  Trash2,
  Edit,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function PantryPage() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(mockPantryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PantryItem>>({
    name: '',
    quantity: '',
    unit: '',
    category: '',
    expiryDate: ''
  });

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(pantryItems.map(item => item.category)));
    return ['All', ...cats.sort()];
  }, [pantryItems]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let items = pantryItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
    );

    items.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'expiry':
          if (!a.expiryDate) return 1;
          if (!b.expiryDate) return -1;
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return items;
  }, [pantryItems, searchTerm, selectedCategory, sortBy]);

  // Get expiring items (within 3 days)
  const expiringItems = useMemo(() => {
    const today = new Date();
    return pantryItems.filter(item => {
      if (!item.expiryDate) return false;
      const expiry = new Date(item.expiryDate);
      const daysLeft = Math.round((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysLeft >= 0 && daysLeft <= 3;
    });
  }, [pantryItems]);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.unit || !newItem.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const item: PantryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: newItem.quantity,
      unit: newItem.unit,
      category: newItem.category,
      expiryDate: newItem.expiryDate || '',
      addedDate: currentDate,
      daysUntilExpiry: newItem.expiryDate ? getDaysUntilExpiry(newItem.expiryDate) : 0
    };

    setPantryItems(prev => [...prev, item]);
    setNewItem({
      name: '',
      quantity: '',
      unit: '',
      category: '',
      expiryDate: ''
    });
    setShowAddDialog(false);
    toast.success('Item added to pantry');
  };

  const handleDeleteItem = (id: string) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from pantry');
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return Math.round((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (expiryDate?: string) => {
    if (!expiryDate) return { status: 'none', color: 'bg-gray-100 text-gray-600' };
    
    const daysLeft = getDaysUntilExpiry(expiryDate);
    
    if (daysLeft < 0) return { status: 'expired', color: 'bg-red-100 text-red-600' };
    if (daysLeft <= 3) return { status: 'expiring', color: 'bg-orange-100 text-orange-600' };
    if (daysLeft <= 7) return { status: 'soon', color: 'bg-yellow-100 text-yellow-600' };
    return { status: 'fresh', color: 'bg-green-100 text-green-600' };
  };

  return (
    <PageContainer
      header={{
        title: 'My Pantry',
        showSearch: true,
        actions: (
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                <Plus size={16} className="mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Pantry Item</DialogTitle>
                <DialogDescription>
                  Add a new item to your pantry inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newItem.name || ''}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Tomatoes"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newItem.quantity || ''}
                      onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
                      placeholder="e.g., 5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select 
                      value={newItem.unit || ''} 
                      onValueChange={(value) => setNewItem(prev => ({ ...prev, unit: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">pieces</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="cups">cups</SelectItem>
                        <SelectItem value="tbsp">tbsp</SelectItem>
                        <SelectItem value="tsp">tsp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newItem.category || ''} 
                    onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vegetables">Vegetables</SelectItem>
                      <SelectItem value="Fruits">Fruits</SelectItem>
                      <SelectItem value="Meat & Poultry">Meat & Poultry</SelectItem>
                      <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
                      <SelectItem value="Grains & Pasta">Grains & Pasta</SelectItem>
                      <SelectItem value="Canned Goods">Canned Goods</SelectItem>
                      <SelectItem value="Spices & Herbs">Spices & Herbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expiry">Expiry Date (Optional)</Label>
                  <Input
                    id="expiry"
                    type="date"
                    value={newItem.expiryDate || ''}
                    onChange={(e) => setNewItem(prev => ({ ...prev, expiryDate: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>Add Item</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ),
      }}
    >
      <div className="container px-4 py-4 space-y-6">
        {/* Expiring Items Alert */}
        {expiringItems.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-orange-700">
                <AlertTriangle size={20} className="mr-2" />
                Items Expiring Soon ({expiringItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {expiringItems.slice(0, 3).map((item: PantryItem) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                    <Badge variant="destructive">
                      {item.expiryDate && getDaysUntilExpiry(item.expiryDate)} days left
                    </Badge>
                  </div>
                ))}
                {expiringItems.length > 3 && (
                  <div className="text-center">
                    <Button variant="ghost" size="sm">
                      View {expiringItems.length - 3} more
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search pantry items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: string) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="expiry">Sort by Expiry</SelectItem>
                  <SelectItem value="category">Sort by Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pantry Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item: PantryItem) => {
            const expiryStatus = getExpiryStatus(item.expiryDate);
            
            return (
              <Card key={item.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
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
                    <Badge className={`w-full justify-center ${expiryStatus.color}`}>
                      {expiryStatus.status === 'expired' && 'Expired'}
                      {expiryStatus.status === 'expiring' && `${getDaysUntilExpiry(item.expiryDate)} days left`}
                      {expiryStatus.status === 'soon' && `${getDaysUntilExpiry(item.expiryDate)} days left`}
                      {expiryStatus.status === 'fresh' && 'Fresh'}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No items found in your pantry.</p>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal"
            >
              Add Your First Item
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
