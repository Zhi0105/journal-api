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
docker build -t filofax .
docker run -p 3333:3333 --env-file .env -d filofax
docker-compose up -d
 -->
