
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { Loader2, Settings, Shield, MessageSquare, Globe, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminPage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isViewingLogs, setIsViewingLogs] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  // Mock function to refresh data
  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "All admin data has been successfully refreshed.",
        duration: 3000,
      });
    }, 1500);
  };

  // Mock function to view logs
  const handleViewLogs = () => {
    setIsViewingLogs(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsViewingLogs(false);
      setLogs([
        "[2025-05-21 08:30:12] INFO: Admin login successful",
        "[2025-05-21 08:35:27] WARNING: Failed login attempt from IP 192.168.1.105",
        "[2025-05-21 09:15:03] INFO: User data exported by admin",
        "[2025-05-21 10:22:45] INFO: System maintenance completed",
        "[2025-05-21 11:05:18] ERROR: Database connection timeout",
      ]);
      
      toast({
        title: "System Logs",
        description: "System logs have been loaded successfully.",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden border-l dark:border-gray-800">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Admin Actions */}
          <div className="mb-6 flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
              onClick={handleRefreshData}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                'Refresh Data'
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
              onClick={handleViewLogs}
              disabled={isViewingLogs}
            >
              {isViewingLogs ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'View Logs'
              )}
            </Button>
          </div>
          
          {/* System Logs */}
          {logs.length > 0 && (
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">System Logs</h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded p-3 font-mono text-xs overflow-x-auto max-h-40 overflow-y-auto">
                {logs.map((log, index) => (
                  <div 
                    key={index} 
                    className={`py-1 ${
                      log.includes("ERROR") ? "text-red-600 dark:text-red-400" : 
                      log.includes("WARNING") ? "text-amber-600 dark:text-amber-400" : 
                      "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Tabs 
            defaultValue="dashboard" 
            className="w-full" 
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-1 h-4 w-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="mr-1 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="maintenance">
                <Zap className="mr-1 h-4 w-4" />
                Maintenance
              </TabsTrigger>
              <TabsTrigger value="communications">
                <MessageSquare className="mr-1 h-4 w-4" />
                Communications
              </TabsTrigger>
              <TabsTrigger value="integrations">
                <Globe className="mr-1 h-4 w-4" />
                Integrations
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <Outlet />
            </TabsContent>
            
            <TabsContent value="settings">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-gray-500">Put the application into maintenance mode</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Debug Mode</p>
                      <p className="text-sm text-gray-500">Enable debug information in logs</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Cache Duration</p>
                      <p className="text-sm text-gray-500">Set default cache duration</p>
                    </div>
                    <Select defaultValue="1h">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15m">15 minutes</SelectItem>
                        <SelectItem value="30m">30 minutes</SelectItem>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="6h">6 hours</SelectItem>
                        <SelectItem value="24h">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Require 2FA for all admin users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-gray-500">Automatically log out inactive admin sessions</p>
                    </div>
                    <Select defaultValue="30m">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15m">15 minutes</SelectItem>
                        <SelectItem value="30m">30 minutes</SelectItem>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="4h">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">IP Restriction</p>
                      <p className="text-sm text-gray-500">Limit admin access to approved IP addresses</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="maintenance">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-md p-4 flex items-start mb-4">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-400">Scheduled Maintenance</p>
                      <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                        System maintenance is scheduled for May 25, 2025 at 02:00 AM UTC.
                        Expected downtime is approximately 30 minutes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    <Button variant="outline">Run Database Optimization</Button>
                    <Button variant="outline">Clear System Cache</Button>
                    <Button variant="outline">Generate Backup</Button>
                    <Button variant="destructive">Reset All Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="communications">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Communication Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Notifications</p>
                      <p className="text-sm text-gray-500">Send automated notifications about system events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Service</p>
                      <p className="text-sm text-gray-500">Select email provider for system emails</p>
                    </div>
                    <Select defaultValue="ses">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ses">Amazon SES</SelectItem>
                        <SelectItem value="sendgrid">SendGrid</SelectItem>
                        <SelectItem value="mailgun">Mailgun</SelectItem>
                        <SelectItem value="smtp">Custom SMTP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Message Templates</p>
                      <p className="text-sm text-gray-500">Manage email and notification templates</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Integration Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AI Services</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">OpenAI Integration</p>
                          <p className="text-sm text-gray-500">Enable GPT models for recipe generation</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Recipe AI Model</p>
                          <p className="text-sm text-gray-500">Select the AI model for recipe generation</p>
                        </div>
                        <Select defaultValue="gpt-4o">
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-3.5">GPT 3.5</SelectItem>
                            <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                            <SelectItem value="gpt-4.5">GPT-4.5 Preview</SelectItem>
                            <SelectItem value="custom">Custom Model</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Visual Recognition</p>
                          <p className="text-sm text-gray-500">Enable dish and ingredient recognition</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-medium">Language Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Default Language</p>
                          <p className="text-sm text-gray-500">Set default system language</p>
                        </div>
                        <Select defaultValue="en">
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ar">Arabic</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Translation Service</p>
                          <p className="text-sm text-gray-500">API for translating content</p>
                        </div>
                        <Select defaultValue="google">
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="google">Google Translate</SelectItem>
                            <SelectItem value="deepl">DeepL</SelectItem>
                            <SelectItem value="azure">Azure Translator</SelectItem>
                            <SelectItem value="custom">Custom API</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Auto-Translate New Content</p>
                          <p className="text-sm text-gray-500">Automatically translate new content to all languages</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
