import jwt from 'jsonwebtoken';

// Middleware function to decode jwt token to get clerkId
const authUser = (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "No autorizado, inicie sesión nuevamente" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de tener JWT_SECRET en .env
        req.clerkId = decoded.clerkId;
        next();
    } catch (error) {
        console.error("Error en authUser:", error.message);
        res.status(401).json({ success: false, message: "Token inválido" });
    }
}

export default authUser;