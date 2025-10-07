const express = require('express');
const router = express.Router();

// Exemple d'endpoint POST /register
router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Aucun corps de requête fourni' });
    }
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Champs manquants' });
    }

    // Logique d'inscription ici
    res.json({ message: 'Inscription réussie' });
});


function verifyMail(email) {

}

module.exports = router;