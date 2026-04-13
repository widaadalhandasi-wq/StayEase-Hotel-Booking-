export interface Room {
  id: number;
  name: string;
  type: 'Single' | 'Double' | 'Suite';
  price: number;
  available: boolean;
  rating: number;
  description: string;   
  amenities: string[]; 
  image: string; 
}