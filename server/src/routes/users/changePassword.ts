import { Router } from "express";
import { PrismaClient } from '@/generated/prisma';
import { authenticate } from "@/middleware/auth";
import { hashPassword, verifyPassword } from "@/utils/HashUtil";

const router = Router();
const prisma = new PrismaClient();

router.post('/', authenticate, async (req, res) => {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    // Vérification stricte des champs
    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' || !currentPassword.trim() || !newPassword.trim()) {
        return res.status(400).json({ error: "Les champs currentPassword et newPassword doivent être des chaînes non vides." });
    }
    if (!verfiyPassword(newPassword)) {
        return res.status(400).json({ error: "Le nouveau mot de passe ne respecte pas les critères de sécurité." });
    }
    if (newPassword === currentPassword) {
        return res.status(400).json({ error: "Le nouveau mot de passe doit être différent de l'actuel." });
    }


    try {
        // Récupérer l'utilisateur
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        // Vérifier le mot de passe actuel
        const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({ error: "Mot de passe actuel incorrect." });
        }

        // Hasher le nouveau mot de passe
        const hashedNewPassword = await hashPassword(newPassword);

        await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedNewPassword,
            }
        });

        res.json({ message: "Mot de passe changé avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur." });
        console.log(error);
    }
});

function verfiyPassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

export default router;
