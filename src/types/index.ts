
// Core application types
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  featured: boolean;
  premium: boolean;
  createdBy: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  expiryDate?: string;
  category: string;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  image: string;
  calories: number;
  prepTime: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reportCount: number;
}

export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetUsers: 'all' | 'premium' | 'specific';
  userIds?: string[];
  scheduled: boolean;
  scheduledDate?: string;
  createdAt: string;
  status: 'draft' | 'sent';
}

export interface Advertisement {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  targetUrl?: string;
  isActive: boolean;
  displayDuration: number;
  targetUsers: 'all' | 'premium' | 'free';
  createdAt: string;
  scheduledStart?: string;
  scheduledEnd?: string;
}
