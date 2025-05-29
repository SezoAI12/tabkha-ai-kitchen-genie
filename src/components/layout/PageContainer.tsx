
import React from 'react';
import { MobileHeader } from './MobileHeader';
import BottomToolbar from './BottomToolbar';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  actions?: React.ReactNode;
  className?: string;
  showSearch?: boolean;
}

interface PageContainerProps {
  children: React.ReactNode;
  header?: HeaderProps;
  className?: string;
  showBottomToolbar?: boolean;
  hideNavbar?: boolean;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  header,
  className = '',
  showBottomToolbar = true,
  hideNavbar = false,
  fullWidth = false,
  noPadding = false
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {header && !hideNavbar && <MobileHeader {...header} />}
      <main className={`${header && !hideNavbar ? 'pt-14' : ''} ${showBottomToolbar ? 'pb-20' : ''} ${fullWidth ? 'w-full' : ''} ${noPadding ? '' : 'p-4'} ${className}`}>
        {children}
      </main>
      {showBottomToolbar && <BottomToolbar />}
    </div>
  );
};
