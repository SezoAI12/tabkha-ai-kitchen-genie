
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, 
  Database, 
  Server,
  Cpu,
  HardDrive,
  Wifi,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Settings
} from 'lucide-react';

const AdminSystemPage = () => {
  const [systemStatus, setSystemStatus] = useState({
    database: 'online',
    server: 'online',
    api: 'online',
    storage: 'warning'
  });

  const systemMetrics = {
    cpu: 45,
    memory: 68,
    disk: 82,
    network: 23
  };

  const services = [
    { name: 'Database', status: 'online', uptime: '99.9%', lastCheck: '2 minutes ago' },
    { name: 'API Server', status: 'online', uptime: '99.8%', lastCheck: '1 minute ago' },
    { name: 'File Storage', status: 'warning', uptime: '98.5%', lastCheck: '5 minutes ago' },
    { name: 'Cache Server', status: 'online', uptime: '99.7%', lastCheck: '3 minutes ago' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'offline': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      online: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      offline: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Monitor className="mr-2 h-6 w-6" /> System Management
          </h1>
          <p className="text-muted-foreground">Monitor system health and performance</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      {/* System Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="ml-2 text-sm font-medium">CPU Usage</span>
              </div>
              <span className="text-lg font-bold">{systemMetrics.cpu}%</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${systemMetrics.cpu}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span className="ml-2 text-sm font-medium">Memory</span>
              </div>
              <span className="text-lg font-bold">{systemMetrics.memory}%</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${systemMetrics.memory}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="ml-2 text-sm font-medium">Disk Usage</span>
              </div>
              <span className="text-lg font-bold">{systemMetrics.disk}%</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full" 
                style={{ width: `${systemMetrics.disk}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wifi className="h-4 w-4 text-muted-foreground" />
                <span className="ml-2 text-sm font-medium">Network</span>
              </div>
              <span className="text-lg font-bold">{systemMetrics.network}%</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${systemMetrics.network}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(service.status)}
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(service.status)}
                      <p className="text-xs text-muted-foreground mt-1">{service.lastCheck}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Server className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">System Logs Coming Soon</p>
                <p className="text-muted-foreground">Real-time system logs and error monitoring will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">Configuration Panel Coming Soon</p>
                <p className="text-muted-foreground">System configuration and environment settings will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSystemPage;
