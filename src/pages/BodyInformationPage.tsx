
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Scale, Ruler, Target, Activity } from 'lucide-react';

export default function BodyInformationPage() {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    activityLevel: '',
    goal: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInM = parseFloat(formData.height) / 100;
      const weightInKg = parseFloat(formData.weight);
      return (weightInKg / (heightInM * heightInM)).toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <PageContainer
      header={{
        title: 'Body Information',
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white"
    >
      <div className="space-y-6 pb-6">
        {/* Personal Info Card */}
        <Card className="border-wasfah-mint/20">
          <CardHeader>
            <CardTitle className="flex items-center text-wasfah-deep-teal">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <Input
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Body Measurements Card */}
        <Card className="border-wasfah-mint/20">
          <CardHeader>
            <CardTitle className="flex items-center text-wasfah-deep-teal">
              <Scale className="h-5 w-5 mr-2" />
              Body Measurements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Ruler className="h-4 w-4 mr-1" />
                  Height (cm)
                </label>
                <Input
                  type="number"
                  placeholder="Enter height"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Scale className="h-4 w-4 mr-1" />
                  Weight (kg)
                </label>
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </div>
            </div>

            {/* BMI Display */}
            {bmi && (
              <div className="p-4 bg-wasfah-light-gray rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Your BMI</p>
                  <p className="text-2xl font-bold text-wasfah-deep-teal">{bmi}</p>
                  {bmiInfo && (
                    <p className={`text-sm font-medium ${bmiInfo.color}`}>
                      {bmiInfo.category}
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity & Goals Card */}
        <Card className="border-wasfah-mint/20">
          <CardHeader>
            <CardTitle className="flex items-center text-wasfah-deep-teal">
              <Activity className="h-5 w-5 mr-2" />
              Activity & Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Activity Level</label>
              <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (office job)</SelectItem>
                  <SelectItem value="light">Light activity (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate activity (3-5 days/week)</SelectItem>
                  <SelectItem value="very">Very active (6-7 days/week)</SelectItem>
                  <SelectItem value="extreme">Extremely active (2x/day)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Target className="h-4 w-4 mr-1" />
                Health Goal
              </label>
              <Select value={formData.goal} onValueChange={(value) => handleInputChange('goal', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                  <SelectItem value="muscle">Build Muscle</SelectItem>
                  <SelectItem value="health">Improve Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          className="w-full h-12 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
          onClick={() => {
            console.log('Saving body information:', formData);
            // Here you would save to storage or API
          }}
        >
          Save Information
        </Button>
      </div>
    </PageContainer>
  );
}
