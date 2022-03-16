import http from "http";
import { app } from "./app";
import { loadPlanetData } from "./models/planets.model";

const PORT = process.env.PORT || 8000;
const server: http.Server = http.createServer(app);

const startServer = async () => {
    // start server after successfully load data
    const msg = await loadPlanetData();
    msg === "success" && server.listen(PORT, () => {
        console.log(`listening on port ${PORT}...`);
    });
};

startServer();


