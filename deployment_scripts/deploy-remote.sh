REMOTE_USER="root"
REMOTE_MACHINE_ADDR="x.x.x.x"
PUBLIC_DOMAIN="my-domain.com"
####################

REMOTE_HOME_DIR="/home/$REMOTE_USER"
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
    TODO

    scp -r configs "$REMOTE_USER@$REMOTE_MACHINE_ADDR:$REMOTE_HOME_DIR"
    VERSION=$VERSION MIGRATE=$MIGRATE PUBLIC_DOMAIN=$PUBLIC_DOMAIN REMOTE_USER=$REMOTE_USER DOCKER_HOST=$DOCKER_HOST docker compose -f docker-compose-prod.yml up -d --build --force-recreate
    DOCKER_HOST=$DOCKER_HOST docker image prune -f
fi
