
import { Product } from '../types/shop';

export const products: Product[] = [
  // Airtime products (10% off actual value)
  {
    id: '1',
    name: '5 ETB Airtime',
    description: 'Ethio Telecom prepaid airtime credit worth 5 ETB. 10% discount applied.',
    price: 4.5, // 5 ETB with 10% discount
    image: 'public/lovable-uploads/3a3504b8-7547-4dda-9a07-47fc66063172.png',
    category: 'airtime'
  },
  {
    id: '2',
    name: '10 ETB Airtime',
    description: 'Ethio Telecom prepaid airtime credit worth 10 ETB. 10% discount applied.',
    price: 9, // 10 ETB with 10% discount
    image: 'public/lovable-uploads/3a3504b8-7547-4dda-9a07-47fc66063172.png',
    category: 'airtime'
  },
  {
    id: '3',
    name: '15 ETB Airtime',
    description: 'Ethio Telecom prepaid airtime credit worth 15 ETB. 10% discount applied.',
    price: 13.5, // 15 ETB with 10% discount
    image: 'public/lovable-uploads/3a3504b8-7547-4dda-9a07-47fc66063172.png',
    category: 'airtime'
  },
  {
    id: '4',
    name: '25 ETB Airtime',
    description: 'Ethio Telecom prepaid airtime credit worth 25 ETB. 10% discount applied.',
    price: 22.5, // 25 ETB with 10% discount
    image: 'public/lovable-uploads/3a3504b8-7547-4dda-9a07-47fc66063172.png',
    category: 'airtime'
  },
  {
    id: '5',
    name: '50 ETB Airtime',
    description: 'Ethio Telecom prepaid airtime credit worth 50 ETB. 10% discount applied.',
    price: 45, // 50 ETB with 10% discount
    image: 'public/lovable-uploads/3a3504b8-7547-4dda-9a07-47fc66063172.png',
    category: 'airtime'
  },
  {
    id: '6',
    name: '100 ETB Airtime',
    description: 'Ethio Telecom prepaid airtime credit worth 100 ETB. 10% discount applied.',
    price: 90, // 100 ETB with 10% discount
    image: 'public/lovable-uploads/3a3504b8-7547-4dda-9a07-47fc66063172.png',
    category: 'airtime'
  },
  {
    id: '7',
    name: '250 ETB Airtime',
    description: 'Ethio Telecom prepaid airtime credit worth 250 ETB. 10% discount applied.',
    price: 225, // 250 ETB with 10% discount
    image: 'public/lovable-uploads/3a3504b8-7547-4dda-9a07-47fc66063172.png',
    category: 'airtime'
  },
  {
    id: '8',
    name: '500 ETB Airtime',
    description: 'Ethio Telecom prepaid airtime credit worth 500 ETB. 10% discount applied.',
    price: 450, // 500 ETB with 10% discount
    image: 'public/lovable-uploads/3a3504b8-7547-4dda-9a07-47fc66063172.png',
    category: 'airtime'
  },
  {
    id: '9',
    name: '1000 ETB Airtime',
    description: 'Ethio Telecom prepaid airtime credit worth 1000 ETB. 10% discount applied.',
    price: 900, // 1000 ETB with 10% discount
    image: 'public/lovable-uploads/3a3504b8-7547-4dda-9a07-47fc66063172.png',
    category: 'airtime'
  },
  
  // Package products (10% off actual value)
  {
    id: '10',
    name: 'Weekly Unlimited Premium',
    description: 'Unlimited Internet and SMS for a full week. 10% discount applied.',
    price: 360, // 400 ETB with 10% discount
    image: 'public/lovable-uploads/0187b354-03f1-4ee7-93d7-6f47e92d5a86.png',
    category: 'package'
  },
  {
    id: '11',
    name: 'Monthly Unlimited Premium Plan',
    description: 'Unlimited Voice and Internet for a month. 10% discount applied.',
    price: 881.1, // 979 ETB with 10% discount
    image: 'public/lovable-uploads/0187b354-03f1-4ee7-93d7-6f47e92d5a86.png',
    category: 'package'
  },
  {
    id: '12',
    name: 'Monthly Unlimited Internet and SMS',
    description: 'Unlimited Internet and SMS for a full month. 10% discount applied.',
    price: 1170, // 1300 ETB with 10% discount
    image: 'public/lovable-uploads/0187b354-03f1-4ee7-93d7-6f47e92d5a86.png',
    category: 'package'
  },
  {
    id: '13',
    name: 'Monthly Unlimited Premium Voice, Internet and SMS',
    description: 'Complete unlimited package with voice, internet and SMS for a month. 10% discount applied.',
    price: 1529.1, // 1699 ETB with 10% discount
    image: 'public/lovable-uploads/0187b354-03f1-4ee7-93d7-6f47e92d5a86.png',
    category: 'package'
  },
  {
    id: '14',
    name: 'Unlimited Premium Plus',
    description: 'Local Unlimited Voice and Unlimited Internet for a month. 10% discount applied.',
    price: 3600, // 4000 ETB with 10% discount
    image: 'public/lovable-uploads/0187b354-03f1-4ee7-93d7-6f47e92d5a86.png',
    category: 'package'
  },
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'airtime', name: 'Airtime' },
  { id: 'package', name: 'Package' },
];
