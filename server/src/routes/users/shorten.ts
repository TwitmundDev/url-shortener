import { Router } from "express";
import { PrismaClient } from '@/generated/prisma';
import { authenticate } from "@/middleware/auth";
import { generateUniqueShortCode } from "@/utils/urlManager";

const router = Router();
const prisma = new PrismaClient();
//todo si compte suspendu, ne pas autoriser l'accès

router.post('/', authenticate, async (req, res) => {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl) {
            return res.status(400).json({ error: 'URL originale est requise' });
        }

        const userId = req.user.userId; // Correction ici
        const shortCode = await generateUniqueShortCode();
        const newShortUrl = await prisma.url.create({
            data: {
                longUrl: originalUrl,
                shortCode,
                user: { connect: { id: userId } },
            },
        });

        res.status(201).json({ shortUrl: newShortUrl });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
        console.log(error);
    }
});

export default router;
