
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Trophy, Crown, Zap, Check, ChefHat, Share2, Calendar, Users } from 'lucide-react';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';

const LoyaltyProgramPage = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [userTier, setUserTier] = useState('Gold');
  const [claimedRewards, setClaimedRewards] = useState<number[]>([]);

  const rewards = [
    { 
      id: 1, 
      name: 'Free Premium Recipe', 
      points: 500, 
      icon: Star, 
      available: true,
      description: 'Unlock one premium recipe of your choice'
    },
    { 
      id: 2, 
      name: '10% Off Subscription', 
      points: 1000, 
      icon: Gift, 
      available: true,
      description: 'Get 10% discount on your next subscription'
    },
    { 
      id: 3, 
      name: 'Exclusive Recipe Collection', 
      points: 1500, 
      icon: Trophy, 
      available: false,
      description: 'Access to chef-curated recipe collections'
    },
    { 
      id: 4, 
      name: 'Personal Chef Consultation', 
      points: 2500, 
      icon: Crown, 
      available: false,
      description: '30-minute one-on-one session with a professional chef'
    }
  ];

  const activities = [
    { action: 'Daily Login', points: 10, description: 'Login to the app daily', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { action: 'Share Recipe', points: 50, description: 'Share a recipe with friends', icon: Share2, color: 'bg-green-100 text-green-600' },
    { action: 'Create Recipe', points: 100, description: 'Create and publish a new recipe', icon: ChefHat, color: 'bg-purple-100 text-purple-600' },
    { action: 'Join Community', points: 75, description: 'Participate in community discussions', icon: Users, color: 'bg-orange-100 text-orange-600' }
  ];

  const tierRequirements = {
    Bronze: 0,
    Silver: 1000,
    Gold: 2500,
    Platinum: 5000
  };

  const getNextTier = () => {
    if (userPoints < tierRequirements.Silver) return { name: 'Silver', points: tierRequirements.Silver };
    if (userPoints < tierRequirements.Gold) return { name: 'Gold', points: tierRequirements.Gold };
    if (userPoints < tierRequirements.Platinum) return { name: 'Platinum', points: tierRequirements.Platinum };
    return null;
  };

  const nextTier = getNextTier();
  const progressPercentage = nextTier ? (userPoints / nextTier.points) * 100 : 100;

  const handleRedeemReward = (rewardId: number, pointsCost: number) => {
    if (userPoints >= pointsCost && !claimedRewards.includes(rewardId)) {
      setUserPoints(prev => prev - pointsCost);
      setClaimedRewards(prev => [...prev, rewardId]);
      toast.success('Reward redeemed successfully! 🎉');
    }
  };

  const handleEarnPoints = (points: number, activity: string) => {
    setUserPoints(prev => prev + points);
    toast.success(`+${points} points earned for ${activity}! ⭐`);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'from-amber-600 to-amber-800';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-wasfah-bright-teal to-wasfah-teal';
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Loyalty Program',
        showBackButton: true,
      }}
    >
      <div className="container px-4 py-4 space-y-6 pb-24">
        {/* User Status Card */}
        <Card className={`bg-gradient-to-r ${getTierColor(userTier)} text-white overflow-hidden relative`}>
          <div className="absolute top-0 right-0 opacity-10">
            <Crown className="h-32 w-32" />
          </div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{userTier} Member</h2>
                  <p className="opacity-90 text-sm">
                    {nextTier ? `${nextTier.points - userPoints} points to ${nextTier.name}` : 'Maximum tier reached! 🏆'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{userPoints.toLocaleString()}</div>
                <div className="opacity-90 text-sm">Total Points</div>
              </div>
            </div>
            
            {nextTier && (
              <div>
                <div className="flex justify-between text-sm opacity-90 mb-2">
                  <span>Progress to {nextTier.name}</span>
                  <span>{userPoints}/{nextTier.points} pts</span>
                </div>
                <Progress value={progressPercentage} className="h-3 bg-white/20" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Gift className="h-5 w-5 mr-2 text-wasfah-bright-teal" />
              Available Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {rewards.map((reward) => {
                const isAffordable = userPoints >= reward.points;
                const isClaimed = claimedRewards.includes(reward.id);
                
                return (
                  <Card
                    key={reward.id}
                    className={`transition-all border ${
                      isClaimed
                        ? 'border-green-200 bg-green-50'
                        : isAffordable && reward.available
                        ? 'border-wasfah-bright-teal bg-orange-50 hover:shadow-md'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isClaimed ? 'bg-green-100' : 'bg-wasfah-bright-teal/10'
                        }`}>
                          <reward.icon className={`h-5 w-5 ${
                            isClaimed ? 'text-green-600' : 'text-wasfah-bright-teal'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold">{reward.name}</h3>
                            <Badge 
                              variant={isClaimed ? "default" : "outline"}
                              className={isClaimed ? "bg-green-600" : ""}
                            >
                              {isClaimed ? <Check className="h-3 w-3" /> : `${reward.points} pts`}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                          
                          {isClaimed ? (
                            <Button size="sm" disabled className="w-full bg-green-600">
                              <Check className="h-4 w-4 mr-2" />
                              Claimed
                            </Button>
                          ) : isAffordable && reward.available ? (
                            <Button 
                              size="sm" 
                              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                              onClick={() => handleRedeemReward(reward.id, reward.points)}
                            >
                              Redeem Now
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" disabled className="w-full">
                              {userPoints < reward.points ? 'Not Enough Points' : 'Coming Soon'}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Earn Points Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Zap className="h-5 w-5 mr-2 text-wasfah-bright-teal" />
              Earn Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {activities.map((activity, index) => (
                <Card key={index} className="border hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${activity.color}`}>
                        <activity.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.action}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-wasfah-bright-teal">+{activity.points}</div>
                        <div className="text-xs text-gray-600">points</div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="shrink-0"
                        onClick={() => handleEarnPoints(activity.points, activity.action)}
                      >
                        Earn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default LoyaltyProgramPage;
