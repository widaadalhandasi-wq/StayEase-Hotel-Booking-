import { Injectable } from '@angular/core';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  public hotelInfo = {
    name: "StayEase Grand Hotel",
    address: "12 Marina Boulevard, Muscat, Oman",
    phone: "+968 2400 1111",
    stars: 5,
    logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80" 
  };

  private rooms: Room[] = [
    {
      id: 1,
      name: "Classic Single",
      type: "Single",
      price: 55,
      available: true,
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500",
      description: "A cozy room with a queen bed, work desk, and city view.",
      amenities: ["Wi-Fi", "TV", "Air Conditioning"]
    },
    {
      id: 2,
      name: "Deluxe Double",
      type: "Double",
      price: 90,
      available: true,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      description: "Spacious double room with two queen beds and garden view.",
      amenities: ["Wi-Fi", "TV", "Mini Bar", "Bathtub"]
    },
    {
      id: 3,
      name: "Premium Suite",
      type: "Suite",
      price: 180,
      available: true,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      description: "Luxurious suite with a king bed, lounge area, and sea view.",
      amenities: ["Wi-Fi", "TV", "Jacuzzi", "Breakfast Included", "Butler Service"]
    },
    {
      id: 4,
      name: "Economy Single",
      type: "Single",
      price: 40,
      available: false,
      rating: 3.9,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      description: "Affordable compact room ideal for solo business travelers.",
      amenities: ["Wi-Fi", "TV"]
    },
    {
      id: 5,
      name: "Family Double",
      type: "Double",
      price: 110,
      available: true,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500",
      description: "Family-friendly room with bunk beds and pool access.",
      amenities: ["Wi-Fi", "TV", "Pool Access", "Crib Available"]
    },
    {
      id: 6,
      name: "Executive Suite",
      type: "Suite",
      price: 220,
      available: false,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
      description: "Top-floor suite with panoramic views and private terrace.",
      amenities: ["Wi-Fi", "TV", "Jacuzzi", "Private Terrace", "Breakfast & Dinner"]
    }
  ];

  getRooms(): Room[] {
    return this.rooms;
  }

  getAvailableRooms(): Room[] {
    return this.rooms.filter(room => room.available);
  }
}