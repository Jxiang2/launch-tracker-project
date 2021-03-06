import fs from "fs";
import path from "path";
import { parse, Parser } from "csv-parse";
import planetsMongo from "./planets.mongo";
import { Planet, PlanetFromCsv } from "../../interfaces/Planets";


function isHabitablePlanet<T extends Planet> (planet: T) {
	return (
		planet["koi_disposition"] === "CONFIRMED" &&
		planet["koi_insol"] > 0.36 &&
		planet["koi_insol"] < 1.11 &&
		planet["koi_prad"] < 1.6
	);
};

function loadPlanetData () {
	return new Promise((resolve, reject) => {
		const data: Parser = fs.createReadStream(path.join(__dirname, '..', '..', '..', 'data', 'kepler_data.csv'))
			.pipe(parse({ comment: "#", columns: true }));

		data
			.on("data", (data) => (isHabitablePlanet(data)) && savePlanet(data))
			.on("error", (err) => {
				console.log(err);
				reject(err);
			})
			.on("end", async () => resolve("success"));
	});
};

async function savePlanet<T extends PlanetFromCsv> (planet: T) {
	try {
		// Filter... if document does not exist, insert a new one, else update it
		await planetsMongo.updateOne({
			keplerName: planet.kepler_name,
		}, {
			keplerName: planet.kepler_name,
			koi_disposition: planet.koi_disposition,
			koi_insol: planet.koi_insol,
			koi_prad: planet.koi_prad
		}, {
			upsert: true
		});
	} catch (error) {
		console.log(error);
	}
}

async function getAllPlanets () {
	return await planetsMongo.find({}, {
		"_id": 0, "__v": 0
	});
}

export { getAllPlanets, loadPlanetData };