
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Trophy, Crown, Zap, Check, ChefHat, Share2, Calendar, Users, Award, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';
import { EnhancedCard, IconContainer, Typography, ProgressIndicator, AnimatedBadge, LayoutContainer } from '@/components/ui/design-system';
import { EnhancedButton } from '@/components/ui/enhanced-button';

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
      description: 'Unlock one premium recipe of your choice',
      rarity: 'common'
    },
    { 
      id: 2, 
      name: '10% Off Subscription', 
      points: 1000, 
      icon: Gift, 
      available: true,
      description: 'Get 10% discount on your next subscription',
      rarity: 'rare'
    },
    { 
      id: 3, 
      name: 'Exclusive Recipe Collection', 
      points: 1500, 
      icon: Trophy, 
      available: false,
      description: 'Access to chef-curated recipe collections',
      rarity: 'epic'
    },
    { 
      id: 4, 
      name: 'Personal Chef Consultation', 
      points: 2500, 
      icon: Crown, 
      available: false,
      description: '30-minute one-on-one session with a professional chef',
      rarity: 'legendary'
    }
  ];

  const activities = [
    { action: 'Daily Login', points: 10, description: 'Login to the app daily', icon: Calendar, color: 'bg-blue-500' },
    { action: 'Share Recipe', points: 50, description: 'Share a recipe with friends', icon: Share2, color: 'bg-green-500' },
    { action: 'Create Recipe', points: 100, description: 'Create and publish a new recipe', icon: ChefHat, color: 'bg-purple-500' },
    { action: 'Join Community', points: 75, description: 'Participate in community discussions', icon: Users, color: 'bg-orange-500' }
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

  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'from-amber-400 via-amber-500 to-amber-600';
      case 'Silver': return 'from-gray-300 via-gray-400 to-gray-500';
      case 'Gold': return 'from-yellow-300 via-yellow-400 to-yellow-500';
      case 'Platinum': return 'from-purple-400 via-purple-500 to-purple-600';
      default: return 'from-wasfah-bright-teal via-wasfah-teal to-wasfah-deep-teal';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Loyalty Program',
        showBackButton: true,
      }}
    >
      <LayoutContainer className="space-y-8 pb-24">
        {/* Enhanced Status Card */}
        <EnhancedCard variant="glass" className={`bg-gradient-to-br ${getTierGradient(userTier)} text-white overflow-hidden relative`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 opacity-20">
            <Sparkles className="h-32 w-32" />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <IconContainer size="lg" className="bg-white/20 text-white">
                  <Crown className="h-8 w-8" />
                </IconContainer>
                <div>
                  <Typography.H2 className="text-white mb-1">{userTier} Member</Typography.H2>
                  <Typography.Body className="text-white/90 text-base">
                    {nextTier ? `${nextTier.points - userPoints} points to ${nextTier.name}` : 'Maximum tier reached! 🏆'}
                  </Typography.Body>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold mb-1">{userPoints.toLocaleString()}</div>
                <Typography.Caption className="text-white/90">Total Points</Typography.Caption>
              </div>
            </div>
            
            {nextTier && (
              <div className="space-y-3">
                <div className="flex justify-between text-white/90">
                  <span>Progress to {nextTier.name}</span>
                  <span>{userPoints}/{nextTier.points} pts</span>
                </div>
                <ProgressIndicator 
                  value={userPoints} 
                  max={nextTier.points} 
                  variant="primary"
                  className="bg-white/20"
                />
              </div>
            )}
          </CardContent>
        </EnhancedCard>

        {/* Enhanced Rewards Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <IconContainer variant="primary" size="md">
              <Gift className="h-6 w-6" />
            </IconContainer>
            <Typography.H2>Available Rewards</Typography.H2>
          </div>

          <div className="grid gap-6">
            {rewards.map((reward) => {
              const isAffordable = userPoints >= reward.points;
              const isClaimed = claimedRewards.includes(reward.id);
              
              return (
                <EnhancedCard
                  key={reward.id}
                  variant="elevated"
                  className={`transition-all ${
                    isClaimed
                      ? 'border-green-200 bg-green-50'
                      : isAffordable && reward.available
                      ? `${getRarityColor(reward.rarity)} border-2`
                      : 'opacity-60'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <IconContainer 
                        variant={isClaimed ? 'accent' : 'primary'} 
                        size="lg"
                      >
                        <reward.icon className="h-8 w-8" />
                      </IconContainer>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <Typography.H3 className="text-lg">{reward.name}</Typography.H3>
                          <div className="flex items-center space-x-2">
                            <AnimatedBadge variant={reward.rarity === 'legendary' ? 'warning' : 'default'}>
                              {reward.rarity}
                            </AnimatedBadge>
                            <Badge variant={isClaimed ? "default" : "outline"}>
                              {isClaimed ? <Check className="h-4 w-4" /> : `${reward.points} pts`}
                            </Badge>
                          </div>
                        </div>
                        
                        <Typography.Body className="text-gray-600">
                          {reward.description}
                        </Typography.Body>
                        
                        {isClaimed ? (
                          <EnhancedButton variant="success" size="md" fullWidth disabled>
                            <Check className="h-4 w-4" />
                            Claimed
                          </EnhancedButton>
                        ) : isAffordable && reward.available ? (
                          <EnhancedButton 
                            variant="primary" 
                            size="md" 
                            fullWidth
                            gradient
                            onClick={() => handleRedeemReward(reward.id, reward.points)}
                          >
                            Redeem Now
                          </EnhancedButton>
                        ) : (
                          <EnhancedButton variant="outline" size="md" fullWidth disabled>
                            {userPoints < reward.points ? 'Not Enough Points' : 'Coming Soon'}
                          </EnhancedButton>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </EnhancedCard>
              );
            })}
          </div>
        </div>

        {/* Enhanced Activities Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <IconContainer variant="accent" size="md">
              <Zap className="h-6 w-6" />
            </IconContainer>
            <Typography.H2>Earn Points</Typography.H2>
          </div>

          <div className="grid gap-4">
            {activities.map((activity, index) => (
              <EnhancedCard key={index} variant="default" hover>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <IconContainer className={`${activity.color} text-white`} size="lg">
                      <activity.icon className="h-6 w-6" />
                    </IconContainer>
                    
                    <div className="flex-1">
                      <Typography.H3 className="text-lg mb-1">{activity.action}</Typography.H3>
                      <Typography.Body className="text-sm">{activity.description}</Typography.Body>
                    </div>
                    
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold text-wasfah-bright-teal">+{activity.points}</div>
                      <Typography.Caption>points</Typography.Caption>
                    </div>
                    
                    <EnhancedButton 
                      variant="outline" 
                      size="md"
                      onClick={() => handleEarnPoints(activity.points, activity.action)}
                    >
                      Earn
                    </EnhancedButton>
                  </div>
                </CardContent>
              </EnhancedCard>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </PageContainer>
  );
};

export default LoyaltyProgramPage;
