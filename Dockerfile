FROM node:18-alpine AS development

ARG POSTGRES_HOST
ARG POSTGRES_PWD
ENV DATABASE_URL="postgresql://postgres:${POSTGRES_PWD}@${POSTGRES_HOST}:5434/mydb?schema=public"

WORKDIR /usr/src/app

COPY package*.json ./ 

RUN npm install npm@latest -g

RUN npm install

COPY . .

RUN npx prisma migrate deploy

RUN npx prisma generate

RUN npm run build

# FROM node:18-alpine AS production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./
# COPY prisma ./prisma/

# RUN npm install npm@latest -g

# RUN npm install --only=prod

# RUN npx prisma generate

# COPY . .

# # COPY --from=development /usr/src/app/dist ./dist
# COPY --from=development ./node_modules ./node_modules
# COPY --from=development ./package*.json ./
# COPY --from=development /usr/src/app/dist ./dist


EXPOSE 3333


CMD [ "node", "dist/main" ]
# CMD ["npm", "run", "start:prod"]
