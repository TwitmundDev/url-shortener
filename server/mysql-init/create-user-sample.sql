-- Création de l'utilisateur limité
CREATE USER IF NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'apppassword';

-- Donner accès uniquement à la base mydb
GRANT ALL PRIVILEGES ON mydb.* TO 'appuser'@'%';

-- Appliquer les changements
FLUSH PRIVILEGES;