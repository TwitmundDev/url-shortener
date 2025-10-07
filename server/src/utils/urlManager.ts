import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export function createShortCode(length: number = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function generateUniqueShortCode(length: number = 6): Promise<string> {
    let shortCode: string;
    let exists = true;
    do {
        shortCode = createShortCode(length);
        const url = await prisma.url.findUnique({ where: { shortCode } });
        exists = !!url;
    } while (exists);
    return shortCode;
}
