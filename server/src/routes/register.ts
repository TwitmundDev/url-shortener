import {Router} from "express";
import {PrismaClient} from '../generated/prisma';
import {hashPassword} from "../utils/HashUtil";

const prisma = new PrismaClient();
const router = Router();

// Exemple d'endpoint POST /register
router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).json({error: 'Aucun corps de requête fourni'});
    }
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({error: 'Champs manquants'});
    }
    if (!verifyUsername(username)) {
        console.log(username)
        return res.status(400).json({error: 'Nom d\'utilisateur invalide'});
    }
    if (!verifyMail(email)) {
        console.log(email)
        return res.status(400).json({error: 'Email invalide'});
    }
    if (!verfiyPassword(password)) {
        console.log(password)
        return res.status(400).json({error: 'Mot de passe invalide'});
    }

    try {
        if (await checkExistingUser(email)) {
            return res.status(400).json({error: 'Email déjà utilisé'});
        } else {
            await prisma.user.create({
                data: {
                    username,
                    email,
                    password: await hashPassword(password)
                }
            });
            return res.status(200).json({message: 'Inscription réussie :!'});
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        return res.status(500).json({error: 'Erreur interne du serveur'});
    }
});

/*
    * Vérifie si le nom d'utilisateur est valide
    * - Longueur entre 3 et 20 caractères
    * - Contient uniquement des lettres, des chiffres et des underscores
 */
function verifyUsername(username: string) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

/*
   * Vérifie si l'email est valide
   * - Format standard d'email
   * - Exemple :
   *   - valide : exemple@domaine.com
   *   - invalide : exemple@domaine, exemple.com, @domaine.com
*/
function verifyMail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/*
    * Vérifie si le mot de passe est valide
    * - Au moins 8 caractères
    * - Contient au moins une majuscule, une minuscule, un chiffre et un caractère spécial
    * - Exemple :
    *   - valide : MotDePasse1!
    *   - invalide : motdepasse, MOTDEPASSE1, MotDePasse
    *  - Caractères spéciaux autorisés : @$!%*?&
 */
function verfiyPassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

async function checkExistingUser(email: string) {
    try {
        return await prisma.user.findUnique({
            where: {email}
        });
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur existant:', error);
        return null;
    }
}


export default router;
