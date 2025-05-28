import React, { useState, useCallback } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, MessageSquare, Share2, Users, Award, ChefHat, Star, TrendingUp, Clock, UserPlus } from 'lucide-react';
import { mockRecipes } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { EnhancedCard, IconContainer, Typography, AnimatedBadge, LayoutContainer } from '@/components/ui/design-system';
import { EnhancedButton } from '@/components/ui/enhanced-button';

// Add social interaction data to recipes
const communityRecipes = mockRecipes.slice(0, 10).map((recipe) => ({
  ...recipe,
  author: {
    id: `user-${Math.floor(Math.random() * 1000)}`,
    name: ['Chef Alex', 'Sarah J.', 'Michael T.', 'Lisa Wong', 'Ahmad H.'][Math.floor(Math.random() * 5)],
    avatar: `/placeholder.svg`,
    level: Math.floor(Math.random() * 10) + 1,
  },
  likes: Math.floor(Math.random() * 100) + 10,
  comments: Math.floor(Math.random() * 30) + 5,
  shares: Math.floor(Math.random() * 20),
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  isLiked: Math.random() > 0.5,
}));

// Mock comments
const mockComments = [
  { id: '1', author: 'Chef Maria', avatar: '/placeholder.svg', content: 'This recipe is amazing! I added a bit more garlic and it was perfect.', timestamp: '2 hours ago', likes: 5 },
  { id: '2', author: 'John D.', avatar: '/placeholder.svg', content: 'Thanks for sharing this! My family loved it.', timestamp: '5 hours ago', likes: 3 },
  { id: '3', author: 'Sarah K.', avatar: '/placeholder.svg', content: 'Can this be made with almond flour instead?', timestamp: '1 day ago', likes: 2 },
  { id: '4', author: 'Ali M.', avatar: '/placeholder.svg', content: 'I tried this yesterday and it was delicious! Highly recommend.', timestamp: '2 days ago', likes: 8 }
];

// Popular members
const popularMembers = [
  { id: '1', name: 'Chef Alex', avatar: '/placeholder.svg', recipes: 45, followers: 1200, level: 9 },
  { id: '2', name: 'Maria C.', avatar: '/placeholder.svg', recipes: 32, followers: 850, level: 7 },
  { id: '3', name: 'Hassan K.', avatar: '/placeholder.svg', recipes: 28, followers: 720, level: 8 },
  { id: '4', name: 'Emma L.', avatar: '/placeholder.svg', recipes: 19, followers: 650, level: 6 }
];

const CommunityPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('popular');

  const handleLike = useCallback((recipeId) => {
    toast({
      title: "Recipe Liked",
      description: "This recipe has been added to your favorites."
    });
  }, [toast]);

  const handleShare = useCallback((recipeId) => {
    toast({
      title: "Share Options",
      description: "Share options opened for this recipe."
    });
  }, [toast]);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <PageContainer header={{ title: "Community", showBackButton: true }}>
      <LayoutContainer className="space-y-8 pb-24">
        {/* Enhanced Hero Section */}
        <EnhancedCard variant="gradient" className="bg-gradient-to-br from-wasfah-bright-teal via-wasfah-teal to-wasfah-deep-teal text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 opacity-20">
            <Users className="h-32 w-32" />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center mb-4">
              <IconContainer size="lg" className="bg-white/20 text-white mr-4">
                <Users className="h-8 w-8" />
              </IconContainer>
              <div>
                <Typography.H1 className="text-white text-2xl mb-2">WasfahAI Community</Typography.H1>
                <Typography.Body className="text-white/90 text-lg">
                  Connect with home chefs, share recipes, and discover culinary inspiration
                </Typography.Body>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <AnimatedBadge className="bg-white/20 text-white border-white/30">
                <Users className="h-4 w-4 mr-2" />
                5,230 Members
              </AnimatedBadge>
              <AnimatedBadge className="bg-white/20 text-white border-white/30">
                <ChefHat className="h-4 w-4 mr-2" />
                12,450 Recipes
              </AnimatedBadge>
              <AnimatedBadge className="bg-white/20 text-white border-white/30">
                <TrendingUp className="h-4 w-4 mr-2" />
                Active Community
              </AnimatedBadge>
            </div>
          </CardContent>
        </EnhancedCard>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="popular" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="latest" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Clock className="h-4 w-4 mr-2" />
              Latest
            </TabsTrigger>
            <TabsTrigger value="members" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Award className="h-4 w-4 mr-2" />
              Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-6">
            {communityRecipes.slice(0, 5).sort((a, b) => b.likes - a.likes).map((recipe) => (
              <RecipePostCard
                key={recipe.id}
                recipe={recipe}
                onLike={handleLike}
                onShare={handleShare}
              />
            ))}
          </TabsContent>

          <TabsContent value="latest" className="space-y-6">
            {communityRecipes.slice(0, 5).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map((recipe) => (
              <RecipePostCard
                key={recipe.id}
                recipe={recipe}
                onLike={handleLike}
                onShare={handleShare}
              />
            ))}
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <IconContainer variant="primary" size="md">
                <Award className="h-6 w-6" />
              </IconContainer>
              <Typography.H2>Popular Members</Typography.H2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {popularMembers.map((member) => (
                <EnhancedCard key={member.id} variant="elevated">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-wasfah-bright-teal text-white text-lg">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <AnimatedBadge className="absolute -bottom-2 -right-2 bg-wasfah-bright-teal text-white min-w-[24px] h-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {member.level}
                      </AnimatedBadge>
                    </div>

                    <Typography.H3 className="text-lg mb-3">{member.name}</Typography.H3>

                    <div className="space-y-2 text-sm text-gray-600 mb-4 w-full">
                      <div className="flex items-center justify-center">
                        <ChefHat className="h-4 w-4 mr-2 text-wasfah-bright-teal" />
                        <span>{member.recipes} Recipes</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Users className="h-4 w-4 mr-2 text-wasfah-bright-teal" />
                        <span>{member.followers} Followers</span>
                      </div>
                    </div>

                    <EnhancedButton 
                      variant="outline" 
                      size="sm" 
                      fullWidth
                      icon={<UserPlus className="h-4 w-4" />}
                    >
                      Follow
                    </EnhancedButton>
                  </CardContent>
                </EnhancedCard>
              ))}
            </div>

            <EnhancedButton variant="outline" fullWidth className="mt-6">
              View All Members
            </EnhancedButton>
          </TabsContent>
        </Tabs>
      </LayoutContainer>
    </PageContainer>
  );
};

