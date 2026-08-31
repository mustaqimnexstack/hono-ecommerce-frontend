export type Role = 'CUSTOMER' | 'ADMIN';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'CANCELLED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  priceCents: number;
  quantity: number;
  imageUrl?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  stock: number;
  active: boolean;
  category?: { id: string; name: string; slug: string } | null;
  images: { id: string; url: string; altText: string; position: number }[];
}

export interface PaginatedProducts {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  customerName: string;
  phone: string;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  shippingAddress: string;
  createdAt: string;
  items: { id: string; productId: string; productName: string; unitPriceCents: number; quantity: number }[];
}
