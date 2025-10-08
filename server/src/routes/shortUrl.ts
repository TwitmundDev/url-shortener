import { Router } from "express";
import { PrismaClient } from '@/generated/prisma';
import { authenticate } from "@/middleware/auth";
import { generateUniqueShortCode } from "@/utils/urlManager";

const router = Router();
const prisma = new PrismaClient();

router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const urlEntry = await prisma.url.findUnique({
        where: { shortCode: shortUrl }
    });

    // Vérifie si l'URL existe et est active
    if (urlEntry && urlEntry.longUrl && urlEntry.isActive) {
        // Enregistrement de l'accès
        await prisma.access.create({
            data: {
                urlId: urlEntry.id
            }
        });
        let redirectUrl = urlEntry.longUrl;
        if (!/^https?:\/\//i.test(redirectUrl)) {
            redirectUrl = 'https://' + redirectUrl;
        }
        return res.redirect(redirectUrl);
    } else {
        return res.status(404).json({ error: "URL non trouvée" });
    }
});

export default router;
