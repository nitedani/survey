REMOTE_USER="root"
PROJECT_DIR="/project"
REMOTE_MACHINE_ADDR="46.101.156.159"
PUBLIC_DOMAIN="something-something.com"
####################
source .env
parent_path=$(
    cd "$(dirname "${BASH_SOURCE[0]}")"
    pwd -P
)
ROOT_URL="https://$PUBLIC_DOMAIN"
DOCKER_HOST=ssh://$REMOTE_USER@$REMOTE_MACHINE_ADDR
VERSION=$(git rev-parse --short=8 HEAD)
echo Version: $VERSION
echo PUBLIC_DOMAIN=$PUBLIC_DOMAIN REMOTE_USER=$REMOTE_USER DOCKER_HOST=$DOCKER_HOST
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

    docker save website:${VERSION} | gzip | pv | ssh $REMOTE_MACHINE_ADDR "gunzip | docker load"
    docker save backend:${VERSION} | pv | ssh $REMOTE_MACHINE_ADDR "docker load"

    ssh $REMOTE_USER@$REMOTE_MACHINE_ADDR "mkdir -p $PROJECT_DIR"
    scp $prod_path "$REMOTE_USER@$REMOTE_MACHINE_ADDR:$PROJECT_DIR"
    scp -r configs "$REMOTE_USER@$REMOTE_MACHINE_ADDR:$PROJECT_DIR"
    ssh $REMOTE_USER@$REMOTE_MACHINE_ADDR "AUTH_SECRET=$AUTH_SECRET AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET VERSION=$VERSION MIGRATE=$MIGRATE ROOT_URL=$ROOT_URL PROJECT_DIR=$PROJECT_DIR docker compose -f $PROJECT_DIR/docker-compose-prod.yml up -d --build --force-recreate"
    
    # DOCKER_HOST=$DOCKER_HOST docker image prune -f
fi
