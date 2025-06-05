
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { WasfahLogo } from '@/components/icons/WasfahLogo';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { getAdminRole } from '@/lib/adminAuth';
import { SidebarItemComponent } from './SidebarItemComponent';
import {
  mainItems,
  contentItems,
  businessItems,
  communityItems,
  systemItems
} from './SidebarItems';

export const ModernAdminSidebar: React.FC = () => {
  const adminRole = getAdminRole();

  return (
    <Sidebar variant="sidebar" className="bg-gray-900 text-white border-gray-800">
      <SidebarHeader className="border-b border-gray-800 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-wasfah-bright-teal rounded-lg flex items-center justify-center">
            <WasfahLogo className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Admin Panel</h2>
            <div className="flex items-center gap-1">
              <p className="text-xs text-gray-400">Wasfah Management</p>
              {adminRole === 'superadmin' && (
                <>
                  <Crown className="h-3 w-3 text-yellow-400" />
                  <span className="text-xs text-yellow-400">Super Admin</span>
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarItemComponent key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-gray-800" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            Content
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => (
                <SidebarItemComponent key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-gray-800" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            Business
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessItems.map((item) => (
                <SidebarItemComponent key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-gray-800" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            Community
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communityItems.map((item) => (
                <SidebarItemComponent key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-gray-800" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarItemComponent key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold",
              adminRole === 'superadmin' ? 'bg-yellow-500' : 'bg-wasfah-bright-teal'
            )}>
              {adminRole === 'superadmin' ? 'SA' : 'A'}
            </div>
            <div>
              <p className="text-sm font-medium text-white flex items-center">
                {adminRole === 'superadmin' ? 'Super Admin' : 'Admin User'}
              </p>
              <p className="text-xs text-gray-300">
                {adminRole === 'superadmin' ? 'superadmin@wasfahai.com' : 'admin@wasfahai.com'}
              </p>
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-3 text-gray-300 border-gray-600 hover:bg-gray-800"
          asChild
        >
          <Link to="/home">Back to App</Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
