
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Image, 
  Upload, 
  Edit,
  Trash2,
  Eye,
  Download,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface AppImage {
  id: string;
  name: string;
  category: string;
  type: 'icon' | 'image' | 'background' | 'logo';
  url: string;
  size: string;
  format: string;
  usage: string[];
  last_updated: string;
}

export default function ImageControlPage() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [images] = useState<AppImage[]>([
    {
      id: '1',
      name: 'wasfah-logo-main',
      category: 'Branding',
      type: 'logo',
      url: '/images/logo-main.png',
      size: '24KB',
      format: 'PNG',
      usage: ['Header', 'Footer', 'Splash Screen'],
      last_updated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'default-recipe-placeholder',
      category: 'Recipes',
      type: 'image',
      url: '/images/recipe-placeholder.jpg',
      size: '156KB',
      format: 'JPG',
      usage: ['Recipe Cards', 'Recipe Details'],
      last_updated: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      name: 'cooking-icon',
      category: 'Icons',
      type: 'icon',
      url: '/icons/cooking.svg',
      size: '2KB',
      format: 'SVG',
      usage: ['Navigation', 'Recipe Creation'],
      last_updated: '2024-01-13T16:45:00Z'
    },
    {
      id: '4',
      name: 'app-background-gradient',
      category: 'UI',
      type: 'background',
      url: '/images/gradient-bg.png',
      size: '89KB',
      format: 'PNG',
      usage: ['Login Page', 'Onboarding'],
      last_updated: '2024-01-12T09:15:00Z'
    }
  ]);

  const getTypeBadge = (type: string) => {
    const colors = {
      'icon': 'bg-blue-100 text-blue-800',
      'image': 'bg-green-100 text-green-800',
      'background': 'bg-purple-100 text-purple-800',
      'logo': 'bg-orange-100 text-orange-800'
    };
    return <Badge className={colors[type]}>{type}</Badge>;
  };

  const stats = {
    totalImages: images.length,
    icons: images.filter(img => img.type === 'icon').length,
    backgrounds: images.filter(img => img.type === 'background').length,
    logos: images.filter(img => img.type === 'logo').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Image Control Center</h1>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Image Name</Label>
                  <Input id="name" placeholder="Enter image name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="recipes">Recipes</SelectItem>
                      <SelectItem value="icons">Icons</SelectItem>
                      <SelectItem value="ui">UI Elements</SelectItem>
                      <SelectItem value="backgrounds">Backgrounds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="icon">Icon</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="background">Background</SelectItem>
                      <SelectItem value="logo">Logo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="usage">Usage Context</Label>
                  <Input id="usage" placeholder="Where will this be used?" />
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium">Drop your image here</p>
                <p className="text-sm text-gray-500">or click to browse</p>
                <Button variant="outline" className="mt-4">Choose File</Button>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Upload & Save</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Image className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Images</p>
                <p className="text-2xl font-bold">{stats.totalImages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Image className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Icons</p>
                <p className="text-2xl font-bold">{stats.icons}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Image className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Backgrounds</p>
                <p className="text-2xl font-bold">{stats.backgrounds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Image className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Logos</p>
                <p className="text-2xl font-bold">{stats.logos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Management */}
      <Card>
        <CardHeader>
          <CardTitle>All Images & Icons</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search images..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="icon">Icons</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="background">Backgrounds</SelectItem>
                <SelectItem value="logo">Logos</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="branding">Branding</SelectItem>
                <SelectItem value="recipes">Recipes</SelectItem>
                <SelectItem value="icons">Icons</SelectItem>
                <SelectItem value="ui">UI Elements</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <div className="w-10 h-10 bg-gray-100 rounded border flex items-center justify-center">
                      <Image className="h-6 w-6 text-gray-400" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{image.name}</p>
                      <p className="text-sm text-gray-500">{image.format}</p>
                    </div>
                  </TableCell>
                  <TableCell>{image.category}</TableCell>
                  <TableCell>{getTypeBadge(image.type)}</TableCell>
                  <TableCell>{image.size}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
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
                  <TableCell>
                    {new Date(image.last_updated).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
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
