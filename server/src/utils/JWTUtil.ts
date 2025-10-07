import jwt from "jsonwebtoken";
import {configDotenv} from "dotenv";


export interface JwtUserPayload {
    id: string | number;
    role: string;
}

export function generateToken(user: JwtUserPayload): string {
    configDotenv();
    return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

export function verifyToken(token: string): { userId: string | number; role: string } | null {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string | number; role: string };
    } catch {
        return null;
    }
}