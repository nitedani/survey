source .env
export USER_FOLDER=$(whoami)
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
    sudo rm -rf /home/$USER_FOLDER/DB_DATA_PROD
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
    export CONFIGS_PATH=$parent_path/../configs
    builder_path=$parent_path/docker-compose-builder.yml
    prod_path=$parent_path/docker-compose-prod.yml
    docker container prune -f
    docker compose -f $builder_path --profile build_dist_folders up --remove-orphans
    docker compose -f $builder_path --profile build_docker_images build --parallel
    docker compose -f $prod_path up -d --build --force-recreate --remove-orphans
fi
