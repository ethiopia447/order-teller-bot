
import { useState, useEffect } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import CartModal from '../components/CartModal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
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
        <section className="text-center mb-8 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Ethio <span className="text-primary">Telecom</span> Services
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Purchase airtime and packages with a 10% discount on all products.
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
      </main>
      
      <CartModal open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Index;
