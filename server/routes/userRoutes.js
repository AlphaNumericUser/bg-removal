import express from 'express';
import { clerkWebhooks } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/webhooks', (req, res) => {
    console.log("Ruta /webhooks llamada");
    clerkWebhooks(req, res);
});

export default userRouter;