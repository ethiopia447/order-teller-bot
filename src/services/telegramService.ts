
import { Order } from '../types/shop';

// This would typically be an environment variable in a production app
// For this demo, we'll use a placeholder
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

export const sendOrderToTelegram = async (order: Order): Promise<boolean> => {
  try {
    // In a real app, this would be an API call to your backend service
    // which would then send the message to Telegram
    // For this demo, we'll simulate a successful send
    
    console.log('Sending order to Telegram:', formatOrderForTelegram(order));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Error sending order to Telegram:', error);
    return false;
  }
};

const formatOrderForTelegram = (order: Order): string => {
  const { items, customer, total, id, date } = order;
  
  const formattedItems = items.map(item => {
    return `• ${item.quantity}x ${item.product.name} - $${(item.product.price * item.quantity).toFixed(2)}`;
  }).join('\n');
  
  const message = `
🛒 *NEW ORDER* #${id}
📆 ${date.toLocaleString()}

📋 *ORDER DETAILS:*
${formattedItems}

💰 *TOTAL:* $${total.toFixed(2)}

👤 *CUSTOMER:*
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}
${customer.email ? `Email: ${customer.email}` : ''}
${customer.notes ? `Notes: ${customer.notes}` : ''}
`;

  return message;
};

// For a real implementation, you would send a POST request to the Telegram API
// Example implementation using fetch:
/*
const sendTelegramMessage = async (message: string): Promise<boolean> => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
    
    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
};
*/
