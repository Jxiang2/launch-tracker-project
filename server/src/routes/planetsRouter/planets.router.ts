import express, { Router } from "express";
import { httpgetAllPlanets } from "./planets.controller";

const planetRouter: Router = express.Router();

planetRouter.get('/', httpgetAllPlanets);

export { planetRouter };
