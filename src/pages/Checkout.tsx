
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Customer } from '../types/shop';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ShoppingBag, Truck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { sendOrderToTelegram } from '@/services/telegramService';
import { toast } from 'sonner';

const Checkout = () => {
  const { state, totalPrice, totalItems, setCustomer, createOrder, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Customer>({
    name: '',
    phone: '',
    address: '',
    email: '',
    notes: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (state.items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/');
      return;
    }
    
    setIsLoading(true);
    
    // Set customer data
    setCustomer(formData);
    
    // Create order
    const order = createOrder();
    
    if (!order) {
      toast.error('Failed to create order');
      setIsLoading(false);
      return;
    }
    
    // Send order to Telegram
    try {
      const success = await sendOrderToTelegram(order);
      
      if (success) {
        // Clear cart and redirect to confirmation
        clearCart();
        navigate('/confirmation', { state: { order } });
      } else {
        toast.error('Failed to send order. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('An error occurred while processing your order');
      setIsLoading(false);
    }
  };
  
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <ShoppingBag className="h-8 w-8 mb-2 text-muted-foreground" />
            </CardTitle>
            <p className="text-2xl font-medium">Your cart is empty</p>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate('/')} className="w-full">
              Continue Shopping
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8 px-4 bg-background">
      <div className="container max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shopping
        </Button>
        
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="Your full address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="min-h-[80px]"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Any special instructions"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Complete Order'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="animate-slide-up animation-delay-150">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {state.items.map((item) => (
                    <li key={item.product.id} className="flex justify-between text-sm">
                      <span className="flex-1">
                        {item.quantity} × {item.product.name}
                      </span>
                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
