
import React from 'react';
import { MobileHeader } from './MobileHeader';
import BottomToolbar from './BottomToolbar';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

interface PageContainerProps {
  children: React.ReactNode;
  header?: HeaderProps;
  className?: string;
  showBottomToolbar?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  header,
  className = '',
  showBottomToolbar = true
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {header && <MobileHeader {...header} />}
      <main className={`${header ? 'pt-14' : ''} ${showBottomToolbar ? 'pb-20' : ''} ${className}`}>
        {children}
      </main>
      {showBottomToolbar && <BottomToolbar />}
    </div>
  );
};
