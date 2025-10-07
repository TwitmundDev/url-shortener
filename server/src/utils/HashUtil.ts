import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
    // argon2 automatically salts
    return argon2.hash(password);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
}