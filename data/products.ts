export const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: "120",
    image:
      "https://images.unsplash.com/photo-1711491559395-c82f70a68bfb?q=80&w=2070&auto=format&fit=crop",
    quantity: 100,
    category: "Footwear",
    description: "Comfortable and stylish running shoes from Nike.",
    size: ["8", "9", "10", "11"],
  },
  {
    id: 2,
    name: "Apple Watch",
    price: "399",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    quantity: 100,
    category: "Wearable",
    description:
      "Smartwatch with fitness tracking and health monitoring features.",
  },
  {
    id: 3,
    name: "Canon Camera",
    price: "850",
    image:
      "https://images.unsplash.com/photo-1613235577937-9ac3eed992fc?q=80&w=2072&auto=format&fit=crop",
    quantity: 100,
    category: "Electronics",
    description: "High-quality DSLR camera for professional photography.",
  },
  {
    id: 4,
    name: "MacBook Pro",
    price: "1299",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quantity: 100,
    category: "Computers",
    description: "Powerful laptop for professionals and creatives.",
  },
  {
    id: 5,
    name: "Sony Headphones",
    price: "199",
    image:
      "https://images.unsplash.com/photo-1689872072441-5aed6df99448?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U29ueSUyMEhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
    quantity: 100,
    category: "Audio",
    description: "Noise-canceling headphones with superior sound quality.",
  },
  {
    id: 6,
    name: "Samsung Galaxy S21",
    price: "799",
    image:
      "https://images.unsplash.com/photo-1615264952739-555010f3b29b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyMXxlbnwwfHwwfHx8MA%3D%3D",
    quantity: 100,
    category: "Mobile Phones",
    description: "Flagship smartphone with cutting-edge features.",
  },
  {
    id: 7,
    name: "GoPro Hero 9",
    price: "399",
    image:
      "https://images.unsplash.com/photo-1690176483540-421999eea5dd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quantity: 100,
    category: "Cameras",
    description: "Action camera for capturing adventures in high resolution.",
  },
  {
    id: 8,
    name: "PlayStation 5",
    price: "499",
    image:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quantity: 100,
    category: "Gaming",
    description: "Next-generation gaming console with immersive gameplay.",
  },
];

export type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image?: string;
  selectedSize?: string | null;
  quantity?: number;
};
