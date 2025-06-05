
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  Plus, 
  Edit,
  Trash2,
  Crown,
  Shield,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserType {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault: boolean;
  userCount: number;
  createdAt: string;
}

const AdminUserTypes = () => {
  const [userTypes, setUserTypes] = useState<UserType[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all administrative privileges',
      permissions: ['all'],
      isDefault: false,
      userCount: 2,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access with limited system management',
      permissions: ['users', 'recipes', 'content'],
      isDefault: false,
      userCount: 5,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'User',
      description: 'Standard user access',
      permissions: ['recipes', 'profile'],
      isDefault: true,
      userCount: 1250,
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Premium User',
      description: 'Enhanced user with premium features',
      permissions: ['recipes', 'profile', 'premium'],
      isDefault: false,
      userCount: 320,
      createdAt: '2024-01-01'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUserType, setNewUserType] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
    isDefault: false
  });

  const { toast } = useToast();

  const handleCreateUserType = () => {
    if (!newUserType.name.trim()) {
      toast({
        title: 'Error',
        description: 'User type name is required.',
        variant: 'destructive'
      });
      return;
    }

    const userType: UserType = {
      id: Date.now().toString(),
      name: newUserType.name,
      description: newUserType.description,
      permissions: newUserType.permissions,
      isDefault: newUserType.isDefault,
      userCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUserTypes([...userTypes, userType]);
    setNewUserType({ name: '', description: '', permissions: [], isDefault: false });
    setIsCreateDialogOpen(false);

    toast({
      title: 'User Type Created',
      description: `${newUserType.name} has been created successfully.`,
    });
  };

  const getTypeIcon = (name: string) => {
    if (name.toLowerCase().includes('super')) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (name.toLowerCase().includes('admin')) return <Shield className="h-5 w-5 text-blue-500" />;
    return <User className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Users className="mr-2 h-6 w-6" /> User Types Management
          </h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create User Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User Type</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter user type name"
                  value={newUserType.name}
                  onChange={(e) => setNewUserType({...newUserType, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter user type description"
                  value={newUserType.description}
                  onChange={(e) => setNewUserType({...newUserType, description: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newUserType.isDefault}
                  onCheckedChange={(checked) => setNewUserType({...newUserType, isDefault: checked})}
                />
                <Label>Set as default user type</Label>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateUserType} className="flex-1">
                  Create User Type
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userTypes.map((userType) => (
          <Card key={userType.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(userType.name)}
                  <CardTitle className="text-lg">{userType.name}</CardTitle>
                </div>
                {userType.isDefault && (
                  <Badge variant="secondary">Default</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{userType.description}</p>
                
                <div>
                  <p className="text-sm font-medium mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {userType.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Users:</span>
                  <span className="font-medium">{userType.userCount}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUserTypes;
