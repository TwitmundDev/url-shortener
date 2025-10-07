import express from "express";
import cors from "cors";
import registerRouter from './routes/register.js';

const app = express();
const PORT = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

console.log(`🔗 Base URL: ${baseUrl}`);

app.use(cors());
app.use(express.json());


// Exemple d’API
app.post("/api/shorten", (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL manquante" });

    const shortCode = Math.random().toString(36).substring(2, 8);
    res.json({ shortUrl: `https://twitmund.fr/${shortCode}` });
});

app.use('/register', registerRouter);


app.listen(PORT, () => {
    console.log(`✅ Serveur Express en ligne sur le port ${PORT}`);
});
