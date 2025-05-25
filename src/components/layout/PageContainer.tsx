
import React from 'react';
import { MobileHeader } from './MobileHeader';
import { MobileNavbar } from './MobileNavbar';

interface PageContainerProps {
  children: React.ReactNode;
  header?: {
    title?: string;
    showBackButton?: boolean;
    showSearch?: boolean;
    showLogo?: boolean;
    actions?: React.ReactNode;
  };
  hideNavbar?: boolean;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  header,
  hideNavbar = false,
  className = '',
  fullWidth = false,
  noPadding = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-wasfah-light-gray dark:bg-gray-900">
      {header && <MobileHeader {...header} />}
      <main className={`flex-grow pb-20 ${className}`}>
        <div className={`${fullWidth ? '' : 'container'} ${noPadding ? '' : 'px-4 py-4'}`}>
          {children}
        </div>
      </main>
      {!hideNavbar && <MobileNavbar />}
    </div>
  );
};
