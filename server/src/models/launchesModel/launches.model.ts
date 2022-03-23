import launchesMongo from "./launches.mongo";
import planetsMongo from "../planetsModel/planets.mongo";
import { Launch, LaunchInput } from "../../interfaces/Launches";

const DEFAULT_FLIGHT_NUMBER: number = 100;

function addFirstExampleLaunch () {
    const DEFAULT_LAUNCH: Launch = {
        flightNumber: 100,
        mission: "First Example Mission",
        rocket: "Explorer 101",
        launchDate: new Date("December 27, 2030"),
        target: "Kepler-442 b",
        customers: ["1", "2"],
        upcoming: true,
        success: true
    };
    saveLaunch(DEFAULT_LAUNCH);
}

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

    // flightNumber exists ? update current launch : create new launch
    await launchesMongo.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function addNewLaunch (launchInput: LaunchInput) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(
        launchInput,
        {
            flightNumber: newFlightNumber,
            upcoming: true,
            customers: ["ZTM", "NASA"],
            success: true
        }
    );

    await saveLaunch(newLaunch);
    return newLaunch;
}

async function existsLaunchWithId (launchId: number) {
    const launchDoc = await launchesMongo.findOne({
        flightNumber: launchId
    });

    return launchDoc;
}

async function abortLaunchById (launchId: number) {
    const aborted = await launchesMongo.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });

    return aborted.modifiedCount === 1;
}

addFirstExampleLaunch();
export {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
};