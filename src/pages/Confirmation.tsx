
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, Package } from 'lucide-react';
import { Order } from '@/types/shop';
import { useEffect } from 'react';
import { toast } from 'sonner';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined;
  
  useEffect(() => {
    if (!order) {
      navigate('/');
      return;
    }
  }, [order, navigate]);
  
  if (!order) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            Order Confirmed!
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Your order has been submitted successfully.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-md p-4">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Package className="h-4 w-4" />
              Order Summary
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Order ID: <span className="font-medium text-foreground">{order.id}</span>
            </p>
            <ul className="space-y-2 text-sm">
              {order.items.map((item) => (
                <li key={item.product.id} className="flex justify-between">
                  <span>
                    {item.quantity} × {item.product.name}
                  </span>
                  <span className="font-medium">
                    {(item.product.price * item.quantity).toFixed(2)} Birr
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t my-3"></div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{order.total.toFixed(2)} Birr</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Delivery Information</h3>
            <p className="text-sm text-muted-foreground mb-1">
              {order.customer.name}
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              {order.customer.phone}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.customer.address}
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button onClick={() => navigate('/')} className="w-full gap-2">
            <Home className="h-4 w-4" />
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Confirmation;
