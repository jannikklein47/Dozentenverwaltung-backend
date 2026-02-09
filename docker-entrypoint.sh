#!/bin/sh

# backend/docker-entrypoint.sh

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Waiting for database to be ready..."
  sleep 2
done

echo "Database is ready!"

echo "Applying database migrations..."
npx sequelize-cli db:migrate --url mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

echo "Migrations applied!"

exec "$@"