
import { Order } from '../types/shop';

// Chapa API configuration
const CHAPA_PUBLIC_KEY = 'CHAPUBK_TEST-S3PEu9vbhxUsyxDmaCaEjKlIQ7Iri3ht';
const CHAPA_ENCRYPTION_KEY = 'OXUFAqiVptYpPBKe0gzxpvA0';
const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';

export interface ChapaInitializeResponse {
  status: string;
  message: string;
  data: {
    checkout_url: string;
    tx_ref: string;
    reference: string;
  };
}

/**
 * Initializes a payment transaction with Chapa
 */
export const initializeChapaPayment = async (
  order: Order,
  callbackUrl: string
): Promise<string | null> => {
  try {
    const txRef = `tx-${Date.now()}-${order.id}`;
    
    const payload = {
      amount: order.total.toString(),
      currency: 'ETB',
      email: order.customer.email || 'customer@example.com',
      first_name: order.customer.name.split(' ')[0],
      last_name: order.customer.name.split(' ').slice(1).join(' ') || 'Customer',
      tx_ref: txRef,
      callback_url: callbackUrl,
      return_url: callbackUrl,
      customization: {
        title: 'ShopApp Purchase',
        description: `Order #${order.id}`,
      }
    };

    const response = await fetch(CHAPA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHAPA_PUBLIC_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json() as ChapaInitializeResponse;
    
    if (data.status === 'success') {
      return data.data.checkout_url;
    } else {
      console.error('Chapa payment initialization failed:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error initializing Chapa payment:', error);
    return null;
  }
};

// Verify Chapa transaction 
export const verifyChapaPayment = async (txRef: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${txRef}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CHAPA_PUBLIC_KEY}`
      }
    });
    
    const data = await response.json();
    return data.status === 'success';
  } catch (error) {
    console.error('Error verifying Chapa payment:', error);
    return false;
  }
};
