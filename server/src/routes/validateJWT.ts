import { Router } from "express";
import jwt from "jsonwebtoken";
import {PrismaClient} from '@/generated/prisma';
import { verifyPassword } from "@/utils/HashUtil";
import {generateToken, verifyToken} from "@/utils/JWTUtil";

const router = Router();
const prisma = new PrismaClient();

router.post("/",verifyToken, async (req, res) => {
        res.json({ valid: true, user: req.user });
});

export default router;
