# launch-tracker-project

This project amis to practice full-stack nodejs development

and explore the opne source spaceX API (https://github.com/r-spacex/SpaceX-API)

to track the previous rocket launches since 2006.

<img src="https://camo.githubusercontent.com/2a2dfb8b139de852f33a0a268fad5a1bf5ed32b459f3193fe296a26eb9a54e4d/68747470733a2f2f6c6976652e737461746963666c69636b722e636f6d2f36353533352f34393138353134393132325f333766356335326534335f6b2e6a7067"/>

## project tech stack
Client side: ReactJS, JavaScript

Server side: Express, TypeScript

Database: MongoDB

Deployment: Docker, AWS

## build project
Build without pm2 cluster

```
cd launch-tracker-project
npm run deploy
```

Build with pm2 cluster

```
cd launch-tracker-project
npm run deploy-cluster
```

## docker build command
```
 docker buildx create --name m1_builder
 docker buildx use m1_builder 
 docker buildx inspect --bootstrap
 docker buildx build --platform linux/amd64 --tag <docker username>/launch-tracker-project
```

## run docker container in EC2
```
docker run --restart=always --platform linux/amd64 -p 8000:8000 <docker username>/launch-tracker-project
```
