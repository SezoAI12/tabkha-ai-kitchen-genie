
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, Bell, Send, Users, Calendar, Edit, Trash2 } from 'lucide-react';

export default function AdminCommunications() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    type: 'email',
    subject: '',
    content: '',
    audience: 'all',
    scheduled: false,
    scheduleTime: ''
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Recipe Features',
      content: 'Discover our latest AI-powered recipe recommendations',
      type: 'announcement',
      audience: 'all_users',
      status: 'sent',
      sent_at: '2024-01-15T10:00:00Z',
      open_rate: 78.5
    },
    {
      id: 2,
      title: 'Weekly Meal Plan Ready',
      content: 'Your personalized meal plan for this week is ready',
      type: 'reminder',
      audience: 'premium_users',
      status: 'scheduled',
      scheduled_at: '2024-01-20T09:00:00Z',
      open_rate: null
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.subject || !newMessage.content) {
      toast({
        title: "Validation Error",
        description: "Subject and content are required",
        variant: "destructive",
      });
      return;
    }

    const message = {
      id: notifications.length + 1,
      title: newMessage.subject,
      content: newMessage.content,
      type: 'announcement',
      audience: newMessage.audience,
      status: newMessage.scheduled ? 'scheduled' : 'sent',
      sent_at: newMessage.scheduled ? undefined : new Date().toISOString(),
      scheduled_at: newMessage.scheduled ? newMessage.scheduleTime : undefined,
      open_rate: newMessage.scheduled ? null : Math.floor(Math.random() * 100)
    };

    setNotifications([message, ...notifications]);
    setNewMessage({
      type: 'email',
      subject: '',
      content: '',
      audience: 'all',
      scheduled: false,
      scheduleTime: ''
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Success",
      description: newMessage.scheduled ? "Message scheduled successfully" : "Message sent successfully",
    });
  };

  const handleDeleteMessage = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: "Message Deleted",
      description: "The message has been removed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Communications Center
          </h1>
          <p className="text-muted-foreground">
            Manage notifications, emails, and user communications.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Create Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Message Type</Label>
                <Select value={newMessage.type} onValueChange={(value) => setNewMessage({...newMessage, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select message type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="in-app">In-App Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="audience">Audience</Label>
                <Select value={newMessage.audience} onValueChange={(value) => setNewMessage({...newMessage, audience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="premium">Premium Users</SelectItem>
                    <SelectItem value="free">Free Users</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  placeholder="Enter message subject"
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                  placeholder="Enter message content"
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newMessage.scheduled}
                  onCheckedChange={(checked) => setNewMessage({...newMessage, scheduled: checked})}
                />
                <Label>Schedule for later</Label>
              </div>
              {newMessage.scheduled && (
                <div>
                  <Label htmlFor="scheduleTime">Schedule Time</Label>
                  <Input
                    id="scheduleTime"
                    type="datetime-local"
                    value={newMessage.scheduleTime}
                    onChange={(e) => setNewMessage({...newMessage, scheduleTime: e.target.value})}
                  />
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMessage}>
                  {newMessage.scheduled ? 'Schedule' : 'Send'} Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,678</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Messages queued</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="segments">Audience</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
              <CardDescription>All sent and scheduled messages</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {message.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{message.audience.replace('_', ' ')}</TableCell>
                      <TableCell>
                        <Badge variant={message.status === 'sent' ? 'default' : 'secondary'}>
                          {message.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {message.open_rate ? `${message.open_rate}%` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {message.sent_at ? new Date(message.sent_at).toLocaleDateString() : 
                         message.scheduled_at ? new Date(message.scheduled_at).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleDeleteMessage(message.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Pre-built templates for common communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Welcome Message</h3>
                  <p className="text-sm text-gray-600 mb-3">Welcome new users to the platform</p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Recipe Reminder</h3>
                  <p className="text-sm text-gray-600 mb-3">Remind users about saved recipes</p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Premium Upgrade</h3>
                  <p className="text-sm text-gray-600 mb-3">Promote premium features</p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Meal Plan Ready</h3>
                  <p className="text-sm text-gray-600 mb-3">Notify about weekly meal plans</p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>Manage user groups for targeted messaging</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">All Users</p>
                    <p className="text-sm text-gray-600">125,430 users</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Premium Users</p>
                    <p className="text-sm text-gray-600">23,456 users</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Free Users</p>
                    <p className="text-sm text-gray-600">101,974 users</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Inactive Users (30+ days)</p>
                    <p className="text-sm text-gray-600">12,345 users</p>
                  </div>
                  <Badge variant="secondary">Inactive</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Settings</CardTitle>
              <CardDescription>Configure messaging preferences and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow sending email notifications to users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow sending push notifications to mobile app users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>In-App Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Show messages within the application
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rateLimit">Daily Message Limit</Label>
                <Input id="rateLimit" type="number" defaultValue="50" />
                <p className="text-sm text-muted-foreground">
                  Maximum number of messages per user per day
                </p>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
