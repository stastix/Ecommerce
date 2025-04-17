export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewProduct {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  category: string;
  stock?: number;
}
