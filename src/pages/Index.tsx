
import { useState, useEffect } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import CartModal from '../components/CartModal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Moon, Sun, Info, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [showPromoNotice, setShowPromoNotice] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  useEffect(() => {
    // Update class on document when dark mode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-background pb-8">
      <Header onOpenCart={() => setCartOpen(true)} />
      
      <main className="container pt-24 px-4 sm:px-6 animate-fade-in">
        {showPromoNotice && selectedCategory === 'package' && (
          <div className="mb-6 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4 shadow-sm relative animate-fade-in">
            <button 
              onClick={() => setShowPromoNotice(false)} 
              className="absolute top-2 right-2 text-amber-500 hover:text-amber-700"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-amber-800 font-medium text-sm flex items-center gap-1">
              <Info className="h-4 w-4" /> Special Promotion Notice
            </h3>
            <p className="text-amber-700 text-xs mt-1">
              Enjoy a massive 30.7% discount on all packages for a limited time! This special offer is valid for 3 months only.
            </p>
          </div>
        )}
        
        <section className="text-center mb-8 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Ethio <span className="text-primary">Telecom</span> Services
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Purchase airtime with a 10% discount and packages with a 30.7% discount for a limited time.
          </p>
          
          <div className="flex items-center justify-center mt-4 gap-2">
            <Sun className="h-4 w-4" />
            <Switch 
              checked={darkMode} 
              onCheckedChange={setDarkMode} 
              aria-label="Toggle dark mode"
            />
            <Moon className="h-4 w-4" />
          </div>
        </section>
        
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 max-w-xl mx-auto">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "rounded-full transition-all",
                selectedCategory === category.id
                  ? "scale-105"
                  : "hover:scale-105"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">No products found in this category.</p>
          </div>
        )}
        
        <div className="flex justify-center mt-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                Terms & Conditions
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Terms & Conditions</SheetTitle>
                <SheetDescription>
                  Please read our terms and conditions carefully.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                <h3 className="font-medium text-foreground">Promotion Details</h3>
                <p>
                  The special 30.7% discount on packages is a limited-time offer valid for 3 months from the purchase date.
                </p>
                
                <h3 className="font-medium text-foreground">Service Availability</h3>
                <p>
                  Ethio Telecom services are available only to customers with a valid Ethio Telecom number. Service availability depends on network coverage in your area.
                </p>
                
                <h3 className="font-medium text-foreground">Refund Policy</h3>
                <p>
                  All purchases are final. No refunds will be issued for airtime or packages once purchased.
                </p>
                
                <h3 className="font-medium text-foreground">Price Changes</h3>
                <p>
                  Prices and discounts are subject to change without prior notice. The displayed price at checkout is final.
                </p>
                
                <h3 className="font-medium text-foreground">Contact Information</h3>
                <p>
                  For any questions or concerns, please contact customer service at support@ethiotelecom.et or call 994.
                </p>
              </div>
              <SheetClose asChild>
                <Button className="mt-6 w-full">I Understand</Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </main>
      
      <CartModal open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Index;
