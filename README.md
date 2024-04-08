<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## ERD
![journal ERD](https://github.com/Zhi0105/journal-api/assets/88585596/44e5d3f1-aa25-46e1-b4ad-df5e95a52e5a)
## Installation
```bash
$ yarn install

$ npx prisma generate
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn start:dev

# prisma studio
$ yarn prisma:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## ENV

DATABASE_URL="YOUR_DB_URL"
DIRECT_URL="YOUR_DIRECT_DB_URL"
JWT_SECRET="super-secret"
PORT=80
API=DEV

<!--

//  NEST JS COMMAND :
    // nest new (project_name) --typescript
    // nest g module (module_name)
    // nest g controller (controller_name) --no-spec
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
