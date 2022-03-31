FROM node:lts-alpine3.10

WORKDIR /app

COPY . .

RUN npm install --only=production

RUN npm run build --prefix

RUN npm run build --prefix server

# run container as node user
USER node

# run server
CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000