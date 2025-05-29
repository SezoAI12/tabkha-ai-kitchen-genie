
import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  header?: {
    title?: string;
    showLogo?: boolean;
    showSearch?: boolean;
    showBackButton?: boolean;
    actions?: React.ReactNode;
  };
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  header,
  className
}) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {header && (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            {header.showBackButton && (
              <button className="mr-4">
                ← Back
              </button>
            )}
            {header.title && (
              <h1 className="text-lg font-semibold">{header.title}</h1>
            )}
            {header.actions && (
              <div className="ml-auto">
                {header.actions}
              </div>
            )}
          </div>
        </header>
      )}
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  );
};
