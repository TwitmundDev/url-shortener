import { Router } from "express";
import { PrismaClient } from '@/generated/prisma';
import { authenticate } from "@/middleware/auth";
import { generateUniqueShortCode } from "@/utils/urlManager";

const router = Router();
const prisma = new PrismaClient();

router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    // console.log('Recherche du shortcode:', shortUrl);
    const urlEntry = await prisma.url.findUnique({
        where: { shortCode: shortUrl }
    });
    // console.log('Résultat trouvé:', urlEntry);

    if (urlEntry && urlEntry.longUrl) {
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
