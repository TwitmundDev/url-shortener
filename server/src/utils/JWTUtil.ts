import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@/generated/prisma';

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

export function verifyToken(token: string): JwtUserPayload | null {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as JwtUserPayload;
    } catch {
        return null;
    }
}