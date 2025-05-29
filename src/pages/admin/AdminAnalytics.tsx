
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, ChefHat, Star, TrendingUp, Calendar, Eye, Download, Share2 } from 'lucide-react';

const mockUserData = [
  { month: 'Jan', users: 1200, newUsers: 240, activeUsers: 980 },
  { month: 'Feb', users: 1350, newUsers: 310, activeUsers: 1120 },
  { month: 'Mar', users: 1520, newUsers: 280, activeUsers: 1290 },
  { month: 'Apr', users: 1680, newUsers: 320, activeUsers: 1450 },
  { month: 'May', users: 1850, newUsers: 290, activeUsers: 1620 },
  { month: 'Jun', users: 2100, newUsers: 380, activeUsers: 1890 }
];

const mockRecipeData = [
  { month: 'Jan', recipes: 450, views: 12500, favorites: 2100 },
  { month: 'Feb', recipes: 520, views: 15200, favorites: 2680 },
  { month: 'Mar', recipes: 580, views: 18900, favorites: 3250 },
  { month: 'Apr', recipes: 640, views: 22100, favorites: 3890 },
  { month: 'May', recipes: 720, views: 26800, favorites: 4520 },
  { month: 'Jun', recipes: 810, views: 31200, favorites: 5280 }
];

const mockCuisineData = [
  { name: 'Mediterranean', value: 25, color: '#0088FE' },
  { name: 'Asian', value: 20, color: '#00C49F' },
  { name: 'Italian', value: 18, color: '#FFBB28' },
  { name: 'Mexican', value: 15, color: '#FF8042' },
  { name: 'American', value: 12, color: '#8884D8' },
  { name: 'Others', value: 10, color: '#82CA9D' }
];

const mockEngagementData = [
  { day: 'Mon', likes: 320, shares: 45, comments: 128 },
  { day: 'Tue', likes: 410, shares: 62, comments: 185 },
  { day: 'Wed', likes: 380, shares: 58, comments: 142 },
  { day: 'Thu', likes: 520, shares: 78, comments: 210 },
  { day: 'Fri', likes: 680, shares: 95, comments: 285 },
  { day: 'Sat', likes: 750, shares: 112, comments: 320 },
  { day: 'Sun', likes: 640, shares: 88, comments: 245 }
];

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor app performance and user engagement metrics.</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,100</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">810</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recipe Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31.2K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+16.4%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockUserData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  name="Total Users"
                />
                <Area 
                  type="monotone" 
                  dataKey="newUsers" 
                  stackId="2" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  name="New Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recipe Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockRecipeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="recipes" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Total Recipes"
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Views"
                />
                <Line 
                  type="monotone" 
                  dataKey="favorites" 
                  stroke="#ffc658" 
                  strokeWidth={2}
                  name="Favorites"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Cuisines</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockCuisineData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockCuisineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockEngagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                <Bar dataKey="shares" fill="#82ca9d" name="Shares" />
                <Bar dataKey="comments" fill="#ffc658" name="Comments" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Mediterranean Chicken Bowl', views: '2.1K', rating: 4.8 },
                { name: 'Vegan Buddha Bowl', views: '1.8K', rating: 4.7 },
                { name: 'Classic Italian Pasta', views: '1.6K', rating: 4.6 },
                { name: 'Asian Stir Fry', views: '1.4K', rating: 4.5 }
              ].map((recipe, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{recipe.name}</div>
                    <div className="text-sm text-gray-500">{recipe.views} views</div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">{recipe.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Daily Active Users</span>
                <span className="font-medium">1,890</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Weekly Active Users</span>
                <span className="font-medium">5,240</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Monthly Active Users</span>
                <span className="font-medium">18,900</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg Session Duration</span>
                <span className="font-medium">12m 34s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Premium Subscribers</span>
                <span className="font-medium">450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Monthly Revenue</span>
                <span className="font-medium">$4,500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Conversion Rate</span>
                <span className="font-medium">21.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Churn Rate</span>
                <span className="font-medium">5.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
