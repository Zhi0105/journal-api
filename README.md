<!--

//  NEST JS COMMAND :
    // nest new (project_name) --typescript
    // nest g module (module_name)
    // nest g controller (controller_name)
    // nest g service (service_name) --no-spec

    NEST PACKAGE HELPERS:
      yarn add class-validatior class-transformer


# DOCKER COMMANDS CMD:
  # docker ps
  # docker --version
  # docker-compose --version

# DOCKER RUN COMPOSE COMMAND:
  # docker compose up db -d
  # docker logs

# PRISMA PACKAGE INSTALLATION:
  # yarn add -D prisma
  # yarn add @prisma/client

# PRISMA COMMAND:
  # npx prisma init
  # npx prisma help

  # npx prisma migrate dev  -> (ONLY AFTER SETUP PRISMA MIGRATION)
  # npx prisma generate
  # npx prisma studio

 -->

 <!--
  ENV:
    DATABASE_URL="postgresql://postgres:123@localhost:5434/journal?schema=public"
    JWT_SECRET="super-secret" 

  .env.test:
    DATABASE_URL="postgresql://postgres:123@localhost:5435/journal?schema=public"
    JWT_SECRET="super-secret"
 -->

<!--
CLONE GUIDE COMMAND:
  yarn install
  yarn db:dev:up
  yarn db:test:up
  npx prisma init
  yarn db:dev:restart
  yarn db:test:restart
  npx prisma generate
  yarn prisma:dev  -- prisma development
  yarn prisma:test -- prisma test
 -->

<!--
PROD:

  ENV:
    DATABASE_URL=postgresql://postgres:123@postgres:5432/filofax?schema=filofax
    JWT_SECRET=super-secret
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=123
    POSTGRES_DB=filofax


 USING 2 dockerfile (PROD FOR GOOGLE CLOUD DEPLOYMENT):
    docker build -f ./prisma/Dockerfile -t postgres .
    docker build -t journal-api .
    docker network create nestapi
    docker run --name postgres  -v nest-db:/var/lib/postgresql/data -p 5432:5432 --env-file .env -d postgres
    docker run --name journal-api -e POSTGRES_DB=filofax -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123 -p 3333:3333 --net nestapi  --env-file .env -d journal-api

  OR
 USING 2 docker comose yml (PROD):
    docker-compose up -d
 -->
