import axios from "axios";
import launchesMongo from "./launches.mongo";
import planetsMongo from "../planetsModel/planets.mongo";
import { Launch, LaunchInput } from "../../interfaces/Launches";

const DEFAULT_FLIGHT_NUMBER: number = 1000;
const SPACE_X_URL = "https://api.spacexdata.com/v4/launches/query";


async function addFirstExampleLaunch () {
    const DEFAULT_LAUNCH: Launch = {
        flightNumber: 1000,
        mission: "First Example Mission",
        rocket: "Explorer 101",
        launchDate: new Date("December 27, 2030"),
        target: "Kepler-442 b",
        customers: ["1", "2"],
        upcoming: true,
        success: true
    };
    await saveLaunch(DEFAULT_LAUNCH);
}

async function loadSpaceXLaunchData () {
    const firstLaunch = await findLaunchInDB({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });

    if (firstLaunch) {
        console.log("launch data already loaded");
    } else {
        await populateLaunches();
        console.log("Launch data successfully loaded");
    }
}

async function populateLaunches () {
    console.log("Downloading launch data...");
    const response = await axios.post(SPACE_X_URL, {
        query: {}, options: {
            pagination: false,
            populate: [
                { path: "rocket", select: { name: 1 } },
                { path: "payloads", select: { customers: 1 } }
            ]
        }
    });

    if (response.status !== 200) {
        console.log("Problem downloading data");
        throw new Error("Data downloading failed");
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload: { [x: string]: any; }) => {
            return payload['customers'];
        });

        const launch: Launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcomming'],
            success: launchDoc['success'],
            customers: customers,
        };

        console.log(`${launch.flightNumber} ${launch.mission}`);
        await saveLaunch(launch);
    }
}

async function getAllLaunches (skip: number, limit: number) {
    const launches = await launchesMongo
        .find({}, { "_id": 0, "__v": 0 })
        .sort({ flightNumber: 1 })
        .skip(skip)
        .limit(limit);
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
    await launchesMongo.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function addNewLaunch (launchInput: LaunchInput) {
    const planet = await planetsMongo.findOne({
        keplerName: launchInput.target
    });

    if (!planet)
        throw new Error("No Matching Planet Found");

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

async function findLaunchInDB<T extends { flightNumber: Number; }> (filter: T) {
    return await launchesMongo.findOne(filter);
}

async function existsLaunchWithId (launchId: number) {
    const launchDoc = await findLaunchInDB({
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

// always add an example lauch if the launch collection is empty
addFirstExampleLaunch();

export {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    loadSpaceXLaunchData
};