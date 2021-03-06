import applyPaginator from "../../utils/query";
import { LaunchInput } from "../../interfaces/Launches";
import {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    getUpcommingLaunches
} from "../../models/launchesModel/launches.model";
import { Request, Response } from "express";

async function httpGetAllLaunches (req: Request, res: Response) {
    const { skip: docsToSkip, limit: pageLimit } = applyPaginator(req.query);
    const launches = await getAllLaunches(docsToSkip, pageLimit);
    return res.status(200).json(launches);
};

async function httpGetUpcommingLaunches (req: Request, res: Response) {
    const launches = await getUpcommingLaunches();
    return res.status(200).json(launches);
}

async function httpAddNewLaunch (req: Request, res: Response) {
    const launch: LaunchInput = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property"
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (launch.launchDate.toString() === "Invalid Date") {
        return res.status(400).json({
            error: "Invalid launch date"
        });
    }

    const addedLaunch = await addNewLaunch(launch);
    return res.status(201).json(addedLaunch);
}

async function httpAbortLaunch (req: Request, res: Response) {
    const launchId = Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(launchId);

    if (!existsLaunch) {
        return res.status(404).json({
            error: 'Launch not found'
        });
    }

    const aborted = abortLaunchById(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: "Launch Not Aborted"
        });
    }

    return res.status(200).json({
        ok: true
    });
}

export {
    httpGetAllLaunches,
    httpGetUpcommingLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};
