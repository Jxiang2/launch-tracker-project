import { LaunchInput } from "../../interfaces/Launches";
import { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } from "../../models/lauches.model";
import { Request, Response } from "express";

function httpGetAllLaunches (req: Request, res: Response) {
    return res.status(200).json(getAllLaunches());
};

function httpAddNewLaunch (req: Request, res: Response) {
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

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch (req: Request, res: Response) {
    const launchId = Number(req.params.id);

    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'Launch not found'
        });
    }

    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

export {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};
