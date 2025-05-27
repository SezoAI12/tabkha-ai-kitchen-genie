
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function BodyInformationPage() {
  const { toast } = useToast();
  const [bodyInfo, setBodyInfo] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    activityLevel: '',
    goal: 'maintain'
  });

  const handleSaveInformation = () => {
    console.log('Saving body information:', bodyInfo);
    
    // Validate required fields
    if (!bodyInfo.height || !bodyInfo.weight || !bodyInfo.age || !bodyInfo.gender || !bodyInfo.activityLevel) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage or send to API
    localStorage.setItem('bodyInformation', JSON.stringify(bodyInfo));
    
    toast({
      title: "Information Saved",
      description: "Your body information has been saved successfully",
    });
  };

  const updateBodyInfo = (field: string, value: string) => {
    setBodyInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <PageContainer
      header={{
        title: 'Body Information',
        showBackButton: true,
      }}
    >
      <div className="container px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-wasfah-deep-teal">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm) *</Label>
                <Input
                  id="height"
                  type="number"
                  value={bodyInfo.height}
                  onChange={(e) => updateBodyInfo('height', e.target.value)}
                  placeholder="170"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  value={bodyInfo.weight}
                  onChange={(e) => updateBodyInfo('weight', e.target.value)}
                  placeholder="70"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={bodyInfo.age}
                onChange={(e) => updateBodyInfo('age', e.target.value)}
                placeholder="25"
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select value={bodyInfo.gender} onValueChange={(value) => updateBodyInfo('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="activityLevel">Activity Level *</Label>
              <Select value={bodyInfo.activityLevel} onValueChange={(value) => updateBodyInfo('activityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (2x/day, intense)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goal">Goal</Label>
              <Select value={bodyInfo.goal} onValueChange={(value) => updateBodyInfo('goal', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSaveInformation}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
            >
              Save Information
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
