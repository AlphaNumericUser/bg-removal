import express from 'express';
import { removeBGImage } from '../controllers/imageController.js';
import upload from '../middlewares/multer.js';
import authUser from '../middlewares/auth.js';

const imageRouter = express.Router();

imageRouter.post('/remove-bg', upload.single('image'), authUser, removeBGImage);

export default imageRouter;