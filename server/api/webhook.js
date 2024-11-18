// server/api/webhook.js
import { buffer } from 'micro';
import { handleStripeWebhook } from '../controllers/webhookController.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function webhookHandler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    try {
      await handleStripeWebhook(buf, sig, stripe, endpointSecret);
      res.status(200).send({ received: true });
    } catch (error) {
      console.error('Error en webhookHandler:', error.message);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}