# Wähle eine Node-Version
FROM node:22-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install sequelize-cli

COPY . .

# backend runs on 3000
EXPOSE 3000

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

# start server
CMD ["npm", "run", "start-prod"]