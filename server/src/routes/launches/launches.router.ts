import express, { Router } from "express";
import { httpAddNewLaunch, httpGetAllLaunches, httpAbortLaunch } from "./lauches.controller";

const launchRouter: Router = express.Router();

// /launches & launches/ both work
launchRouter.get('/', httpGetAllLaunches);
launchRouter.post('/', httpAddNewLaunch);
launchRouter.delete('/:id', httpAbortLaunch);

export { launchRouter };


