// server/src/routes/protected.ts
import express from 'express';
import { authenticate } from '../middleware/auth';
import { authorizeAdmin } from '../middleware/authorizeAdmin';

const router = express.Router();

// Route accessible après login
router.get('/profile', authenticate, (req, res) => {
    res.json({ message: 'Bienvenue utilisateur connecté' });
});

// Route accessible uniquement par ADMIN
router.get('/admin', authenticate, authorizeAdmin, (req, res) => {
    res.json({ message: 'Bienvenue ADMIN' });
});

export default router;