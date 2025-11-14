import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@/generated/prisma';
import {NextFunction, Request, Response} from "express";

configDotenv();
const prisma = new PrismaClient();

export interface JwtUserPayload {
    userId: string | number;
    role: string;
    lastPasswordChange: number;
}

export async function generateToken(userId: number, role: string) {
    // Récupérer la date de dernier changement de mot de passe
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { lastPasswordChange: true } });
    const lastPasswordChange = user?.lastPasswordChange ? Math.floor(new Date(user.lastPasswordChange).getTime() / 1000) : 0;
    return jwt.sign({ userId, role, lastPasswordChange }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

// Middleware Express pour vérifier le JWT
export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    // Le token est fourni uniquement dans le body sous la clé "jwt" (POST)
    const token = req.body && (req.body.jwt as string | undefined);

    if (!token) {
        return res.status(401).json({ error: 'Token manquant (attendu dans body.jwt)' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT_SECRET non défini');
        return res.status(500).json({ error: 'Configuration serveur manquante' });
    }

    try {
        const payload = jwt.verify(token, secret) as JwtUserPayload;
        // Attacher le payload à la requête pour que les routes suivantes puissent y accéder
        (req as any).user = payload;
        return next();
    } catch (err: any) {
        // console.error('Erreur de vérification du token:', err);
        // Gérer les erreurs spécifiques de jsonwebtoken
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expiré' });
        }
        if (err instanceof jwt.JsonWebTokenError) {
            const msg = (err.message || '').toLowerCase();
            if (msg.includes('jwt malformed') || msg.includes('malformed')) {
                return res.status(400).json({ error: 'Token malformé' });
            }
            if (msg.includes('invalid signature')) {
                return res.status(401).json({ error: 'Signature du token invalide' });
            }
            return res.status(401).json({ error: 'Token invalide' });
        }
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
}