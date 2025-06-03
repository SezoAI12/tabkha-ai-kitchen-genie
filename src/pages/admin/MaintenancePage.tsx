
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Trash2, 
  RefreshCw, 
  HardDrive, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Server,
  Loader2,
  Monitor,
  Cpu,
  MemoryStick,
  Wifi,
  Shield,
  Clock,
  Users,
  FileText
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function MaintenancePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTask, setActiveTask] = useState('');

  const systemMetrics = [
    { label: 'CPU Usage', value: '45%', status: 'good', icon: Cpu },
    { label: 'Memory Usage', value: '62%', status: 'warning', icon: MemoryStick },
    { label: 'Disk Space', value: '78%', status: 'warning', icon: HardDrive },
    { label: 'Network', value: '98%', status: 'good', icon: Wifi },
    { label: 'Active Users', value: '1,234', status: 'good', icon: Users },
    { label: 'Database Connections', value: '23/100', status: 'good', icon: Database }
  ];

  const maintenanceTasks = [
    {
      id: 'cleanup-logs',
      title: 'Clean Up System Logs',
      description: 'Remove old system logs and error reports to free up space',
      icon: Trash2,
      status: 'ready',
      lastRun: '2 days ago',
      category: 'cleanup',
      estimatedTime: '5 minutes'
    },
    {
      id: 'optimize-db',
      title: 'Optimize Database',
      description: 'Analyze and optimize database performance and indexes',
      icon: Database,
      status: 'ready',
      lastRun: '1 week ago',
      category: 'performance',
      estimatedTime: '15 minutes'
    },
    {
      id: 'refresh-cache',
      title: 'Refresh Application Cache',
      description: 'Clear and rebuild application cache for better performance',
      icon: RefreshCw,
      status: 'ready',
      lastRun: '1 day ago',
      category: 'performance',
      estimatedTime: '3 minutes'
    },
    {
      id: 'check-storage',
      title: 'Storage Analysis',
      description: 'Analyze storage usage and clean up unused files',
      icon: HardDrive,
      status: 'ready',
      lastRun: '3 days ago',
      category: 'cleanup',
      estimatedTime: '10 minutes'
    },
    {
      id: 'security-scan',
      title: 'Security Scan',
      description: 'Run security scan and vulnerability assessment',
      icon: Shield,
      status: 'ready',
      lastRun: '1 week ago',
      category: 'security',
      estimatedTime: '20 minutes'
    },
    {
      id: 'backup-verification',
      title: 'Backup Verification',
      description: 'Verify integrity of recent backups',
      icon: FileText,
      status: 'ready',
      lastRun: '6 hours ago',
      category: 'backup',
      estimatedTime: '8 minutes'
    }
  ];

  const scheduledTasks = [
    { name: 'Daily Log Cleanup', nextRun: '2024-01-16 02:00', status: 'scheduled' },
    { name: 'Weekly Database Optimization', nextRun: '2024-01-21 03:00', status: 'scheduled' },
    { name: 'Monthly Security Scan', nextRun: '2024-02-01 01:00', status: 'scheduled' },
    { name: 'Backup Verification', nextRun: '2024-01-16 04:00', status: 'scheduled' }
  ];

  const runMaintenance = async (task: any) => {
    setIsRunning(true);
    setActiveTask(task.title);
    setProgress(0);

    // Simulate maintenance task with realistic progress
    const steps = [
      { progress: 10, message: 'Initializing task...' },
      { progress: 30, message: 'Processing data...' },
      { progress: 60, message: 'Applying changes...' },
      { progress: 85, message: 'Finalizing...' },
      { progress: 100, message: 'Complete!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(step.progress);
      
      if (step.progress === 100) {
        toast({
          title: "Maintenance Complete",
          description: `${task.title} has been completed successfully`,
        });
      }
    }

    setIsRunning(false);
    setProgress(0);
    setActiveTask('');
  };

  const runAllMaintenance = async () => {
    setIsRunning(true);
    setActiveTask('Running all maintenance tasks');
    
    for (let i = 0; i <= 100; i += 2) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setIsRunning(false);
    setProgress(0);
    setActiveTask('');
    
    toast({
      title: "All Maintenance Complete",
      description: "All maintenance tasks have been completed successfully"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cleanup':
        return 'bg-blue-100 text-blue-800';
      case 'performance':
        return 'bg-purple-100 text-purple-800';
      case 'security':
        return 'bg-red-100 text-red-800';
      case 'backup':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Maintenance</h1>
          <p className="text-gray-600 mt-1">Monitor and maintain system health</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
            <Server className="h-4 w-4 text-green-500" />
            System Online
          </Badge>
          <Button 
            onClick={runAllMaintenance} 
            disabled={isRunning}
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Running...
              </>
            ) : (
              'Run All Tasks'
            )}
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      {isRunning && (
        <Alert className="border-blue-200 bg-blue-50">
          <Monitor className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-medium">{activeTask}</p>
                <span className="text-sm text-gray-600">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full h-2" />
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="border-l-4 border-l-wasfah-bright-teal">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-wasfah-bright-teal" />
                    <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                  </div>
                  {getStatusIcon(metric.status)}
                </div>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tasks">Maintenance Tasks</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Tasks</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Available Maintenance Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {maintenanceTasks.map((task) => {
                  const Icon = task.icon;
                  return (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-wasfah-bright-teal/10 rounded-lg">
                          <Icon className="h-5 w-5 text-wasfah-bright-teal" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{task.title}</h3>
                            <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Est. {task.estimatedTime}
                            </span>
                            <span>Last run: {task.lastRun}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Button
                          onClick={() => runMaintenance(task)}
                          disabled={isRunning}
                          variant="outline"
                          size="sm"
                        >
                          {isRunning ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Run'
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Scheduled Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-sm text-gray-600">Next run: {task.nextRun}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="mt-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  These actions should only be used in emergency situations and may cause temporary service interruption.
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Button variant="destructive" size="sm" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Force Cache Clear
                </Button>
                <Button variant="destructive" size="sm" className="w-full">
                  <Server className="h-4 w-4 mr-2" />
                  Restart Services
                </Button>
                <Button variant="destructive" size="sm" className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Emergency Backup
                </Button>
                <Button variant="destructive" size="sm" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Lock System
                </Button>
                <Button variant="destructive" size="sm" className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Safe Mode
                </Button>
                <Button variant="destructive" size="sm" className="w-full">
                  <Monitor className="h-4 w-4 mr-2" />
                  System Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
