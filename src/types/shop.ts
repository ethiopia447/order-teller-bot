
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  name: string;
  phone: string;
  address: string;
  email?: string;
  notes?: string;
}

export interface Order {
  items: CartItem[];
  customer: Customer;
  total: number;
  date: Date;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  id: string;
}
