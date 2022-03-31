FROM node:lts-alpine3.10

WORKDIR /app

# ~/app/
COPY package*.json ./

# ~/app/client/   prevent unnecessary installs
COPY client/package*.json client/
RUN npm run install-client --only=production

# ~/app/server/   prevent unnecessary installs
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
CMD ["npm", "run", "cluster", "--prefix", "server"]

EXPOSE 8000