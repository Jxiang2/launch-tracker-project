require('dotenv').config();
import http from "http";
import { app } from "./app";
import { loadPlanetData } from "./models/planetsModel/planets.model";
import { loadSpaceXLaunchData } from "./models/launchesModel/launches.model";
import { connectMongoDB } from "./utils/mongo";

const PORT = process.env.PORT || 8000;

const server: http.Server = http.createServer(app);

async function startServer () {
    // connect to MongoDB
    await connectMongoDB();

    // load data from csv file
    const msg = await loadPlanetData();

    // load spaceX API data
    await loadSpaceXLaunchData();

    // start to listen on Port 8000...
    msg === "success" && server.listen(PORT, () =>
        console.log(`listening on port ${PORT}...`)
    );
};

startServer();


