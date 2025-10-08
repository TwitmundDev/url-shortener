import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@/generated/prisma';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

const prisma = new PrismaClient();
configDotenv();

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        // Récupérer l'utilisateur en base avec lastPasswordChange
        const user = await prisma.user.findUnique({ where: { id: payload.userId }, select: { id: true, role: true, lastPasswordChange: true } });
        if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

        // Vérification de la révocation par date de changement de mot de passe
        const lastPasswordChangeDb = user.lastPasswordChange ? Math.floor(new Date(user.lastPasswordChange).getTime() / 1000) : 0;
        const lastPasswordChangeToken = payload.lastPasswordChange ? Number(payload.lastPasswordChange) : 0;
        if (lastPasswordChangeToken < lastPasswordChangeDb) {
            return res.status(401).json({ message: 'Token expiré suite à un changement de mot de passe. Veuillez vous reconnecter.' });
        }

        req.user = { userId: user.id, role: user.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
}