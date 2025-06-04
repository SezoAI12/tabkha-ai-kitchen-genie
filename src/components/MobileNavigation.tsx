
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Search,
  Menu,
  Heart,
  Camera,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRTL } from '@/contexts/RTLContext';

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { t } = useRTL();

  const navItems = [
    {
      icon: Home,
      label: t('Home', 'الرئيسية'),
      href: '/home',
    },
    {
      icon: Search,
      label: t('Find', 'البحث'),
      href: '/find-by-ingredients',
    },
    {
      icon: Camera,
      label: t('Scan', 'المسح'),
      href: '/scan-dish',
    },
    {
      icon: BarChart3,
      label: t('Track', 'التتبع'),
      href: '/health-tracking-home',
    },
    {
      icon: Menu,
      label: t('Menu', 'القائمة'),
      href: '/menu',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t z-50 shadow-lg bg-white border-gray-200">
      <nav className="flex justify-around py-3">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={index}
              to={item.href}
              className={cn(
                'flex flex-col items-center px-4 py-2 rounded-md transition-all relative',
                isActive
                  ? 'text-wasfah-bright-teal'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1 font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
