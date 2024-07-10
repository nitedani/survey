

### Development:
1. git clone https://github.com/nitedani/survey
2. cd survey
3. create `.env` file
```
# .env

AUTH_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
ROOT_URL="http://localhost"
```
4. `docker compose up`

The database is stored in a docker volume.<br>
To reset the database `docker compose down -v`


The website is running on http://localhost<br>
The database admin panel is running on http://localhost/dbeaver<br>

### Local deploy:
1. ssh to target machine and ensure docker is installed
2. git clone https://github.com/nitedani/survey
3. cd survey
4. create `deployment_scripts/.env`
```
# deployment_scripts/.env

AUTH_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
ROOT_URL="https://domain.com"
```

5. `./deployment_scripts/deploy-local.sh`

The service will listen on `443`, `80` ports, automatically redirecting to https.<br>
The https certificate is automatically created.<br>
The database is stored in the `DB_DATA` folder.


###  Remote deploy:  
    TODO