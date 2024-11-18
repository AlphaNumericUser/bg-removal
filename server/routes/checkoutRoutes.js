import express from 'express';
import createCheckoutSession from '../controllers/checkoutController.js';
import authUser from '../middlewares/auth.js'; // Importa el middleware de autenticación

const checkoutRouter = express.Router();

// Ruta para crear sesiones de pago con autenticación
checkoutRouter.post('/create-session', authUser, createCheckoutSession);

export default checkoutRouter;