
import { useState } from 'react';
import { products, categories } from '../data/products';
import { Product } from '../types/shop';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import CartModal from '../components/CartModal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-background pb-8">
      <Header onOpenCart={() => setCartOpen(true)} />
      
      <main className="container pt-24 px-4 sm:px-6 animate-fade-in">
        <section className="text-center mb-8 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Discover our <span className="text-primary">Products</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Browse our collection of premium products designed with simplicity and elegance in mind.
          </p>
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
