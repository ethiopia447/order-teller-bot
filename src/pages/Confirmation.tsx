
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, Package, CreditCard, Clock } from 'lucide-react';
import { Order } from '@/types/shop';
import { useEffect, useState } from 'react';
import { verifyChapaPayment } from '@/services/chapaService';
import { toast } from 'sonner';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const order = location.state?.order as Order | undefined;
  const txRef = searchParams.get('tx_ref');
  
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [isVerifying, setIsVerifying] = useState(false);
  
  useEffect(() => {
    if (!order && !txRef) {
      navigate('/');
      return;
    }
    
    // If we have a txRef from Chapa payment, verify it
    if (txRef) {
      const verifyPayment = async () => {
        setIsVerifying(true);
        try {
          const success = await verifyChapaPayment(txRef);
          setPaymentStatus(success ? 'success' : 'failed');
          if (success) {
            toast.success('Payment completed successfully!');
          } else {
            toast.error('Payment verification failed.');
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          setPaymentStatus('failed');
          toast.error('An error occurred while verifying payment.');
        } finally {
          setIsVerifying(false);
        }
      };
      
      verifyPayment();
    } else {
      // For TELEbirr payment, it's managed manually so we just show the success message
      setPaymentStatus('success');
    }
  }, [order, txRef, navigate]);
  
  if (!order && !txRef) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            {isVerifying ? (
              <Clock className="h-8 w-8 text-amber-500 animate-pulse" />
            ) : paymentStatus === 'success' ? (
              <CheckCircle className="h-8 w-8 text-primary" />
            ) : (
              <CreditCard className="h-8 w-8 text-amber-500" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isVerifying 
              ? 'Verifying Payment...' 
              : paymentStatus === 'success' 
                ? 'Order Confirmed!' 
                : txRef 
                  ? 'Payment Pending' 
                  : 'Order Confirmed!'}
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {isVerifying 
              ? 'Please wait while we verify your payment...' 
              : paymentStatus === 'success' 
                ? 'Your order has been submitted successfully.' 
                : 'Your payment is being processed.'}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Show order details if available */}
          {order && (
            <>
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
            
              {/* TELEbirr payment instructions */}
              {!txRef && (
                <div className="bg-primary/5 rounded-md p-4 border border-primary/20">
                  <h3 className="font-medium flex items-center gap-2 mb-2 text-primary">
                    <CreditCard className="h-4 w-4" />
                    Payment Instructions
                  </h3>
                  <p className="text-sm mb-2">
                    Please send the payment to this TELEbirr account:
                  </p>
                  <p className="font-bold text-center my-2 text-lg">
                    0906171823
                  </p>
                  <div className="flex justify-between font-medium mt-3 pt-3 border-t border-primary/20">
                    <span>Total Amount:</span>
                    <span>{order.total.toFixed(2)} Birr</span>
                  </div>
                </div>
              )}
            
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
            </>
          )}
          
          {/* If we only have txRef but not the order details */}
          {txRef && !order && (
            <div className="text-center p-4">
              {isVerifying ? (
                <p>Verifying your payment...</p>
              ) : paymentStatus === 'success' ? (
                <p className="text-green-600">Your payment was successful!</p>
              ) : (
                <p className="text-amber-600">We're processing your payment.</p>
              )}
            </div>
          )}
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
