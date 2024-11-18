// server/controllers/webhookController.js
import Stripe from 'stripe';
import userModel, { updateCredits } from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const clerkId = session.metadata.clerkId;

    // Actualizar los créditos del usuario
    try {
      const creditsToAdd = 10; // Define la cantidad de créditos a agregar
      await updateCreditsByClerkId(clerkId, creditsToAdd);
      console.log(`Créditos actualizados para el usuario con clerkId: ${clerkId}`);
    } catch (error) {
      console.error('Error al actualizar créditos:', error);
    }
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};

const updateCreditsByClerkId = async (clerkId, credits) => {
  const user = await userModel.findOne({ clerkId });
  if (user) {
    user.creditBalance += credits;
    await user.save();
  } else {
    throw new Error('Usuario no encontrado');
  }
};

export { handleStripeWebhook };