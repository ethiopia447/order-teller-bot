
import { Product } from '../types/shop';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine if this is an airtime product to adjust layout
  const isAirtime = product.category === 'airtime';
  
  // Calculate original price before discount (discount is 10%)
  const originalPrice = product.price / 0.9;
  const discountAmount = originalPrice - product.price;
  
  return (
    <Card 
      className={`overflow-hidden card-hover animate-scale-in ${isAirtime ? 'text-center' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${isAirtime ? 'aspect-auto p-4' : 'aspect-square'} overflow-hidden bg-muted flex items-center justify-center`}>
        <div className={`text-3xl font-bold ${isAirtime ? 'text-primary' : 'text-accent-foreground'}`}>
          {isAirtime ? (
            <span className="block">{product.name.split(' ')[0]}</span>
          ) : (
            <span className="block">Package</span>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium leading-tight">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="font-medium text-primary">{product.price.toFixed(2)} Birr</p>
          <p className="text-sm line-through text-muted-foreground">{originalPrice.toFixed(2)} Birr</p>
        </div>
        <div className={`mt-1 transition-all duration-300 overflow-hidden ${isHovered ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'}`}>
          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium animate-pulse">
            Save {discountAmount.toFixed(2)} Birr
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => addItem(product)} 
          className="w-full gap-2 group"
          variant="outline"
        >
          <PlusCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
