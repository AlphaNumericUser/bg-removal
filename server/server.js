import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDB from "./configs/mongodb.js"
import userRouter from "./routes/userRoutes.js"
import imageRouter from "./routes/imageRoutes.js"

// App configuration
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

// Initialize middleware
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));
app.use(cors())

// API routes
app.get("/", (req, res) => res.send(`Conectado al puerto ${PORT}`))
app.use("/api/user", userRouter)
app.use("/api/image", imageRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});