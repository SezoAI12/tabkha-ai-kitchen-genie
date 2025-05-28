import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User, ChefHat, Wheat } from 'lucide-react'; // Import Wheat for 'Find by Ingredients'
import { cn } from '@/lib/utils';

const BottomToolbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Don't show toolbar on admin pages or auth pages
  // Also, add '/' (root) to the list where the toolbar should not be shown,
  // as per your original logic: "pathname === '/'"
  if (pathname.startsWith('/admin') || pathname === '/auth' || pathname === '/') {
    return null;
  }

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      href: '/home',
      isActive: pathname === '/home' // or pathname.startsWith('/home') if you have sub-routes
    },
    {
      icon: Wheat, // Changed to Wheat icon, suitable for ingredients
      label: 'Find', // Changed label to 'Find'
      href: '/find-by-ingredients', // This is the new path for 'Find by Ingredients'
      isActive: pathname === '/find-by-ingredients' // Check active state for the new path
    },
    {
      icon: Search, // Retaining Search for general search, if applicable, otherwise remove
      label: 'Search',
      href: '/search',
      isActive: pathname === '/search'
    },
    {
      icon: ChefHat,
      label: 'Recipes',
      href: '/recipes',
      isActive: pathname === '/recipes'
    },
    {
      icon: Heart,
      label: 'Favorites',
      href: '/favorites',
      isActive: pathname === '/favorites'
    },
    {
      icon: User,
      label: 'Profile',
      href: '/profile',
      isActive: pathname === '/profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 safe-area-pb">
      <nav className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center py-2 px-3 rounded-lg transition-colors',
                item.isActive
                  ? 'text-wasfah-bright-teal bg-wasfah-bright-teal/10'
                  : 'text-gray-600 dark:text-gray-400 hover:text-wasfah-bright-teal'
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomToolbar;
