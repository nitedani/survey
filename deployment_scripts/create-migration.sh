DATABASE_URL=postgres://app_backend_user:app_backend_pass@localhost:5432/app_backend
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd $parent_path/../apps/backend
DATABASE_URL=$DATABASE_URL npx prisma migrate dev --create-only