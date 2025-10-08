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

        // Récupérer les URLs paginées de l'utilisateur avec le nombre d'accès
        const [urls, total] = await Promise.all([
            prisma.url.findMany({
                where: { userId },
                skip,
                take: pageSize,
                include: {
                    _count: {
                        select: { accesses: true }
                    }
                }
            }),
            prisma.url.count({ where: { userId } })
        ]);

        // Formater les données pour la réponse
        const stats = urls.map(url => ({
            longUrl: url.longUrl,
            shortCode: url.shortCode,
            accessCount: url._count.accesses
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

router.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    try {
        // Cherche l'URL par shortCode
        const url = await prisma.url.findUnique({
            where: { shortCode },
            include: {
                accesses: {
                    select: { createdAt: true },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        if (!url) {
            return res.status(404).json({ error: 'URL non trouvée' });
        }
        // Correction : calculer le nombre de clics à partir du nombre d'accès
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