
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, Bell, Send, Users, Calendar, Settings } from 'lucide-react';

export default function AdminCommunications() {
  const { toast } = useToast();
  const [emailCampaigns, setEmailCampaigns] = useState([
    { id: 1, name: 'Weekly Recipe Newsletter', status: 'active', recipients: 1250, sent: '2024-01-15', openRate: '24.5%' },
    { id: 2, name: 'New Features Announcement', status: 'draft', recipients: 2100, sent: null, openRate: null },
    { id: 3, name: 'Premium Subscription Offer', status: 'completed', recipients: 890, sent: '2024-01-10', openRate: '18.2%' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Recipe of the Day', message: 'Try our featured Mediterranean Bowl recipe!', type: 'push', status: 'sent', sent: '2 hours ago' },
    { id: 2, title: 'Ingredient Expiring Soon', message: 'Your milk expires tomorrow', type: 'in-app', status: 'sent', sent: '1 day ago' },
    { id: 3, title: 'Weekly Meal Plan Ready', message: 'Your personalized meal plan is ready', type: 'email', status: 'scheduled', sent: 'Tomorrow 9:00 AM' }
  ]);

  const handleSendCampaign = (campaignId: number) => {
    setEmailCampaigns(campaigns => 
      campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, status: 'completed', sent: new Date().toISOString().split('T')[0] }
          : campaign
      )
    );
    toast({
      title: "Campaign Sent",
      description: "Email campaign has been sent successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Communications Center
        </h1>
        <p className="text-muted-foreground">Manage email campaigns, notifications, and user communications.</p>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Campaigns</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailCampaigns.length}</div>
            <p className="text-xs text-muted-foreground">Active campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,240</div>
            <p className="text-xs text-muted-foreground">Subscribed users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21.4%</div>
            <p className="text-xs text-muted-foreground">Average open rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5K</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Email Campaigns</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Email Campaigns</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create Campaign</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input id="campaignName" placeholder="Enter campaign name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input id="subject" placeholder="Enter email subject" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Email Content</Label>
                    <Textarea id="content" placeholder="Enter email content" rows={6} />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button>Send Campaign</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge variant={
                          campaign.status === 'active' ? 'default' : 
                          campaign.status === 'completed' ? 'secondary' : 'outline'
                        }>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                      <TableCell>{campaign.sent || 'Not sent'}</TableCell>
                      <TableCell>{campaign.openRate || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {campaign.status === 'draft' && (
                            <Button
                              size="sm"
                              onClick={() => handleSendCampaign(campaign.id)}
                            >
                              Send
                            </Button>
                          )}
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Push Notifications</h3>
            <Button>Send Notification</Button>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{notification.message}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{notification.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={notification.status === 'sent' ? 'default' : 'secondary'}>
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{notification.sent}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Email Templates</h3>
            <Button>Create Template</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Email</CardTitle>
                <CardDescription>New user registration welcome message</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">Preview</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recipe Newsletter</CardTitle>
                <CardDescription>Weekly recipe recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">Preview</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password Reset</CardTitle>
                <CardDescription>Password recovery instructions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">Preview</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Communication Settings
              </CardTitle>
              <CardDescription>Configure email and notification settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email Address</Label>
                  <Input id="fromEmail" defaultValue="noreply@wasfahai.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input id="fromName" defaultValue="Wasfah AI Team" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="replyTo">Reply-To Address</Label>
                <Input id="replyTo" defaultValue="support@wasfahai.com" />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
