
import { 
  LayoutDashboard, Users, BookOpen, Settings, Shield, 
  BarChart3, CreditCard, Gift, Languages, Monitor,
  UserCog, Building, Plug, Image, FileText, Library,
  Crown, MessageCircle, HelpCircle, Globe, Megaphone
} from 'lucide-react';

export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  requireSuperAdmin?: boolean;
}

export const mainItems: SidebarItem[] = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Users', href: '/admin/users', icon: Users },
  { title: 'User Types', href: '/admin/user-types', icon: UserCog, requireSuperAdmin: true },
  { title: 'Recipes', href: '/admin/recipes', icon: BookOpen },
  { title: 'Content Library', href: '/admin/content-library', icon: Library },
  { title: 'Support Tickets', href: '/admin/support-tickets', icon: HelpCircle },
];

export const contentItems: SidebarItem[] = [
  { title: 'Ingredients', href: '/admin/ingredients', icon: Image },
  { title: 'Ingredient Images', href: '/admin/ingredient-images', icon: Image },
  { title: 'Image Control', href: '/admin/image-control', icon: Image },
  { title: 'Translations', href: '/admin/translations', icon: FileText },
  { title: 'Languages', href: '/admin/languages', icon: Languages },
];

export const businessItems: SidebarItem[] = [
  { title: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
  { title: 'Accounting', href: '/admin/accounting', icon: Building, requireSuperAdmin: true },
  { title: 'Rewards', href: '/admin/rewards', icon: Gift },
  { title: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { title: 'Communications', href: '/admin/communications', icon: MessageCircle },
  { title: 'Advertisement', href: '/admin/advertisement', icon: Megaphone },
];

export const communityItems: SidebarItem[] = [
  { title: 'Community', href: '/admin/community', icon: Users },
  { title: 'Notifications', href: '/admin/notifications', icon: MessageCircle },
];

export const systemItems: SidebarItem[] = [
  { title: 'Integrations', href: '/admin/integrations', icon: Plug, requireSuperAdmin: true },
  { title: 'System', href: '/admin/system', icon: Monitor, requireSuperAdmin: true },
  { title: 'Security', href: '/admin/security', icon: Shield, requireSuperAdmin: true },
  { title: 'Maintenance', href: '/admin/maintenance', icon: Shield, requireSuperAdmin: true },
  { title: 'Settings', href: '/admin/settings', icon: Settings, requireSuperAdmin: true },
];
