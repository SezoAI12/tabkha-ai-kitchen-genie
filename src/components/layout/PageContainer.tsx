
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomToolbar from './BottomToolbar';

interface PageContainerHeaderProps {
  title?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
  showLogo?: boolean;
  showSearch?: boolean;
}

interface PageContainerProps {
  children: React.ReactNode;
  header?: PageContainerHeaderProps;
  className?: string;
  hideNavbar?: boolean;
  fullWidth?: boolean;
  noPadding?: boolean;
  hideBottomToolbar?: boolean;
}

export function PageContainer({ 
  children, 
  header, 
  className, 
  hideNavbar, 
  fullWidth, 
  noPadding,
  hideBottomToolbar = false
}: PageContainerProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      {header && !hideNavbar && (
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container flex h-14 items-center">
            {header.showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
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
        </div>
      )}
      <div className={`${fullWidth ? '' : 'container mx-auto'} ${noPadding ? '' : 'px-4 py-6'} ${className || ''}`}>
        {children}
      </div>
      {!hideBottomToolbar && <BottomToolbar />}
    </div>
  );
}

export default PageContainer;
