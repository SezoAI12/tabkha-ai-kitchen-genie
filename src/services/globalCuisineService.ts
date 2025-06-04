
export interface CuisineType {
  id: string;
  name: string;
  description: string;
  image: string;
  popularDishes: string[];
  region: string;
}

const mockCuisines: CuisineType[] = [
  {
    id: '1',
    name: 'Italian',
    description: 'Rich flavors from the Mediterranean',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    popularDishes: ['Pizza', 'Pasta', 'Risotto'],
    region: 'Europe'
  },
  {
    id: '2',
    name: 'Japanese',
    description: 'Fresh and delicate flavors',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop',
    popularDishes: ['Sushi', 'Ramen', 'Tempura'],
    region: 'Asia'
  }
];

export const globalCuisineService = {
  async getAllCuisines(): Promise<CuisineType[]> {
    return mockCuisines;
  },

  async getCuisineById(id: string): Promise<CuisineType | null> {
    return mockCuisines.find(c => c.id === id) || null;
  }
};
