
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Plug, Settings, CheckCircle, XCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const mockIntegrations = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing and subscription management',
    status: 'connected',
    enabled: true,
    lastSync: '2024-01-15 10:30:00'
  },
  {
    id: 'mailchimp',
    name: 'MailChimp',
    description: 'Email marketing and newsletter management',
    status: 'connected',
    enabled: true,
    lastSync: '2024-01-15 09:15:00'
  },
  {
    id: 'analytics',
    name: 'Google Analytics',
    description: 'Web analytics and user tracking',
    status: 'disconnected',
    enabled: false,
    lastSync: null
  },
  {
    id: 'social',
    name: 'Social Media APIs',
    description: 'Share recipes on social platforms',
    status: 'connected',
    enabled: false,
    lastSync: '2024-01-14 16:45:00'
  }
];

const AdminIntegrationsPage = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [configDialog, setConfigDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, enabled: !integration.enabled }
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    toast({
      title: `Integration ${integration?.enabled ? 'Disabled' : 'Enabled'}`,
      description: `${integration?.name} has been ${integration?.enabled ? 'disabled' : 'enabled'}.`,
    });
  };

  const handleConfigureIntegration = (integration: any) => {
    setSelectedIntegration(integration);
    setConfigDialog(true);
  };

  const getStatusBadge = (status: string) => {
    return status === 'connected' ? (
      <Badge className="bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        Connected
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">
        <XCircle className="h-3 w-3 mr-1" />
        Disconnected
      </Badge>
    );
  };

  return (
    <AdminPageWrapper title="Integrations">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Integrations</h1>
            <p className="text-muted-foreground">Manage third-party service integrations.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
              <Plug className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{integrations.length}</div>
              <p className="text-xs text-muted-foreground">Available services</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {integrations.filter(i => i.status === 'connected').length}
              </div>
              <div className="text-sm text-gray-600">Connected</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {integrations.filter(i => i.enabled).length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600">
                {integrations.filter(i => i.status === 'disconnected').length}
              </div>
              <div className="text-sm text-gray-600">Disconnected</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enable Integration</span>
                  <Switch
                    checked={integration.enabled}
                    onCheckedChange={() => handleToggleIntegration(integration.id)}
                    disabled={integration.status === 'disconnected'}
                  />
                </div>
                
                {integration.lastSync && (
                  <p className="text-xs text-gray-500">
                    Last sync: {integration.lastSync}
                  </p>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigureIntegration(integration)}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  {integration.status === 'disconnected' ? (
                    <Button size="sm">Connect</Button>
                  ) : (
                    <Button variant="outline" size="sm">Disconnect</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={configDialog} onOpenChange={setConfigDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
              <DialogDescription>
                Update the configuration settings for this integration.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  placeholder="Enter API key"
                  type="password"
                />
              </div>
              <div>
                <Label htmlFor="endpoint">Endpoint URL</Label>
                <Input
                  id="endpoint"
                  placeholder="https://api.example.com"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setConfigDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setConfigDialog(false)}>
                Save Configuration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminIntegrationsPage;
