import { Router } from "express";
import jwt from "jsonwebtoken";
import {PrismaClient} from '../generated/prisma';
import { verifyPassword } from "../utils/HashUtil";
import {generateToken} from "@/utils/JWTUtil";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Utilisateur inconnu" });

    const valid = await verifyPassword(password, user.password);
    if (!valid) return res.status(401).json({ error: "Mot de passe incorrect" });
    if (user.isSuspended) return res.status(403).json({ error: "Compte suspendu" });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token });
});

export default router;
