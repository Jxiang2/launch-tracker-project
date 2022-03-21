import launchesMongo from "./launches.mongo";
import planetsMongo from "./planets.mongo";
import { Launch, LaunchInput } from "../interfaces/Launches";

const DEFAULT_FLIGHT_NUMBER = 100;

let launch1: Launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true
};
saveLaunch(launch1);

const launches = new Map<number, Launch>();
// launches.set(launch1.flightNumber, launch1);

async function getAllLaunches () {
    const launches = await launchesMongo
        .find({}, {
            "_id": 0, "__v": 0
        });
    return launches;
}

async function getLatestFlightNumber () {
    const latestLaunch = await launchesMongo
        .findOne()
        .sort("-flightNumber");

    if (!latestLaunch)
        return DEFAULT_FLIGHT_NUMBER;

    return latestLaunch.flightNumber;
}

async function saveLaunch (launch: Launch) {
    const planet = await planetsMongo.findOne({
        keplerName: launch.target
    });

    if (!planet)
        throw new Error("No Matching Planet Found");

    await launchesMongo.updateOne({
        flightNumber: launch1.flightNumber
    }, launch, {
        upsert: true
    });
}

async function addNewLaunch (launchInput: LaunchInput) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = {
        ...launchInput,
        flightNumber: newFlightNumber,
        upcoming: true,
        customers: ["ZTM", "NASA"],
        success: true
    };

    await saveLaunch(newLaunch);
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