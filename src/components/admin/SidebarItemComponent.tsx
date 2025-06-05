
import { Link, useLocation } from 'react-router-dom';
import { Crown } from 'lucide-react';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { isSuperAdminAuthenticated } from '@/lib/adminAuth';
import { SidebarItem } from './SidebarItems';

interface SidebarItemComponentProps {
  item: SidebarItem;
}

export const SidebarItemComponent = ({ item }: SidebarItemComponentProps) => {
  const location = useLocation();
  const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
  const isSuperAdmin = isSuperAdminAuthenticated();
  const Icon = item.icon;

  if (item.requireSuperAdmin && !isSuperAdmin) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton className="opacity-50 cursor-not-allowed" disabled>
          <Icon className="h-4 w-4" />
          <span>{item.title}</span>
          <Crown className="h-3 w-3 text-yellow-400 ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={item.href}>
          <Icon className="h-4 w-4" />
          <span>{item.title}</span>
          {item.requireSuperAdmin && <Crown className="h-3 w-3 text-yellow-400 ml-auto" />}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
