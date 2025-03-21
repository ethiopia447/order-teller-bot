import { Order } from '../types/shop';

// Telegram credentials
const TELEGRAM_BOT_TOKEN = '7550070322:AAFzxhGXy6Y7Kr69gbzePjIOhIOIPkFvTzc';
const TELEGRAM_CHAT_ID = '827513320';

export const sendOrderToTelegram = async (order: Order): Promise<boolean> => {
  try {
    const message = formatOrderForTelegram(order);
    return await sendTelegramMessage(message);
  } catch (error) {
    console.error('Error sending order to Telegram:', error);
    return false;
  }
};

const formatOrderForTelegram = (order: Order): string => {
  const { items, customer, total, id, date } = order;
  
  const formattedItems = items.map(item => {
    return `• ${item.quantity}x ${item.product.name} - ${(item.product.price * item.quantity).toFixed(2)} Birr`;
  }).join('\n');
  
  const message = `
🛒 *NEW ORDER* #${id}
📆 ${date.toLocaleString()}

📋 *ORDER DETAILS:*
${formattedItems}

💰 *TOTAL:* ${total.toFixed(2)} Birr

👤 *CUSTOMER:*
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}
${customer.email ? `Email: ${customer.email}` : ''}
${customer.notes ? `Notes: ${customer.notes}` : ''}
`;

  return message;
};

// Implementation of sending a Telegram message
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
