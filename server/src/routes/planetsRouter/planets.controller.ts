import { Request, Response } from "express";
import { getAllPlanets } from "../../models/planets.model";

async function httpgetAllPlanets (req: Request, res: Response) {
    const planets = await getAllPlanets();
    return res.status(200).json(planets);
};

export {
    httpgetAllPlanets
};