USER=$(whoami)
PROJECT_DIR="/home/$USER/project"
####################
source .env
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
    export PROJECT_DIR=$PROJECT_DIR
    builder_path=$parent_path/docker-compose-builder.yml
    prod_path=$parent_path/docker-compose-prod.yml
    docker container prune -f
    docker compose -f $builder_path --profile build_dist_folders up --remove-orphans
    docker compose -f $builder_path --profile build_docker_images build --parallel

    mkdir -p $PROJECT_DIR
    cp $prod_path $PROJECT_DIR
    cp -r configs $PROJECT_DIR

    docker compose -f $prod_path up -d --build --force-recreate --remove-orphans
fi
