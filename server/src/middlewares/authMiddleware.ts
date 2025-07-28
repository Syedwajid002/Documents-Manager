import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getDb } from '../config/dbconfig';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined. Authentication will not work.");
    process.exit(1);
}

interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);

        req.user = { userId: decoded.userId, role: decoded.role };

        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

export const authorizeRoles = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource.' });
        }
        next();
    };
};