
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface MainCategory {
  id: string;
  name: string;
  icon: React.ComponentType;
  subcategories: { name: string; icon: React.ComponentType; requiresCustomForm?: boolean }[];
}

interface CategorySelectorProps {
  categories: MainCategory[];
  selectedCategory: MainCategory | null;
  selectedSubcategory: { name: string; icon: React.ComponentType; requiresCustomForm?: boolean } | null;
  currentStep: number;
  onCategorySelect: (category: MainCategory) => void;
  onSubcategorySelect: (subcategory: { name: string; icon: React.ComponentType; requiresCustomForm?: boolean }) => void;
  onBack: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  currentStep,
  onCategorySelect,
  onSubcategorySelect,
  onBack
}) => {
  if (currentStep === 1) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center text-wasfah-deep-teal">Choose Category</h2>
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category)}
                className={`relative overflow-hidden rounded-xl border-2 transition-all hover:scale-102 ${
                  selectedCategory?.id === category.id
                    ? 'border-wasfah-bright-teal shadow-lg'
                    : 'border-gray-200 active:scale-98'
                }`}
              >
                <div className="relative h-32 w-full bg-gradient-to-br from-wasfah-light-gray to-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-wasfah-deep-teal">
                      <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm inline-block mb-2 shadow-sm">
                        <IconComponent />
                      </div>
                      <p className="font-bold text-xl">{category.name}</p>
                      <p className="text-sm opacity-70">
                        {category.subcategories.length} subcategories
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 text-wasfah-deep-teal hover:bg-wasfah-light-gray"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-lg font-semibold text-wasfah-deep-teal">{selectedCategory?.name}</h2>
          <div className="w-10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {selectedCategory?.subcategories?.map((sub) => {
            const SubIconComponent = sub.icon;
            return (
              <button
                key={sub.name}
                onClick={() => onSubcategorySelect(sub)}
                className={`relative overflow-hidden rounded-lg border-2 transition-all hover:scale-102 ${
                  selectedSubcategory?.name === sub.name
                    ? 'border-wasfah-bright-teal shadow-lg'
                    : 'border-gray-200 active:scale-95'
                }`}
              >
                <div className="relative h-24 w-full bg-gradient-to-br from-wasfah-light-mint to-gray-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-wasfah-deep-teal">
                      <div className="p-2 rounded-lg bg-white/60 backdrop-blur-sm inline-block mb-1">
                        <SubIconComponent />
                      </div>
                      <p className="font-semibold text-sm px-2">
                        {sub.name}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
