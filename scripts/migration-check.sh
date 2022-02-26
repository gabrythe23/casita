#!/usr/bin/env bash

set -e

echo "Running all migrations..."
ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run > /dev/null

# new version of typeorm fails if no migration is needed
set +e

echo "Checking if we need new migrations..."
ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -n BadMigration > /dev/null

set -e

BAD_MIGRATIONS=$(find src/migrations -name '*BadMigration.ts')

if [ -n "${BAD_MIGRATIONS}" ]
then
  rm ${BAD_MIGRATIONS}
  echo "You should create a new migration!"
  echo
  echo "npm run migration:generate <migration_name>"
  echo
  exit 1
else
  echo "Migration check passed"
fi
