
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
  fullWidth?: boolean;
  noPadding?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  header,
  className,
  fullWidth = false,
  noPadding = false
}) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {header && (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className={cn("flex h-14 items-center", fullWidth ? "px-4" : "container")}>
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
      <main className={cn(
        fullWidth ? "w-full" : "container mx-auto",
        noPadding ? "" : "p-4"
      )}>
        {children}
      </main>
    </div>
  );
};
