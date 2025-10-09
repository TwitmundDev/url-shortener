-- Création de l'utilisateur limité avec le plugin mysql_native_password
CREATE USER 'urlShortener'@'%' IDENTIFIED WITH mysql_native_password BY ')YKK4HQg(hOyTg_*';

-- Donner accès uniquement à la base mydb
GRANT ALL PRIVILEGES ON urlshortener.* TO 'urlShortener'@'%';

-- Appliquer les changements
FLUSH PRIVILEGES;