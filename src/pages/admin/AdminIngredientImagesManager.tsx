
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Image, Upload, Camera, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface IngredientImage {
  id: string;
  name: string;
  image_url: string;
  category: string;
  subcategory?: string;
  usage_type: 'ingredient' | 'recipe' | 'category' | 'icon';
  created_at: string;
  updated_at: string;
}

export default function AdminIngredientImagesManager() {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState<IngredientImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUsageType, setSelectedUsageType] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<IngredientImage | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    category: '',
    subcategory: '',
    usage_type: 'ingredient' as 'ingredient' | 'recipe' | 'category' | 'icon'
  });

  const categories = ['vegetables', 'fruits', 'meat', 'grains', 'dairy', 'oils', 'spices', 'seafood', 'herbs', 'nuts', 'beverages', 'other'];
  const usageTypes = ['ingredient', 'recipe', 'category', 'icon'];

  // Mock data for demonstration
  useEffect(() => {
    const mockData: IngredientImage[] = [
      {
        id: '1',
        name: 'Tomato',
        image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&h=100&fit=crop',
        category: 'vegetables',
        subcategory: 'nightshades',
        usage_type: 'ingredient',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Mediterranean Cuisine',
        image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop',
        category: 'cuisines',
        usage_type: 'category',
        created_at: '2024-01-14T10:00:00Z',
        updated_at: '2024-01-14T10:00:00Z'
      },
      {
        id: '3',
        name: 'Pasta Primavera',
        image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=100&h=100&fit=crop',
        category: 'main-course',
        usage_type: 'recipe',
        created_at: '2024-01-13T10:00:00Z',
        updated_at: '2024-01-13T10:00:00Z'
      },
      {
        id: '4',
        name: 'Heart Icon',
        image_url: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=100&h=100&fit=crop',
        category: 'ui-elements',
        usage_type: 'icon',
        created_at: '2024-01-12T10:00:00Z',
        updated_at: '2024-01-12T10:00:00Z'
      }
    ];
    setIngredients(mockData);
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.image_url) {
      toast({
        title: "Validation Error",
        description: "Name and image URL are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const newIngredient: IngredientImage = {
        id: Date.now().toString(),
        name: formData.name,
        image_url: formData.image_url,
        category: formData.category || 'other',
        subcategory: formData.subcategory,
        usage_type: formData.usage_type,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (editingIngredient) {
        setIngredients(prev => prev.map(item => 
          item.id === editingIngredient.id ? { ...newIngredient, id: editingIngredient.id } : item
        ));
        toast({
          title: "Success",
          description: "Image updated successfully",
        });
      } else {
        setIngredients(prev => [...prev, newIngredient]);
        toast({
          title: "Success",
          description: "Image added successfully",
        });
      }

      setFormData({ name: '', image_url: '', category: '', subcategory: '', usage_type: 'ingredient' });
      setEditingIngredient(null);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: "Error",
        description: "Failed to save image",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (ingredient: IngredientImage) => {
    setEditingIngredient(ingredient);
    setFormData({
      name: ingredient.name,
      image_url: ingredient.image_url,
      category: ingredient.category,
      subcategory: ingredient.subcategory || '',
      usage_type: ingredient.usage_type
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      setIngredients(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const handleBulkReplace = () => {
    toast({
      title: "Bulk Replace Started",
      description: "Starting bulk image replacement process...",
    });
  };

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ingredient.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory;
    const matchesUsageType = selectedUsageType === 'all' || ingredient.usage_type === selectedUsageType;
    
    return matchesSearch && matchesCategory && matchesUsageType;
  });

  const imageStats = {
    total: ingredients.length,
    ingredients: ingredients.filter(i => i.usage_type === 'ingredient').length,
    recipes: ingredients.filter(i => i.usage_type === 'recipe').length,
    categories: ingredients.filter(i => i.usage_type === 'category').length,
    icons: ingredients.filter(i => i.usage_type === 'icon').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Image className="h-6 w-6" />
            Image Management System
          </h1>
          <p className="text-muted-foreground">
            Manage all images used throughout the application including ingredients, recipes, categories, and icons.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkReplace}>
            <Palette className="h-4 w-4 mr-2" />
            Bulk Replace
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingIngredient(null);
                setFormData({ name: '', image_url: '', category: '', subcategory: '', usage_type: 'ingredient' });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingIngredient ? 'Edit Image' : 'Add New Image'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter image name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="Enter image URL or upload"
                    required
                  />
                  <div className="flex gap-2 mt-2">
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-1" />
                      Camera
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="usage_type">Usage Type</Label>
                  <Select value={formData.usage_type} onValueChange={(value: any) => setFormData({ ...formData, usage_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select usage type" />
                    </SelectTrigger>
                    <SelectContent>
                      {usageTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategory (Optional)</Label>
                  <Input
                    id="subcategory"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="Enter subcategory"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingIngredient ? 'Update' : 'Add'} Image
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{imageStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{imageStats.ingredients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{imageStats.recipes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{imageStats.categories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Icons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{imageStats.icons}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Image Library</CardTitle>
          <CardDescription>
            Manage all images used in ingredients, recipes, categories, and UI elements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedUsageType} onValueChange={setSelectedUsageType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by usage type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Usage Types</SelectItem>
                {usageTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Usage Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIngredients.map((ingredient) => (
                  <TableRow key={ingredient.id}>
                    <TableCell>
                      <div className="w-16 h-16 rounded-md overflow-hidden border">
                        <OptimizedImage
                          src={ingredient.image_url}
                          alt={ingredient.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{ingredient.name}</TableCell>
                    <TableCell>
                      <Badge variant={
                        ingredient.usage_type === 'ingredient' ? 'default' :
                        ingredient.usage_type === 'recipe' ? 'secondary' :
                        ingredient.usage_type === 'category' ? 'outline' : 'destructive'
                      }>
                        {ingredient.usage_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{ingredient.category}</span>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{ingredient.subcategory || 'N/A'}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(ingredient.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(ingredient)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDelete(ingredient.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredIngredients.length === 0 && !loading && (
            <div className="text-center py-8">
              <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No images found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
