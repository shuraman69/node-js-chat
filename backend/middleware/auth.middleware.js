import jwt from 'jsonwebtoken'


export const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.auth
        if (!token) {
            return res.status(401).json('Auth error')
        }
        const decoded = jwt.verify(token, 'jwtSecret')
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Ошибка"})
    }
}