import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Plus, Trash2, FileText, Share2, Search, Copy, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Sample shopping list data
const initialItems = [
  { id: '1', name: 'Chicken breast', quantity: 500, unit: 'g', category: 'Meat', checked: false, dateAdded: new Date() },
  { id: '2', name: 'Olive oil', quantity: 1, unit: 'bottle', category: 'Oils', checked: false, dateAdded: new Date() },
  { id: '3', name: 'Garlic', quantity: 5, unit: 'cloves', category: 'Vegetables', checked: false, dateAdded: new Date() },
  { id: '4', name: 'Onions', quantity: 2, unit: '', category: 'Vegetables', checked: true, dateAdded: new Date() },
  { id: '5', name: 'Rice', quantity: 1, unit: 'kg', category: 'Grains', checked: false, dateAdded: new Date() },
  { id: '6', name: 'Tomatoes', quantity: 4, unit: '', category: 'Vegetables', checked: false, dateAdded: new Date() },
  { id: '7', name: 'Greek yogurt', quantity: 500, unit: 'g', category: 'Dairy', checked: true, dateAdded: new Date() },
  { id: '8', name: 'Lemons', quantity: 3, unit: '', category: 'Fruits', checked: false, dateAdded: new Date() },
];

export default function ShoppingListPage() {
  const { toast } = useToast();
  const [items, setItems] = useState(initialItems);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Other');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');

  const categories = [...new Set(items.map(item => item.category))].sort();

  const handleCheck = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!newItemName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an item name",
        variant: "destructive",
      });
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: Number(newItemQuantity) || 1,
      unit: newItemUnit.trim(),
      category: newItemCategory,
      checked: false,
      dateAdded: new Date(),
    };

    setItems([newItem, ...items]);
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('');
    setNewItemCategory('Other');
    setShowAddForm(false);

    toast({
      title: "Item added",
      description: `${newItem.name} added to your shopping list.`,
    });
  };

  const handleRemoveChecked = () => {
    const checkedItems = items.filter(item => item.checked);
    if (checkedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please check items to remove.",
      });
      return;
    }

    setItems(items.filter(item => !item.checked));
    toast({
      title: "Items removed",
      description: `${checkedItems.length} item(s) removed from your list.`,
    });
  };

  const handleClearAll = () => {
    setItems([]);
    toast({
      title: "List cleared",
      description: "All items have been removed from your list.",
    });
  };

  const handleDuplicateList = () => {
    const duplicatedItems = items.map(item => ({
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    }));
    setItems([...items, ...duplicatedItems]);
    toast({
      title: "List duplicated",
      description: "Your shopping list has been duplicated.",
    });
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setEditingItemId(id);
      setNewItemName(itemToEdit.name);
      setNewItemQuantity(itemToEdit.quantity);
      setNewItemUnit(itemToEdit.unit);
      setNewItemCategory(itemToEdit.category);
    }
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();

    if (!newItemName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an item name",
        variant: "destructive",
      });
      return;
    }

    setItems(items.map(item =>
      item.id === editingItemId
        ? {
            ...item,
            name: newItemName.trim(),
            quantity: Number(newItemQuantity) || 1,
            unit: newItemUnit.trim(),
            category: newItemCategory,
          }
        : item
    ));

    setEditingItemId(null);
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('');
    setNewItemCategory('Other');
    setShowAddForm(false);

    toast({
      title: "Item updated",
      description: "Your item has been updated.",
    });
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'category') {
      return a.category.localeCompare(b.category);
    } else if (sortOption === 'checked') {
      return a.checked === b.checked ? 0 : a.checked ? 1 : -1;
    }
    return 0;
  });

  const filteredItems = sortedItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer header={{ title: 'Shopping List', showBackButton: true }}>
      <div className="space-y-4 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 text-wasfah-bright-teal mr-2" />
            <h2 className="text-lg font-bold text-wasfah-deep-teal">My Shopping List</h2>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <FileText className="h-4 w-4 mr-1" />
              Lists
            </Button>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">{items.length} items ({items.filter(i => i.checked).length} checked)</p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-200 hover:bg-red-50"
                onClick={handleRemoveChecked}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Checked
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-200 hover:bg-red-50"
                onClick={handleClearAll}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
              <Button
                size="sm"
                className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
              <Button
                size="sm"
                className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                onClick={handleDuplicateList}
              >
                <Copy className="h-4 w-4 mr-1" />
                Duplicate List
              </Button>
            </div>
          </div>

          {showAddForm && (
            <form onSubmit={editingItemId ? handleUpdateItem : handleAddItem} className="mb-4 p-3 bg-wasfah-light-gray rounded-md">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <Input
                    placeholder="Item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="Quantity"
                    type="number"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="Unit"
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="col-span-2">
                  <Select value={newItemCategory} onValueChange={setNewItemCategory}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-2 space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItemId(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                >
                  {editingItemId ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          )}

          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="checked">Checked Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="byCategory">By Category</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-1">
              <AnimatePresence>
                {filteredItems.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`flex items-center justify-between p-3 rounded-md ${
                      item.checked ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => handleCheck(item.id)}
                        className="h-5 w-5"
                      />
                      <div className={item.checked ? 'line-through' : ''}>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.quantity} {item.unit} • {item.category} • Added: {item.dateAdded.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditItem(item.id)}
                    >
                      Edit
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="byCategory" className="space-y-4">
              {categories.map(category => {
                const categoryItems = filteredItems.filter(item => item.category === category);
                return (
                  <div key={category}>
                    <h3 className="font-semibold text-wasfah-deep-teal mb-2">{category}</h3>
                    <div className="space-y-1">
                      <AnimatePresence>
                        {categoryItems.map(item => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className={`flex items-center justify-between p-3 rounded-md ${
                              item.checked ? 'bg-gray-50 text-gray-500' : 'bg-white'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                checked={item.checked}
                                onCheckedChange={() => handleCheck(item.id)}
                                className="h-5 w-5"
                              />
                              <div className={item.checked ? 'line-through' : ''}>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-gray-500">
                                  {item.quantity} {item.unit} • Added: {item.dateAdded.toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditItem(item.id)}
                            >
                              Edit
                            </Button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </PageContainer>
  );
}
