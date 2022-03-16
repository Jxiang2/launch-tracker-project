import { parse, Parser } from "csv-parse";
import path from "path";
import fs from "fs";

import { Planet } from "../interfaces/Planets";

const results: Planet[] = [];

const isHabitablePlanet = <T extends Planet> (planet: T) => {
	return (
		planet["koi_disposition"] === "CONFIRMED" &&
		planet["koi_insol"] > 0.36 &&
		planet["koi_insol"] < 1.11 &&
		planet["koi_prad"] < 1.6
	);
};

const loadPlanetData = () => {
	return new Promise((resolve, reject) => {
		const data: Parser = fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
			.pipe(
				parse({
					comment: "#",
					columns: true,
				})
			);

		// getting data...
		data
			.on("data", (data) => {
				isHabitablePlanet(data) && results.push(data);
			})
			.on("error", (err) => {
				console.log(err.message);
				reject(err);
			})
			.on("end", () => {
				console.log(`${results.length} habitable results found!`);
				resolve("success");
			});
	});
};

function getAllPlanets () {
	return results;
}

export { getAllPlanets, loadPlanetData };