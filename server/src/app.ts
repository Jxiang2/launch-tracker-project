import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

// routers
import { planetRouter } from "./routes/planets/planets.router";
import { launchRouter } from "./routes/launches/launches.router";

const app: express.Application = express();

// settings
app.use(cors({
  origin: [
    'http://localhost:3000', 'http://localhost:8000',
    'http://127.0.0.1:3000', 'http://127.0.0.1:8000'
  ]
}));
app.use(morgan("combined"));
app.use(express.json());

// serve client
app.use(express.static(path.join(__dirname, "..", "dist", "client")));

// routers
app.use('/planets', planetRouter);
app.use('/launches', launchRouter);

// if express can't find a route, react will take over it 
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "client", "index.html"));
});
export { app };