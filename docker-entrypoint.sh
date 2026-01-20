#!/bin/sh

# backend/docker-entrypoint.sh

# Warten, bis die Datenbank verfügbar ist (optional, aber empfohlen)
# Dies ist ein einfaches Beispiel, in der Produktion sollten Sie ein robusteres "wait-for-it" Skript verwenden.
echo "Waiting for database to be ready..."
until pg_isready -h "$DB_HOST" -p "5432" -U "$DB_USER" -d $DB_NAME; do
  echo "Database $DB_HOST $DB_USER is unavailable - sleeping"
  sleep 2
done
echo "Database is ready!"

# Migrationen anwenden
echo "Applying database migrations..."
# Stellen Sie sicher, dass sequelize-cli global oder als dev-dependency installiert ist
# und der Pfad zu Ihrer config.json korrekt ist.
npx sequelize-cli db:migrate --url postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
echo "Migrations applied!"

# Starten des Node.js-Servers
exec "$@"