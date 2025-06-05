
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Image, 
  Upload, 
  Edit,
  Trash2,
  Eye,
  Download,
  Search,
  Filter,
  Plus,
  Camera,
  Palette,
  Layout,
  Star
} from 'lucide-react';

interface AppImage {
  id: string;
  name: string;
  category: string;
  type: 'icon' | 'image' | 'background' | 'logo' | 'banner' | 'avatar';
  url: string;
  size: string;
  format: string;
  usage: string[];
  last_updated: string;
  dimensions: string;
  status: 'active' | 'inactive' | 'deprecated';
}

export default function AdminImageControlPage() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const [images] = useState<AppImage[]>([
    {
      id: '1',
      name: 'wasfah-logo-main',
      category: 'Branding',
      type: 'logo',
      url: '/images/logo-main.png',
      size: '24KB',
      format: 'PNG',
      usage: ['Header', 'Footer', 'Splash Screen', 'Admin Panel'],
      last_updated: '2024-01-15',
      dimensions: '256x256',
      status: 'active'
    },
    {
      id: '2',
      name: 'default-recipe-placeholder',
      category: 'Recipes',
      type: 'image',
      url: '/images/recipe-placeholder.jpg',
      size: '156KB',
      format: 'JPG',
      usage: ['Recipe Cards', 'Recipe Details', 'Recipe Grid'],
      last_updated: '2024-01-14',
      dimensions: '400x300',
      status: 'active'
    },
    {
      id: '3',
      name: 'cooking-icon',
      category: 'Navigation',
      type: 'icon',
      url: '/icons/cooking.svg',
      size: '2KB',
      format: 'SVG',
      usage: ['Navigation', 'Recipe Creation', 'Bottom Toolbar'],
      last_updated: '2024-01-13',
      dimensions: '24x24',
      status: 'active'
    },
    {
      id: '4',
      name: 'app-background-gradient',
      category: 'UI',
      type: 'background',
      url: '/images/gradient-bg.png',
      size: '89KB',
      format: 'PNG',
      usage: ['Login Page', 'Onboarding', 'Settings'],
      last_updated: '2024-01-12',
      dimensions: '1920x1080',
      status: 'active'
    },
    {
      id: '5',
      name: 'admin-dashboard-banner',
      category: 'Admin',
      type: 'banner',
      url: '/images/admin-banner.jpg',
      size: '234KB',
      format: 'JPG',
      usage: ['Admin Dashboard', 'Admin Header'],
      last_updated: '2024-01-10',
      dimensions: '1200x400',
      status: 'active'
    },
    {
      id: '6',
      name: 'user-avatar-placeholder',
      category: 'User',
      type: 'avatar',
      url: '/images/avatar-placeholder.png',
      size: '12KB',
      format: 'PNG',
      usage: ['Profile Page', 'Comments', 'User Menu'],
      last_updated: '2024-01-08',
      dimensions: '128x128',
      status: 'active'
    }
  ]);

  const getTypeBadge = (type: string) => {
    const colors = {
      'icon': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'image': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'background': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'logo': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'banner': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'avatar': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300'
    };
    return <Badge className={colors[type] || colors.image}>{type}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      'deprecated': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return <Badge className={colors[status] || colors.active}>{status}</Badge>;
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.usage.some(u => u.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || image.category === categoryFilter;
    const matchesType = typeFilter === 'all' || image.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const stats = {
    totalImages: images.length,
    icons: images.filter(img => img.type === 'icon').length,
    backgrounds: images.filter(img => img.type === 'background').length,
    logos: images.filter(img => img.type === 'logo').length,
    banners: images.filter(img => img.type === 'banner').length,
    avatars: images.filter(img => img.type === 'avatar').length,
    active: images.filter(img => img.status === 'active').length
  };

  const categories = [...new Set(images.map(img => img.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">App Image & Icon Control</h1>
          <p className="text-muted-foreground">Manage all images, icons, and visual assets across the application</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Image/Icon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Asset Name</Label>
                  <Input id="name" placeholder="Enter asset name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="navigation">Navigation</SelectItem>
                      <SelectItem value="recipes">Recipes</SelectItem>
                      <SelectItem value="ui">UI Elements</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Asset Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="icon">Icon</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="background">Background</SelectItem>
                      <SelectItem value="logo">Logo</SelectItem>
                      <SelectItem value="banner">Banner</SelectItem>
                      <SelectItem value="avatar">Avatar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="usage">Usage Context</Label>
                <Textarea 
                  id="usage" 
                  placeholder="Describe where this asset will be used (comma-separated)"
                  rows={3}
                />
              </div>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium">Drop your asset here</p>
                <p className="text-sm text-gray-500">Supports PNG, JPG, SVG, WebP (Max 5MB)</p>
                <Button variant="outline" className="mt-4">Choose File</Button>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Upload & Save</Button>
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Image className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-lg font-bold">{stats.totalImages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Star className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Icons</p>
                <p className="text-lg font-bold">{stats.icons}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Layout className="h-4 w-4 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Backgrounds</p>
                <p className="text-lg font-bold">{stats.backgrounds}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Camera className="h-4 w-4 text-orange-600 dark:text-orange-300" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Logos</p>
                <p className="text-lg font-bold">{stats.logos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Palette className="h-4 w-4 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Banners</p>
                <p className="text-lg font-bold">{stats.banners}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg">
                <Image className="h-4 w-4 text-pink-600 dark:text-pink-300" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Avatars</p>
                <p className="text-lg font-bold">{stats.avatars}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Star className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-lg font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>All App Assets</CardTitle>
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search assets by name, category, or usage..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="icon">Icons</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="background">Backgrounds</SelectItem>
                <SelectItem value="logo">Logos</SelectItem>
                <SelectItem value="banner">Banners</SelectItem>
                <SelectItem value="avatar">Avatars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Asset Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredImages.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded border flex items-center justify-center">
                      <Image className="h-6 w-6 text-gray-400" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{image.name}</p>
                      <p className="text-sm text-gray-500">{image.format}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(image.type)}</TableCell>
                  <TableCell>{image.category}</TableCell>
                  <TableCell className="text-sm text-gray-600">{image.dimensions}</TableCell>
                  <TableCell className="text-sm text-gray-600">{image.size}</TableCell>
                  <TableCell>{getStatusBadge(image.status)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-48">
                      {image.usage.slice(0, 2).map((use, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                      {image.usage.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{image.usage.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {image.last_updated}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
