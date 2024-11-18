import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:5173';

// Controlador para crear una sesión de pago
const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1QMHHiCsLHH4KeMQPsFTgFde',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/`,
      cancel_url: `${YOUR_DOMAIN}/`,
    });

    console.log('Se ha creado la sesión');
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error al crear la sesión:', error);
    res.status(500).json({ error: 'No se pudo crear la sesión de pago', details: error.message });
  }
};

export default createCheckoutSession;
