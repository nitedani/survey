source .env
####################
parent_path=$(
    cd "$(dirname "${BASH_SOURCE[0]}")"
    pwd -P
)
VERSION=$(git rev-parse --short=8 HEAD)
echo Version: $VERSION
echo ROOT_URL=$ROOT_URL
echo "Run DB migrate/seed? yes/no"
read -r
if [ "$REPLY" = "yes" ]; then
    MIGRATE=true
elif [ "$REPLY" = "no" ]; then
    MIGRATE=false
elif [ "$REPLY" = "__unsafe__hard__reset__" ]; then
    MIGRATE="__unsafe__hard__reset__"
else
    exit 1
fi
echo "To deploy, type \"yes\"!"
read -r
if [ "$REPLY" = "yes" ]; then
    export VERSION=$VERSION
    export MIGRATE=$MIGRATE
    export VERSION=$VERSION
    export ROOT_URL=$ROOT_URL
    builder_path=$parent_path/docker-compose-builder.yml
    prod_path=$parent_path/docker-compose-prod.yml
    docker compose -f $builder_path --profile build_dist_folders up
    docker compose -f $builder_path --profile build_docker_images build
    docker compose -f $prod_path down -v
    docker compose -f $prod_path up -d --build --force-recreate --remove-orphans
    docker image prune -f
fi
