import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']
    const valid = token.split(' ')
    if (!valid[1]) {
        return res.status(500).json({
            success: false,
            message: 'No token provided'
        })
    }

    

    jwt.verify(valid[1], process.env.SUPER_SECRET, (err, decoded) => {
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Invalid token'
            })
        }
        req.body = decoded
        next()
    })
}

export default authMiddleware