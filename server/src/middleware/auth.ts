import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/JWTUtil';

// Optionnel : définir le type du payload JWT
interface JwtPayload {
    id: string;
    email: string;
    role: string;
    // Ajoute d'autres propriétés si besoin
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token) as JwtPayload | null;
    if (!payload) return res.status(401).json({ message: 'Token invalide' });

    // TypeScript reconnaît maintenant req.user grâce à la déclaration globale
    req.user = payload;
    next();
}