import Stripe from 'stripe';
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'https://bg-removal-swart-two.vercel.app'; // Cambia al dominio desplegado

// Controlador para crear una sesión de pago
const createCheckoutSession = async (req, res) => {
  try {
    const clerkId = req.clerkId; // Obtener clerkId del middleware

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1QMHHiCsLHH4KeMQPsFTgFde', // Asegúrate de que este ID sea correcto
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      metadata: {
        clerkId: clerkId, // Añadir clerkId en metadata
      },
    });

    console.log('Se ha creado la sesión');
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error al crear la sesión:', error);
    res.status(500).json({ error: 'No se pudo crear la sesión de pago', details: error.message });
  }
};

// Exportar como exportación por defecto
export default createCheckoutSession;
