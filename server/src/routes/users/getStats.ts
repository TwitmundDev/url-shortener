import { Router } from "express";
import { PrismaClient } from '@/generated/prisma';
import { authenticate } from "@/middleware/auth";
import { generateUniqueShortCode } from "@/utils/urlManager";

const router = Router();
const prisma = new PrismaClient();

router.get('/', authenticate, async (req, res) => {
    try {
        const userId = req.user.userId;
        const page = parseInt(req.query.page as string, 10) || 1;
        const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
        const skip = (page - 1) * pageSize;

        // Filtrer uniquement les URLs appartenant à l'utilisateur connecté
        const [urls, total] = await Promise.all([
            prisma.url.findMany({
                where: { userId },
                skip,
                take: pageSize,
                include: {
                    _count: {
                        select: { accesses: true }
                    },
                    accesses: {
                        select: { createdAt: true },
                        orderBy: { createdAt: 'desc' }
                    }
                }
            }),
            prisma.url.count({ where: { userId } })
        ]);

        // Formater les données pour la réponse
        const stats = urls.map(url => ({
            longUrl: url.longUrl,
            shortCode: url.shortCode,
            accessCount: url._count.accesses,
            accesses: url.accesses.map(a => a.createdAt)
        }));

        res.json({
            stats,
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize)
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
        console.log(error);
    }
});

router.get('/:shortCode', authenticate, async (req, res) => {
    const { shortCode } = req.params;
    const userId = req.user.userId;
    try {
        // Cherche l'URL par shortCode ET userId
        const url = await prisma.url.findFirst({
            where: { shortCode, userId },
            include: {
                accesses: {
                    select: { createdAt: true },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        if (!url) {
            return res.status(404).json({ error: 'URL non trouvée ou accès interdit' });
        }
        res.json({
            longUrl: url.longUrl,
            shortCode: url.shortCode,
            clickCount: url.accesses.length,
            accesses: url.accesses.map(a => a.createdAt)
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
        console.log(error);
    }
});


export default router;