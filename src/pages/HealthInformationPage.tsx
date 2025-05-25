
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { NutritionTip } from '@/components/nutrition/NutritionTip';
import { AlertCircle, TrendingUp, Award, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample nutrition data for visualization
const dailyNutrition = [
  { name: 'Protein', amount: 75, goal: 100, unit: 'g' },
  { name: 'Carbs', amount: 220, goal: 275, unit: 'g' },
  { name: 'Fat', amount: 65, goal: 80, unit: 'g' },
  { name: 'Fiber', amount: 18, goal: 25, unit: 'g' },
  { name: 'Sugar', amount: 45, goal: 50, unit: 'g' },
];

const weeklyData = [
  { day: 'Mon', calories: 1850, protein: 72, carbs: 200, fat: 62, goal: 2000 },
  { day: 'Tue', calories: 2100, protein: 85, carbs: 220, fat: 70, goal: 2000 },
  { day: 'Wed', calories: 1950, protein: 78, carbs: 210, fat: 65, goal: 2000 },
  { day: 'Thu', calories: 1800, protein: 70, carbs: 190, fat: 60, goal: 2000 },
  { day: 'Fri', calories: 2200, protein: 90, carbs: 240, fat: 75, goal: 2000 },
  { day: 'Sat', calories: 2300, protein: 95, carbs: 260, fat: 80, goal: 2000 },
  { day: 'Sun', calories: 1900, protein: 75, carbs: 205, fat: 63, goal: 2000 },
];

// Sample allergens for the user
const userAllergens = ['Peanuts', 'Shellfish', 'Tree Nuts'];

// Goal achievement data
const goalAchievement = [
  { name: 'Daily Calories', current: 1850, goal: 2000, percentComplete: 92.5 },
  { name: 'Weekly Exercise', current: 4, goal: 5, percentComplete: 80 },
  { name: 'Water Intake', current: 2.1, goal: 2.5, percentComplete: 84 },
  { name: 'Sleep Hours', current: 7, goal: 8, percentComplete: 87.5 },
];

export default function HealthInformationPage() {
  return (
    <PageContainer header={{ title: 'Health Information', showBackButton: true }}>
      <div className="space-y-6 pb-6 px-4">
        <Tabs defaultValue="nutrition">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="allergens">Allergens</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nutrition">
            <section>
              <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">Today's Nutrition</h2>
              
              <Card className="mb-6 dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white">Daily Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dailyNutrition.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium dark:text-white">{item.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {item.amount} / {item.goal} {item.unit}
                          </span>
                        </div>
                        <Progress value={(item.amount / item.goal) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white">Weekly Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="day" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(22,22,22,0.9)', 
                          borderColor: '#666',
                          color: '#fff'
                        }} 
                      />
                      <Legend />
                      <Line type="monotone" dataKey="calories" name="Calories" stroke="#05BFDB" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="goal" name="Goal" stroke="#F97316" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    <p>Average Daily Calories: 2,014 kcal</p>
                    <p>Average Daily Protein: 81g</p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <NutritionTip 
                  tip="Adding more lean protein to your meals can help you feel fuller for longer and support muscle maintenance."
                  source="Nutrition AI"
                  type="info"
                />
              </div>
            </section>
          </TabsContent>

          <TabsContent value="goals">
            <section>
              <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Goal Tracking
              </h2>
              
              <div className="space-y-4 mb-6">
                {goalAchievement.map((goal) => (
                  <Card key={goal.name} className="overflow-hidden dark:border-gray-700 dark:bg-gray-800">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium dark:text-white">{goal.name}</h3>
                          <div className="flex items-center">
                            <span className={`text-sm ${goal.percentComplete >= 100 ? 'text-green-500' : 'text-amber-500'} mr-1`}>
                              {goal.percentComplete}%
                            </span>
                            {goal.current > goal.goal ? (
                              <ArrowUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <span>Current: {goal.current}</span>
                          <span>Goal: {goal.goal}</span>
                        </div>
                        <Progress value={goal.percentComplete} className="h-2" />
                      </div>
                      
                      <div className={`h-1 ${goal.percentComplete >= 100 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-4 flex gap-4">
                <Link to="/nutrition-goals" className="flex-1">
                  <Button variant="default" className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Update Goals
                  </Button>
                </Link>
                <Link to="/health-tracking" className="flex-1">
                  <Button variant="outline" className="w-full border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal/10 dark:text-wasfah-bright-teal dark:border-wasfah-bright-teal/50">
                    View Details
                  </Button>
                </Link>
              </div>

              <div className="mt-6">
                <NutritionTip 
                  tip="Setting realistic, achievable goals increases your chances of success. Try to improve by small increments each week."
                  source="Fitness Coach"
                  type="success"
                />
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="allergens">
            <section>
              <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">Your Allergen Profile</h2>
              
              <Card className="mb-6 dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white">Registered Allergens</CardTitle>
                </CardHeader>
                <CardContent>
                  {userAllergens.length > 0 ? (
                    <div className="space-y-2">
                      {userAllergens.map((allergen) => (
                        <div key={allergen} className="flex items-center p-2 rounded-md bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                          <AlertCircle size={16} className="mr-2" />
                          <span>{allergen}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No allergens have been registered.</p>
                  )}
                  
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Recipes containing these allergens will be clearly marked with warnings.
                      You can update your allergen information in your profile settings.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white">Allergen Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    While we do our best to highlight potential allergens in recipes,
                    please always check the ingredients list carefully if you have severe allergies.
                  </p>
                  
                  <h3 className="font-semibold mb-2 dark:text-white">Common Allergens We Track:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>Peanuts</li>
                    <li>Tree Nuts</li>
                    <li>Dairy</li>
                    <li>Eggs</li>
                    <li>Fish</li>
                    <li>Shellfish</li>
                    <li>Soy</li>
                    <li>Wheat (Gluten)</li>
                    <li>Sesame</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
