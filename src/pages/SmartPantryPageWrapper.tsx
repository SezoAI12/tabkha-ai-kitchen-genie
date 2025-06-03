
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';

const SmartPantryPageWrapper: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Smart Pantry',
        showBackButton: true
      }}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Smart Pantry
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your pantry with AI assistance
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <p className="text-center text-gray-500">
            Smart Pantry features coming soon!
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default SmartPantryPageWrapper;
