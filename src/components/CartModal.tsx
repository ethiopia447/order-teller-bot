
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter,
  SheetDescription,
  SheetClose
} from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CartItem } from '@/types/shop';
import { useNavigate } from 'react-router-dom';

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartModal = ({ open, onOpenChange }: CartModalProps) => {
  const { state, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/checkout');
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
            {totalItems > 0 && (
              <Badge variant="secondary" className="ml-2">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            {totalItems === 0 
              ? "Your cart is empty" 
              : "Review your items before checkout"}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground">No items in your cart</p>
              <Button onClick={() => onOpenChange(false)} variant="outline" className="mt-4">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {state.items.map((item) => (
                <CartItemRow 
                  key={item.product.id} 
                  item={item} 
                  onRemove={() => removeItem(item.product.id)}
                  onUpdateQuantity={(quantity) => updateQuantity(item.product.id, quantity)}
                />
              ))}
            </ul>
          )}
        </div>
        
        {state.items.length > 0 && (
          <SheetFooter className="border-t pt-4">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between text-lg font-medium">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SheetClose asChild>
                  <Button variant="outline">Continue Shopping</Button>
                </SheetClose>
                <Button onClick={handleCheckout}>Checkout</Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

interface CartItemRowProps {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItemRow = ({ item, onRemove, onUpdateQuantity }: CartItemRowProps) => {
  const { product, quantity } = item;
  
  return (
    <li className="flex gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <p className="font-medium truncate">{product.name}</p>
          <p className="font-medium whitespace-nowrap">${product.price.toFixed(2)}</p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => onUpdateQuantity(quantity - 1)}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <div className="h-8 px-3 flex items-center justify-center border-y">
              {quantity}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => onUpdateQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartModal;
