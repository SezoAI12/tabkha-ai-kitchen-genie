
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Plus, Trash2, Share2, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useRTL } from '@/contexts/RTLContext';

interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  dateAdded: Date;
  priority: 'high' | 'medium' | 'low';
}

const initialItems: ShoppingListItem[] = [
  { id: '1', name: 'Chicken breast', quantity: 500, unit: 'g', category: 'Meat', checked: false, dateAdded: new Date(), priority: 'high' },
  { id: '2', name: 'Olive oil', quantity: 1, unit: 'bottle', category: 'Oils', checked: false, dateAdded: new Date(), priority: 'medium' },
  { id: '3', name: 'Garlic', quantity: 5, unit: 'cloves', category: 'Vegetables', checked: false, dateAdded: new Date(), priority: 'low' },
  { id: '4', name: 'Onions', quantity: 2, unit: '', category: 'Vegetables', checked: true, dateAdded: new Date(), priority: 'medium' },
];

export default function ShoppingListPage() {
  const { toast } = useToast();
  const { t } = useRTL();
  const [items, setItems] = useState<ShoppingListItem[]>(initialItems);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Other');
  const [newItemPriority, setNewItemPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [...new Set(items.map(item => item.category))].sort();
  const categoryOptions = ['Other', ...categories];

  const handleCheck = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newItemName.trim()) {
      toast({
        title: t("Error", "خطأ"),
        description: t("Please enter an item name", "يرجى إدخال اسم العنصر"),
        variant: "destructive",
      });
      return;
    }

    const newItem: ShoppingListItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: Number(newItemQuantity) || 1,
      unit: newItemUnit.trim(),
      category: newItemCategory,
      priority: newItemPriority,
      checked: false,
      dateAdded: new Date(),
    };

    setItems([newItem, ...items]);
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('');
    setNewItemCategory('Other');
    setNewItemPriority('medium');
    setShowAddForm(false);

    toast({
      title: t("Item added", "تمت إضافة العنصر"),
      description: t(`${newItem.name} added to your shopping list.`, `تمت إضافة ${newItem.name} إلى قائمة التسوق.`),
    });
  };

  const handleRemoveChecked = () => {
    const checkedItems = items.filter(item => item.checked);
    if (checkedItems.length === 0) {
      toast({
        title: t("No items selected", "لم يتم تحديد عناصر"),
        description: t("Please check items to remove.", "يرجى تحديد العناصر للإزالة."),
      });
      return;
    }

    setItems(items.filter(item => !item.checked));
    toast({
      title: t("Items removed", "تمت إزالة العناصر"),
      description: t(`${checkedItems.length} item(s) removed from your list.`, `تمت إزالة ${checkedItems.length} عنصر من قائمتك.`),
    });
  };

  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <PageContainer header={{ title: t('Shopping List', 'قائمة التسوق'), showBackButton: true }}>
      <div className="space-y-6 pb-6">
        {/* Header Card */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal text-white">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="p-2 bg-white/20 rounded-lg">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{t('My Shopping List', 'قائمة التسوق الخاصة بي')}</CardTitle>
                  <p className="text-white/80 text-sm">
                    {t(`${totalCount} items total`, `${totalCount} عنصر إجمالي`)}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('Progress', 'التقدم')}</span>
                <span>{completedCount}/{totalCount}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal h-12"
          >
            <Plus className="h-4 w-4 mr-2 rtl:ml-2" />
            {t('Add Item', 'إضافة عنصر')}
          </Button>
          <Button
            variant="outline"
            onClick={handleRemoveChecked}
            className="h-12 border-red-200 text-red-600 hover:bg-red-50"
            disabled={completedCount === 0}
          >
            <Trash2 className="h-4 w-4 mr-2 rtl:ml-2" />
            {t('Clear Checked', 'مسح المحدد')}
          </Button>
        </div>

        {/* Add Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-4">
                  <form onSubmit={handleAddItem} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <Input
                          placeholder={t("Item name", "اسم العنصر")}
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                        />
                      </div>
                      <Input
                        placeholder={t("Quantity", "الكمية")}
                        type="number"
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(e.target.value)}
                      />
                      <Input
                        placeholder={t("Unit", "الوحدة")}
                        value={newItemUnit}
                        onChange={(e) => setNewItemUnit(e.target.value)}
                      />
                      <Select value={newItemCategory} onValueChange={setNewItemCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("Category", "الفئة")} />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={newItemPriority} onValueChange={(value: 'high' | 'medium' | 'low') => setNewItemPriority(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("Priority", "الأولوية")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">{t("High", "عالية")}</SelectItem>
                          <SelectItem value="medium">{t("Medium", "متوسطة")}</SelectItem>
                          <SelectItem value="low">{t("Low", "منخفضة")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <Button type="submit" className="flex-1 bg-wasfah-bright-teal hover:bg-wasfah-teal">
                        {t('Add Item', 'إضافة عنصر')}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                        {t('Cancel', 'إلغاء')}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Items List */}
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className={item.checked ? 'opacity-60' : ''}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse flex-1">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={() => handleCheck(item.id)}
                  />
                  <div className="flex-1">
                    <h3 className={`font-medium ${item.checked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {item.quantity > 0 && `${item.quantity}${item.unit ? ' ' + item.unit : ''} `}{item.name}
                    </h3>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <Badge 
                        variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {t(item.priority === 'high' ? 'High' : item.priority === 'medium' ? 'Medium' : 'Low', 
                           item.priority === 'high' ? 'عالية' : item.priority === 'medium' ? 'متوسطة' : 'منخفضة')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {items.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              {t('No items in your shopping list yet.', 'لا توجد عناصر في قائمة التسوق الخاصة بك حتى الآن.')}
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
