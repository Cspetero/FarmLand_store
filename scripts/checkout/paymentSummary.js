import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
  });

  const totalBeforeTaxCents = productPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.length}):</div>
      <div class="payment-summary-money">
        Ksh${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        Ksh${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        Ksh${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        Ksh${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>

    <button id="whatsapp-button" class="whatsapp-button button-secondary">
      <img class="whatsapp-logo" src="/FarmLand_store/images/whatsapp_logo.png" alt="">  
      Confirm your order here (via WhatsApp)
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  // WhatsApp button event listener
const whatsappButton = document.getElementById('whatsapp-button');
whatsappButton.addEventListener('click', () => {
    const phoneNumber = '+254114477854'; // Replace with your WhatsApp business number
    const message = generateWhatsAppMessage(productPriceCents, totalBeforeTaxCents, taxCents, totalCents);
    
    // Call a function to send the message via the WhatsApp API
    sendWhatsAppMessage(phoneNumber, message);
});

function generateWhatsAppMessage(productPriceCents, totalBeforeTaxCents, taxCents, totalCents) {
    let message = 'Welcome to Farmland Electricals. Your order is being processed.';

    // You can add additional information to the message if needed

    return message;
}

async function sendWhatsAppMessage(phoneNumber, message) {
    try {
        const response = await fetch(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
        if (response.ok) {
            console.log('WhatsApp message sent successfully!');
        } else {
            console.error('Failed to send WhatsApp message:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
}
}