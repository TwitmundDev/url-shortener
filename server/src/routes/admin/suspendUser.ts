import {Router} from "express";
import {PrismaClient} from '@/generated/prisma';
import {authenticate} from "@/middleware/auth";
import {authorizeAdmin} from "@/middleware/authorizeAdmin";

const router = Router();
const prisma = new PrismaClient();

router.patch('/:id', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({error: 'ID utilisateur invalide'});
        }
        const user = await prisma.user.update({
            where: {id: userId},
            data: {isSuspended: true},
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                isSuspended: true,
                createdAt: true,
            }
        });
        if (!user) {
            return res.status(404).json({error: 'Utilisateur non trouvé'});
        }
        res.status(200).json({message: 'Utilisateur suspendu avec succès'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erreur serveur'});
    }
});

export default router;