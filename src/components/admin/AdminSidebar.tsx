
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ChefHat, 
  ShoppingBag, 
  CreditCard, 
  Server, 
  BarChart, 
  Settings, 
  Shield, 
  Bell, 
  Wrench,
  Languages,
  Award,
  DollarSign,
  Cpu,
  UserCog
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WasfahLogo } from '../icons/WasfahLogo';
import { AdminLogoutLink } from './AdminLogoutLink';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-slate-700/50 text-white/90 hover:text-white',
        isActive && 'bg-slate-700/70 text-white'
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export const AdminSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const mainItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: UserCog, label: 'User Types', href: '/admin/user-types' },
    { icon: ChefHat, label: 'Recipes', href: '/admin/recipes' },
    { icon: ShoppingBag, label: 'Ingredients', href: '/admin/ingredients' },
    { icon: CreditCard, label: 'Subscriptions', href: '/admin/subscriptions' },
    { icon: DollarSign, label: 'Accounting', href: '/admin/accounting' },
    { icon: Award, label: 'Rewards', href: '/admin/rewards' },
    { icon: Languages, label: 'Languages', href: '/admin/languages' },
    { icon: Cpu, label: 'Integrations', href: '/admin/integrations' },
    { icon: Server, label: 'System', href: '/admin/system' },
    { icon: BarChart, label: 'Analytics', href: '/admin/analytics' },
    { icon: Bell, label: 'Communications', href: '/admin/communications' },
    { icon: Shield, label: 'Security', href: '/admin/security' },
    { icon: Wrench, label: 'Maintenance', href: '/admin/maintenance' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="w-64 hidden md:flex flex-col h-screen bg-gray-900 border-r dark:border-gray-700 sticky top-0">
      <div className="p-4 flex items-center">
        <WasfahLogo className="h-8 w-8" />
        <span className="ml-2 font-bold text-xl text-white">Wasfah Admin</span>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {mainItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
          />
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-wasfah-bright-teal flex items-center justify-center text-white">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-300">admin@wasfahai.com</p>
            </div>
          </div>
          <AdminLogoutLink />
        </div>
      </div>
    </div>
  );
};
