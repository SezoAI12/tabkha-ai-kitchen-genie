
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle,
  Database,
  RefreshCw,
  Trash2,
  Download,
  Upload,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminMaintenancePage = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('System is temporarily unavailable for maintenance. Please check back soon.');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const maintenanceTasks = [
    {
      id: '1',
      name: 'Database Optimization',
      description: 'Optimize database indexes and clean up old data',
      lastRun: '2024-01-10',
      status: 'completed',
      duration: '15 minutes'
    },
    {
      id: '2',
      name: 'Cache Cleanup',
      description: 'Clear expired cache entries and rebuild cache',
      lastRun: '2024-01-15',
      status: 'completed',
      duration: '5 minutes'
    },
    {
      id: '3',
      name: 'Backup Creation',
      description: 'Create full system backup',
      lastRun: '2024-01-14',
      status: 'pending',
      duration: '30 minutes'
    },
    {
      id: '4',
      name: 'Log Rotation',
      description: 'Archive old log files and clean up disk space',
      lastRun: '2024-01-12',
      status: 'completed',
      duration: '2 minutes'
    }
  ];

  const handleMaintenanceModeToggle = (enabled: boolean) => {
    setMaintenanceMode(enabled);
    toast({
      title: enabled ? 'Maintenance Mode Enabled' : 'Maintenance Mode Disabled',
      description: enabled 
        ? 'The system is now in maintenance mode. Users will see the maintenance message.'
        : 'The system is now back online and accessible to users.',
    });
  };

  const handleRunTask = async (taskName: string) => {
    setIsLoading(true);
    
    // Simulate task execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Task Completed',
      description: `${taskName} has been executed successfully.`,
    });
    
    setIsLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      running: 'bg-blue-100 text-blue-800',
      failed: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Shield className="mr-2 h-6 w-6" /> System Maintenance
          </h1>
          <p className="text-muted-foreground">Manage system maintenance and operations</p>
        </div>
      </div>

      {/* Maintenance Mode Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Maintenance Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                When enabled, users will see a maintenance message instead of the application
              </p>
            </div>
            <Switch
              id="maintenance-mode"
              checked={maintenanceMode}
              onCheckedChange={handleMaintenanceModeToggle}
            />
          </div>

          {maintenanceMode && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Maintenance mode is currently <strong>ACTIVE</strong>. Users cannot access the application.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="maintenance-message">Maintenance Message</Label>
            <Textarea
              id="maintenance-message"
              placeholder="Enter the message users will see during maintenance"
              value={maintenanceMessage}
              onChange={(e) => setMaintenanceMessage(e.target.value)}
            />
          </div>

          <Button 
            variant="outline" 
            onClick={() => toast({
              title: 'Message Updated',
              description: 'Maintenance message has been saved.',
            })}
          >
            Save Message
          </Button>
        </CardContent>
      </Card>

      {/* Maintenance Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Last run: {task.lastRun} • Duration: {task.duration}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(task.status)}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRunTask(task.name)}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                    Run
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Operations */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Backup & Restore</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Create Backup
              </Button>
              <Button variant="outline" className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Restore Backup
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Last backup: January 14, 2024 at 3:30 AM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Cleanup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
              <Button variant="outline" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Reset Logs
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Cache size: 2.4 GB • Log files: 890 MB
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMaintenancePage;
