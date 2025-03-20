
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem, Customer, Order } from '../types/shop';
import { toast } from 'sonner';

interface CartState {
  items: CartItem[];
  customer: Customer | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'SET_CUSTOMER'; payload: Customer }
  | { type: 'CLEAR_CART' };

interface CartContextProps {
  state: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCustomer: (customer: Customer) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  createOrder: () => Order | null;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product, quantity }]
        };
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload.productId)
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item => 
          item.product.id === action.payload.productId 
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
      
    case 'SET_CUSTOMER':
      return {
        ...state,
        customer: action.payload
      };
      
    case 'CLEAR_CART':
      return {
        items: [],
        customer: null
      };
      
    default:
      return state;
  }
};

const CART_STORAGE_KEY = 'shopping-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], customer: null }, () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : { items: [], customer: null };
    }
    return { items: [], customer: null };
  });
  
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);
  
  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    toast.success(`Added ${product.name} to cart`);
  };
  
  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    toast.info('Item removed from cart');
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };
  
  const setCustomer = (customer: Customer) => {
    dispatch({ type: 'SET_CUSTOMER', payload: customer });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  const createOrder = (): Order | null => {
    if (state.items.length === 0 || !state.customer) {
      return null;
    }
    
    return {
      items: [...state.items],
      customer: state.customer,
      total: totalPrice,
      date: new Date(),
      status: 'pending',
      id: `order-${Date.now()}`
    };
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        state, 
        addItem, 
        removeItem, 
        updateQuantity, 
        setCustomer, 
        clearCart, 
        totalItems,
        totalPrice,
        createOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
