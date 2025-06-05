
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings, Key, AlertTriangle, CheckCircle2, RefreshCw, ExternalLink, Plus, Plug, Cloud, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  status: 'active' | 'inactive' | 'error';
  lastSync?: string;
  category: 'analytics' | 'monitoring' | 'ai' | 'media' | 'notifications' | 'social' | 'payments' | 'storage';
  hasApiKey?: boolean;
}

const mockIntegrations: Integration[] = [
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    description: 'Image and video management platform',
    icon: <Cloud className="w-6 h-6 text-blue-600" />,
    isConnected: true,
    status: 'active',
    lastSync: '2 minutes ago',
    category: 'media',
    hasApiKey: true
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    description: 'AI Chef Assistant functionality',
    icon: <Code className="w-6 h-6 text-green-600" />,
    isConnected: true,
    status: 'active',
    lastSync: '1 minute ago',
    category: 'ai',
    hasApiKey: true
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing integration',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8.5C14 8.5 14 4 9.5 4C5 4 5 8.5 5 8.5C5 8.5 5 13 9.5 13C14 13 14 8.5 14 8.5Z" stroke="#7A73FF" strokeWidth="2" />
      <path d="M19 15.5C19 15.5 19 11 14.5 11C10 11 10 15.5 10 15.5C10 15.5 10 20 14.5 20C19 20 19 15.5 19 15.5Z" stroke="#7A73FF" strokeWidth="2" />
    </svg>,
    isConnected: false,
    status: 'inactive',
    category: 'payments',
    hasApiKey: true
  }
];

const AdminIntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    cloudName: '',
    apiKey: '',
    apiSecret: '',
    environmentVariable: ''
  });
  const { toast } = useToast();
  
  const handleToggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { 
            ...integration, 
            isConnected: !integration.isConnected,
            status: !integration.isConnected ? 'active' : 'inactive'
          }
        : integration
    ));
    
    const integration = integrations.find(int => int.id === id);
    if (integration) {
      toast({
        title: integration.isConnected ? 'Integration Disabled' : 'Integration Enabled',
        description: `${integration.name} has been ${integration.isConnected ? 'disconnected' : 'connected'} successfully.`,
      });
    }
  };
  
  const handleSyncIntegration = (id: string) => {
    const integration = integrations.find(int => int.id === id);
    if (integration) {
      toast({
        title: 'Syncing Integration',
        description: `Synchronizing data with ${integration.name}...`,
      });
      
      setTimeout(() => {
        setIntegrations(integrations.map(int => 
          int.id === id ? { ...int, lastSync: 'Just now' } : int
        ));
        
        toast({
          title: 'Sync Complete',
          description: `${integration.name} data has been synchronized.`,
        });
      }, 2000);
    }
  };

  const handleAddIntegration = () => {
    if (!newIntegration.name) {
      toast({
        title: 'Error',
        description: 'Integration name is required.',
        variant: 'destructive'
      });
      return;
    }

    const integration: Integration = {
      id: newIntegration.name.toLowerCase().replace(/\s+/g, '-'),
      name: newIntegration.name,
      description: 'Custom integration',
      icon: <Plug className="w-6 h-6 text-gray-600" />,
      isConnected: false,
      status: 'inactive',
      category: 'storage',
      hasApiKey: !!(newIntegration.apiKey || newIntegration.apiSecret)
    };

    setIntegrations([...integrations, integration]);
    setNewIntegration({
      name: '',
      cloudName: '',
      apiKey: '',
      apiSecret: '',
      environmentVariable: ''
    });
    setIsAddDialogOpen(false);

    toast({
      title: 'Integration Added',
      description: `${newIntegration.name} has been added successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Settings className="mr-2 h-6 w-6" /> Integrations Manager
          </h1>
          <p className="text-muted-foreground">Manage third-party integrations and API connections</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="integrationName">Integration Name *</Label>
                <Input
                  id="integrationName"
                  placeholder="Enter integration name"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cloudName">Cloud Name (Optional)</Label>
                  <Input
                    id="cloudName"
                    placeholder="Your cloud name"
                    value={newIntegration.cloudName}
                    onChange={(e) => setNewIntegration({...newIntegration, cloudName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="environmentVariable">Environment Variable (Optional)</Label>
                  <Input
                    id="environmentVariable"
                    placeholder="ENV_VAR_NAME"
                    value={newIntegration.environmentVariable}
                    onChange={(e) => setNewIntegration({...newIntegration, environmentVariable: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="apiKey">API Key (Optional)</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Your API key"
                    value={newIntegration.apiKey}
                    onChange={(e) => setNewIntegration({...newIntegration, apiKey: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="apiSecret">API Secret (Optional)</Label>
                  <Input
                    id="apiSecret"
                    type="password"
                    placeholder="Your API secret"
                    value={newIntegration.apiSecret}
                    onChange={(e) => setNewIntegration({...newIntegration, apiSecret: e.target.value})}
                  />
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 dark:text-amber-300">Security Note:</p>
                    <p className="text-amber-700 dark:text-amber-400">
                      API keys and secrets will be stored securely. Only provide credentials for services you trust.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddIntegration} className="flex-1">
                  Add Integration
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="integrations">
        <TabsList className="mb-4">
          <TabsTrigger value="integrations">Active Integrations</TabsTrigger>
          <TabsTrigger value="api-keys">API Management</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="integrations">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
              <Card key={integration.id} className={integration.status === 'error' ? 'border-red-300' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                        {integration.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {integration.status === 'active' && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            <span className="text-sm">Active</span>
                          </div>
                        )}
                        {integration.status === 'inactive' && (
                          <div className="flex items-center text-gray-600">
                            <div className="h-2 w-2 rounded-full bg-gray-600 mr-2" />
                            <span className="text-sm">Inactive</span>
                          </div>
                        )}
                        {integration.status === 'error' && (
                          <div className="flex items-center text-red-600">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            <span className="text-sm">Error</span>
                          </div>
                        )}
                      </div>
                      <Switch 
                        checked={integration.isConnected}
                        onCheckedChange={() => handleToggleIntegration(integration.id)}
                      />
                    </div>

                    {integration.lastSync && (
                      <p className="text-xs text-gray-500">Last sync: {integration.lastSync}</p>
                    )}

                    {integration.hasApiKey && (
                      <Badge variant="outline" className="text-xs">
                        <Key className="h-3 w-3 mr-1" />
                        API Configured
                      </Badge>
                    )}
                  </div>
                </CardContent>
                
                {integration.isConnected && (
                  <CardFooter className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleSyncIntegration(integration.id)}
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Sync
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                  </CardFooter>
                )}
                
                {integration.status === 'error' && (
                  <CardFooter className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm p-4">
                    <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                    Connection error. Please check your API credentials and try again.
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
              <CardDescription>Manage API keys for external service access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.filter(int => int.hasApiKey).map((integration) => (
                  <div key={integration.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      {integration.icon}
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-gray-500">API Key configured</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Revoke</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>Configure endpoints for real-time event notifications</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-64 text-muted-foreground">
              <div className="text-center">
                <ExternalLink className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Webhook Configuration Coming Soon</p>
                <p className="mt-2">Set up webhook endpoints to receive event notifications in real-time.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminIntegrationsPage;
