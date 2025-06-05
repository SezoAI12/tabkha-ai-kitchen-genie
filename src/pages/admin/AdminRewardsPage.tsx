
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
  Gift, 
  Plus, 
  Edit,
  Trash2,
  Star,
  Trophy,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: string;
  isActive: boolean;
  totalClaimed: number;
  createdAt: string;
}

const AdminRewardsPage = () => {
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      name: 'Premium Recipe Access',
      description: '30-day access to premium recipes',
      pointsCost: 500,
      category: 'Premium',
      isActive: true,
      totalClaimed: 120,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Free Meal Plan',
      description: 'Personalized meal plan for one week',
      pointsCost: 200,
      category: 'Meal Planning',
      isActive: true,
      totalClaimed: 85,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Chef Badge',
      description: 'Special chef badge for your profile',
      pointsCost: 100,
      category: 'Badge',
      isActive: true,
      totalClaimed: 340,
      createdAt: '2024-01-01'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newReward, setNewReward] = useState({
    name: '',
    description: '',
    pointsCost: 0,
    category: '',
    isActive: true
  });

  const { toast } = useToast();

  const handleCreateReward = () => {
    if (!newReward.name.trim()) {
      toast({
        title: 'Error',
        description: 'Reward name is required.',
        variant: 'destructive'
      });
      return;
    }

    const reward: Reward = {
      id: Date.now().toString(),
      name: newReward.name,
      description: newReward.description,
      pointsCost: newReward.pointsCost,
      category: newReward.category,
      isActive: newReward.isActive,
      totalClaimed: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRewards([...rewards, reward]);
    setNewReward({ name: '', description: '', pointsCost: 0, category: '', isActive: true });
    setIsCreateDialogOpen(false);

    toast({
      title: 'Reward Created',
      description: `${newReward.name} has been created successfully.`,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'premium': return <Star className="h-5 w-5 text-yellow-500" />;
      case 'badge': return <Award className="h-5 w-5 text-blue-500" />;
      default: return <Trophy className="h-5 w-5 text-green-500" />;
    }
  };

  const totalPoints = rewards.reduce((sum, reward) => sum + (reward.pointsCost * reward.totalClaimed), 0);
  const totalClaimed = rewards.reduce((sum, reward) => sum + reward.totalClaimed, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Gift className="mr-2 h-6 w-6" /> Rewards Management
          </h1>
          <p className="text-muted-foreground">Manage loyalty rewards and point system</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Reward
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Reward</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Reward Name</Label>
                <Input
                  id="name"
                  placeholder="Enter reward name"
                  value={newReward.name}
                  onChange={(e) => setNewReward({...newReward, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter reward description"
                  value={newReward.description}
                  onChange={(e) => setNewReward({...newReward, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pointsCost">Points Cost</Label>
                  <Input
                    id="pointsCost"
                    type="number"
                    placeholder="Enter points cost"
                    value={newReward.pointsCost}
                    onChange={(e) => setNewReward({...newReward, pointsCost: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Enter category"
                    value={newReward.category}
                    onChange={(e) => setNewReward({...newReward, category: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newReward.isActive}
                  onCheckedChange={(checked) => setNewReward({...newReward, isActive: checked})}
                />
                <Label>Active reward</Label>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateReward} className="flex-1">
                  Create Reward
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Gift className="h-4 w-4 text-muted-foreground" />
              <span className="ml-2 text-sm font-medium">Total Rewards</span>
            </div>
            <div className="text-2xl font-bold">{rewards.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span className="ml-2 text-sm font-medium">Total Claimed</span>
            </div>
            <div className="text-2xl font-bold">{totalClaimed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="ml-2 text-sm font-medium">Points Redeemed</span>
            </div>
            <div className="text-2xl font-bold">{totalPoints.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <Card key={reward.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(reward.category)}
                  <CardTitle className="text-lg">{reward.name}</CardTitle>
                </div>
                <Badge variant={reward.isActive ? 'default' : 'secondary'}>
                  {reward.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{reward.description}</p>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Points Cost:</span>
                  <span className="font-medium">{reward.pointsCost} pts</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Times Claimed:</span>
                  <span className="font-medium">{reward.totalClaimed}</span>
                </div>

                <Badge variant="outline">{reward.category}</Badge>

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

export default AdminRewardsPage;
