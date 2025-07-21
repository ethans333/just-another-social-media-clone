#!/bin/sh

echo "⏳ Waiting for PostgreSQL to be ready..."

until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$DB_NAME" -c '\q' > /dev/null 2>&1; do
  sleep 1
done

echo "✅ PostgreSQL is up - continuing..."

exec "$@"
