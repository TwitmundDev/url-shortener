#!/bin/sh
until nc -z db 3306; do
  echo "⏳ Attente de MySQL sur db:3306..."
  sleep 2
done
echo "✅ MySQL est prêt !"

