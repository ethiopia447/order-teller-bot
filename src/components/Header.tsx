
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenCart: () => void;
}

const Header = ({ onOpenCart }: HeaderProps) => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartBadgeAnimating, setIsCartBadgeAnimating] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (totalItems > 0) {
      setIsCartBadgeAnimating(true);
      const timer = setTimeout(() => setIsCartBadgeAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 border-b",
        "py-4 sm:py-5 px-4 sm:px-6 lg:px-8", // Added responsive padding
        isScrolled 
          ? "bg-background/95 shadow-sm" 
          : "bg-background/50"
      )}
    >
      <div className="container flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-medium">
            <span className="text-primary">Shop</span>
            <span className="text-foreground">App</span>
          </h1>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onOpenCart}
          className="relative"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge 
              className={cn(
                "absolute -top-2 -right-2 min-w-[1.5rem] h-6 flex items-center justify-center transition-transform",
                isCartBadgeAnimating && "animate-float"
              )}
              variant="default"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;

