export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  discount: number | null;
  size: string[] | null;
}

export interface CartProduct {
  productId: number;
  name: string;
  price: number;
  image?: string | null;
  category: string;
  selectedSize: string | null;
  quantity: number;
}
