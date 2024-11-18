import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import checkoutRouter from "./routes/checkoutRoutes.js";
import webhookRouter from "./routes/webhookRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();
await connectDB();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Inicializar middleware
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// Rutas de la API
app.get("/", (req, res) => res.send(`Conectado al puerto ${PORT}`));
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/webhook', webhookRouter); // Añade esta línea

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 