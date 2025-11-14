import { Router } from "express";
import {verifyToken} from "@/utils/JWTUtil";

const router = Router();

router.post("/",verifyToken, async (req, res) => {
    console.log("Validating JWT for ");
        res.json({ valid: true });
});

export default router;
