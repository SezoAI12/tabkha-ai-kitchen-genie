
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Image, 
  Plus, 
  Edit,
  Trash2,
  Search,
  Upload,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IngredientImage {
  id: string;
  ingredientName: string;
  imageUrl: string;
  altText: string;
  size: string;
  format: string;
  status: 'active' | 'pending' | 'rejected';
  uploadedBy: string;
  uploadedAt: string;
}

const AdminIngredientImagesManager = () => {
  const [images, setImages] = useState<IngredientImage[]>([
    {
      id: '1',
      ingredientName: 'Tomato',
      imageUrl: '/images/ingredients/tomato.jpg',
      altText: 'Fresh red tomato',
      size: '45KB',
      format: 'JPG',
      status: 'active',
      uploadedBy: 'admin@wasfah.com',
      uploadedAt: '2024-01-15'
    },
    {
      id: '2',
      ingredientName: 'Onion',
      imageUrl: '/images/ingredients/onion.jpg',
      altText: 'White onion bulb',
      size: '38KB',
      format: 'JPG',
      status: 'active',
      uploadedBy: 'admin@wasfah.com',
      uploadedAt: '2024-01-14'
    },
    {
      id: '3',
      ingredientName: 'Garlic',
      imageUrl: '/images/ingredients/garlic.jpg',
      altText: 'Fresh garlic cloves',
      size: '52KB',
      format: 'JPG',
      status: 'pending',
      uploadedBy: 'content@wasfah.com',
      uploadedAt: '2024-01-13'
    }
  ]);

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newImage, setNewImage] = useState({
    ingredientName: '',
    altText: ''
  });

  const { toast } = useToast();

  const handleUploadImage = () => {
    if (!newImage.ingredientName.trim()) {
      toast({
        title: 'Error',
        description: 'Ingredient name is required.',
        variant: 'destructive'
      });
      return;
    }

    const ingredientImage: IngredientImage = {
      id: Date.now().toString(),
      ingredientName: newImage.ingredientName,
      imageUrl: `/images/ingredients/${newImage.ingredientName.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      altText: newImage.altText || `Fresh ${newImage.ingredientName}`,
      size: '0KB',
      format: 'JPG',
      status: 'pending',
      uploadedBy: 'admin@wasfah.com',
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    setImages([...images, ingredientImage]);
    setNewImage({ ingredientName: '', altText: '' });
    setIsUploadDialogOpen(false);

    toast({
      title: 'Image Uploaded',
      description: `Image for ${newImage.ingredientName} has been uploaded successfully.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  const stats = {
    totalImages: images.length,
    activeImages: images.filter(img => img.status === 'active').length,
    pendingImages: images.filter(img => img.status === 'pending').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Image className="mr-2 h-6 w-6" /> Ingredient Images Manager
          </h1>
          <p className="text-muted-foreground">Manage ingredient images and visual database</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Ingredient Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="ingredientName">Ingredient Name</Label>
                <Input
                  id="ingredientName"
                  placeholder="Enter ingredient name"
                  value={newImage.ingredientName}
                  onChange={(e) => setNewImage({...newImage, ingredientName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="altText">Alt Text (Optional)</Label>
                <Input
                  id="altText"
                  placeholder="Enter alt text for accessibility"
                  value={newImage.altText}
                  onChange={(e) => setNewImage({...newImage, altText: e.target.value})}
                />
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium">Drop ingredient image here</p>
                <p className="text-sm text-gray-500">or click to browse</p>
                <Button variant="outline" className="mt-4">Choose File</Button>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUploadImage} className="flex-1">
                  Upload Image
                </Button>
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
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
                <p className="text-sm font-medium text-gray-600">Active Images</p>
                <p className="text-2xl font-bold">{stats.activeImages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Image className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">{stats.pendingImages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Images Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ingredient Images</CardTitle>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search ingredients..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Ingredient</TableHead>
                <TableHead>Alt Text</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
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
                      <p className="font-medium">{image.ingredientName}</p>
                      <p className="text-sm text-gray-500">{image.format}</p>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{image.altText}</TableCell>
                  <TableCell>{image.size}</TableCell>
                  <TableCell>{getStatusBadge(image.status)}</TableCell>
                  <TableCell className="text-sm">{image.uploadedBy}</TableCell>
                  <TableCell>{image.uploadedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
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
};

export default AdminIngredientImagesManager;
