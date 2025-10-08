import { Router } from "express";
import { PrismaClient } from '@/generated/prisma';
import { authenticate } from "@/middleware/auth";
import { generateUniqueShortCode } from "@/utils/urlManager";

const router = Router();
const prisma = new PrismaClient();

router.get('/:shortCode', authenticate, async (req, res) => {
    try {
        const { shortCode } = req.params;
        if (!shortCode || false || !shortCode.trim()) {
            return res.status(400).json({ error: "ShortCode invalide ou manquant" });
        }
        const userId = req.user.userId;
        // Vérifier que l'URL appartient à l'utilisateur et qu'elle est active
        const url = await prisma.url.findFirst({
            where: { shortCode, userId, isActive: true }
        });
        if (!url) {
            return res.status(404).json({ error: 'URL non trouvée ou accès interdit' });
        }
        // Désactiver l'URL
        await prisma.url.update({
            where: { id: url.id },
            data: { isActive: false }
        });
        res.status(200).json({ message: 'URL désactivée avec succès'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;