import http from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { loadPlanetData } from "./models/planets.model";

const PORT = process.env.PORT || 8000;
const MONGO_URL = "mongodb+srv://nasa-api:wWerad8lEAXOUeT7@cluster0.qe704.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const server: http.Server = http.createServer(app);

const startServer = async () => {
    // connect to MongoDB
    await mongoose.connect(MONGO_URL);

    // start server after successfully load data
    const msg = await loadPlanetData();
    msg === "success" && server.listen(PORT, () => {
        console.log(`listening on port ${PORT}...`);
    });
};

// setup mongoose listeners
mongoose.connection.once('open', () => console.log('MongoDB connection ready'));
mongoose.connection.on('error', (err) => console.error(err));
startServer();

// MongoDB Credentials
// nasa-api
// wWerad8lEAXOUeT7


