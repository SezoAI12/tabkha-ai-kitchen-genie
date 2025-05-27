// src/pages/EditProfilePage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming you have an Input component
import { Label } from '@/components/ui/label'; // Assuming you have a Label component
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '@/data/mockData'; // Import mock user for initial data

export default function EditProfilePage() {
  const navigate = useNavigate();

  // State to manage editable profile fields
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [dietaryPreferences, setDietaryPreferences] = useState(mockUser.dietaryPreferences?.join(', ') || '');
  const [cuisinePreferences, setCuisinePreferences] = useState(mockUser.cuisinePreferences?.join(', ') || '');
  const [allergies, setAllergies] = useState(mockUser.allergies?.join(', ') || '');
  const [chefAvatar, setChefAvatar] = useState(mockUser.chefAvatar || '');
  // Add more states for other editable fields as needed

  const handleSaveChanges = () => {
    // In a real application, you would send this data to your backend API
    // For now, we'll just simulate a save and show a toast.

    const updatedUser = {
      ...mockUser, // Keep existing mock data
      name,
      email,
      dietaryPreferences: dietaryPreferences.split(',').map(s => s.trim()).filter(Boolean),
      cuisinePreferences: cuisinePreferences.split(',').map(s => s.trim()).filter(Boolean),
      allergies: allergies.split(',').map(s => s.trim()).filter(Boolean),
      chefAvatar,
      // Update other fields as needed
    };

    console.log("Saving updated user data:", updatedUser);
    toast.success("Profile updated successfully!");
    navigate('/profile'); // Navigate back to the profile view page
  };

  const handleCancel = () => {
    navigate('/profile'); // Go back to the profile view page without saving
  };

  return (
    <PageContainer
      header={{
        title: 'Edit Profile',
        actions: (
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
        ),
      }}
    >
      <div className="container px-4 py-6 space-y-6">
        <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>
          <div>
            <Label htmlFor="dietaryPreferences">Dietary Preferences (comma-separated)</Label>
            <Input
              id="dietaryPreferences"
              value={dietaryPreferences}
              onChange={(e) => setDietaryPreferences(e.target.value)}
              placeholder="e.g., Vegetarian, Gluten-Free"
            />
          </div>
          <div>
            <Label htmlFor="cuisinePreferences">Cuisine Preferences (comma-separated)</Label>
            <Input
              id="cuisinePreferences"
              value={cuisinePreferences}
              onChange={(e) => setCuisinePreferences(e.target.value)}
              placeholder="e.g., Italian, Mexican"
            />
          </div>
          <div>
            <Label htmlFor="allergies">Allergies (comma-separated)</Label>
            <Input
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="e.g., Peanuts, Dairy"
            />
          </div>
          <div>
            <Label htmlFor="chefAvatar">Chef Personality</Label>
            <Input
              id="chefAvatar"
              value={chefAvatar}
              onChange={(e) => setChefAvatar(e.target.value)}
              placeholder="e.g., The Grill Master"
            />
          </div>
          {/* Add more input fields for other editable data */}

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
