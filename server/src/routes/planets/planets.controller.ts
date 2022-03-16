import { Request, Response } from "express";
import { getAllPlanets } from "../../models/planets.model";

const httpgetAllPlanets = (req: Request, res: Response) => {
    return res.status(200).json(getAllPlanets());
};

export {
    httpgetAllPlanets
};