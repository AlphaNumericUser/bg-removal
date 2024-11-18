import jwt from 'jsonwebtoken';

// Middleware function to decode jwt token to get clerkId
const authUser = (req, res, next) => {
    try {
        const token = req.headers.token
        if (!token) {
            return res.status(401).json({ success: false, message: "No authorized login again" })
        }
        const token_decode = jwt.decode(token)
        req.clerkId = token_decode.clerkId
        next()
    } catch (error) {
        console.error("Error en authUser:", error.message);
        res.json({ success: false, message: error.message })
        
    }
}

export default authUser;