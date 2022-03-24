import express, { Router } from "express";
import { httpAddNewLaunch, httpGetAllLaunches, httpGetUpcommingLaunches, httpAbortLaunch } from "./launches.controller";

const launchRouter: Router = express.Router();

// /launches & launches/ both work
launchRouter.get('/', httpGetAllLaunches);
launchRouter.get('/upcomming', httpGetUpcommingLaunches);
launchRouter.post('/', httpAddNewLaunch);
launchRouter.delete('/:id', httpAbortLaunch);

export { launchRouter };


