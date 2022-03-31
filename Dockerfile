FROM node:lts-alpine3.10

WORKDIR /app

# ~/app/
COPY package*.json ./

# ~/app/client/
COPY client/package*.json client/
RUN npm run install-client --only=production

# ~/app/server/
COPY server/package*.json server/
RUN npm run install-server --only=production

# ~/app/client/
COPY client/ client/
RUN npm run build --prefix client

# ~/app/server/
COPY server/ server/
RUN npm run build --prefix server

# run container as node user
USER node

# run server
CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000