/// <reference path="./types/express/index.d.ts" />
import 'module-alias/register';
import express from "express";
import cors from "cors";
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import admin_UserList from './routes/admin/userList';
import shorten from "@/routes/users/shorten";
import shortUrl from "@/routes/shortUrl";


const app = express();
const PORT = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL + ":" + PORT || `http://localhost:${PORT}`;

console.log(`🔗 Base URL: ${baseUrl}`);

app.use(cors());
app.use(express.json());


// // Exemple d’API
// app.post("/api/shorten", (req, res) => {
//     const { url } = req.body;
//     if (!url) return res.status(400).json({ error: "URL manquante" });
//
//     const shortCode = Math.random().toString(36).substring(2, 8);
//     res.json({ shortUrl: `https://twitmund.fr/${shortCode}` });
// });

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/admin/users', admin_UserList);
app.use('/shorten', shorten);
app.use('/', shortUrl);




app.listen(PORT, () => {
    console.log(`✅ Serveur Express en ligne sur le port ${PORT}`);
});
