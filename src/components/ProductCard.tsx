import { Product } from '../types/shop';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { PlusCircle, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine if this is an airtime product to adjust layout
  const isAirtime = product.category === 'airtime';
  const isPackage = product.category === 'package';
  
  // Calculate original price before discount
  // 10% discount for airtime, 20% for packages
  const discountPercent = isPackage ? 20 : 10;
  const originalPrice = product.price / (1 - discountPercent / 100);
  const discountAmount = originalPrice - product.price;
  
  return (
    <Card 
      className={`overflow-hidden card-hover animate-scale-in ${isAirtime ? 'text-center' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${isAirtime ? 'aspect-auto p-4' : 'aspect-square'} overflow-hidden bg-muted flex items-center justify-center`}>
        {isPackage && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg font-medium text-sm animate-pulse">
            20% OFF
          </div>
        )}
        <div className={`text-3xl font-bold ${isAirtime ? 'text-primary' : isPackage ? 'text-rose-600' : 'text-accent-foreground'}`}>
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
        {isPackage && (
          <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
            <Clock className="h-3 w-3" />
            <span>Limited offer: 3 months only</span>
          </div>
        )}
        <div className={`mt-1 transition-all duration-300 overflow-hidden ${isHovered ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'}`}>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium animate-pulse ${isPackage ? 'bg-rose-100 text-rose-700' : 'bg-primary/10 text-primary'}`}>
            Save {discountAmount.toFixed(2)} Birr
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isPackage && (
          <div className="w-full mb-2 text-xs text-muted-foreground">
            <p className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-600" />
              <span>Special promotion ends soon</span>
            </p>
          </div>
        )}
        <Button 
          onClick={() => addItem(product)} 
          className={`w-full gap-2 group ${isPackage ? 'bg-rose-600 hover:bg-rose-700 text-white' : ''}`}
          variant={isPackage ? "default" : "outline"}
        >
          <PlusCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
