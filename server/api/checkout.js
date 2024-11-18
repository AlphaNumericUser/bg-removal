// api/checkout.js
import { createCheckoutSession } from '../controllers/checkoutController.js';
import authUser from '../middlewares/auth.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await authUser(req, res, async () => {
      await createCheckoutSession(req, res);
    });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}