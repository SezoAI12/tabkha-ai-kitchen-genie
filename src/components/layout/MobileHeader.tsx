
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { LanguageSelector } from '../language/LanguageSelector.tsx';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export const MobileHeader: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackClick,
  actions,
  className = '',
}) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={`bg-white dark:bg-gray-950 sticky top-0 z-50 h-14 flex items-center justify-between px-4 shadow-sm ${className}`}>
      <div className="flex items-center space-x-4">
        {showBackButton && (
          <button
            className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={handleBackClick}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {title && <h1 className="text-lg font-semibold truncate">{title}</h1>}
      </div>
      <div className="flex items-center space-x-2">
        <LanguageSelector />
        {actions}
      </div>
    </header>
  );
};
