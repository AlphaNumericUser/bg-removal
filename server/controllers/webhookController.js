// controllers/webhookController.js
import userModel from '../models/userModel.js';

export const handleStripeWebhook = async (buf, sig, stripe, endpointSecret) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    throw new Error(`Webhook Error: ${err.message}`);
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
      throw new Error('Error al actualizar créditos');
    }
  } else {
    console.log(`Evento no manejado: ${event.type}`);
  }
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