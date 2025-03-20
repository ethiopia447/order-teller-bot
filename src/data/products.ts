
import { Product } from '../types/shop';

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimalist Watch',
    description: 'A sleek, minimalist timepiece with premium leather strap and sapphire crystal face.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'accessories'
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life and adaptive sound.',
    price: 299.95,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics'
  },
  {
    id: '3',
    name: 'Smart Speaker',
    description: 'Voice-controlled smart speaker with immersive sound and intelligent assistant.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics'
  },
  {
    id: '4',
    name: 'Ceramic Mug Set',
    description: 'Set of 4 handcrafted ceramic mugs, each with a unique minimalist design.',
    price: 59.95,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'home'
  },
  {
    id: '5',
    name: 'Merino Wool Scarf',
    description: 'Ultra-soft merino wool scarf in a timeless pattern, perfect for all seasons.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1601379327928-bedfaf9da2d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'accessories'
  },
  {
    id: '6',
    name: 'Portable Power Bank',
    description: 'Slim 10,000mAh power bank with fast charging capabilities for all your devices.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1606751203311-781e243482c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics'
  },
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'home', name: 'Home' },
];
