import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Recipe } from '@/types/index';
import { mockRecipes } from '@/data/mockData';
import { Share2, Copy, Mail, MessageSquare, Users, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function SharedRecipesTrackingPage() {
  const [sharedRecipeLink, setSharedRecipeLink] = useState('');
  const [sharedRecipeEmail, setSharedRecipeEmail] = useState('');

  const handleGenerateLink = () => {
    // In a real application, you would generate a unique link
    const link = `https://wasfah.com/recipe/${Math.random().toString(36).substring(2, 15)}`;
    setSharedRecipeLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedRecipeLink);
    toast.success('Link copied to clipboard!');
  };

  const handleSendEmail = () => {
    // In a real application, you would send an email
    if (!sharedRecipeEmail) {
      toast.error('Please enter an email address');
      return;
    }
    toast.success(`Email sent to ${sharedRecipeEmail}!`);
  };

  return (
    <PageContainer
      header={{
        title: 'Share & Track Recipes',
      }}
    >
      <div className="container px-4 py-6 space-y-6">
        {/* Share Recipe Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 size={20} className="mr-2 text-wasfah-bright-teal" />
              Share Recipe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Generate Link */}
            <div>
              <Button onClick={handleGenerateLink} className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                Generate Shareable Link
              </Button>
              {sharedRecipeLink && (
                <div className="mt-4 flex items-center justify-between">
                  <Input
                    type="text"
                    value={sharedRecipeLink}
                    readOnly
                    className="flex-grow mr-2"
                  />
                  <Button onClick={handleCopyLink} variant="outline">
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                </div>
              )}
            </div>

            {/* Share via Email */}
            <div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-500" />
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Share via Email
                </Label>
              </div>
              <div className="mt-2 flex items-center">
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter email address"
                  value={sharedRecipeEmail}
                  onChange={(e) => setSharedRecipeEmail(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button onClick={handleSendEmail} variant="outline">
                  Send Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking & Analytics Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp size={20} className="mr-2 text-wasfah-mint" />
              Tracking & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Total Shares */}
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                <Share2 size={32} className="text-wasfah-bright-teal" />
                <div>
                  <div className="text-2xl font-bold text-wasfah-deep-teal">125</div>
                  <div className="text-sm text-gray-600">Total Shares</div>
                </div>
              </div>

              {/* Views */}
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                <Users size={32} className="text-wasfah-coral-red" />
                <div>
                  <div className="text-2xl font-bold text-wasfah-deep-teal">4,567</div>
                  <div className="text-sm text-gray-600">Views</div>
                </div>
              </div>

              {/* Saves */}
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                <Calendar size={32} className="text-wasfah-mint" />
                <div>
                  <div className="text-2xl font-bold text-wasfah-deep-teal">89</div>
                  <div className="text-sm text-gray-600">Saves</div>
                </div>
              </div>

              {/* Comments */}
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                <MessageSquare size={32} className="text-wasfah-bright-teal" />
                <div>
                  <div className="text-2xl font-bold text-wasfah-deep-teal">32</div>
                  <div className="text-sm text-gray-600">Comments</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

function Label({ htmlFor, className, children }: { htmlFor: string; className?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  );
}
