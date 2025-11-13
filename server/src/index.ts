/// <reference path="./types/express/index.d.ts" />
import 'module-alias/register';
import express from "express";
import cors from "cors";
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import admin_UserList from './routes/admin/userList';
import shorten from "@/routes/users/shorten";
import shortUrl from "@/routes/shortUrl";
import rateLimit from "express-rate-limit";
import getStats from "@/routes/users/getStats";
import changePassword from "@/routes/users/changePassword";
import suspendUser from "@/routes/admin/suspendUser";
import unsuspendUser from "@/routes/admin/unsuspendUser";
import disableShort from "@/routes/users/disableShort";
import validateJWT from "@/routes/validateJWT";


const app = express();
const PORT = process.env.PORT || 4000;
const baseUrl = process.env.BASE_URL + ":" + PORT || `http://localhost:${PORT}`;

console.log(`🔗 Base URL: ${baseUrl}`);

app.use(cors());
app.use(express.json());


// Middleware de rate limiting global
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite à 100 requêtes par fenêtre
    standardHeaders: true, // Retourne les headers de rate limit
    legacyHeaders: false, // Désactive les anciens headers
    message: {
        error: "Trop de requêtes, veuillez réessayer plus tard."
    }
});
app.use(limiter);


// // Exemple d’API
// app.post("/api/shorten", (req, res) => {
//     const { url } = req.body;
//     if (!url) return res.status(400).json({ error: "URL manquante" });
//
//     const shortCode = Math.random().toString(36).substring(2, 8);
//     res.json({ shortUrl: `https://twitmund.fr/${shortCode}` });
// });


app.use('/user/shorten', shorten);
app.use('/user/stats', getStats);
app.use('/user/changepassword', changePassword);
app.use('/user/disable', disableShort);


app.use('/admin/users', admin_UserList);
app.use('/admin/suspend', suspendUser);
app.use('/admin/unsuspend', unsuspendUser);


app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/', shortUrl);


app.use('/validatejwt', validateJWT);




app.listen(PORT, () => {
    console.log(`✅ Serveur Express en ligne sur le port ${PORT}`);
});
