import { abort } from "process";
import { Launch, LaunchInput } from "../interfaces/Launches";

let LAST_FLIGHT_NUMBER = 100;

let launch1: Launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-422 b",
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true
};

const launches = new Map<number, Launch>();
launches.set(launch1.flightNumber, launch1);

function getAllLaunches () {
    return Array.from(launches.values());
}

function addNewLaunch (launchInput: LaunchInput) {
    LAST_FLIGHT_NUMBER++;
    launches.set(LAST_FLIGHT_NUMBER,
        {
            ...launchInput,
            flightNumber: LAST_FLIGHT_NUMBER,
            upcoming: true,
            customers: ["ZTM", "NASA"],
            success: true
        }
    );
}

function existsLaunchWithId (launchId: number) {
    return launches.has(launchId);
}

function abortLaunchById (launchId: number) {
    const aborted = launches.get(launchId);
    if (aborted) {
        aborted.upcoming = false;
        aborted.success = false;
    }
    return aborted;
}

export {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    LaunchInput
};