interface RecipePostCardProps {
  recipe: any;
  onLike: (recipeId: string) => void;
  onShare: (recipeId: string) => void;
}

const RecipePostCard: React.FC<RecipePostCardProps> = ({ recipe, onLike, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(mockComments);

  const handleComment = useCallback(() => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        author: 'Current User',
        avatar: '/placeholder.svg',
        content: commentText,
        timestamp: 'Just now',
        likes: 0
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  }, [commentText, comments]);

  return (
    <EnhancedCard variant="elevated" className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={recipe.author.avatar} />
              <AvatarFallback className="bg-wasfah-bright-teal text-white">
                {recipe.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Typography.H3 className="text-base">{recipe.author.name}</Typography.H3>
                <AnimatedBadge variant="default" className="text-xs">
                  <ChefHat className="h-3 w-3 mr-1" />
                  Level {recipe.author.level}
                </AnimatedBadge>
              </div>
              <Typography.Caption className="text-gray-500">
                {new Date(recipe.timestamp).toLocaleDateString()}
              </Typography.Caption>
            </div>
          </div>

          <Link to={`/recipe/${recipe.id}`}>
            <Typography.H3 className="text-wasfah-deep-teal mb-2 hover:text-wasfah-bright-teal transition-colors">
              {recipe.title}
            </Typography.H3>
          </Link>
          <Typography.Body className="text-gray-600 mb-4 line-clamp-2">
            {recipe.description}
          </Typography.Body>
        </div>

        <Link to={`/recipe/${recipe.id}`}>
          <div
            className="w-full h-64 bg-cover bg-center hover:scale-105 transition-transform duration-300"
            style={{ backgroundImage: `url(${recipe.image})` }}
          />
        </Link>

        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-4 space-x-6">
            <div className="flex items-center">
              <Heart className={`h-4 w-4 mr-2 ${recipe.isLiked ? 'fill-wasfah-coral-red text-wasfah-coral-red' : ''}`} />
              <span>{recipe.likes} likes</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>{recipe.comments} comments</span>
            </div>
            <div className="flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              <span>{recipe.shares} shares</span>
            </div>
          </div>

          <div className="flex space-x-2 border-t border-b py-3 mb-4">
            <EnhancedButton
              variant="ghost"
              size="sm"
              className={`flex-1 ${recipe.isLiked ? 'text-wasfah-coral-red' : ''}`}
              onClick={() => onLike(recipe.id)}
              icon={<Heart className={`h-4 w-4 ${recipe.isLiked ? 'fill-wasfah-coral-red' : ''}`} />}
            >
              Like
            </EnhancedButton>
            <EnhancedButton
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => setShowComments(!showComments)}
              icon={<MessageSquare className="h-4 w-4" />}
            >
              Comment
            </EnhancedButton>
            <EnhancedButton
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => onShare(recipe.id)}
              icon={<Share2 className="h-4 w-4" />}
            >
              Share
            </EnhancedButton>
          </div>

          {showComments && (
            <div className="space-y-4">
              <ScrollArea className="h-48 pr-4">
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
                          {comment.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <Typography.Caption className="font-medium">{comment.author}</Typography.Caption>
                          <Typography.Body className="text-sm mt-1">{comment.content}</Typography.Body>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-2 space-x-4">
                          <span>{comment.timestamp}</span>
                          <button className="hover:text-wasfah-coral-red transition-colors">
                            Like ({comment.likes})
                          </button>
                          <button className="hover:text-wasfah-bright-teal transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-wasfah-bright-teal text-white text-xs">U</AvatarFallback>
                </Avatar>
                <Input
                  className="flex-1 bg-gray-100 border-0 rounded-full"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <EnhancedButton
                  size="sm"
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                >
                  Post
                </EnhancedButton>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </EnhancedCard>
  );
};

export default CommunityPage;
