
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, AlertTriangle } from 'lucide-react';

interface ImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageData: any) => void;
}

export const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [imageData, setImageData] = useState({
    name: '',
    category: '',
    type: '',
    usage: ''
  });

  const handleUpload = () => {
    if (!imageData.name.trim()) return;
    onUpload(imageData);
    setImageData({ name: '', category: '', type: '', usage: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload New Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Image Name</Label>
              <Input
                id="name"
                placeholder="Enter image name"
                value={imageData.name}
                onChange={(e) => setImageData({...imageData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setImageData({...imageData, category: value})}>
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
              <Select onValueChange={(value) => setImageData({...imageData, type: value})}>
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
              <Input
                id="usage"
                placeholder="Where will this be used?"
                value={imageData.usage}
                onChange={(e) => setImageData({...imageData, usage: e.target.value})}
              />
            </div>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium">Drop your image here</p>
            <p className="text-sm text-gray-500">or click to browse</p>
            <Button variant="outline" className="mt-4">Choose File</Button>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-300">Note:</p>
                <p className="text-amber-700 dark:text-amber-400">
                  Images will be optimized and stored securely. Supported formats: JPG, PNG, SVG, WebP.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleUpload} className="flex-1">Upload & Save</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
