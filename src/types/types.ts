export interface KitchenItem {
  id: number;
  name: string;
  price: string;
  images: string[];
  features: string[];
  description: string;
  rating: number;
  reviews: number;
}

export interface DiningRoomItem {
  id: number;
  name: string;
  price: string;
  images: string[];
  description: string;
  features: string[];
  capacity: number;
  style: string;
}

export interface BedroomItem {
  id: number;
  name: string;
  price: string;
  images: string[];
  description: string;
  features: string[];
  bedSize: string;
  theme: string;
  rating: number;
}

export interface LivingRoomItem {
  id: number;
  name: string;
  images: string[];
  description: string;
  style: string;
  size: string;
  features: string[];
}

export interface WallpaperItem {
  id: number;
  name: string;
  images: string[];
  description: string;
  pattern: string;
  rollSize: string;
  material: string;
  colors: string[];
  features: string[];
}

export type WashroomItem = {
  id: number;
  name: string;
  price: string;
  images: string[];
  description: string;
  features: string[];
  bathType: string;
  theme: string;
  rating: number;
};
