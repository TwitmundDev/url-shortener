import { Request, Response, NextFunction } from 'express';

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Accès interdit' });
    }
    next();
}