import { Router } from "express";
import {PrismaClient} from '@/generated/prisma';
import {authenticate} from "@/middleware/auth";
import {authorizeAdmin} from "@/middleware/authorizeAdmin";

const router = Router();
const prisma = new PrismaClient();

router.get('/:id', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'ID utilisateur invalide' });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

router.get('/', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;
