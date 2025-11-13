# Étape 1 : Image de base
FROM node:20-alpine

# Dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Copier le script d'attente de MySQL
COPY wait-for-mysql.sh ./wait-for-mysql.sh
RUN chmod +x ./wait-for-mysql.sh

# Exposer le port de l'API Express
EXPOSE 4000

# Exposer le port de Prisma Studio
EXPOSE 5555

# Commande de démarrage
CMD ["npm", "run", "dev"]