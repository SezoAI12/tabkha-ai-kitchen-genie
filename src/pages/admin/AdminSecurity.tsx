
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, Lock, Eye, AlertTriangle, Key, Users, Activity } from 'lucide-react';

export default function AdminSecurity() {
  const { toast } = useToast();
  const [activeSession, setActiveSession] = useState([
    { id: 1, user: 'Admin User', ip: '192.168.1.100', location: 'New York, US', device: 'Chrome on Windows', lastActive: '2 minutes ago', status: 'active' },
    { id: 2, user: 'John Doe', ip: '192.168.1.101', location: 'London, UK', device: 'Safari on iPhone', lastActive: '15 minutes ago', status: 'active' },
    { id: 3, user: 'Jane Smith', ip: '192.168.1.102', location: 'Tokyo, JP', device: 'Firefox on Linux', lastActive: '1 hour ago', status: 'idle' }
  ]);

  const [loginAttempts, setLoginAttempts] = useState([
    { id: 1, ip: '192.168.1.200', attempts: 5, lastAttempt: '10 minutes ago', status: 'blocked', location: 'Unknown' },
    { id: 2, ip: '192.168.1.201', attempts: 3, lastAttempt: '1 hour ago', status: 'monitoring', location: 'Paris, FR' },
    { id: 3, ip: '192.168.1.202', attempts: 2, lastAttempt: '2 hours ago', status: 'normal', location: 'Berlin, DE' }
  ]);

  const handleRevokeSession = (sessionId: number) => {
    setActiveSession(sessions => sessions.filter(s => s.id !== sessionId));
    toast({
      title: "Session Revoked",
      description: "User session has been terminated successfully.",
    });
  };

  const handleUnblockIP = (ip: string) => {
    toast({
      title: "IP Unblocked",
      description: `IP address ${ip} has been unblocked.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Security Center
        </h1>
        <p className="text-muted-foreground">Monitor and manage security settings and activities.</p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSession.length}</div>
            <p className="text-xs text-muted-foreground">Currently logged in</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked IPs</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently blocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground">Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>Monitor currently active user sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSession.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.user}</TableCell>
                  <TableCell>{session.ip}</TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell>{session.device}</TableCell>
                  <TableCell>{session.lastActive}</TableCell>
                  <TableCell>
                    <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                      {session.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeSession(session.id)}
                    >
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Login Attempts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Failed Login Attempts
          </CardTitle>
          <CardDescription>Monitor and manage suspicious login activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Failed Attempts</TableHead>
                <TableHead>Last Attempt</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginAttempts.map((attempt) => (
                <TableRow key={attempt.id}>
                  <TableCell className="font-medium">{attempt.ip}</TableCell>
                  <TableCell>{attempt.attempts}</TableCell>
                  <TableCell>{attempt.lastAttempt}</TableCell>
                  <TableCell>{attempt.location}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        attempt.status === 'blocked' ? 'destructive' : 
                        attempt.status === 'monitoring' ? 'secondary' : 'default'
                      }
                    >
                      {attempt.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {attempt.status === 'blocked' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnblockIP(attempt.ip)}
                      >
                        Unblock
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        Block
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Security Configuration
          </CardTitle>
          <CardDescription>Configure security policies and restrictions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxFailedAttempts">Max Failed Login Attempts</Label>
              <Input id="maxFailedAttempts" type="number" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
              <Input id="lockoutDuration" type="number" defaultValue="15" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
              <Input id="sessionTimeout" type="number" defaultValue="24" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
              <Input id="passwordExpiry" type="number" defaultValue="90" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button>Save Security Settings</Button>
            <Button variant="outline">Run Security Audit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
